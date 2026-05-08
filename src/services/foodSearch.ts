import type { FoodLookupDraft } from './foodLookup';

export interface FoodSearchResult extends FoodLookupDraft {
  displayLabel: string;
}

type FoodSearchResponse = {
  results?: FoodLookupDraft[];
  error?: string;
  message?: string;
};

export class FoodLookupError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'FoodLookupError';
    this.code = code;
    this.status = status;
  }
}

export async function searchFoodByName(query: string): Promise<FoodSearchResult[]> {
  const encodedQuery = encodeURIComponent(query.trim());
  const response = await fetch(`/api/food-search?q=${encodedQuery}&lang=pt`);
  const payload = (await response.json().catch(() => ({}))) as FoodSearchResponse;

  if (!response.ok || !payload.results) {
    throw new FoodLookupError(
      payload.message || 'Não foi possível buscar este alimento.',
      payload.error || 'search_failed',
      response.status
    );
  }

  return payload.results.map(result => ({
    ...result,
    displayLabel: `${result.name}${result.brand ? ` • ${result.brand}` : ''} • ${result.nutrients.calories}cal`,
  }));
}
