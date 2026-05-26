const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

const requestCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

const FOOD_CATEGORIES = new Set([
  'grain',
  'protein',
  'dairy',
  'vegetable',
  'fruit',
  'fat',
  'beverage',
  'snack',
  'other',
]);

const MEAL_PHOTO_PROMPT = `You are a nutrition estimation assistant for a food diary app. Analyze the provided image of a plated meal and identify visible foods and approximate amounts.

IMPORTANT RULES:
1. Return only foods that are reasonably visible in the image.
2. Estimate nutrients for the visible/eaten amount of each item, not per 100g.
3. Split distinct foods into separate items when practical (e.g., rice, beans, chicken, salad).
4. If an item is mixed and cannot be separated, return it as one dish.
5. Use Portuguese food names when possible.
6. Use conservative estimates and include a confidence value from 0 to 1.
7. If no food is visible, return an empty items array.

Return ONLY valid JSON with this exact schema, no additional text or markdown:
{
  "items": [
    {
      "name": "string",
      "category": "grain" | "protein" | "dairy" | "vegetable" | "fruit" | "fat" | "beverage" | "snack" | "other",
      "estimatedAmount": "string",
      "servingSize": number,
      "servingUnit": "g" | "ml" | "unit",
      "servingLabel": "string",
      "servings": number,
      "confidence": number,
      "nutrients": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "sugar": number,
        "fat": number,
        "saturatedFat": number,
        "fiber": number,
        "sodium": number
      }
    }
  ]
}

Field rules:
- estimatedAmount: human-readable estimate, e.g. "120 g", "1 fatia", "1 concha".
- servingSize: numeric amount represented by the servingLabel.
- servingUnit: use "g" for solid foods, "ml" for drinks/soups when appropriate, "unit" for pieces.
- servingLabel: concise label for the estimated visible amount.
- servings: normally 1 because nutrients should describe the estimated visible amount.
- calories in kcal; protein/carbs/sugar/fat/saturatedFat/fiber in grams; sodium in mg.`;

function normalizeBase64Image(imageBase64) {
  return imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
}

