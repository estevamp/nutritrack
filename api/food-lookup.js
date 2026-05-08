const OPEN_FOOD_FACTS_BASE_URL = 'https://world.openfoodfacts.org/api/v2/product';
const APP_USER_AGENT = 'NutriTrack/1.0 (nutritrack@example.com)';

const requestedFields = [
  'code',
  'product_name',
  'generic_name',
  'brands',
  'serving_size',
  'nutriments',
].join(',');

function toNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return undefined;

  const normalized = value.replace(',', '.').match(/\d+(\.\d+)?/);
  if (!normalized) return undefined;

  const parsed = Number(normalized[0]);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseServing(servingSize) {
  const label = servingSize || '100g';
  const lower = label.toLowerCase();
  const size = toNumber(label) ?? 100;
  const unit = lower.includes('ml') ? 'ml' : 'g';

  return {
    label,
    size,
    unit,
  };
}

function nutrientValue(nutriments, key, servingSize) {
  const servingValue = toNumber(nutriments[`${key}_serving`]);
  if (servingValue !== undefined) return servingValue;

  const per100Value = toNumber(nutriments[`${key}_100g`]);
  if (per100Value !== undefined) return (per100Value * servingSize) / 100;

  return 0;
}

function sodiumMg(nutriments, servingSize) {
  const sodium = nutrientValue(nutriments, 'sodium', servingSize);
  if (sodium > 0) return sodium * 1000;

  const salt = nutrientValue(nutriments, 'salt', servingSize);
  if (salt > 0) return (salt / 2.5) * 1000;

  return 0;
}

function roundGram(value) {
  return Number(value.toFixed(1));
}

function normalizeProduct(product) {
  const nutriments = product.nutriments || {};
  const serving = parseServing(product.serving_size);
  const name = product.product_name || product.generic_name;

  if (!name) {
    return {
      error: 'missing_product_name',
      message: 'Produto encontrado, mas sem nome suficiente para cadastrar.',
    };
  }

  const nutrients = {
    calories: Math.round(nutrientValue(nutriments, 'energy-kcal', serving.size)),
    protein: roundGram(nutrientValue(nutriments, 'proteins', serving.size)),
    carbs: roundGram(nutrientValue(nutriments, 'carbohydrates', serving.size)),
    sugar: roundGram(nutrientValue(nutriments, 'sugars', serving.size)),
    fat: roundGram(nutrientValue(nutriments, 'fat', serving.size)),
    saturatedFat: roundGram(nutrientValue(nutriments, 'saturated-fat', serving.size)),
    fiber: roundGram(nutrientValue(nutriments, 'fiber', serving.size)),
    sodium: Math.round(sodiumMg(nutriments, serving.size)),
  };

  const hasNutrition = Object.values(nutrients).some((value) => value > 0);
  if (!hasNutrition) {
    return {
      error: 'missing_nutrition',
      message: 'Produto encontrado, mas sem tabela nutricional suficiente.',
    };
  }

  return {
    food: {
      name,
      brand: product.brands || undefined,
      category: 'other',
      servingSize: serving.size,
      servingUnit: serving.unit,
      servingLabel: serving.label,
      nutrients,
    },
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'method_not_allowed', message: 'Método não permitido.' });
    return;
  }

  const code = String(request.query.code || '').replace(/\D/g, '');
  if (!/^\d{8,14}$/.test(code)) {
    response.status(400).json({ error: 'invalid_code', message: 'Código inválido.' });
    return;
  }

  try {
    const url = `${OPEN_FOOD_FACTS_BASE_URL}/${code}.json?fields=${encodeURIComponent(requestedFields)}`;
    const offResponse = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': APP_USER_AGENT,
      },
    });

    if (offResponse.status === 429 || offResponse.status === 503) {
      response.status(429).json({
        error: 'rate_limited',
        message: 'A consulta externa está temporariamente limitada. Tente novamente em instantes.',
      });
      return;
    }

    if (!offResponse.ok) {
      response.status(502).json({
        error: 'lookup_failed',
        message: 'Não foi possível consultar a tabela nutricional agora.',
      });
      return;
    }

    const payload = await offResponse.json();
    if (payload.status !== 1 || !payload.product) {
      response.status(404).json({ error: 'not_found', message: 'Produto não encontrado.' });
      return;
    }

    const normalized = normalizeProduct(payload.product);
    if (normalized.error) {
      response.status(422).json(normalized);
      return;
    }

    response.status(200).json({ code, ...normalized });
  } catch (error) {
    console.error('[food-lookup] lookup failed', error);
    response.status(500).json({
      error: 'unexpected_error',
      message: 'Erro inesperado ao buscar alimento.',
    });
  }
}
