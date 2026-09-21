import React, { useState } from 'react';
import { Menu, Sparkles, Printer, FileText, Download, LogOut, ShieldCheck, FileDown, Loader2, Check } from 'lucide-react';
import { PONTE_MODULES } from '../data/initialData';
import { LogoMentorLogistica } from './LogoMentorLogistica';
import { UserProfile } from '../types';

interface HeaderProps {
  activeModuleId: number;
  onOpenMobileMenu: () => void;
  onOpenAiAssistant: () => void;
  onOpenPortfolio: () => void;
  onDownloadPdf: () => void;
  onDownloadFullPdf: () => void;
  user: UserProfile;
  targetRole?: string;
  onLogout: () => void;
  onOpenClearModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModuleId,
  onOpenMobileMenu,
  onOpenAiAssistant,
  onOpenPortfolio,
  onDownloadPdf,
  onDownloadFullPdf,
  user,
  targetRole,
  onLogout,
  onOpenClearModal,
}) => {
  const currentModule = PONTE_MODULES.find((m) => m.id === activeModuleId) || PONTE_MODULES[0];
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadClick = () => {
    setDownloading(true);
    try {
      onDownloadPdf();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile Toggle & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            id="btn-mobile-menu"
            onClick={onOpenMobileMenu}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95"
            aria-label="Abrir menu lateral das etapas"
          >
            <Menu className="w-4 h-4 text-sky-400" />
            <span>Menu Etapas</span>
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-7 h-7 rounded-md text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs"
              style={{ backgroundColor: currentModule.color }}
            >
              {currentModule.letter}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate tracking-tight">
                  {currentModule.name}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-md">
                  Método PONTE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                {currentModule.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Action to Portfolio */}
          {activeModuleId !== 6 && (
            <button
              onClick={onOpenPortfolio}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>Ver Portfólio</span>
            </button>
          )}

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs ${
              downloaded
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : 'text-white bg-[#0B2046] hover:bg-[#123068] border border-[#0B2046]'
            }`}
            title="Baixar arquivo PDF desta página com a logomarca oficial"
          >
            {downloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : downloaded ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <Download className="w-3.5 h-3.5 text-white" />
            )}
            <span className="hidden sm:inline">
              {downloading ? 'Gerando...' : downloaded ? 'PDF Baixado!' : 'Baixar em PDF'}
            </span>
            <span className="sm:hidden">PDF</span>
          </button>

          {/* AI Mentor Trigger */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-lg transition-colors shadow-2xs cursor-pointer"
            title="Conselho do Mentor IA PONTE"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Mentor IA</span>
          </button>

          {/* User Profile Badge with Quick Logout */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
            <div
              className="w-8 h-8 rounded-full bg-[#0B2046] text-white font-bold text-xs flex items-center justify-center shadow-xs"
              title={`Aluno: ${user.name} (${user.email})`}
            >
              {user.initials}
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Desconectar do diário"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
