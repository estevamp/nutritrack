const OPEN_FOOD_FACTS_BASE_URL =
  'https://world.openfoodfacts.org/cgi/search.pl';

const APP_USER_AGENT =
  'NutriTrack - Calorie App - https://nutritrack-silk.vercel.app - estevamp@gmail.com';

// =========================
// Helpers
// =========================

function toNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = value.replace(',', '.').match(/\d+(\.\d+)?/);

  if (!normalized) {
    return undefined;
  }

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
  const servingValue = toNumber(nutriments?.[`${key}_serving`]);

  if (servingValue !== undefined) {
    return servingValue;
  }

  const per100Value = toNumber(nutriments?.[`${key}_100g`]);

  if (per100Value !== undefined) {
    return (per100Value * servingSize) / 100;
  }

  return 0;
}

function sodiumMg(nutriments, servingSize) {
  const sodium = nutrientValue(nutriments, 'sodium', servingSize);

  if (sodium > 0) {
    return sodium * 1000;
  }

  const salt = nutrientValue(nutriments, 'salt', servingSize);

  if (salt > 0) {
    return (salt / 2.5) * 1000;
  }

  return 0;
}

function roundGram(value) {
  return Number(value.toFixed(1));
}

function normalizeProduct(product) {
  if (!product) {
    return null;
  }

  if (
    !product.product_name &&
    !product.generic_name
  ) {
    return null;
  }

  if (
    !product.nutriments ||
    Object.keys(product.nutriments).length === 0
  ) {
    return null;
  }

  const nutriments = product.nutriments;

  const serving = parseServing(product.serving_size);

  const name =
    product.product_name ||
    product.generic_name;

  const nutrients = {
    calories: Math.round(
      nutrientValue(
        nutriments,
        'energy-kcal',
        serving.size
      )
    ),

    protein: roundGram(
      nutrientValue(
        nutriments,
        'proteins',
        serving.size
      )
    ),

    carbs: roundGram(
      nutrientValue(
        nutriments,
        'carbohydrates',
        serving.size
      )
    ),

    sugar: roundGram(
      nutrientValue(
        nutriments,
        'sugars',
        serving.size
      )
    ),

    fat: roundGram(
      nutrientValue(
        nutriments,
        'fat',
        serving.size
      )
    ),

    saturatedFat: roundGram(
      nutrientValue(
        nutriments,
        'saturated-fat',
        serving.size
      )
    ),

    fiber: roundGram(
      nutrientValue(
        nutriments,
        'fiber',
        serving.size
      )
    ),

    sodium: Math.round(
      sodiumMg(
        nutriments,
        serving.size
      )
    ),
  };

  const hasNutrition =
    Object.values(nutrients).some(
      (value) => value > 0
    );

  if (!hasNutrition) {
    return null;
  }

  return {
    id: product.code || name,

    name,

    brand: product.brands || undefined,

    category: 'other',

    servingSize: serving.size,

    servingUnit: serving.unit,

    servingLabel: serving.label,

    nutrients,
  };
}

// =========================
// API Handler
// =========================

export default async function handler(
  request,
  response
) {
  // Cache Vercel CDN
  response.setHeader(
    'Cache-Control',
    's-maxage=86400, stale-while-revalidate=3600'
  );

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');

    response.status(405).json({
      error: 'method_not_allowed',
      message: 'Método não permitido.',
    });

    return;
  }

  const query = String(
    request.query.q || ''
  ).trim();

  const lang = String(
    request.query.lang || 'pt'
  );

  if (query.length < 3) {
    response.status(400).json({
      error: 'invalid_query',
      message:
        'Digite pelo menos 3 caracteres.',
    });

    return;
  }

  try {
    const searchTerms =
      encodeURIComponent(query);

    const url =
      `${OPEN_FOOD_FACTS_BASE_URL}` +
      `?search_terms=${searchTerms}` +
      `&search_simple=1` +
      `&action=process` +
      `&json=1` +
      `&page_size=10` +
      `&sort_by=unique_scans_n` +
      `&lc=${lang}` +
      `&fields=` +
      [
        'code',
        'product_name',
        'generic_name',
        'brands',
        'serving_size',
        'nutriments',
      ].join(',');

    const offResponse = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': APP_USER_AGENT,
      },
    });

    // Rate limit OFF
    if (
      offResponse.status === 429 ||
      offResponse.status === 503
    ) {
      response.status(429).json({
        error: 'rate_limited',
        message:
          'Muitas consultas no momento. Tente novamente em alguns segundos.',
      });

      return;
    }

    if (!offResponse.ok) {
      console.error(
        '[food-search] OFF error:',
        offResponse.status
      );

      response.status(502).json({
        error: 'search_failed',
        message:
          'Não foi possível buscar alimentos agora.',
      });

      return;
    }

    const payload =
      await offResponse.json();

    const products =
      payload?.products || [];

    const results = [];

    for (const product of products) {
      const normalized =
        normalizeProduct(product);

      if (normalized) {
        results.push(normalized);
      }
    }

    response.status(200).json({
      results,
    });
  } catch (error) {
    console.error(
      '[food-search] unexpected error',
      error
    );

    response.status(500).json({
      error: 'unexpected_error',
      message:
        'Erro inesperado ao buscar alimentos.',
    });
  }
}