import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'horizontal' | 'print';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LogoMentorLogistica: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
}) => {
  // Dimensions
  const getDims = () => {
    switch (size) {
      case 'sm':
        return { w: 36, h: 36, textH: 14 };
      case 'lg':
        return { w: 80, h: 80, textH: 24 };
      case 'xl':
        return { w: 120, h: 120, textH: 36 };
      case 'md':
      default:
        return { w: 52, h: 52, textH: 18 };
    }
  };

  const { w, h } = getDims();

  // Printable or Header Horizontal Banner Variant
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 rounded-lg bg-[#0B2046] p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-slate-700/50">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
            {/* 4 Ascending Bar Chart columns */}
            <rect x="36" y="68" width="8" height="16" fill="#C2CAD6" rx="1" />
            <rect x="47" y="56" width="8" height="28" fill="#C2CAD6" rx="1" />
            <rect x="58" y="44" width="8" height="40" fill="#C2CAD6" rx="1" />
            <rect x="69" y="32" width="8" height="52" fill="#C2CAD6" rx="1" />

            {/* Ascending curved arrow */}
            <path
              d="M 22 76 C 38 72, 54 58, 76 22 L 78 20 L 78 30 M 78 20 L 68 22"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon points="78,16 84,28 72,26" fill="#FFFFFF" />

            {/* Businessman silhouette */}
            {/* Head */}
            <circle cx="48" cy="18" r="3.2" fill="#FFFFFF" />
            {/* Torso & Suit */}
            <path d="M 44 23 L 52 23 L 50 34 L 46 34 Z" fill="#FFFFFF" />
            {/* Tie hint */}
            <polygon points="48,23 49,27 48,29 47,27" fill="#0B2046" />
            {/* Left Arm with briefcase */}
            <path d="M 44 24 L 41 32" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="38" y="31" width="5.5" height="4.5" rx="0.8" fill="#FFFFFF" />
            <rect x="40" y="30" width="2" height="1" fill="#0B2046" />
            {/* Right Arm swinging forward */}
            <path d="M 52 24 L 56 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            {/* Left Leg climbing up */}
            <path d="M 47 34 L 46 44 L 50 44" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right Leg forward step */}
            <path d="M 49 34 L 53 40 L 56 40" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-sm font-black tracking-wider text-slate-900 uppercase">
            MENTOR
          </div>
          <div className="text-[10px] font-bold text-sky-800 tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-2.5 h-px bg-sky-700"></span>
            <span>DE LOGÍSTICA</span>
            <span className="w-2.5 h-px bg-sky-700"></span>
          </div>
          <div className="text-[9px] font-medium text-slate-500 tracking-[0.18em] uppercase">
            CARLOS MARTINS
          </div>
        </div>
      </div>
    );
  }

  // Print Header Variant with highest contrast and border
  if (variant === 'print') {
    return (
      <div className={`flex items-center justify-between pb-4 mb-5 border-b-2 border-[#0B2046] ${className}`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-[#0B2046] p-2 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
              {/* 4 Ascending Bar Chart columns */}
              <rect x="36" y="68" width="8" height="16" fill="#C2CAD6" rx="1" />
              <rect x="47" y="56" width="8" height="28" fill="#C2CAD6" rx="1" />
              <rect x="58" y="44" width="8" height="40" fill="#C2CAD6" rx="1" />
              <rect x="69" y="32" width="8" height="52" fill="#C2CAD6" rx="1" />

              {/* Arrow */}
              <path
                d="M 22 76 C 38 72, 54 58, 76 22 L 78 20"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <polygon points="78,16 85,28 72,26" fill="#FFFFFF" />

              {/* Businessman */}
              <circle cx="48" cy="18" r="3.2" fill="#FFFFFF" />
              <path d="M 44 23 L 52 23 L 50 34 L 46 34 Z" fill="#FFFFFF" />
              <path d="M 44 24 L 41 32" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
              <rect x="38" y="31" width="5.5" height="4.5" rx="0.8" fill="#FFFFFF" />
              <path d="M 52 24 L 56 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M 47 34 L 46 44 L 50 44" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 49 34 L 53 40 L 56 40" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-black tracking-wider text-[#0B2046] uppercase leading-none">
              MENTOR DE LOGÍSTICA
            </div>
            <div className="text-xs font-bold text-slate-700 tracking-[0.2em] uppercase mt-1">
              CARLOS MARTINS
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
              Diário de Travessia · Método PONTE
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-slate-600">
          <div className="font-bold text-[#0B2046] uppercase">Documento Oficial do Aluno</div>
          <div className="text-[11px] text-slate-500">mentordelogistica.com.br</div>
        </div>
      </div>
    );
  }

  // Full Badge / Square Official Logo
  return (
    <div
      className={`inline-flex flex-col items-center justify-center bg-[#0B2046] text-white rounded-2xl p-4 shadow-xl border border-slate-700/60 select-none ${className}`}
      style={{ minWidth: w * 2.6 }}
    >
      {/* Icon portion */}
      <div className="relative" style={{ width: w * 1.5, height: h * 1.5 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none">
          {/* 4 Ascending Bar Chart columns */}
          <rect x="36" y="68" width="8" height="16" fill="#C2CAD6" rx="1" />
          <rect x="47" y="56" width="8" height="28" fill="#C2CAD6" rx="1" />
          <rect x="58" y="44" width="8" height="40" fill="#C2CAD6" rx="1" />
          <rect x="69" y="32" width="8" height="52" fill="#C2CAD6" rx="1" />

          {/* Ascending curved arrow */}
          <path
            d="M 22 76 C 38 72, 54 58, 76 22 L 78 20"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <polygon points="78,16 85,28 72,26" fill="#FFFFFF" />

          {/* Businessman silhouette */}
          {/* Head */}
          <circle cx="48" cy="18" r="3.2" fill="#FFFFFF" />
          {/* Torso & Suit */}
          <path d="M 44 23 L 52 23 L 50 34 L 46 34 Z" fill="#FFFFFF" />
          {/* Tie hint */}
          <polygon points="48,23 49,27 48,29 47,27" fill="#0B2046" />
          {/* Left Arm with briefcase */}
          <path d="M 44 24 L 41 32" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="38" y="31" width="5.5" height="4.5" rx="0.8" fill="#FFFFFF" />
          <rect x="40" y="30" width="2" height="1" fill="#0B2046" />
          {/* Right Arm */}
          <path d="M 52 24 L 56 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Left Leg */}
          <path d="M 47 34 L 46 44 L 50 44" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right Leg */}
          <path d="M 49 34 L 53 40 L 56 40" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Typography portion */}
      <div className="text-center mt-2.5 w-full">
        <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white leading-none uppercase font-sans">
          MENTOR
        </h2>
        <div className="flex items-center justify-center gap-2 my-1.5 opacity-90">
          <span className="h-px w-6 sm:w-8 bg-slate-300"></span>
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#C2CAD6] uppercase">
            DE LOGÍSTICA
          </span>
          <span className="h-px w-6 sm:w-8 bg-slate-300"></span>
        </div>
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-slate-200 uppercase mt-1">
          CARLOS MARTINS
        </p>
      </div>
    </div>
  );
};
