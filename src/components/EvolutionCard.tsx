import React from 'react';
import { Award, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';

interface EvolutionCardProps {
  completedSections: number;
  totalSections: number;
  onOpenPortfolio: () => void;
  targetRole?: string;
}

export const EvolutionCard: React.FC<EvolutionCardProps> = ({
  completedSections,
  totalSections,
  onOpenPortfolio,
  targetRole,
}) => {
  const percent = Math.min(100, Math.round((completedSections / totalSections) * 100));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 shadow-md relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Sua Evolução
          </span>
          <h4 className="text-sm font-extrabold text-white mt-0.5">Rumo à Promoção</h4>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-950 border border-sky-500/30 text-sky-400 rounded-md">
          {percent}%
        </span>
      </div>

      <div className="flex items-center gap-4 my-3">
        <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
          <svg className="w-22 h-22 transform -rotate-90">
            <circle
              cx="44"
              cy="44"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              fill="transparent"
              className="text-slate-800"
            />
            <circle
              cx="44"
              cy="44"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-sky-400 transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-base font-black text-white leading-none">{percent}%</span>
            <span className="text-[9px] text-slate-400 font-semibold mt-0.5">concluído</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-300 font-medium leading-tight">
            {completedSections} de {totalSections} seções com diagnósticos ou tarefas iniciadas.
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
            Alvo: <strong className="text-amber-400">{targetRole || 'Cargo de Liderança'}</strong>
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 mt-2">
        <button
          onClick={onOpenPortfolio}
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-xs cursor-pointer group"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-slate-950" />
            <span>Ver Portfólio Consolidado</span>
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
