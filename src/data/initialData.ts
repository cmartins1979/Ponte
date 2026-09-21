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
    name: 'Estar Visível',
    subtitle: 'Relação com Decisores & Conversa de Carreira',
    color: '#0F2847',
    quote: 'Ser bom não basta. Ser visto sendo bom é o que promove.'
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

export const initialFieldValues: Record<string, string> = {
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

  m5_dec1_nome: 'Carlos Eduardo (Gerente de Operações)',
  m5_dec1_avalia: 'Reconhece o trabalho diário e já percebeu a mudança de postura com o relatório de impacto.',
  m5_dec2_nome: 'Roberto Antunes (Diretor de Supply Chain)',
  m5_dec2_avalia: 'Precisa conhecer mais os projetos de redução de custos que implementei.',
  m5_dec3_nome: 'Camila Rocha (Business Partner de RH)',
  m5_dec3_avalia: 'Tem mapeado o plano de sucessão para supervisão no próximo ciclo de avaliação.',
  m5_conv_data: '15 de Outubro',
  m5_conv_material: 'Mapa de Área em 1 Página, Relatório de Impacto Mensal e Diário de Bordo',
  m5_plano90: '1. Consolidar o MCI com redução do tempo de doca\n2. Realizar os 3 contatos mensais com a diretoria\n3. Finalizar o treinamento de transbordo da equipe'
};

export const initialChecksValues: Record<string, Record<number, boolean>> = {
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
  }
};

export const initialRemindersList: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'Postar áudio de 90s no grupo da turma',
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
    title: 'Conversa de Carreira com gestor (Aula 5.3)',
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
