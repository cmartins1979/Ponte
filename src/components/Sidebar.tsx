import React from 'react';
import { PONTE_MODULES } from '../data/initialData';
import { CheckCircle2, ChevronRight, BookOpen, Star, Award, X, LogOut, User } from 'lucide-react';
import { LogoMentorLogistica } from './LogoMentorLogistica';
import { UserProfile } from '../types';

interface SidebarProps {
  activeModuleId: number;
  onSelectModule: (id: number) => void;
  fields: Record<string, string>;
  checks: Record<string, Record<number, boolean>>;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  user: UserProfile;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModuleId,
  onSelectModule,
  fields,
  checks,
  mobileOpen,
  onCloseMobile,
  user,
  onLogout,
}) => {
  // Calculate completed modules (modules 0 to 5)
  const progressList = PONTE_MODULES.slice(0, 6).map((m) => {
    const prefix = `m${m.id}_`;
    const modFields = Object.keys(fields).filter((k) => k.startsWith(prefix) && fields[k]?.trim());
    return modFields.length > 0;
  });
  const completedCount = progressList.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden no-print"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="app-sidebar"
        className={`no-print fixed lg:static top-0 bottom-0 left-0 z-50 w-72 h-full bg-slate-950 flex flex-col border-r border-slate-800 shrink-0 transform transition-transform duration-300 ease-in-out select-none shadow-xl lg:shadow-none ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with Official Logo */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800/90 relative shrink-0">
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo Mentor de Logística Carlos Martins */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0B2046] p-1.5 flex items-center justify-center shrink-0 border border-slate-700/60 shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
                <rect x="36" y="68" width="8" height="16" fill="#C2CAD6" rx="1" />
                <rect x="47" y="56" width="8" height="28" fill="#C2CAD6" rx="1" />
                <rect x="58" y="44" width="8" height="40" fill="#C2CAD6" rx="1" />
                <rect x="69" y="32" width="8" height="52" fill="#C2CAD6" rx="1" />
                <path d="M 22 76 C 38 72, 54 58, 76 22 L 78 20" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                <polygon points="78,16 85,28 72,26" fill="#FFFFFF" />
                <circle cx="48" cy="18" r="3.2" fill="#FFFFFF" />
                <path d="M 44 23 L 52 23 L 50 34 L 46 34 Z" fill="#FFFFFF" />
                <path d="M 44 24 L 41 32" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                <rect x="38" y="31" width="5.5" height="4.5" rx="0.8" fill="#FFFFFF" />
                <path d="M 52 24 L 56 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <path d="M 47 34 L 46 44 L 50 44" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 49 34 L 53 40 L 56 40" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-white font-black text-sm tracking-wider uppercase block truncate">
                MENTOR DE LOGÍSTICA
              </span>
              <span className="text-[10px] text-sky-400 font-bold tracking-widest uppercase block">
                CARLOS MARTINS
              </span>
              <span className="text-[9px] text-slate-400 block tracking-tight">
                Método P.O.N.T.E
              </span>
            </div>
          </div>
        </div>

        {/* Modules Navigation List */}
        <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="px-3 flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Etapas da Travessia
            </span>
            <span className="text-[10px] text-sky-400 font-medium">
              {activeModuleId + 1} de {PONTE_MODULES.length}
            </span>
          </div>

          {PONTE_MODULES.map((mod) => {
            const isSelected = activeModuleId === mod.id;
            const isStarted =
              mod.id === 6
                ? completedCount >= 3
                : Object.keys(fields).some((k) => k.startsWith(`m${mod.id}_`) && fields[k]?.trim());

            return (
              <button
                type="button"
                id={`sidebar-module-${mod.id}`}
                key={mod.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelectModule(mod.id);
                  if (mobileOpen) onCloseMobile();
                }}
                className={`w-full group flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer text-left transition-all touch-manipulation select-none ${
                  isSelected
                    ? 'bg-sky-600/25 border border-sky-400/50 text-white shadow-md ring-1 ring-sky-500/40'
                    : 'hover:bg-slate-900 text-slate-300 hover:text-white border border-transparent active:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-colors shadow-2xs ${
                      isSelected
                        ? 'bg-sky-500 text-white ring-2 ring-white/30'
                        : mod.id === 6
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white'
                    }`}
                  >
                    {mod.letter}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-bold truncate leading-tight transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {mod.name}
                    </p>
                    <p className="text-slate-400 text-[11px] truncate mt-0.5">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {isStarted && (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-emerald-300' : 'text-emerald-400'
                      }`}
                    />
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-sky-300 translate-x-0.5 opacity-100'
                        : 'text-slate-600 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Student Profile & Logout in Geometric Balance style */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {user.initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Sair do perfil do aluno"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                Progresso
              </span>
              <span className="text-sky-400 text-xs font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
