import { PonteModuleMeta, ReminderItem, UserProfile } from '../types';

export const PONTE_MODULES: PonteModuleMeta[] = [
  {
    id: 0,
    key: 'inicio',
    letter: '—',
    name: 'Ponto de Partida',
    subtitle: 'Diagnóstico Atual & Alvo',
    color: '#1E4D8C',
    quote: 'Se você não achar que está pronto, ninguém mais vai achar. — Mauro'
  },
  {
    id: 1,
    key: 'P',
    letter: 'P',
    name: 'Postura',
    subtitle: 'A cabeça muda antes do crachá',
    color: '#1A3A6B',
    quote: 'A cabeça muda antes do crachá.'
  },
  {
    id: 2,
    key: 'O',
    letter: 'O',
    name: 'Operação',
    subtitle: 'Produtividade para o Resultado',
    color: '#1E4D8C',
    quote: 'Produtividade para o Resultado. Tudo que você faz deve visar geração de resultado para o negócio.'
  },
  {
    id: 3,
    key: 'N',
    letter: 'N',
    name: 'Números',
    subtitle: 'Impacto & Visibilidade Mensal',
    color: '#2A5F9E',
    quote: 'Impacto não visto é impacto perdido.'
  },
  {
    id: 4,
    key: 'T',
    letter: 'T',
    name: 'Transferir',
    subtitle: 'Transbordo & Documentação',
    color: '#1A3A6B',
    quote: 'Eu me preocupava em ensinar quem trabalhava comigo. Na época eu não sabia — mas era isso que me liberava para assumir mais responsabilidades.'
  },
  {
    id: 5,
    key: 'E',
    letter: 'E',
    name: 'A Porta',
    subtitle: 'Visibilidade para quem decide & Conversa de Carreira',
    color: '#0F2847',
    quote: 'Se você não achar que está pronto, ninguém mais vai achar — Carlos Martins'
  },
  {
    id: 6,
    key: 'portfolio',
    letter: '★',
    name: 'Portfólio',
    subtitle: 'Consolidação da Travessia — 5 Semanas',
    color: '#8B6914',
    quote: 'Método PONTE · Carlos E R Martins · mentordelogistica.com.br'
  }
];

export const EMPTY_WORKBOOK_FIELDS: Record<string, string> = {
  m0_cargo: '',
  m0_tempo: '',
  m0_empresa: '',
  m0_alvo: '',
  m0_data: '',

  m1_descricao: '',
  m1_auto1: '',
  m1_auto2: '',
  m1_auto3: '',
  m1_sit1: '',
  m1_sit2: '',
  m1_sit3: '',
  m1_sit4: '',
  m1_sit5: '',

  m2_ent1a: '',
  m2_ent1b: '',
  m2_ent2a: '',
  m2_ent2b: '',
  m2_ent3a: '',
  m2_ent3b: '',
  m2_map1: '',
  m2_map2: '',
  m2_map3: '',
  m2_map4: '',
  m2_map5: '',
  m2_map6: '',
  m2_alav1: '',
  m2_alav2: '',
  m2_alav3: '',
  m2_alav4: '',
  m2_alav5: '',
  m2_mci: '',
  m2_cx1: '',
  m2_cx2: '',
  m2_cx3: '',
  m2_cx4: '',
  m2_pct: '',
  m2_deleg: '',

  m3_r1: '',
  m3_r2: '',
  m3_r3: '',
  m3_prob: '',
  m3_futuro: '',
  m3_assunto: '',
  m3_reacao: '',
  m3_mes: '',
  m3_indicadores: '',

  m4_doc_rotina: '',
  m4_doc_check: '',
  m4_doc_pop: '',
  m4_sessao_pessoa: '',
  m4_sessao_data: '',
  m4_sessao_reacao: '',
  m4_treino_tema: '',

  // Módulo 5 (v2) — A Porta: Visibilidade para quem decide
  m5_dec1_nome: '',
  m5_dec1_nota: '',
  m5_dec2_nome: '',
  m5_dec2_nota: '',
  m5_dec3_nome: '',
  m5_dec3_nota: '',
  m5_gap_urgente: '',

  m5_contato_decisor: '',
  m5_contato_tipo: '',
  m5_contato_quando: '',
  m5_contato_script: '',

  m5_conv_data: '',
  m5_conv_feedback: '',
  m5_conv_lacuna: '',
  m5_conv_objecao: '',

  m5_p90_sem1_4: '',
  m5_p90_sem5_8: '',
  m5_p90_sem9_12: '',
  m5_atualizacao_mensal: '',
  m5_decisao_sinal: '',

  // Retrocompatibility aliases
  m5_dec1_avalia: '',
  m5_dec2_avalia: '',
  m5_dec3_avalia: '',
  m5_conv_metas: '',
  m5_conv_prazo: '',
  m5_cenario: '',
  m5_conv_material: '',
  m5_plano90: '',
};

export const EMPTY_WORKBOOK_CHECKS: Record<string, Record<number, boolean>> = {
  m1_check: {},
  m4_check: {},
  m5_check: {},
};

