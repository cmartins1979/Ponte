import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { WorkbookView } from './components/WorkbookView';
import { RemindersCard } from './components/RemindersCard';
import { EvolutionCard } from './components/EvolutionCard';
import { AiAssistantModal } from './components/AiAssistantModal';
import { LoginScreen } from './components/LoginScreen';
import { ClearDataModal } from './components/ClearDataModal';
import { ModuleTabsNav } from './components/ModuleTabsNav';
import {
  PONTE_MODULES,
  EMPTY_WORKBOOK_FIELDS,
  EMPTY_WORKBOOK_CHECKS,
  demoExampleFields,
  demoExampleChecks,
  initialRemindersList,
} from './data/initialData';
import { ReminderItem, UserProfile } from './types';
import { Sparkles, Award, RotateCcw, Download, Save, ShieldCheck, Printer, FileText, Check, Loader2 } from 'lucide-react';
import { exportModuleToPdf, exportFullWorkbookToPdf } from './utils/pdfExport';

export default function App() {
  // Authentication & Active Student Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ponte_current_student');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeModuleId, setActiveModuleId] = useState<number>(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Salvo automaticamente');

  // Ref to scroll main container to top on module switch
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Multi-tenant student storage keys
  const userKey = currentUser ? currentUser.email.replace(/[^a-zA-Z0-9]/g, '_') : 'guest';

  // Per-student persistence states - clean by default for new users!
  const [fields, setFields] = useState<Record<string, string>>(() => {
    try {
      if (currentUser) {
        const saved = localStorage.getItem(`ponte_fields_${userKey}`);
        if (saved) return JSON.parse(saved);
      }
      return EMPTY_WORKBOOK_FIELDS;
    } catch {
      return EMPTY_WORKBOOK_FIELDS;
    }
  });

  const [checks, setChecks] = useState<Record<string, Record<number, boolean>>>(() => {
    try {
      if (currentUser) {
        const saved = localStorage.getItem(`ponte_checks_${userKey}`);
        if (saved) return JSON.parse(saved);
      }
      return EMPTY_WORKBOOK_CHECKS;
    } catch {
      return EMPTY_WORKBOOK_CHECKS;
    }
  });

  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    try {
      if (currentUser) {
        const saved = localStorage.getItem(`ponte_reminders_${userKey}`);
        if (saved) return JSON.parse(saved);
      }
      return initialRemindersList;
    } catch {
      return initialRemindersList;
    }
  });

  // Whenever activeModuleId changes, scroll instantly to the top
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo(0, 0);
  }, [activeModuleId]);

  // Whenever student changes, load their dedicated dataset
  useEffect(() => {
    if (!currentUser) return;
    const currentKey = currentUser.email.replace(/[^a-zA-Z0-9]/g, '_');

    try {
      const savedFields = localStorage.getItem(`ponte_fields_${currentKey}`);
      if (savedFields) {
        setFields(JSON.parse(savedFields));
      } else {
        // Novo aluno: sempre começa com diário limpo e vazio para preencher!
        setFields(EMPTY_WORKBOOK_FIELDS);
      }

      const savedChecks = localStorage.getItem(`ponte_checks_${currentKey}`);
      if (savedChecks) {
        setChecks(JSON.parse(savedChecks));
      } else {
        setChecks(EMPTY_WORKBOOK_CHECKS);
      }

      const savedReminders = localStorage.getItem(`ponte_reminders_${currentKey}`);
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      } else {
        setReminders(initialRemindersList);
      }
    } catch (e) {
      console.error('Error switching student data:', e);
    }
  }, [currentUser?.email]);

  // Sync to student's LocalStorage automatically
  useEffect(() => {
    if (!currentUser) return;
    const currentKey = currentUser.email.replace(/[^a-zA-Z0-9]/g, '_');
    localStorage.setItem(`ponte_fields_${currentKey}`, JSON.stringify(fields));
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setLastSavedTime(`Salvo com sucesso às ${now}`);
  }, [fields, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const currentKey = currentUser.email.replace(/[^a-zA-Z0-9]/g, '_');
    localStorage.setItem(`ponte_checks_${currentKey}`, JSON.stringify(checks));
  }, [checks, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const currentKey = currentUser.email.replace(/[^a-zA-Z0-9]/g, '_');
    localStorage.setItem(`ponte_reminders_${currentKey}`, JSON.stringify(reminders));
  }, [reminders, currentUser]);

  // Login handler
  const handleLogin = (profile: UserProfile, _accessKey: string) => {
    setCurrentUser(profile);
    localStorage.setItem('ponte_current_student', JSON.stringify(profile));
  };

  // Logout handler
  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair da sua conta de aluno? Suas respostas permanecerão salvas com segurança.')) {
      localStorage.removeItem('ponte_current_student');
      setCurrentUser(null);
      setFields(EMPTY_WORKBOOK_FIELDS);
      setChecks(EMPTY_WORKBOOK_CHECKS);
    }
  };

  // Field change
  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  // Checklist toggle
  const handleToggleCheck = (checkKey: string, index: number) => {
    setChecks((prev) => {
      const moduleChecks = prev[checkKey] || {};
      return {
        ...prev,
        [checkKey]: {
          ...moduleChecks,
          [index]: !moduleChecks[index],
        },
      };
    });
  };

  // Reminder toggles
  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleAddReminder = (title: string, dueDate: string) => {
    const newRem: ReminderItem = {
      id: `rem-${Date.now()}`,
      title,
      dueDate,
      type: 'exercicio',
      completed: false,
    };
    setReminders((prev) => [newRem, ...prev]);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  // Manual save trigger
  const handleManualSave = () => {
    if (!currentUser) return;
    const currentKey = currentUser.email.replace(/[^a-zA-Z0-9]/g, '_');
    localStorage.setItem(`ponte_fields_${currentKey}`, JSON.stringify(fields));
    localStorage.setItem(`ponte_checks_${currentKey}`, JSON.stringify(checks));
    localStorage.setItem(`ponte_reminders_${currentKey}`, JSON.stringify(reminders));
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastSavedTime(`Salvo com sucesso às ${now}`);
  };

  // Reset actions requested by user: "se ele quiser limpar e preencher de novo que tenha essa opção"
  const handleClearCurrentModule = () => {
    const prefix = `m${activeModuleId}_`;
    setFields((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.startsWith(prefix)) {
          next[k] = '';
        }
      });
      return next;
    });
    // Limpa checklist correspondente
    if (activeModuleId === 1) {
      setChecks((prev) => ({ ...prev, m1_check: {} }));
    } else if (activeModuleId === 4) {
      setChecks((prev) => ({ ...prev, m4_check: {} }));
    }
  };

  const handleResetAllData = () => {
    setFields(EMPTY_WORKBOOK_FIELDS);
    setChecks(EMPTY_WORKBOOK_CHECKS);
  };

  const handleLoadExampleData = () => {
    setFields(demoExampleFields);
    setChecks(demoExampleChecks);
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    if (!currentUser) return;
    const backupData = {
      app: 'Diario PONTE - Mentor de Logística Carlos Martins',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      student: currentUser,
      fields,
      checks,
      reminders,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diario_ponte_backup_${userKey}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Programmatic PDF Downloads using jsPDF
  const handleDownloadCurrentModulePdf = () => {
    if (!currentUser) return;
    exportModuleToPdf({
      moduleId: activeModuleId,
      fields,
      checks,
      user: currentUser,
    });
  };

  const handleDownloadFullPdf = () => {
    if (!currentUser) return;
    exportFullWorkbookToPdf({
      fields,
      checks,
      user: currentUser,
    });
  };

  // Compute progress for sections 0 to 5
  const completedSectionsCount = PONTE_MODULES.slice(0, 6).filter((m) => {
    const prefix = `m${m.id}_`;
    return Object.keys(fields).some((k) => k.startsWith(prefix) && fields[k]?.trim());
  }).length;

  const currentModule = PONTE_MODULES.find((m) => m.id === activeModuleId) || PONTE_MODULES[0];

  // If not logged in, render the dedicated student login screen
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 font-sans antialiased overflow-hidden">
      {/* Sidebar - Dark Navy Geometric Balance Theme */}
      <Sidebar
        activeModuleId={activeModuleId}
        onSelectModule={setActiveModuleId}
        fields={fields}
        checks={checks}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <Header
          activeModuleId={activeModuleId}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onOpenAiAssistant={() => setIsAiModalOpen(true)}
          onOpenPortfolio={() => setActiveModuleId(6)}
          onDownloadPdf={handleDownloadCurrentModulePdf}
          onDownloadFullPdf={handleDownloadFullPdf}
          user={currentUser}
          targetRole={fields['m0_alvo']}
          onLogout={handleLogout}
          onOpenClearModal={() => setIsClearModalOpen(true)}
        />

        {/* Scrollable Body */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-7 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {/* Top contextual status bar */}
            <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-800">
                  {activeModuleId === 0
                    ? 'Etapa Inicial: Ponto de Partida'
                    : activeModuleId === 6
                    ? 'Etapa Final: Consolidação do Portfólio PONTE'
                    : `Pilar ${currentModule.letter}: ${currentModule.name}`}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Aluno: <strong className="text-slate-700">{currentUser.name}</strong>
                </span>
              </div>

              <div className="flex items-center flex-wrap gap-2 text-xs">
                {/* Backup button */}
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-[#0B2046] px-2.5 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Fazer backup de segurança das minhas anotações em arquivo JSON"
                >
                  <Download className="w-3 h-3" />
                  <span>Backup JSON</span>
                </button>

                {/* Download Full Workbook in PDF */}
                <button
                  type="button"
                  onClick={handleDownloadFullPdf}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 transition-colors cursor-pointer shadow-2xs"
                  title="Baixar todo o Diário de Travessia (todos os módulos consolidados) em PDF"
                >
                  <FileText className="w-3 h-3 text-amber-700" />
                  <span className="hidden sm:inline">Diário Completo (PDF)</span>
                  <span className="sm:hidden">PDF Geral</span>
                </button>

                {/* Download this specific page in PDF */}
                <button
                  type="button"
                  onClick={handleDownloadCurrentModulePdf}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#0B2046] hover:bg-[#123068] px-3 py-1 rounded-md transition-colors cursor-pointer shadow-2xs"
                  title="Baixar esta página em PDF com a logomarca oficial"
                >
                  <Download className="w-3 h-3 text-white" />
                  <span>Baixar Etapa (PDF)</span>
                </button>
              </div>
            </div>

            {/* Quick Module Tabs Navigation (Always visible in mobile, tablet and desktop) */}
            <ModuleTabsNav
              activeModuleId={activeModuleId}
              onSelectModule={setActiveModuleId}
              fields={fields}
            />

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left/Main Column: Workbook View */}
              <div className="lg:col-span-8">
                <WorkbookView
                  moduleId={activeModuleId}
                  fields={fields}
                  checks={checks}
                  user={currentUser}
                  lastSavedText={lastSavedTime}
                  onFieldChange={handleFieldChange}
                  onToggleCheck={handleToggleCheck}
                  onSelectModule={setActiveModuleId}
                  onOpenAiForModule={() => setIsAiModalOpen(true)}
                  onOpenClearModal={() => setIsClearModalOpen(true)}
                  onManualSave={handleManualSave}
                />
              </div>

              {/* Right Column: Evolution & Reminders Panel (Hidden on Print) */}
              <div className="no-print lg:col-span-4 space-y-6">
                {/* Evolution Progress Card */}
                <EvolutionCard
                  completedSections={completedSectionsCount}
                  totalSections={6}
                  onOpenPortfolio={() => setActiveModuleId(6)}
                  targetRole={fields['m0_alvo']}
                />

                {/* Reminders & Action Tasks */}
                <RemindersCard
                  reminders={reminders}
                  onToggleReminder={handleToggleReminder}
                  onAddReminder={handleAddReminder}
                  onDeleteReminder={handleDeleteReminder}
                />

                {/* Quick Mentor Tip Card */}
                <div className="bg-gradient-to-br from-indigo-50/80 to-sky-50/80 rounded-2xl border border-indigo-200/70 p-5 shadow-2xs">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Princípio da Travessia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                    "{currentModule.quote}"
                  </p>
                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="mt-3.5 w-full py-2 px-3 text-xs font-bold text-indigo-900 bg-white hover:bg-indigo-100/60 border border-indigo-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Pedir conselho do Mentor IA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Mentor Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        moduleId={activeModuleId}
        fields={fields}
      />

      {/* Clear / Reset Modal */}
      <ClearDataModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        activeModuleId={activeModuleId}
        onClearCurrentModule={handleClearCurrentModule}
        onResetAllData={handleResetAllData}
        onLoadExampleData={handleLoadExampleData}
        onExportBackup={handleExportBackup}
      />
    </div>
  );
}
