import { GoogleGenAI } from "@google/genai";

type GenerateRoastInput = {
  photos: string[];
  bio: string;
  name: string;
};

const client = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const PROMPT_TEMPLATE = `
Você é “RoastMyProfile”, um coach de perfis de dating com humor ácido (70%) e conselhos construtivos (30%).

MISSAO: analisar o perfil fornecido, fazer piadas afiadas, apontar problemas reais e entregar melhorias acionáveis.

INSTRUÇÕES IMPORTANTES:
- Escreva em português do Brasil, com gírias leves e tom divertido.
- Nunca invente fatos: se algum campo estiver vazio, diga isso com humor.
- Evite comentários sobre corpo, raça, gênero ou orientação. Mire em escolhas de estilo, cenário, esforço, vibe.
- Limite a resposta a no máximo 350 palavras.

FORMATO OBRIGATÓRIO DA RESPOSTA:
1. **ROAST DA FOTO (2-3 frases)**
   - Critique iluminação, pose, expressão, roupa, cenário. Use humor + observações concretas.

2. **ROAST DA BIO (2-3 frases)**
   - Destrua clichês, falta de autenticidade ou exageros com sarcasmo esperto.

3. **SCORE (0-100) + JUSTIFICATIVA**
   - Número inteiro entre 0 (desastre) e 100 (lenda do dating).
   - Uma frase forte combinando elogio e alfinetada.

4. **TOP 3 AÇÕES PRIORITÁRIAS**
  - Lista numerada (1-3) com passos curtos e acionáveis para melhorar foto e bio.
   - Cada item deve manter a graça, mas entregar um upgrade específico.

DADOS DO PERFIL:
{PROFILE_DATA}

Agora gere a resposta seguindo todas as regras.`;

export const generateRoast = async ({
  bio,
  name,
  photos,
}: GenerateRoastInput) => {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not set");
  }

  //photos is an array of urls strings
  const imageParts = await Promise.all(
    photos.map(async url => {
      const arrayBuffer = await fetch(url).then(res => res.arrayBuffer());
      const buffer = Buffer.from(new Uint8Array(arrayBuffer));
      return {
        inlineData: {
          mimeType: "image/jpeg", // Adjust mimeType based on your image type
          data: buffer.toString('base64'),
        },
      };
    })
  );

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      ...imageParts,
      {
        text: PROMPT_TEMPLATE.replace(
          "{PROFILE_DATA}",
          `Aqui estão algumas informações sobre a pessoa: Nome: ${name}. Biografia: ${bio}`
        ),
      },
    ],
  });

  return response;
};
