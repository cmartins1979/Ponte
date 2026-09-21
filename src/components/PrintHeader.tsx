import React from 'react';
import { LogoMentorLogistica } from './LogoMentorLogistica';
import { UserProfile } from '../types';

interface PrintHeaderProps {
  moduleName: string;
  moduleLetter: string;
  user: UserProfile;
  currentRole?: string;
  targetRole?: string;
  company?: string;
  targetDate?: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({
  moduleName,
  moduleLetter,
  user,
  currentRole,
  targetRole,
  company,
  targetDate,
}) => {
  const currentDateFormatted = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="print-only mb-6 pb-4 border-b-2 border-[#0B2046]">
      {/* Official Top Banner with Brand Logo */}
      <div className="flex items-center justify-between">
        <LogoMentorLogistica variant="horizontal" size="md" />

        <div className="text-right">
          <div className="text-xs font-black text-[#0B2046] tracking-wider uppercase">
            MÉTODO P.O.N.T.E
          </div>
          <div className="text-[10px] text-slate-500 font-semibold tracking-wide">
            Workbook Oficial de Travessia
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Emissão: {currentDateFormatted}
          </div>
        </div>
      </div>

      {/* Student & Module Metadata Box */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div>
          <span className="block text-[10px] font-bold uppercase text-slate-500">Aluno</span>
          <span className="font-bold text-slate-900">{user.name}</span>
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase text-slate-500">Módulo / Pilar</span>
          <span className="font-bold text-sky-900">
            {moduleLetter !== '—' && moduleLetter !== '★' ? `[${moduleLetter}] ` : ''}
            {moduleName}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase text-slate-500">Trajetória</span>
          <span className="font-semibold text-slate-800">
            {currentRole || 'Cargo Atual'} → <strong className="text-[#0B2046]">{targetRole || 'Cargo-Alvo'}</strong>
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase text-slate-500">Empresa / Meta</span>
          <span className="text-slate-700">
            {company || 'Empresa'} · {targetDate || 'Prazo'}
          </span>
        </div>
      </div>
    </div>
  );
};
