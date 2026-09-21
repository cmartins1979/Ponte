import { jsPDF } from 'jspdf';
import { UserProfile } from '../types';
import { PONTE_MODULES } from '../data/initialData';

interface ExportPdfOptions {
  moduleId: number;
  fields: Record<string, string>;
  checks: Record<string, Record<number, boolean>>;
  user: UserProfile;
}

export function exportModuleToPdf({ moduleId, fields, checks, user }: ExportPdfOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  const f = (key: string) => (fields[key] || '').trim();
  const currentModule = PONTE_MODULES.find((m) => m.id === moduleId) || PONTE_MODULES[0];

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      drawFooter();
      doc.addPage();
      y = margin;
      drawHeaderMini();
    }
  };

  const drawHeader = () => {
    // Top banner
    doc.setFillColor(11, 32, 70); // #0B2046
    doc.rect(margin, y, contentWidth, 24, 'F');

    // Title text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('MENTOR DE LOGÍSTICA · CARLOS MARTINS', margin + 6, y + 8);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(186, 230, 253); // Sky-200
    doc.text('MÉTODO P.O.N.T.E — DIÁRIO OFICIAL DE TRAVESSIA', margin + 6, y + 14);

    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225); // Slate-300
    const nowStr = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    doc.text(`Emissão: ${nowStr}`, pageWidth - margin - 6, y + 14, { align: 'right' });

    y += 28;

    // Student & Target Info Card
    doc.setFillColor(248, 250, 252); // Slate-50
    doc.setDrawColor(203, 213, 225); // Slate-300
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text('ALUNO(A):', margin + 4, y + 6);
    doc.text('MÓDULO / PILAR:', margin + 70, y + 6);
    doc.text('TRAJETÓRIA:', margin + 4, y + 15);
    doc.text('EMPRESA / META:', margin + 70, y + 15);

    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text(user.name || 'Aluno', margin + 4, y + 10);

    const modLabel =
      currentModule.letter !== '—' && currentModule.letter !== '★'
        ? `[${currentModule.letter}] ${currentModule.name}`
        : currentModule.name;
    doc.setTextColor(2, 132, 199); // Sky-600
    doc.setFont('helvetica', 'bold');
    doc.text(modLabel, margin + 70, y + 10);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    const roleCurrent = f('m0_cargo') || 'Cargo Atual';
    const roleTarget = f('m0_alvo') || 'Cargo-Alvo';
    doc.text(`${roleCurrent}  →  ${roleTarget}`, margin + 4, y + 19);

    const empStr = f('m0_empresa') || 'Não informada';
    const dataStr = f('m0_data') || 'A definir';
    doc.text(`${empStr} · Prazo: ${dataStr}`, margin + 70, y + 19);

    y += 28;
  };

  const drawHeaderMini = () => {
    doc.setFillColor(11, 32, 70);
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(
      `MÉTODO P.O.N.T.E — ${currentModule.name.toUpperCase()} · ${user.name.toUpperCase()}`,
      margin + 4,
      y + 5.5
    );
    y += 12;
  };

  const drawFooter = () => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(
      '"Se você não achar que está pronto, ninguém mais vai achar." — Carlos Martins',
      margin,
      pageHeight - 8
    );
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Página ${doc.getNumberOfPages()}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' }
    );
  };

  const addSectionTitle = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(11, 32, 70);
    doc.text(title, margin, y);
    doc.setDrawColor(11, 32, 70);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 2, margin + contentWidth, y + 2);
    y += 7;
  };

  const addFieldBox = (label: string, value: string, hint?: string) => {
    const displayVal = value ? value : '— (Não preenchido)';
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85); // Slate-700

    const splitLabel = doc.splitTextToSize(label, contentWidth - 8);
    const labelHeight = splitLabel.length * 4;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const splitVal = doc.splitTextToSize(displayVal, contentWidth - 8);
    const valHeight = splitVal.length * 4.2;

    const totalHeight = labelHeight + valHeight + (hint ? 5 : 0) + 6;
    checkPageBreak(totalHeight + 4);

    // Card background
    doc.setFillColor(value ? 255 : 248, value ? 255 : 250, value ? 255 : 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, totalHeight, 1.5, 1.5, 'FD');

    let innerY = y + 4;

    // Label
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(splitLabel, margin + 4, innerY);
    innerY += labelHeight;

    if (hint) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(148, 163, 184);
      doc.text(hint, margin + 4, innerY);
      innerY += 4.5;
    }

    // Value
    doc.setFontSize(8.5);
    doc.setFont('helvetica', value ? 'normal' : 'italic');
    doc.setTextColor(value ? 15 : 148, value ? 23 : 163, value ? 42 : 184);
    doc.text(splitVal, margin + 4, innerY);

    y += totalHeight + 3.5;
  };

  // Start Drawing
  drawHeader();

  // Content rendering based on Module
  if (moduleId === 0) {
    addSectionTitle('1. Diagnóstico do Ponto de Partida');
    addFieldBox('Cargo Atual', f('m0_cargo'));
    addFieldBox('Tempo na Função Atual', f('m0_tempo'));
    addFieldBox('Empresa Atual', f('m0_empresa'));
    addFieldBox('Cargo-Alvo Desejado', f('m0_alvo'), 'Ex: Supervisor de Operações');
    addFieldBox('Data / Prazo da Meta', f('m0_data'), 'Prazo estimado para a transição');

    // Public commitment callout
    checkPageBreak(24);
    doc.setFillColor(240, 249, 255); // Sky-50
    doc.setDrawColor(186, 230, 253); // Sky-200
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(3, 105, 161);
    doc.text('MEU COMPROMISSO PÚBLICO:', margin + 5, y + 6);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(12, 74, 110);
    const commitmentText = `Sou ${f('m0_cargo') || '[meu cargo]'} na ${f('m0_empresa') || '[empresa]'}. Quero ser ${f('m0_alvo') || '[cargo-alvo]'} até ${f('m0_data') || '[data]'}.`;
    doc.text(doc.splitTextToSize(`"${commitmentText}"`, contentWidth - 10), margin + 5, y + 12);
    y += 25;
  } else if (moduleId === 1) {
    addSectionTitle('Pilar P — Postura: O Supervisor Invisível');
    addFieldBox('Aula 1.1 — Como sou descrito pelo meu gestor?', f('m1_descricao'), 'Reflexão sobre percepção externa atual');
    addFieldBox('Aula 1.2 — Pesquisa de Percepção (3 Perguntas)', f('m1_pesquisa'), '1. O que faço bem? 2. Onde melhorar? 3. Como me posiciono?');
    addFieldBox('Aula 1.3 — Gestão de Percepção: 3 Sinais emitidos', f('m1_percepcao'), 'Pontualidade, tom de voz, organização, calma');
    addFieldBox('Aula 1.4 — Autoimagem: Como me descrevo hoje (Operacional)', f('m1_auto1'));
    addFieldBox('Aula 1.4 — Autoimagem: Como descrevo no Cargo-Alvo (Tático)', f('m1_auto2'));
  } else if (moduleId === 2) {
    addSectionTitle('Pilar O — Operação: Fazer o Básico Bem Feito');
    addFieldBox('Aula 2.1 — Meta Crucialmente Importante (MCI)', f('m2_mci'), 'De [onde estamos] para [onde queremos chegar] até [quando]');

    addSectionTitle('Aula 2.2 — Entregas Reescritas nas 4 Moedas');
    addFieldBox('Entrega 1 (Tempo, Custo, Qualidade, Pessoas)', f('m2_ent1b'), `Original: ${f('m2_ent1a') || 'Não informada'}`);
    addFieldBox('Entrega 2 (Tempo, Custo, Qualidade, Pessoas)', f('m2_ent2b'), `Original: ${f('m2_ent2a') || 'Não informada'}`);
    addFieldBox('Entrega 3 (Tempo, Custo, Qualidade, Pessoas)', f('m2_ent3b'), `Original: ${f('m2_ent3a') || 'Não informada'}`);

    addFieldBox('Aula 2.3 — As 3 Rotinas Mais Críticas', `${f('m2_rot1')}\n${f('m2_rot2')}\n${f('m2_rot3')}`.trim());
    addFieldBox('Aula 2.4 — Matriz Urgente vs Importante', f('m2_matriz'));
  } else if (moduleId === 3) {
    addSectionTitle('Pilar N — Números: O Idioma da Liderança');
    addFieldBox('Mês de Referência do Relatório', f('m3_mes'));
    addFieldBox('Resultado 1 (Com valor antes e depois)', f('m3_r1'));
    addFieldBox('Resultado 2 (Com valor antes e depois)', f('m3_r2'));
    addFieldBox('Resultado 3 (Com valor antes e depois)', f('m3_r3'));
    addFieldBox('Problema Resolvido e Impacto Mensurado', f('m3_prob'));
    addFieldBox('Reação e Feedback do Gestor', f('m3_reacao'));
    addFieldBox('Indicadores-Chave Monitorados', f('m3_indicadores'));
  } else if (moduleId === 4) {
    addSectionTitle('Pilar T — Transferir: Quem Não Delega Não Sobe');
    addFieldBox('Aula 4.1 — Rotina Crítica Documentada (POP / Checklist)', f('m4_doc_rotina'));
    addFieldBox('Aula 4.2 — Sessão de Transbordo (Pessoa Treinada e Data)', `${f('m4_sessao_pessoa')} — Data: ${f('m4_sessao_data')}`.trim());
    addFieldBox('Aula 4.3 — Treinamento Proposto para a Operação', f('m4_treino_tema'));
  } else if (moduleId === 5) {
    addSectionTitle('Pilar E — Estar Visível: A Conversa de Carreira');
    addFieldBox('Data da Conversa de Carreira', f('m5_conv_data'));
    addFieldBox('Metas e Alinhamentos Acordados', f('m5_conv_metas'));
    addFieldBox('Prazo Estipulado para Revisita', f('m5_conv_prazo'));
    addFieldBox('Cenário Identificado', f('m5_cenario'), 'Promissor, Em avaliação ou Desafiador');
    addFieldBox('Meu Plano de Ação de 90 Dias', f('m5_plano90'), 'Ações planejadas para Mês 1, Mês 2 e Mês 3');
  } else if (moduleId === 6) {
    addSectionTitle('Portfólio Consolidado da Travessia PONTE');
    addFieldBox('Ponto de Partida e Trajetória', `Sou ${f('m0_cargo') || '...'} na ${f('m0_empresa') || '...'}. Meta: ${f('m0_alvo') || '...'} até ${f('m0_data') || '...'}`);
    addFieldBox('P — Postura', `Como me descrevo hoje:\n${f('m1_auto1') || '—'}\n\nComo um supervisor descreve:\n${f('m1_auto2') || '—'}`);
    addFieldBox('O — Operação (MCI & Entregas)', `MCI: ${f('m2_mci') || '—'}\n\nEntregas: ${f('m2_ent1b') || '—'}`);
    addFieldBox('N — Números (Relatório de Impacto)', `Resultados:\n1. ${f('m3_r1') || '—'}\n2. ${f('m3_r2') || '—'}\n3. ${f('m3_r3') || '—'}\nProblema resolvido: ${f('m3_prob') || '—'}`);
    addFieldBox('T — Transferir (Delegação)', `Rotina documentada: ${f('m4_doc_rotina') || '—'}\nPessoa treinada: ${f('m4_sessao_pessoa') || '—'}`);
    addFieldBox('E — Estar Visível (Conversa & Plano de 90 Dias)', `Data: ${f('m5_conv_data') || '—'}\nMetas: ${f('m5_conv_metas') || '—'}\nCenário: ${f('m5_cenario') || '—'}\n\nPlano de 90 Dias:\n${f('m5_plano90') || '—'}`);
  }

  // Draw footer on last page
  drawFooter();

  // Clean filename: Ex: Diario_PONTE_Pilar_P_Postura_Carlos.pdf
  const cleanMod = currentModule.name.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanUser = (user.name || 'aluno').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Diario_PONTE_${cleanMod}_${cleanUser}.pdf`;

  doc.save(filename);
}

export function exportFullWorkbookToPdf({ fields, checks, user }: Omit<ExportPdfOptions, 'moduleId'>): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;
  const f = (key: string) => (fields[key] || '').trim();

  const drawFooter = () => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(
      '"Se você não achar que está pronto, ninguém mais vai achar." — Carlos Martins',
      margin,
      pageHeight - 8
    );
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Página ${doc.getNumberOfPages()}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' }
    );
  };

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      drawFooter();
      doc.addPage();
      y = margin;
      // mini header on subsequent pages
      doc.setFillColor(11, 32, 70);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(`DIÁRIO COMPLETO DE TRAVESSIA PONTE · ALUNO: ${user.name.toUpperCase()}`, margin + 4, y + 4.8);
      y += 11;
    }
  };

  const addSectionTitle = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(11, 32, 70);
    doc.text(title, margin, y);
    doc.setDrawColor(11, 32, 70);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 2, margin + contentWidth, y + 2);
    y += 7;
  };

  const addFieldBox = (label: string, value: string, hint?: string) => {
    const displayVal = value ? value : '— (Não preenchido)';
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    const splitLabel = doc.splitTextToSize(label, contentWidth - 8);
    const labelHeight = splitLabel.length * 4;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const splitVal = doc.splitTextToSize(displayVal, contentWidth - 8);
    const valHeight = splitVal.length * 4.2;

    const totalHeight = labelHeight + valHeight + (hint ? 5 : 0) + 6;
    checkPageBreak(totalHeight + 4);

    doc.setFillColor(value ? 255 : 248, value ? 255 : 250, value ? 255 : 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, totalHeight, 1.5, 1.5, 'FD');

    let innerY = y + 4;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(splitLabel, margin + 4, innerY);
    innerY += labelHeight;

    if (hint) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(148, 163, 184);
      doc.text(hint, margin + 4, innerY);
      innerY += 4.5;
    }

    doc.setFontSize(8.5);
    doc.setFont('helvetica', value ? 'normal' : 'italic');
    doc.setTextColor(value ? 15 : 148, value ? 23 : 163, value ? 42 : 184);
    doc.text(splitVal, margin + 4, innerY);

    y += totalHeight + 3.5;
  };

  // COVER / HEADER
  doc.setFillColor(11, 32, 70);
  doc.rect(margin, y, contentWidth, 26, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('MENTOR DE LOGÍSTICA · CARLOS MARTINS', margin + 6, y + 9);
  doc.setFontSize(9.5);
  doc.setTextColor(186, 230, 253);
  doc.text('MÉTODO P.O.N.T.E — WORKBOOK COMPLETO DE TRAVESSIA', margin + 6, y + 16);
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(
    `Emissão: ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}`,
    pageWidth - margin - 6,
    y + 16,
    { align: 'right' }
  );

  y += 30;

  // Student summary
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('ALUNO(A):', margin + 4, y + 6);
  doc.text('E-MAIL:', margin + 70, y + 6);
  doc.text('CARGO ATUAL → CARGO-ALVO:', margin + 4, y + 15);
  doc.text('EMPRESA / META:', margin + 70, y + 15);

  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(user.name, margin + 4, y + 10);
  doc.text(user.email, margin + 70, y + 10);
  doc.text(`${f('m0_cargo') || 'Analista'}  →  ${f('m0_alvo') || 'Supervisor'}`, margin + 4, y + 19);
  doc.text(`${f('m0_empresa') || '—'} · Prazo: ${f('m0_data') || '—'}`, margin + 70, y + 19);

  y += 30;

  // Módulos
  addSectionTitle('1. Ponto de Partida');
  addFieldBox('Cargo Atual & Tempo', `${f('m0_cargo')} (Tempo: ${f('m0_tempo') || '—'})`);
  addFieldBox('Empresa & Meta', `Empresa: ${f('m0_empresa')} | Alvo: ${f('m0_alvo')} | Prazo: ${f('m0_data')}`);
  addFieldBox('Compromisso Público', `Sou ${f('m0_cargo')} na ${f('m0_empresa')}. Quero ser ${f('m0_alvo')} até ${f('m0_data')}.`);

  addSectionTitle('2. Pilar P — Postura');
  addFieldBox('Aula 1.1 — Como sou visto pelo gestor', f('m1_descricao'));
  addFieldBox('Aula 1.2 — Pesquisa de 3 Perguntas', f('m1_pesquisa'));
  addFieldBox('Aula 1.3 — Gestão de Percepção (3 Sinais)', f('m1_percepcao'));
  addFieldBox('Aula 1.4 — Autoimagem Operacional vs Tática', `Hoje: ${f('m1_auto1')}\n\nComo Supervisor: ${f('m1_auto2')}`);

  addSectionTitle('3. Pilar O — Operação');
  addFieldBox('Meta Crucialmente Importante (MCI)', f('m2_mci'));
  addFieldBox('Entrega 1 nas 4 Moedas', f('m2_ent1b'));
  addFieldBox('Entrega 2 nas 4 Moedas', f('m2_ent2b'));
  addFieldBox('Entrega 3 nas 4 Moedas', f('m2_ent3b'));
  addFieldBox('Rotinas Críticas & Matriz Urgente/Importante', `Rotinas:\n${f('m2_rot1')}\n${f('m2_rot2')}\n${f('m2_rot3')}\n\nMatriz: ${f('m2_matriz')}`);

  addSectionTitle('4. Pilar N — Números');
  addFieldBox('Relatório Mensal de Impacto', `Mês: ${f('m3_mes')}\n1. ${f('m3_r1')}\n2. ${f('m3_r2')}\n3. ${f('m3_r3')}`);
  addFieldBox('Problema Resolvido', f('m3_prob'));
  addFieldBox('Feedback do Gestor', f('m3_reacao'));
  addFieldBox('Indicadores Acompanhados', f('m3_indicadores'));

  addSectionTitle('5. Pilar T — Transferir');
  addFieldBox('Rotina Documentada (POP)', f('m4_doc_rotina'));
  addFieldBox('Pessoa Treinada & Data', `${f('m4_sessao_pessoa')} (Data: ${f('m4_sessao_data')})`);
  addFieldBox('Treinamento Proposto', f('m4_treino_tema'));

  addSectionTitle('6. Pilar E — Estar Visível');
  addFieldBox('Conversa de Carreira', `Data: ${f('m5_conv_data')}\nMetas: ${f('m5_conv_metas')}\nPrazo: ${f('m5_conv_prazo')}\nCenário: ${f('m5_cenario')}`);
  addFieldBox('Plano de Ação de 90 Dias', f('m5_plano90'));

  drawFooter();

  const cleanUser = (user.name || 'aluno').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Diario_Completo_PONTE_${cleanUser}.pdf`);
}
