import React from 'react';
import { PrintHeader } from './PrintHeader';
import { UserProfile } from '../types';
import { PONTE_MODULES } from '../data/initialData';

interface FullPrintViewProps {
  fields: Record<string, string>;
  checks: Record<string, Record<number, boolean>>;
  user: UserProfile;
}

export const FullPrintView: React.FC<FullPrintViewProps> = ({ fields, checks, user }) => {
  const f = (key: string) => fields[key] || '';
  const c = (key: string) => checks[key] || {};

  return (
    <div className="print-only">
      {/* Cover / Ponto de Partida */}
      <div className="print-break-inside-avoid mb-8">
        <PrintHeader
          moduleName="Ponto de Partida"
          moduleLetter="—"
          user={user}
          currentRole={f('m0_cargo')}
          targetRole={f('m0_alvo')}
          company={f('m0_empresa')}
          targetDate={f('m0_data')}
        />
        <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg mb-4">
          <h3 className="font-bold text-sm text-[#0B2046] mb-2 uppercase">Compromisso Público</h3>
          <p className="italic text-sm text-slate-800">
            "Sou <strong>{f('m0_cargo')}</strong> na <strong>{f('m0_empresa')}</strong>. Quero ser{' '}
            <strong>{f('m0_alvo')}</strong> até <strong>{f('m0_data')}</strong>."
          </p>
        </div>
      </div>

      {/* Módulo P - Postura */}
      <div className="print-page-break print-break-inside-avoid mb-8 pt-4">
        <PrintHeader
          moduleName="P - Postura"
          moduleLetter="P"
          user={user}
          currentRole={f('m0_cargo')}
          targetRole={f('m0_alvo')}
        />
        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Aula 1.1 — Descrição pelo Gestor</h3>
        <p className="text-xs text-slate-800 mb-4">{f('m1_descricao')}</p>

        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Aula 1.4 — Autoimagem</h3>
        <div className="grid grid-cols-2 gap-4 text-xs mb-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <strong>Como me descrevo hoje:</strong>
            <p className="mt-1 text-slate-700">{f('m1_auto1')}</p>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
            <strong>Como um gestor descreve:</strong>
            <p className="mt-1 text-slate-800">{f('m1_auto2')}</p>
          </div>
        </div>
      </div>

      {/* Módulo O - Operação */}
      <div className="print-page-break print-break-inside-avoid mb-8 pt-4">
        <PrintHeader
          moduleName="O - Operação"
          moduleLetter="O"
          user={user}
          currentRole={f('m0_cargo')}
          targetRole={f('m0_alvo')}
        />
        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Meu MCI (Meta Crucialmente Importante)</h3>
        <p className="p-3 bg-sky-50 border border-sky-200 rounded text-xs text-sky-950 font-semibold mb-4">
          {f('m2_mci')}
        </p>

        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Entregas Reescritas nas 4 Moedas</h3>
        <div className="space-y-2 text-xs mb-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="font-bold text-slate-700">Entrega {n}: </span>
              <span>{f(`m2_ent${n}b`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Módulo N - Números */}
      <div className="print-page-break print-break-inside-avoid mb-8 pt-4">
        <PrintHeader
          moduleName="N - Números"
          moduleLetter="N"
          user={user}
          currentRole={f('m0_cargo')}
          targetRole={f('m0_alvo')}
        />
        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Relatório de Impacto Mensal</h3>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5 mb-4">
          <div><strong>Mês:</strong> {f('m3_mes')}</div>
          <div><strong>Resultado 1:</strong> {f('m3_r1')}</div>
          <div><strong>Resultado 2:</strong> {f('m3_r2')}</div>
          <div><strong>Resultado 3:</strong> {f('m3_r3')}</div>
          <div><strong>Problema resolvido:</strong> {f('m3_prob')}</div>
          <div><strong>Reação do Gestor:</strong> {f('m3_reacao')}</div>
        </div>
      </div>

      {/* Módulo T - Transferir */}
      <div className="print-page-break print-break-inside-avoid mb-8 pt-4">
        <PrintHeader
          moduleName="T - Transferir"
          moduleLetter="T"
          user={user}
          currentRole={f('m0_cargo')}
          targetRole={f('m0_alvo')}
        />
        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Transbordo & Documentação</h3>
        <div className="text-xs space-y-2 mb-4">
          <p><strong>Rotina Documentada:</strong> {f('m4_doc_rotina')}</p>
          <p><strong>Pessoa Treinada:</strong> {f('m4_sessao_pessoa')} ({f('m4_sessao_data')})</p>
          <p><strong>Treinamento Proposto:</strong> {f('m4_treino_tema')}</p>
        </div>
      </div>

      {/* Módulo E - A Porta */}
      <div className="print-page-break print-break-inside-avoid mb-8 pt-4">
        <PrintHeader
          moduleName="E - A Porta (Visibilidade para quem decide)"
          moduleLetter="E"
          user={user}
          currentRole={f('m0_cargo')}
          targetRole={f('m0_alvo')}
        />
        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Termômetro de Relação dos 3 Decisores</h3>
        <div className="grid grid-cols-3 gap-3 text-xs mb-3">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <strong>Gestor Direto:</strong>
            <p className="mt-0.5 text-slate-700">{f('m5_dec1_nome') || '—'}</p>
            <p className="font-bold text-sky-700 mt-1">Nota: {f('m5_dec1_nota') || '—'}/10</p>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <strong>Gestor do teu Gestor:</strong>
            <p className="mt-0.5 text-slate-700">{f('m5_dec2_nome') || '—'}</p>
            <p className="font-bold text-sky-700 mt-1">Nota: {f('m5_dec2_nota') || '—'}/10</p>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <strong>RH / BP:</strong>
            <p className="mt-0.5 text-slate-700">{f('m5_dec3_nome') || '—'}</p>
            <p className="font-bold text-sky-700 mt-1">Nota: {f('m5_dec3_nota') || '—'}/10</p>
          </div>
        </div>

        {f('m5_gap_urgente') && (
          <p className="text-xs text-rose-900 bg-rose-50 p-2.5 rounded border border-rose-200 mb-3">
            <strong>Gap Mais Urgente:</strong> {f('m5_gap_urgente')}
          </p>
        )}

        {f('m5_contato_decisor') && (
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs mb-3">
            <strong>Ponto de Contato Planejado (2 Semanas):</strong> {f('m5_contato_decisor')} ({f('m5_contato_tipo')}) — {f('m5_contato_quando')}
            <p className="mt-0.5 italic text-slate-600">Roteiro: "{f('m5_contato_script')}"</p>
          </div>
        )}

        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Conversa de Carreira com o Gestor</h3>
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-xs space-y-1.5 mb-3">
          <div><strong>Data marcada / realizada:</strong> {f('m5_conv_data')}</div>
          <div><strong>Feedback honesto do gestor:</strong> {f('m5_conv_feedback') || f('m5_conv_metas')}</div>
          <div><strong>Lacuna apontada para o próximo nível:</strong> {f('m5_conv_lacuna')}</div>
          {f('m5_conv_objecao') && <div><strong>Objeção enfrentada:</strong> {f('m5_conv_objecao')}</div>}
        </div>

        <h3 className="font-bold text-sm text-[#0B2046] border-b pb-1 mb-3">Plano de 90 Dias & Acompanhamento</h3>
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded text-xs space-y-1.5 mb-4">
          <div><strong>Semanas 1 a 4 (Atacar 1ª lacuna):</strong> {f('m5_p90_sem1_4')}</div>
          <div><strong>Semanas 5 a 8 (Resultados mensuráveis):</strong> {f('m5_p90_sem5_8')}</div>
          <div><strong>Semanas 9 a 12 (Retomar com evidências):</strong> {f('m5_p90_sem9_12')}</div>
          {f('m5_atualizacao_mensal') && (
            <div className="pt-1.5 border-t border-emerald-200">
              <strong>Atualização mensal sem cobrança:</strong> <em>"{f('m5_atualizacao_mensal')}"</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