export const demoExampleFields: Record<string, string> = {
  m0_cargo: 'Analista de Logística Pleno',
  m0_tempo: '2 anos e 4 meses',
  m0_empresa: 'Operador Logístico / Indústria',
  m0_alvo: 'Supervisor de Operações Logísticas',
  m0_data: 'Dezembro de 2026',

  m1_descricao: 'Profissional técnico, confiável e executor, mas que ainda espera direcionamento para decisões estratégicas.',
  m1_auto1: 'Sou analista, cuido do controle de expedição e relatórios de frete.',
  m1_auto2: 'Garanto a eficiência operacional da expedição, gerencio custos de frete e lidero melhorias contínuas.',
  m1_auto3: 'A segunda resposta — postura de quem lidera processos e resultados.',
  m1_sit1: 'Gargalo no carregamento matutino → Em vez de perguntar "o que faço?", perguntei "Qual é a sua proposta?" e alinhamos inverter a ordem das rotas críticas.',

  m2_ent1a: 'Atualizei a planilha de fretes e enviei para a gerência.',
  m2_ent1b: 'Otimizei rotas de frete reduzindo o custo mensal em R$ 18.500 (economia de 6,2%).',
  m2_map1: 'Pedidos de expedição do Comercial, notas fiscais e confirmações de estoque do WMS.',
  m2_map2: 'Roteirização, conferência de cargas, emissão de CTe/MDFe, despacho e monitoramento de entregas.',
  m2_map3: 'Cargas despachadas dentro do SLA de 4 horas para clientes chave e relatórios de OTIF.',
  m2_map4: 'OTIF (On-Time In-Full), Custo por kg transportado, Avarias (%), Tempo de permanência de doca.',
  m2_map5: 'Decisor: Marcelo Silva (Gerente de Operações).',
  m2_mci: 'Reduzir o tempo de permanência de carretas na doca de 4h30 para 2h45 até o fim do trimestre.',
  m2_cx1: 'Revisar ordem de separação de picking para reduzir tempo de doca.',
  m2_cx2: 'Análise de dados avançada em Power BI para previsibilidade de demanda.',
  m2_cx3: 'Envio manual de e-mails de aviso de saída de veículos (automatizado via sistema).',
  m2_cx4: 'Reuniões operacionais sem pauta definida e sem decisão prática.',
  m2_pct: '65%',
  m2_deleg: 'A conferência manual de canhotos diários delegada ao assistente treinado.',

  m3_r1: 'Reduzi ruptura de carregamento em 3,1% — impacto estimado de R$ 34.000 no mês.',
  m3_r2: 'Renegociação de diárias extras gerando economia de R$ 9.800.',
  m3_r3: 'Eliminei risco de autuação fiscal com revisão preventiva de 100% dos manifests eletrônicos.',
  m3_prob: 'Falta de paletes padronizados gerava atraso na doca 4.',
  m3_futuro: 'Pico de safra próximo mês; proposta de turno estendido flexível negociado com transportadoras.',
  m3_assunto: 'Impacto de Setembro: R$ 43.800 em economia + 1 risco operacional mitigado — João Carlos',
  m3_reacao: 'Gestor elogiou a clareza e pediu para apresentar o resumo na reunião diretiva.',

  m4_doc_rotina: 'Procedimento Operacional de Fechamento de Carga e Liberação de Doca',
  m4_doc_check: '1. Conferir peso total vs balança\n2. Validar lacre físico e nota\n3. Emitir MDFe e liberar motorista\n4. Registrar horário no sistema',
  m4_doc_pop: 'POP-LOG-04: Padronização do fluxo de conferência rápida com duplo check de segurança.',
  m4_sessao_pessoa: 'Lucas Ferreira (Assistente de Operações)',
  m4_sessao_data: 'Terça-feira, 35 minutos',
  m4_sessao_reacao: 'Sentiu-se mais seguro para operar a rotina sozinho durante minhas férias ou reuniões.',
  m4_treino_tema: 'Boas Práticas de Gestão de Doca e Redução de Diárias',

  // Módulo 5 (v2) Demo
  m5_dec1_nome: 'Carlos Eduardo (Gerente de Operações — Gestor Direto)',
  m5_dec1_nota: '8',
  m5_dec2_nome: 'Roberto Antunes (Diretor de Supply Chain)',
  m5_dec2_nota: '4',
  m5_dec3_nome: 'Camila Rocha (Business Partner de RH)',
  m5_dec3_nota: '5',
  m5_gap_urgente: 'Roberto Antunes (Diretor de Supply Chain) — Nota 4: Sabe meu nome por alto, mas não tem clareza dos meus resultados na doca e economia de frete.',

  m5_contato_decisor: 'Roberto Antunes (Diretor de Supply Chain)',
  m5_contato_tipo: 'E-mail curto pedindo opinião sobre dados de permanência de doca',
  m5_contato_quando: 'Próxima terça-feira após fechamento dos KPIs operacionais',
  m5_contato_script: '"Roberto, bom dia. Fechamos a redução de 28% no tempo de doca da filial. Como você tem conduzido a padronização das outras unidades, gostaria de saber se esse modelo cabe na pauta do próximo comitê mensal."',

  m5_conv_data: '15 de Outubro às 14h (marcada no calendário)',
  m5_conv_feedback: 'O gestor elogiou o domínio técnico e os relatórios de impacto mensais, reforçando que sou a referência do turno. Disse que o trabalho em si está impecável.',
  m5_conv_lacuna: 'Gestão de pessoas e mediação de conflitos no pátio: preciso mostrar capacidade de liderar o time e formar sucessores.',
  m5_conv_objecao: 'Objeção: "Não depende só de mim" → Respondi: "Quem mais precisa me conhecer? Como posso facilitar isso?" O gestor sugeriu alinhar com o Diretor Roberto e a BP Camila.',

  m5_p90_sem1_4: 'Semanas 1 a 4: Assumir os DDS diários matutinos de 10 min com o time operacional e implantar quadro de gestão à vista de doca.',
  m5_p90_sem5_8: 'Semanas 5 a 8: Mensurar resultado: Reduzir tempo de doca em 30 min (tempo) e zerar horas extras da equipe matutina (economia de R$ 6.200/mês).',
  m5_p90_sem9_12: 'Semanas 9 a 12: Retomar a conversa com o gestor apresentando o dossiê de evidências e resultados de liderança: "Tô no caminho certo para o próximo nível?"',
  m5_atualizacao_mensal: '"Queria te dar uma atualização rápida sobre aquele ponto de liderança de time que conversamos: assumi o alinhamento diário e a pontualidade subiu para 98%."',
  m5_decisao_sinal: 'Feedback claro com metas alinhadas. Há caminho concreto para a promoção de supervisão no próximo ciclo.',

  // Retrocompatibilidade
  m5_dec1_avalia: 'Nota 8 — Conhece meus resultados e apoia o próximo passo.',
  m5_dec2_avalia: 'Nota 4 — Precisa conhecer o impacto financeiro.',
  m5_dec3_avalia: 'Nota 5 — Tem mapeamento de sucessão em andamento.',
  m5_conv_metas: '1. Assumir liderança diária do pátio; 2. Reduzir horas extras.',
  m5_conv_prazo: '90 dias (revisita em Janeiro)',
  m5_cenario: 'Cenário 1: Metas claras e gestor como aliado.',
  m5_conv_material: 'Portfólio PONTE consolidado e Relatório de Impacto',
  m5_plano90: 'Semanas 1-4: DDS matutinos e liderança do turno.\nSemanas 5-8: Redução de 30 min de doca e R$ 6.200 em horas extras.\nSemanas 9-12: Retomada com evidências e validação para promoção.'
};

