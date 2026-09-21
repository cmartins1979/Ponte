import React from 'react';
import { PONTE_MODULES } from '../data/initialData';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface ModuleTabsNavProps {
  activeModuleId: number;
  onSelectModule: (id: number) => void;
  fields: Record<string, string>;
}

export const ModuleTabsNav: React.FC<ModuleTabsNavProps> = ({
  activeModuleId,
  onSelectModule,
  fields,
}) => {
  return (
    <div className="no-print mb-4 bg-white p-1.5 sm:p-2 rounded-2xl border border-slate-200/80 shadow-2xs">
      <div className="flex items-center justify-between px-2 pb-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        <span>Navegação Rápida entre Etapas:</span>
        <span className="text-sky-700 font-semibold lowercase tracking-normal">
          clique para alternar
        </span>
      </div>

      {/* Horizontal scrollable tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar scroll-smooth">
        {PONTE_MODULES.map((mod) => {
          const isSelected = activeModuleId === mod.id;
          const isFilled = Object.keys(fields).some(
            (k) => k.startsWith(`m${mod.id}_`) && fields[k]?.trim()
          );

          return (
            <button
              type="button"
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                isSelected
                  ? 'bg-[#0B2046] text-white shadow-xs ring-2 ring-sky-500/40'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80'
              }`}
              title={`Ir para ${mod.name}`}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black shrink-0 ${
                  isSelected
                    ? 'bg-sky-500 text-white'
                    : mod.id === 6
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {mod.letter}
              </span>

              <span>{mod.name}</span>

              {isFilled && (
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isSelected ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
