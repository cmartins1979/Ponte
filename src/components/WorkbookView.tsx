import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowRight, ArrowLeft, Share2, CheckSquare, Square, Printer, Info, RotateCcw, Save, ShieldCheck, Download, Loader2 } from 'lucide-react';
import { PrintHeader } from './PrintHeader';
import { PONTE_MODULES } from '../data/initialData';
import { UserProfile } from '../types';
import { exportModuleToPdf } from '../utils/pdfExport';

interface WorkbookViewProps {
  moduleId: number;
  fields: Record<string, string>;
  checks: Record<string, Record<number, boolean>>;
  user: UserProfile;
  lastSavedText: string;
  onFieldChange: (key: string, value: string) => void;
  onToggleCheck: (key: string, index: number) => void;
  onSelectModule: (id: number) => void;
  onOpenAiForModule: () => void;
  onOpenClearModal: () => void;
  onManualSave: () => void;
}

export const WorkbookView: React.FC<WorkbookViewProps> = ({
  moduleId,
  fields,
  checks,
  user,
  lastSavedText,
  onFieldChange,
  onToggleCheck,
  onSelectModule,
  onOpenAiForModule,
  onOpenClearModal,
  onManualSave,
}) => {
  const [copiedCommitment, setCopiedCommitment] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const f = (key: string) => fields[key] || '';
  const c = (key: string) => checks[key] || {};
  const currentModule = PONTE_MODULES.find((m) => m.id === moduleId) || PONTE_MODULES[0];

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      exportModuleToPdf({
        moduleId,
        fields,
        checks,
        user,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Falha ao gerar arquivo PDF:', err);
      try {
        window.print();
      } catch (printErr) {
        console.error('Falha no print fallback:', printErr);
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintFallback = () => {
    try {
      window.print();
    } catch (e) {
      console.error('Window.print bloqueado:', e);
      handleDownloadPdf();
    }
  };

  const handleSaveClick = () => {
    onManualSave();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleCopyCommitment = () => {
    const text = `Sou ${f('m0_cargo') || '[meu cargo]'} na ${f('m0_empresa') || '[empresa]'}. Quero ser ${f('m0_alvo') || '[cargo-alvo]'} até ${f('m0_data') || '[data]'}.`;
    navigator.clipboard.writeText(text);
    setCopiedCommitment(true);
    setTimeout(() => setCopiedCommitment(false), 2500);
  };

  const handleCopyCareerScript = () => {
    const scriptText = `Script da Conversa de Carreira (Método PONTE):\n1. "Como você avalia minha evolução nos últimos 6 meses?"\n2. "O que falta pra eu estar pronto pro próximo passo?"\n3. "Se eu trabalhar nesses pontos em 3-6 meses, a gente revisita?"\n4. "Tem algo que posso contar com teu apoio?"`;
    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Reusable Field Component
  const renderField = (
    id: string,
    label: string,
    hint?: string,
    lines = 2,
    placeholder = 'Escreva sua reflexão ou resposta...'
  ) => (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1 tracking-tight"
      >
        {label}
      </label>
      {hint && (
        <p className="text-xs text-slate-500 mb-1.5 leading-relaxed italic">
          {hint}
        </p>
      )}
      {lines === 1 ? (
        <input
          id={id}
          type="text"
          value={f(id)}
          onChange={(e) => onFieldChange(id, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3.5 py-2 text-sm bg-slate-50/70 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-600 focus:bg-white transition-all shadow-2xs"
        />
      ) : (
        <textarea
          id={id}
          rows={lines}
          value={f(id)}
          onChange={(e) => onFieldChange(id, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-600 focus:bg-white transition-all resize-y leading-relaxed shadow-2xs"
        />
      )}
    </div>
  );

  // Reusable Section Header
  const renderSectionHeader = (title: string, subtitle?: string) => (
    <div className="mt-8 mb-4 pb-2 border-b border-slate-200">
      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
        <span className="w-1.5 h-3.5 bg-sky-600 rounded-xs"></span>
        {title}
      </h3>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );

  // Quote Box
  const renderQuote = (quote: string) => (
    <div className="border-l-4 border-amber-500 bg-amber-50/60 p-3.5 rounded-r-lg mb-6 shadow-2xs">
      <p className="text-xs sm:text-sm italic font-medium text-slate-700 leading-relaxed">
        "{quote}"
      </p>
    </div>
  );

  // Checklist Component
  const renderChecklist = (checkKey: string, items: string[]) => (
    <div className="space-y-2.5 my-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Checklist de Ação
        </span>
        <span className="text-xs font-semibold text-sky-700">
          {items.filter((_, idx) => c(checkKey)[idx]).length} de {items.length} concluídos
        </span>
      </div>
      {items.map((item, idx) => {
        const isChecked = !!c(checkKey)[idx];
        return (
          <label
            key={idx}
            className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors border ${
              isChecked
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggleCheck(checkKey, idx)}
              className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 accent-sky-600 cursor-pointer"
            />
            <span className={`text-xs sm:text-sm leading-snug ${isChecked ? 'line-through opacity-80' : ''}`}>
              {item}
            </span>
          </label>
        );
      })}
    </div>
  );

  // Matrix Box for Module 2
  const renderMatrixBox = (
    id: string,
    label: string,
    desc: string,
    colorClass: { border: string; bg: string; text: string }
  ) => (
    <div className={`border-2 ${colorClass.border} rounded-xl p-3.5 ${colorClass.bg} shadow-2xs`}>
      <div className={`font-bold text-xs sm:text-sm ${colorClass.text} mb-0.5`}>{label}</div>
      <div className="text-[11px] text-slate-500 mb-2 leading-tight">{desc}</div>
      <textarea
        id={id}
        value={f(id)}
        onChange={(e) => onFieldChange(id, e.target.value)}
        rows={3}
        placeholder="Liste as atividades..."
        className="w-full p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500/40"
      />
    </div>
  );

  // Main rendering by module
  const renderContent = () => {
    switch (moduleId) {
      case 0:
        return (
          <div>
            {renderQuote('Se você não achar que está pronto, ninguém mais vai achar. — Mauro')}

            {renderSectionHeader('Quem sou eu hoje')}
            {renderField('m0_cargo', 'Cargo atual', 'Ex: Analista de Logística Pleno', 1)}
            {renderField('m0_tempo', 'Há quanto tempo estou neste cargo?', 'Ex: 2 anos e 3 meses', 1)}
            {renderField(
              'm0_empresa',
              'Empresa atual',
              'Se você já sabe que a promoção não vem dessa empresa, escreva isso também.',
              1
            )}

            {renderSectionHeader('Onde quero chegar')}
            {renderField(
              'm0_alvo',
              'Cargo-alvo',
              'Ex: Supervisor de Logística, Coordenador de Operações, Especialista',
              1
            )}
            {renderField(
              'm0_data',
              'Data-limite pessoal',
              'A data que você está se dando para isso acontecer (ex: Dezembro de 2026)',
              1
            )}

            {renderSectionHeader('Compromisso público')}
            <p className="text-xs sm:text-sm text-slate-600 mb-3">
              Poste no grupo do WhatsApp a frase abaixo preenchida para selar seu compromisso de travessia:
            </p>

            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 sm:p-5 text-sky-950 mb-4 shadow-xs relative">
              <p className="text-sm sm:text-base italic leading-relaxed">
                "Sou <strong className="text-sky-900 underline">{f('m0_cargo') || '[seu cargo]'}</strong> na{' '}
                <strong className="text-sky-900 underline">{f('m0_empresa') || '[sua empresa]'}</strong>. Quero ser{' '}
                <strong className="text-sky-900 underline">{f('m0_alvo') || '[cargo-alvo]'}</strong> até{' '}
                <strong className="text-sky-900 underline">{f('m0_data') || '[data]'}</strong>."
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyCommitment}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {copiedCommitment ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copiado com sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar frase para WhatsApp</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectModule(1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Avançar para Postura (P)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            {renderQuote('A cabeça muda antes do crachá.')}

            {renderSectionHeader('Aula 1.1 — Como meu gestor me descreveria hoje')}
            {renderField(
              'm1_descricao',
              'Em uma frase, como teu gestor te descreveria se alguém acima perguntasse quem você é?',
              'Seja sincero com o que ele realmente enxerga hoje.',
              2
            )}

            {renderSectionHeader('Aula 1.4 — Autoimagem')}
            {renderField(
              'm1_auto1',
              '1. Como você se descreve quando alguém pergunta o que você faz?',
              'Ex: Faço planilhas de expedição e atendo motoristas.',
              2
            )}
            {renderField(
              'm1_auto2',
              '2. Como um supervisor descreveria exatamente o mesmo trabalho?',
              'Ex: Garanto a produtividade do fluxo logístico e mitigo custos de ociosidade.',
              2
            )}
            {renderField(
              'm1_auto3',
              '3. Qual das duas respostas você quer dar daqui a 6 meses?',
              'Aponte a mudança de vocabulário e postura que você adotará.',
              2
            )}

            {renderSectionHeader(
              'Exercício de campo — Método das 2 perguntas',
              'Registre 5 situações em que você devolveu a decisão em vez de resolver:'
            )}

            {[1, 2, 3, 4, 5].map((n) =>
              renderField(
                `m1_sit${n}`,
                `Situação ${n}`,
                'Problema → Proposta da pessoa → O que aconteceu',
                2,
                `Ex: Situação ${n}: Um motorista chegou sem agendamento...`
              )
            )}

            {renderSectionHeader('Checklist da semana')}
            {renderChecklist('m1_check', [
              'Apliquei as 2 perguntas em pelo menos 5 situações',
              'Transformei reclamação em proposta antes de falar com o gestor',
              'Cheguei 10 min antes e fiquei 5 depois em reunião importante',
              'Postei áudio de 90s no grupo contando 1 situação real',
            ])}
          </div>
        );

      case 2:
        return (
          <div>
            {renderQuote(
              'Produtividade para o Resultado. Tudo que você faz deve visar geração de resultado para o negócio.'
            )}

            {renderSectionHeader(
              'Aula 2.1 — Reescrevendo entregas nas 4 moedas',
              'As 4 moedas do método: R$ · % · Tempo · Risco eliminado'
            )}

            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="mb-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="text-xs font-bold text-sky-800 uppercase mb-2">
                  Entrega {n}
                </div>
                {renderField(
                  `m2_ent${n}a`,
                  `Como reportei originalmente:`,
                  'Ex: Enviei os relatórios de estoque da semana.',
                  1
                )}
                {renderField(
                  `m2_ent${n}b`,
                  `Reescrita com moeda:`,
                  'Termina expressamente em R$, %, tempo poupado ou risco eliminado.',
                  1
                )}
              </div>
            ))}

            {renderSectionHeader('Aula 2.2 — Mapa de Área em 1 Página')}
            {renderField('m2_map1', '1. Entradas — o que chega na sua área', 'Insumos, demandas, e-mails, notas fiscais, pedidos', 2)}
            {renderField('m2_map2', '2. Processos — o que a área faz (máx 5-6)', 'Os macro processos chave executados pelo time', 2)}
            {renderField('m2_map3', '3. Saídas — o que a área entrega, pra quem, com qual SLA', 'Relatórios, cargas expedidas, faturamento, aprovações', 2)}
            {renderField('m2_map4', '4. KPIs — os 3-5 indicadores que o gestor olha primeiro', 'OTIF, custo operacional, ruptura, acuracidade de inventário', 2)}
            {renderField('m2_map5', '5. Decisores — quem decide quando dá errado (nome e cargo)', 'Nome e cargo da pessoa que tem a caneta final', 2)}
            {renderField(
              'm2_map6',
              'Nível Mariana: peso na despesa de cada processo',
              'Opcional — quanto cada macro processo pesa na despesa global da área',
              2
            )}

            {renderSectionHeader(
              'Aula 2.3 — MCI e Alavanca Prioritária',
              'Fórmula: Alto impacto financeiro × Alta influência sua × Baixo tempo de virada'
            )}
            {[1, 2, 3, 4, 5].map((n) =>
              renderField(
                `m2_alav${n}`,
                `Alavanca ${n}`,
                'Descreva a alavanca + marque: impacto? influência? tempo curto?',
                1
              )
            )}
            {renderField(
              'm2_mci',
              'Meu MCI escolhido para as próximas 3 semanas',
              'A meta crucialmente importante na qual você concentrará esforço total.',
              2
            )}

            {renderSectionHeader('Aula 2.4 — Matriz das 4 Caixas')}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {renderMatrixBox('m2_cx1', 'CAIXA 1 — Faço agora', 'Alto impacto + sei fazer', {
                border: 'border-emerald-500',
                bg: 'bg-emerald-50/50',
                text: 'text-emerald-800',
              })}
              {renderMatrixBox('m2_cx2', 'CAIXA 2 — Aprendo esta semana', 'Alto impacto + não sei fazer', {
                border: 'border-blue-500',
                bg: 'bg-blue-50/50',
                text: 'text-blue-800',
              })}
              {renderMatrixBox('m2_cx3', 'CAIXA 3 — Delego / Automatizo', 'Baixo impacto + sei fazer', {
                border: 'border-amber-500',
                bg: 'bg-amber-50/50',
                text: 'text-amber-800',
              })}
              {renderMatrixBox('m2_cx4', 'CAIXA 4 — Não faço', 'Baixo impacto + não sei fazer', {
                border: 'border-rose-500',
                bg: 'bg-rose-50/50',
                text: 'text-rose-800',
              })}
            </div>

            {renderField('m2_pct', '% do meu tempo em Caixa 1+2 hoje', 'Ex: 60%', 1)}
            {renderField(
              'm2_deleg',
              'O que vou delegar, automatizar ou recusar esta semana',
              'Ações práticas para liberar sua agenda para o MCI.',
              2
            )}
          </div>
        );

      case 3:
        return (
          <div>
            {renderQuote('Impacto não visto é impacto perdido.')}

            {renderSectionHeader('Aula 3.1 — Os 3 decisores que não sabem o que fiz')}
            {[1, 2, 3].map((n) =>
              renderField(
                `m3_dec${n}`,
                `Decisor ${n} — Nome, cargo e relação`,
                'Ele sabe quem você é? Sabe o que entregou recentemente?',
                2
              )
            )}

            {renderSectionHeader('Aula 3.2 — Relatório de Impacto Mensal')}
            <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 sm:p-5 mb-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-sky-700" />
                <span className="text-xs font-bold text-sky-900 uppercase">
                  Template Executivo de Relatório Mensal
                </span>
              </div>
              {renderField('m3_mes', 'Mês de referência', 'Ex: Setembro de 2026', 1)}
              {renderField('m3_r1', 'Resultado 1 (com moeda)', 'Ex: Reduzi ruptura em 2,3 pontos — impacto R$ 42 mil/mês', 1)}
              {renderField('m3_r2', 'Resultado 2 (com moeda)', 'Ex: Renegociei contrato eliminando R$ 14 mil em custos', 1)}
              {renderField('m3_r3', 'Resultado 3 (com moeda)', 'Ex: Automatizei fechamento poupando 6 horas/semana da equipe', 1)}
              {renderField('m3_prob', '1 problema que resolvi', 'Descreva o problema e a solução executada', 2)}
              {renderField('m3_futuro', '1 problema que virá (com proposta de ação)', 'Antecipação estratégica com recomendação', 2)}
              {renderField('m3_pedido', '1 pedido de apoio ao gestor (se houver)', 'O que você precisa para acelerar', 1)}
            </div>

            {renderField('m3_assunto', 'Assunto do e-mail', 'Ex: "Impacto de setembro: R$ 42 mil economizados + 1 risco eliminado — João"', 1)}
            {renderField('m3_reacao', 'Reação do gestor após envio', 'O que ele comentou ou respondeu?', 2)}

            {renderSectionHeader('Aula 3.3 — Elevador de 30 Segundos')}
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="mb-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="text-xs font-bold text-sky-800 uppercase mb-2">
                  Roteiro para Decisor {n}
                </div>
                {renderField(`m3_elev${n}a`, 'Ancoragem (quem sou, onde atuo)', 'Ex: Sou o Carlos, lidero a análise da expedição matutina.', 1)}
                {renderField(`m3_elev${n}b`, 'Número + insight', 'Ex: Este mês conseguimos reduzir o tempo de doca em 28%, economizando R$ 12 mil em diárias.', 1)}
                {renderField(`m3_elev${n}c`, 'Pergunta ou convite', 'Ex: Gostaria de compartilhar com você a planilha resumida se fizer sentido.', 1)}
              </div>
            ))}

            {renderSectionHeader('Aula 3.4 — Último erro reescrito nos 3 passos')}
            {renderField('m3_erro_antes', 'Como o erro foi comunicado originalmente', 'O modo defensivo ou sem números', 2)}
            {renderField('m3_erro1', 'Passo 1 — O que aconteceu (fato puro, sem adjetivo)', 'Ex: O caminhão da rota norte atrasou 45 minutos na saída.', 2)}
            {renderField('m3_erro2', 'Passo 2 — O impacto (com moeda)', 'Ex: Gerou risco de atraso em 2 entregas, sem custo financeiro direto.', 1)}
            {renderField('m3_erro3', 'Passo 3 — O que já estou fazendo (ação + prazo)', 'Ex: Já realoquei o veículo reserva e revisamos o checklist de liberação até às 15h.', 2)}
          </div>
        );

      case 4:
        return (
          <div>
            {renderQuote(
              'Eu me preocupava em ensinar quem trabalhava comigo. Na época eu não sabia — mas era isso que me liberava para assumir mais responsabilidades.'
            )}

            {renderSectionHeader('Aula 4.1 — Dupla ação do Transbordo')}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase text-sky-900 mb-2">
                Argumento 1 — Não ficar preso
              </p>
              {[1, 2, 3].map((n) =>
                renderField(
                  `m4_rot${n}`,
                  `Rotina/conhecimento que só eu sei (${n})`,
                  'Se você sair de férias amanhã, ninguém sabe rodar.',
                  1
                )
              )}
            </div>

            <div className="mb-4">
              <p className="text-xs font-bold uppercase text-sky-900 mb-2">
                Argumento 2 — Virar referência
              </p>
              {[1, 2, 3].map((n) =>
                renderField(
                  `m4_tema${n}`,
                  `Tema que domino e outras áreas se beneficiariam (${n})`,
                  'Ex: Roteirização dinâmica, negociação de frete, Excel avançado',
                  1
                )
              )}
            </div>

            {renderSectionHeader('Aula 4.2 — Documentação em 3 Formatos')}
            {renderField('m4_doc_rotina', 'Rotina escolhida para documentar', 'Qual é a rotina central que você vai transferir?', 1)}
            {renderField('m4_doc_check', 'Checklist (passo a passo para quem executa)', 'Etapa 1, etapa 2, etapa 3...', 4)}
            {renderField(
              'm4_doc_fluxo',
              'Fluxograma (decisões e bifurcações para quem coordena)',
              'Descreva os pontos de decisão: Se SIM faz X, se NÃO faz Y.',
              3
            )}
            {renderField(
              'm4_doc_pop',
              'POP — Padrão Operacional',
              'Objetivo / Escopo / Responsáveis / Procedimento passo a passo',
              4
            )}

            {renderSectionHeader('Aula 4.3 — Sessão de Transferência')}
            {renderField('m4_sessao_pessoa', 'Pessoa escolhida para a sessão (nome e função)', 'Ex: Lucas, analista júnior', 1)}
            {renderField('m4_sessao_data', 'Data e duração da sessão', 'Ex: Quarta-feira, 35 minutos presenciais', 1)}
            {renderField('m4_sessao_reacao', 'Reação da pessoa ao final da sessão', 'Ela já consegue rodar sozinha?', 2)}

            {renderSectionHeader('Aula 4.4 — Proposta de Treinamento Interno')}
            {renderField('m4_treino_tema', 'Tema escolhido', 'Ex: Como auditar CTes e evitar glosas', 1)}
            {renderField('m4_treino_proposta', 'Proposta enviada ao gestor (copie o texto)', 'O pitch de valor para a área', 3)}
            {renderField('m4_treino_resp', 'Resposta do gestor', 'O que ele achou e qual a data agendada', 2)}

            {renderSectionHeader('Checklist da semana')}
            {renderChecklist('m4_check', [
              'Documentei 1 rotina em 3 formatos (checklist, fluxograma, POP)',
              'Conduzi 1 sessão de transferência de 30 min',
              'Enviei proposta de treinamento ao gestor',
              'Postei entregáveis no grupo da mentoria',
            ])}
          </div>
        );

      case 5:
        return (
          <div>
            {renderQuote('Ser bom não basta. Ser visto sendo bom é o que promove.')}

            {renderSectionHeader('Aula 5.1 — Mapa dos 3 Decisores')}
            {[
              { n: 1, role: 'Gestor direto', cond: 'precisa QUERER' },
              { n: 2, role: 'Gerente/Diretor acima', cond: 'precisa CONHECER' },
              { n: 3, role: 'RH / Head de Gente', cond: 'precisa ter MAPEADO' },
            ].map(({ n, role, cond }) => (
              <div
                key={n}
                className="mb-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="text-xs font-bold text-sky-800 mb-1">
                  Decisor {n} — {role}{' '}
                  <span className="font-normal text-slate-500">({cond})</span>
                </div>
                {renderField(`m5_dec${n}_nome`, 'Nome e cargo', '', 1)}
                {renderField(
                  `m5_dec${n}_avalia`,
                  'Ele sabe quem sou? Sabe o que entreguei? Tem motivo pra lembrar?',
                  '',
                  2
                )}
              </div>
            ))}

            {renderSectionHeader('Aula 5.2 — Plano de 3 Contatos Mensais')}
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="mb-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="text-xs font-bold text-sky-800 mb-1">
                  Plano para Decisor {n}
                </div>
                {renderField(`m5_cont${n}_formato`, 'Formato', 'Ex: Pergunta pontual em reunião / e-mail com insight / conversa de corredor', 1)}
                {renderField(`m5_cont${n}_quando`, 'Próxima oportunidade (quando e onde)', 'Data ou evento', 1)}
                {renderField(`m5_cont${n}_script`, 'O que vou dizer ou mandar', 'Roteiro conciso e focado em valor', 2)}
              </div>
            ))}

            {renderSectionHeader('Aula 5.3 — A Conversa de Carreira')}
            {renderField('m5_conv_data', 'Data marcada para a conversa', 'Ex: Próxima terça-feira às 10h', 1)}
            {renderField('m5_conv_material', 'Material que vou levar', 'Ex: Mapa de Área, Relatório de Impacto, Diário de Travessia', 1)}

            <div className="bg-amber-50/80 border border-amber-300/80 rounded-xl p-4 my-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Script — 4 Perguntas na Ordem (Método PONTE)
                </span>
                <button
                  type="button"
                  onClick={handleCopyCareerScript}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedScript ? 'Copiado!' : 'Copiar Script'}</span>
                </button>
              </div>
              <ol className="text-xs sm:text-sm text-slate-800 space-y-1.5 list-decimal list-inside leading-relaxed font-medium">
                <li>"Como você avalia minha evolução nos últimos 6 meses?"</li>
                <li>"O que falta pra eu estar pronto pro próximo passo?"</li>
                <li>"Se eu trabalhar nesses pontos em 3-6 meses, a gente revisita?"</li>
                <li>"Tem algo que posso contar com teu apoio?"</li>
              </ol>
            </div>

            {renderField('m5_conv_resposta', 'O que meu gestor respondeu (resumo)', 'Resumo das falas e percepção dele', 3)}
            {renderField('m5_conv_metas', 'Metas que ficaram definidas', 'Entregas ou competências acordadas', 2)}
            {renderField('m5_conv_prazo', 'Prazo para revisitar a conversa', 'Data ou mês combinado', 1)}

            {renderSectionHeader('Aula 5.4 — Cenário pós-conversa')}
            {renderField(
              'm5_cenario',
              'Em qual cenário estou?',
              'Cenário 1: Metas claras / Cenário 2: Resposta vaga pela 2ª vez / Cenário 3: "Ainda não por causa de X"',
              2
            )}
            {renderField('m5_plano90', 'Meu plano de ação para os próximos 90 dias', 'As ações decisivas que você executará para selar a promoção.', 3)}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center py-2 border-b border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                PORTFÓLIO PONTE
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Consolidação da travessia — 5 semanas de método
              </p>
            </div>

            {/* Banner de Travessia */}
            <div className="bg-gradient-to-r from-slate-950 via-sky-950 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800">
              <div className="text-[11px] uppercase tracking-widest text-sky-400 font-bold mb-1.5">
                Quem cruzou a ponte
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-white flex flex-wrap items-center gap-2">
                <span>{f('m0_cargo') || '[Cargo atual]'}</span>
                <span className="text-amber-400">→</span>
                <span className="text-amber-300 underline underline-offset-4">
                  {f('m0_alvo') || '[Cargo-alvo]'}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
                Empresa: <strong className="text-white">{f('m0_empresa') || '[Empresa]'}</strong> · Prazo:{' '}
                <strong className="text-white">{f('m0_data') || '[Data]'}</strong>
              </div>
            </div>

            {/* Antes e Depois */}
            <div>
              {renderSectionHeader('Antes e Depois — Transformação de Autoimagem')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200">
                  <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Antes (Como eu me descrevia)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    {f('m1_auto1') || 'Como eu me descrevia antes do Método PONTE.'}
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Depois (Como um supervisor descreve)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    {f('m1_auto2') || 'Como um supervisor descreve exatamente o mesmo trabalho.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Meu MCI */}
            <div>
              {renderSectionHeader('Meu MCI (Meta Crucialmente Importante)')}
              <div className="p-4 bg-sky-50/80 rounded-xl border border-sky-200 text-xs sm:text-sm font-semibold text-sky-950 leading-relaxed">
                {f('m2_mci') || 'Ainda não definido — preencha no Módulo 2 (Operação).'}
              </div>
            </div>

            {/* Primeiro Relatório de Impacto */}
            <div>
              {renderSectionHeader('Primeiro Relatório de Impacto Enviado')}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
                <div>
                  <strong className="text-slate-800">Resultado 1:</strong>{' '}
                  <span className="text-slate-700">{f('m3_r1') || '—'}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Resultado 2:</strong>{' '}
                  <span className="text-slate-700">{f('m3_r2') || '—'}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Resultado 3:</strong>{' '}
                  <span className="text-slate-700">{f('m3_r3') || '—'}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                  <strong>Reação do gestor:</strong> {f('m3_reacao') || '—'}
                </div>
              </div>
            </div>

            {/* Corrente Quebrada */}
            <div>
              {renderSectionHeader('Corrente Quebrada — Transbordo Operacional')}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
                <div>
                  <strong className="text-slate-800">Rotina documentada:</strong>{' '}
                  <span className="text-slate-700">{f('m4_doc_rotina') || '—'}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Pessoa treinada:</strong>{' '}
                  <span className="text-slate-700">{f('m4_sessao_pessoa') || '—'}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Treinamento proposto:</strong>{' '}
                  <span className="text-slate-700">{f('m4_treino_tema') || '—'}</span>
                </div>
              </div>
            </div>

            {/* Conversa de Carreira */}
            <div>
              {renderSectionHeader('Resultado da Conversa de Carreira')}
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs sm:text-sm space-y-2">
                <div>
                  <strong className="text-slate-800">Data realizada:</strong>{' '}
                  <span className="text-slate-700">{f('m5_conv_data') || '—'}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Metas definidas:</strong>{' '}
                  <span className="text-slate-700">{f('m5_conv_metas') || '—'}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Prazo de revisita:</strong>{' '}
                  <span className="text-slate-700">{f('m5_conv_prazo') || '—'}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Cenário:</strong>{' '}
                  <span className="text-slate-700">{f('m5_cenario') || '—'}</span>
                </div>
              </div>
            </div>

            {/* Plano de 90 Dias */}
            <div>
              {renderSectionHeader('Meu Plano de 90 Dias')}
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 whitespace-pre-line leading-relaxed font-medium">
                {f('m5_plano90') || 'Preencha no Módulo 5 após a conversa de carreira.'}
              </div>
            </div>

            {/* Assinatura Final */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs sm:text-sm italic text-slate-600 font-medium">
                "Se você não achar que está pronto, ninguém mais vai achar."
              </p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                Método PONTE · Carlos E R Martins · mentordelogistica.com.br
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-7 max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-xs transition-all">
      {/* Official Print Header with Logo (appears on PDF / Print page) */}
      <PrintHeader
        moduleName={currentModule.name}
        moduleLetter={currentModule.letter}
        user={user}
        currentRole={f('m0_cargo')}
        targetRole={f('m0_alvo')}
        company={f('m0_empresa')}
        targetDate={f('m0_data')}
      />

      {/* Interactive Controls Bar for Student (Hidden on Print) */}
      <div className="no-print mb-6 pb-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-slate-700">
            {lastSavedText}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Quick Manual Save */}
          <button
            type="button"
            onClick={handleSaveClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Garante o salvamento instantâneo das respostas"
          >
            {justSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5" />}
            <span>{justSaved ? 'Salvo!' : 'Salvar'}</span>
          </button>

          {/* Download PDF for THIS specific module page */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs ${
              downloadSuccess
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : 'text-white bg-[#0B2046] hover:bg-[#123068] border border-[#0B2046]'
            }`}
            title="Baixar arquivo PDF desta etapa com a logomarca oficial e formatação executiva"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : downloadSuccess ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <Download className="w-3.5 h-3.5 text-white" />
            )}
            <span>
              {isGeneratingPdf
                ? 'Gerando PDF...'
                : downloadSuccess
                ? 'PDF Baixado!'
                : 'Baixar em PDF'}
            </span>
          </button>

          {/* Optional Print Dialog Button */}
          <button
            type="button"
            onClick={handlePrintFallback}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Imprimir direto na impressora física"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          {/* Clear / Reset Data */}
          <button
            type="button"
            onClick={onOpenClearModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
            title="Limpar respostas ou recomeçar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar / Recomeçar</span>
          </button>
        </div>
      </div>

      {renderContent()}

      {/* Bottom Step Navigation Bar (No-Print) */}
      <div className="no-print mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {moduleId > 0 ? (
            <button
              type="button"
              onClick={() => onSelectModule(moduleId - 1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer shadow-2xs active:scale-98"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>Etapa Anterior: {PONTE_MODULES[moduleId - 1]?.name}</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 italic">Início da Travessia</span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleSaveClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            {justSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
            <span>{justSaved ? 'Salvo!' : 'Salvar Etapa'}</span>
          </button>

          {moduleId < 6 ? (
            <button
              type="button"
              onClick={() => onSelectModule(moduleId + 1)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2046] hover:bg-[#123068] text-white font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <span>Avançar: {PONTE_MODULES[moduleId + 1]?.name}</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Baixar Portfólio Final em PDF</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
