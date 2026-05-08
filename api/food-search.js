const OPEN_FOOD_FACTS_BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';
const APP_USER_AGENT = 'NutriTrack/1.0 (nutritrack@example.com)';

// Reutilizar funções de food-lookup.js
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
    return null;
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
    return null;
  }

  return {
    name,
    brand: product.brands || undefined,
    category: 'other',
    servingSize: serving.size,
    servingUnit: serving.unit,
    servingLabel: serving.label,
    nutrients,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'method_not_allowed', message: 'Método não permitido.' });
    return;
  }

  const query = String(request.query.q || '');
  const lang = String(request.query.lang || 'pt');

  if (!query || query.trim().length < 3) {
    response.status(400).json({ error: 'invalid_query', message: 'Termo de busca muito curto.' });
    return;
  }

  try {
    const searchTerms = encodeURIComponent(query.trim());
    const url = `${OPEN_FOOD_FACTS_BASE_URL}?search_terms=${searchTerms}&json=1&page_size=5&lc=${lang}&fields=product_name,generic_name,brands,serving_size,nutriments,code`;
    
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
        error: 'search_failed',
        message: 'Não foi possível realizar a busca agora.',
      });
      return;
    }

    const payload = await offResponse.json();
    const products = payload.products || payload.items || [];

    const results = [];
    for (const product of products) {
      const normalized = normalizeProduct(product);
      if (normalized) {
        results.push(normalized);
      }
    }

    response.status(200).json({ results });
  } catch (error) {
    console.error('[food-search] search failed', error);
    response.status(500).json({
      error: 'unexpected_error',
      message: 'Erro inesperado ao buscar alimentos.',
    });
  }
}
