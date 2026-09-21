import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

function getGenAIClient(): GoogleGenAI | null {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
  const apiKey = (metaEnv && metaEnv.VITE_GEMINI_API_KEY) || (typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : '');
  if (!apiKey) {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generatePonteAdvice(
  moduleName: string,
  userFieldContent: string,
  targetRole?: string
): Promise<{
  quote: string;
  feedback: string;
  improvementTip: string;
  suggestedAction: string;
}> {
  const client = getGenAIClient();
  
  if (!client) {
    return {
      quote: `No pilar ${moduleName}: "Produtividade para o Resultado. Tudo que você faz deve visar geração de resultado para o negócio."`,
      feedback: `Excelente avanço no módulo ${moduleName}. Suas respostas demonstram direcionamento para o cargo-alvo de ${targetRole || 'liderança'}.`,
      improvementTip: 'Lembre-se sempre de expressar seus resultados nas 4 moedas: R$, %, Tempo economizado ou Risco eliminado.',
      suggestedAction: 'Refine suas notas incluindo números concretos e agende uma conversa rápida de alinhamento com seu gestor.'
    };
  }

  try {
    const prompt = `Você é o mentor virtual especialista no MÉTODO P.O.N.T.E de Carlos E R Martins (Postura, Operação, Números, Transferir, Estar Visível).
O aluno está no Módulo: "${moduleName}".
Cargo-alvo do aluno: "${targetRole || 'Cargo de liderança/supervisão'}".
Conteúdo atual preenchido pelo aluno no diário:
"${userFieldContent || 'O aluno está preenchendo o diagnóstico do módulo.'}"

Com base estritamente na filosofia do Método PONTE ("A cabeça muda antes do crachá", "Impacto não visto é impacto perdido", as 4 moedas: R$, %, tempo, risco; transbordo e visibilidade com decisores):
Gere um objeto JSON estrito com os campos:
{
  "quote": "Uma frase marcante e direta do Método PONTE adequada a este pilar",
  "feedback": "Um feedback prático de mentor (2 a 3 frases) avaliando o texto do aluno",
  "improvementTip": "Uma dica afiada para elevar a postura ou quantificar entregas na moeda certa",
  "suggestedAction": "Uma ação imediata para esta semana (ex: conversar com decisor, documentar rotina, reescrever erro)"
}
Responda exclusivamente o JSON em Português do Brasil.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    return {
      quote: parsed.quote || 'A cabeça muda antes do crachá.',
      feedback: parsed.feedback || 'Bom progresso no diário de travessia.',
      improvementTip: parsed.improvementTip || 'Quantifique suas entregas em R$, %, tempo ou risco.',
      suggestedAction: parsed.suggestedAction || 'Poste seu compromisso no grupo e execute a próxima aula.'
    };
  } catch (err) {
    console.error('Error generating PONTE advice with Gemini:', err);
    return {
      quote: 'Se você não achar que está pronto, ninguém mais vai achar.',
      feedback: 'Continue preenchendo os campos deste módulo com franqueza e foco em resultados.',
      improvementTip: 'Sempre responda às perguntas pensando em como um supervisor descreveria a situação.',
      suggestedAction: 'Aplique o método das 2 perguntas na próxima interação com a equipe.'
    };
  }
}
