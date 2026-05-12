const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

const OCR_PROMPT = `You are a nutrition label OCR assistant. Analyze the provided image of a nutrition facts table and extract the nutritional information.

IMPORTANT RULES:
1. Identify the serving size described on the label (e.g., "1 scoop (30g)", "1 cup (240ml)", "per 100g")
2. Extract ALL nutrient values FOR THAT SERVING SIZE, NOT per 100g
3. If the label shows values for both "per serving" and "per 100g", use the "per serving" column
4. Return null for fields that cannot be found (except nutrients which should be 0)
5. For servingUnit, use: "g" for grams, "ml" for milliliters, "unit" for pieces/units

Return ONLY valid JSON with this exact schema, no additional text or markdown:
{
  "name": "string or null",
  "servingSize": number,
  "servingUnit": "g" | "ml" | "unit",
  "servingLabel": "string",
  "calories": number,
  "protein": number,
  "carbs": number,
  "sugar": number,
  "fat": number,
  "saturatedFat": number,
  "fiber": number,
  "sodium": number
}

Field descriptions:
- name: product name if visible on the label, otherwise null
- servingSize: numeric value of serving size (e.g., 30 for "30g")
- servingUnit: unit of serving ("g", "ml", or "unit")
- servingLabel: full serving description as written (e.g., "1 scoop (30g)", "1 xícara (240ml)")
- calories: in kcal
- protein: in grams
- carbs: total carbohydrates in grams
- sugar: in grams
- fat: total fat in grams
- saturatedFat: saturated fat in grams
- fiber: in grams
- sodium: in mg (convert from g if needed)`;

function normalizeBase64Image(imageBase64) {
  return imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
}

export default async function handler(request, response) {
  // Set CORS headers
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
    console.error('[nutrition-ocr] GEMINI_API_KEY not configured');
    response.status(500).json({
      error: 'configuration_error',
      message: 'API de IA não configurada no servidor.'
    });
    return;
  }

  const { imageBase64, mimeType } = request.body;

  if (!imageBase64 || typeof imageBase64 !== 'string') {
    response.status(400).json({
      error: 'invalid_input',
      message: 'Imagem não fornecida ou inválida.'
    });
    return;
  }

  const imageMimeType = mimeType || 'image/jpeg';
  if (!/^image\/(jpeg|png|webp)$/.test(imageMimeType)) {
    response.status(400).json({
      error: 'invalid_format',
      message: 'Formato de imagem não suportado.'
    });
    return;
  }

  try {
    const geminiPayload = {
      contents: [{
        parts: [
          { text: OCR_PROMPT },
          {
            inline_data: {
              mime_type: imageMimeType,
              data: normalizeBase64Image(imageBase64)
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json'
      }
    };

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      console.error('[nutrition-ocr] Gemini API error:', errorData);

      if (geminiResponse.status === 400) {
        response.status(400).json({
          error: 'invalid_request',
          message: 'Requisição inválida para API de IA.'
        });
      } else if (geminiResponse.status === 429) {
        response.status(429).json({
          error: 'rate_limited',
          message: 'Limite de requisições atingido. Tente novamente em instantes.'
        });
      } else {
        response.status(502).json({
          error: 'ai_service_error',
          message: 'Erro ao processar imagem com IA. Tente novamente.'
        });
      }
      return;
    }

    const result = await geminiResponse.json();

    // Extract text from Gemini response
    const candidates = result.candidates;
    if (!candidates || !candidates[0] || !candidates[0].content) {
      throw new Error('No valid response from AI');
    }

    const contentParts = candidates[0].content.parts;
    let jsonText = '';

    for (const part of contentParts) {
      if (part.text) {
        jsonText += part.text;
      }
    }

    // Clean up the response - remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    // Parse the JSON response
    let extractedData;
    try {
      extractedData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('[nutrition-ocr] Failed to parse AI response:', jsonText, parseError);
      response.status(502).json({
        error: 'parse_failed',
        message: 'Não consegui interpretar a tabela. Tente uma foto mais nítida.'
      });
      return;
    }

    // Validate and normalize the extracted data
    const normalizedData = {
      name: extractedData.name ?? null,
      servingSize: Number(extractedData.servingSize) || 0,
      servingUnit: ['g', 'ml', 'unit'].includes(extractedData.servingUnit) ? extractedData.servingUnit : 'g',
      servingLabel: extractedData.servingLabel || `${extractedData.servingSize}${extractedData.servingUnit}` || '100g',
      calories: Math.round(Number(extractedData.calories) || 0),
      protein: roundGram(Number(extractedData.protein) || 0),
      carbs: roundGram(Number(extractedData.carbs) || 0),
      sugar: roundGram(Number(extractedData.sugar) || 0),
      fat: roundGram(Number(extractedData.fat) || 0),
      saturatedFat: roundGram(Number(extractedData.saturatedFat) || 0),
      fiber: roundGram(Number(extractedData.fiber) || 0),
      sodium: Math.round(Number(extractedData.sodium) || 0),
    };

    response.status(200).json(normalizedData);

  } catch (error) {
    console.error('[nutrition-ocr] Unexpected error:', error);
    response.status(500).json({
      error: 'unexpected_error',
      message: 'Erro inesperado ao processar imagem.'
    });
  }
}

function roundGram(value) {
  return Number(value.toFixed(1));
}
