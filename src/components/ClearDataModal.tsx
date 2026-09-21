import React, { useState } from 'react';
import { AlertTriangle, Trash2, RotateCcw, Download, X, Check, ShieldAlert } from 'lucide-react';
import { PONTE_MODULES } from '../data/initialData';

interface ClearDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModuleId: number;
  onClearCurrentModule: () => void;
  onResetAllData: () => void;
  onLoadExampleData: () => void;
  onExportBackup: () => void;
}

export const ClearDataModal: React.FC<ClearDataModalProps> = ({
  isOpen,
  onClose,
  activeModuleId,
  onClearCurrentModule,
  onResetAllData,
  onLoadExampleData,
  onExportBackup,
}) => {
  const [confirmFullReset, setConfirmFullReset] = useState(false);
  const currentModule = PONTE_MODULES.find((m) => m.id === activeModuleId) || PONTE_MODULES[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Gerenciar & Limpar Dados</h3>
              <p className="text-[11px] text-slate-400">
                Opções de reinício e segurança das suas anotações
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
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Seus dados são salvos continuamente. Se você deseja recomeçar suas respostas ou experimentar novos planos, escolha a opção desejada abaixo com total segurança:
          </p>

          {/* Backup recommendation */}
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between gap-3">
            <div className="text-xs text-sky-900">
              <strong className="block font-semibold">Dica de Segurança:</strong>
              Baixe uma cópia de segurança (backup) antes de limpar suas anotações.
            </div>
            <button
              type="button"
              onClick={onExportBackup}
              className="px-3 py-1.5 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors shrink-0 flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Backup</span>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {/* Action 1: Clear current module */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Limpar apenas o módulo atual: {currentModule.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Zera somente as respostas deste pilar ({currentModule.letter}), mantendo o restante do seu diário intacto.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClearCurrentModule();
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors shrink-0 cursor-pointer shadow-2xs"
                >
                  Limpar Este Módulo
                </button>
              </div>
            </div>

            {/* Action 2: Reset everything */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-rose-900 flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Zerar todo o diário de travessia</span>
                  </h4>
                  <p className="text-xs text-rose-700/80 mt-0.5">
                    Apaga todas as respostas de todos os módulos para você começar do zero absoluto.
                  </p>
                </div>
              </div>

              {!confirmFullReset ? (
                <div className="mt-3 text-right">
                  <button
                    type="button"
                    onClick={() => setConfirmFullReset(true)}
                    className="px-3.5 py-1.5 text-xs font-bold text-rose-700 bg-white hover:bg-rose-100 border border-rose-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Quero Zerar Tudo
                  </button>
                </div>
              ) : (
                <div className="mt-3 p-3 bg-white rounded-lg border border-rose-300 space-y-2">
                  <p className="text-xs font-semibold text-rose-900">
                    Tem certeza absoluta? Essa ação limpará todas as suas anotações do diário.
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setConfirmFullReset(false)}
                      className="px-3 py-1 text-xs text-slate-600 hover:text-slate-800 font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onResetAllData();
                        setConfirmFullReset(false);
                        onClose();
                      }}
                      className="px-3.5 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
                    >
                      Sim, Confirmar e Zerar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action 3: Load Logistics Example */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Carregar exemplo prático de Logística
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Preenche o diário com as respostas de exemplo de um Analista de Logística rumo à Supervisão.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onLoadExampleData();
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-sky-700 bg-white hover:bg-sky-50 border border-sky-300 rounded-lg transition-colors shrink-0 cursor-pointer shadow-2xs"
                >
                  Carregar Exemplo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
