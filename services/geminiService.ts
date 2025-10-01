import { GoogleGenAI } from "@google/genai";
import type { Tattoo, Artist } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and will be replaced by the environment-provided key.
  // In a real production scenario, the app would fail to start if the key is missing.
  console.warn("API_KEY is not set. Using a placeholder. The app will not function correctly without a valid key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'MISSING_API_KEY' });

export const generateTattooIdea = async (prompt: string): Promise<string> => {
  if (!API_KEY || API_KEY === 'MISSING_API_KEY') {
    return Promise.resolve("API 키가 없습니다. 이 기능을 사용하려면 유효한 Gemini API 키로 환경을 설정해주세요.");
  }
  try {
    const fullPrompt = `당신은 창의적인 타투 콘셉트 아티스트입니다. 사용자가 "${prompt}" 라고 묘사하는 타투를 원합니다.
    이 아이디어를 생생하고 자세하게 설명해주세요. 시각적인 요소, 구체적인 아트 스타일(예: 네오 트래디셔널, 블랙워크, 수채화, 일러스트 등)을 제안하고, 신체 부위 추천도 해주세요.
    결과는 매력적이고 상상력이 풍부한 하나의 문단으로, 반드시 한국어로 작성해주세요. 마크다운 형식은 사용하지 마세요.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating tattoo idea:", error);
    return "죄송합니다, 지금은 아이디어를 생성할 수 없습니다. 나중에 다시 시도해주세요.";
  }
};

export const generateAiImage = async (prompt: string): Promise<string> => {
  if (!API_KEY || API_KEY === 'MISSING_API_KEY') {
    throw new Error("API 키가 없습니다. 이 기능을 사용하려면 유효한 Gemini API 키로 환경을 설정해주세요.");
  }
  try {
    const fullPrompt = `A high-resolution, professional tattoo design flash sheet. The main subject is: "${prompt}". The style should be clean, clear line work, suitable for a tattoo stencil. The background should be plain white. The image should look like a piece of tattoo flash art.`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating AI image:", error);
    throw new Error("죄송합니다, 지금은 이미지를 생성할 수 없습니다. 나중에 다시 시도해주세요.");
  }
};