async function makeGeminiRequestWithRetry(payload, apiKey, maxRetries = 3) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const geminiResponse = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (geminiResponse.ok) return geminiResponse;

      if (geminiResponse.status === 429 && attempt < maxRetries) {
        const retryAfter = geminiResponse.headers.get('retry-after');
        let delay = Math.pow(2, attempt) * 1000;

        if (retryAfter) {
          delay = Math.max(delay, parseInt(retryAfter, 10) * 1000);
        }

        console.log(`[meal-photo-analysis] Rate limited (tentativa ${attempt}/${maxRetries}). Aguardando ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      return geminiResponse;
    } catch (error) {
      lastError = error;
      console.error(`[meal-photo-analysis] Erro na tentativa ${attempt}/${maxRetries}:`, error.message);

      if (attempt < maxRetries) {
        const delay = 1000 * attempt;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Falha após múltiplas tentativas');
}

function generateCacheKey(imageBase64, mimeType) {
  return `${mimeType}-${imageBase64.substring(0, 100)}`;
}

function getFromCache(cacheKey) {
  const cached = requestCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('[meal-photo-analysis] Retornando resultado do cache');
    return cached.data;
  }
  if (cached) requestCache.delete(cacheKey);
  return null;
}

function setInCache(cacheKey, data) {
  requestCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  if (requestCache.size > 100) {
    const firstKey = requestCache.keys().next().value;
    requestCache.delete(firstKey);
  }
}

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'method_not_allowed', message: 'Método não permitido.' });
    return;
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error('[meal-photo-analysis] GEMINI_API_KEY not configured');
    response.status(500).json({
      error: 'configuration_error',
      message: 'API de IA não configurada no servidor.',
    });
    return;
  }

  const { imageBase64, mimeType } = request.body;

  if (!imageBase64 || typeof imageBase64 !== 'string') {
    response.status(400).json({
      error: 'invalid_input',
      message: 'Imagem não fornecida ou inválida.',
    });
    return;
  }

  const imageMimeType = mimeType || 'image/jpeg';
  if (!/^image\/(jpeg|png|webp)$/.test(imageMimeType)) {
    response.status(400).json({
      error: 'invalid_format',
      message: 'Formato de imagem não suportado.',
    });
    return;
  }

  try {
    const cacheKey = generateCacheKey(imageBase64, imageMimeType);
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) return response.status(200).json(cachedResult);

    const geminiPayload = {
      contents: [
        {
          parts: [
            { text: MEAL_PHOTO_PROMPT },
            {
              inline_data: {
                mime_type: imageMimeType,
                data: normalizeBase64Image(imageBase64),
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    };

    const geminiResponse = await makeGeminiRequestWithRetry(geminiPayload, geminiApiKey, 3);

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      console.error('[meal-photo-analysis] Gemini API error:', errorData);

      if (geminiResponse.status === 400) {
        return response.status(400).json({
          error: 'invalid_request',
          message: 'Requisição inválida para API de IA.',
        });
      }
      if (geminiResponse.status === 429) {
        return response.status(429).json({
          error: 'rate_limited',
          message: 'Limite de requisições atingido. Tente novamente em alguns instantes.',
          retryAfter: geminiResponse.headers.get('retry-after'),
        });
      }
      if (geminiResponse.status === 403) {
        return response.status(403).json({
          error: 'forbidden',
          message: 'Acesso negado. Verifique suas credenciais da API.',
        });
      }

      return response.status(502).json({
        error: 'ai_service_error',
        message: 'Erro ao processar imagem com IA. Tente novamente.',
      });
    }

    const result = await geminiResponse.json();
    const candidates = result.candidates;
    if (!candidates || !candidates[0] || !candidates[0].content) {
      throw new Error('No valid response from AI');
    }

    const contentParts = candidates[0].content.parts;
    let jsonText = '';

    for (const part of contentParts) {
      if (part.text) jsonText += part.text;
    }

    jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    let extractedData;
    try {
      extractedData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('[meal-photo-analysis] Failed to parse AI response:', jsonText, parseError);
      return response.status(502).json({
        error: 'parse_failed',
        message: 'Não consegui interpretar a foto. Tente uma imagem mais nítida.',
      });
    }

    const normalizedData = {
      items: Array.isArray(extractedData.items)
        ? extractedData.items
            .map(normalizeItem)
            .filter(item => item.name)
        : [],
    };

    setInCache(cacheKey, normalizedData);
    response.status(200).json(normalizedData);
  } catch (error) {
    console.error('[meal-photo-analysis] Unexpected error:', error);
    response.status(500).json({
      error: 'unexpected_error',
      message: 'Erro inesperado ao processar imagem.',
    });
  }
}

function normalizeItem(item) {
  const servingUnit = ['g', 'ml', 'unit'].includes(item.servingUnit)
    ? item.servingUnit
    : 'g';
  const servingSize = Number(item.servingSize) || 1;
  const servingLabel = item.servingLabel || item.estimatedAmount || `${servingSize}${servingUnit}`;

  return {
    name: String(item.name || '').trim(),
    category: FOOD_CATEGORIES.has(item.category) ? item.category : 'other',
    estimatedAmount: item.estimatedAmount || servingLabel,
    servingSize,
    servingUnit,
    servingLabel,
    servings: positiveNumber(item.servings, 1),
    confidence: clamp(Number(item.confidence) || 0, 0, 1),
    nutrients: {
      calories: Math.round(Number(item.nutrients?.calories) || 0),
      protein: roundGram(Number(item.nutrients?.protein) || 0),
      carbs: roundGram(Number(item.nutrients?.carbs) || 0),
      sugar: roundGram(Number(item.nutrients?.sugar) || 0),
      fat: roundGram(Number(item.nutrients?.fat) || 0),
      saturatedFat: roundGram(Number(item.nutrients?.saturatedFat) || 0),
      fiber: roundGram(Number(item.nutrients?.fiber) || 0),
      sodium: Math.round(Number(item.nutrients?.sodium) || 0),
    },
  };
}

function positiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundGram(value) {
  return Number(value.toFixed(1));
}
