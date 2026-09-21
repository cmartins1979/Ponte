import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, Send, Quote, Lightbulb, CheckCircle2 } from 'lucide-react';
import { generatePonteAdvice } from '../services/aiService';
import { PONTE_MODULES } from '../data/initialData';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: number;
  fields: Record<string, string>;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  moduleId,
  fields,
}) => {
  const currentModule = PONTE_MODULES.find((m) => m.id === moduleId) || PONTE_MODULES[1];
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<{
    quote: string;
    feedback: string;
    improvementTip: string;
    suggestedAction: string;
  } | null>(null);

  const fetchAdvice = async () => {
    setLoading(true);
    // Gather module user content
    const prefix = `m${moduleId}_`;
    const moduleText = Object.entries(fields)
      .filter(([k]) => k.startsWith(prefix))
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    const result = await generatePonteAdvice(
      currentModule.name,
      moduleText,
      fields['m0_alvo'] || 'Liderança/Supervisão'
    );
    setAdvice(result);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdvice();
    }
  }, [isOpen, moduleId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold text-sm">
              {currentModule.letter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Mentor Virtual PONTE</h3>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-sky-500 text-slate-950 rounded">
                  IA
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Feedback focado em: {currentModule.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-7 h-7 text-sky-600 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-600">
                Analisando suas anotações com base no Método PONTE...
              </p>
            </div>
          ) : advice ? (
            <div className="space-y-4">
              {/* Quote */}
              <div className="bg-amber-50/80 border-l-3 border-amber-500 p-3.5 rounded-r-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase mb-1">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Princípio de Travessia</span>
                </div>
                <p className="text-xs sm:text-sm italic text-slate-800 leading-relaxed font-medium">
                  "{advice.quote}"
                </p>
              </div>

              {/* Feedback */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Avaliação do Mentor
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {advice.feedback}
                </p>
              </div>

              {/* Improvement Tip */}
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950 uppercase tracking-wider mb-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                  <span>Como Elevar o Nível</span>
                </div>
                <p className="text-xs sm:text-sm text-sky-900 leading-relaxed">
                  {advice.improvementTip}
                </p>
              </div>

              {/* Suggested Action */}
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ação Prática Imediata</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  {advice.suggestedAction}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={fetchAdvice}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Regenerar Feedback</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Entendido, vamos aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