// Retrocompatibility alias
export const initialFieldValues = EMPTY_WORKBOOK_FIELDS;

export const demoExampleChecks: Record<string, Record<number, boolean>> = {
  m1_check: {
    0: true,
    1: true,
    2: false,
    3: true
  },
  m4_check: {
    0: true,
    1: true,
    2: false,
    3: false
  },
  m5_check: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: false
  }
};

export const initialChecksValues: Record<string, Record<number, boolean>> = EMPTY_WORKBOOK_CHECKS;

/**
 * Detects if a stored dataset is the contaminated demo example that was mistakenly
 * initialized by older versions of the app, so it can be purged automatically.
 */
export const isContaminatedDemoFields = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  return (
    data.m0_cargo === 'Analista de Logística Pleno' ||
    data.m0_tempo === '2 anos e 4 meses' ||
    data.m0_empresa === 'Operador Logístico / Indústria' ||
    data.m0_alvo === 'Supervisor de Operações' ||
    data.m0_alvo === 'Supervisor de Operações Logísticas' ||
    (typeof data.m1_auto1 === 'string' && data.m1_auto1.includes('Analista que cuida de armazém')) ||
    (typeof data.m2_mci === 'string' && data.m2_mci.includes('tempo de permanência de carretas'))
  );
};

export const isContaminatedDemoChecks = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  const m1 = data.m1_check;
  if (m1 && m1[0] === true && m1[1] === true && m1[2] === false && m1[3] === true) {
    return true;
  }
  return false;
};

export const initialRemindersList: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'Postar áudio de 60S no grupo da turma',
    dueDate: 'Hoje, até 20h',
    type: 'exercicio',
    completed: false
  },
  {
    id: 'rem-2',
    title: 'Enviar Relatório de Impacto Mensal (Aula 3.2)',
    dueDate: 'Sexta-feira, 17h',
    type: 'exercicio',
    completed: false
  },
  {
    id: 'rem-3',
    title: 'Conversa de Carreira com gestor (Aula 5.2)',
    dueDate: '15 de Outubro',
    type: 'conversa',
    completed: false
  },
  {
    id: 'rem-4',
    title: 'Conduzir sessão de transferência de 30 min com par',
    dueDate: 'Próxima semana',
    type: 'mentoria',
    completed: true
  }
];

export const initialUserProfileData: UserProfile = {
  name: 'Carlos Eduardo',
  initials: 'CE',
  role: 'Aluno Método PONTE',
  email: 'carlos.aluno@metodoponte.com'
};
