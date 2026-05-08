import type { FoodItem } from '../types';

export type FoodLookupDraft = Omit<FoodItem, 'id' | 'isCustom'>;

type FoodLookupResponse = {
  code?: string;
  food?: FoodLookupDraft;
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

export function extractBarcode(rawValue: string): string | null {
  const trimmed = rawValue.trim();
  const numericOnly = trimmed.replace(/\D/g, '');

  if (/^\d{8,14}$/.test(numericOnly)) return numericOnly;

  try {
    const url = new URL(trimmed);
    const candidates = [
      url.searchParams.get('code'),
      url.searchParams.get('barcode'),
      url.pathname,
      url.hash,
    ].filter(Boolean);

    for (const candidate of candidates) {
      const match = candidate?.match(/\d{8,14}/);
      if (match) return match[0];
    }
  } catch {
    const match = trimmed.match(/\d{8,14}/);
    if (match) return match[0];
  }

  return null;
}

export async function lookupFoodByBarcode(code: string): Promise<FoodLookupDraft> {
  const response = await fetch(`/api/food-lookup?code=${encodeURIComponent(code)}`);
  const payload = (await response.json().catch(() => ({}))) as FoodLookupResponse;

  if (!response.ok || !payload.food) {
    throw new FoodLookupError(
      payload.message || 'Não foi possível buscar este alimento.',
      payload.error || 'lookup_failed',
      response.status
    );
  }

  return payload.food;
}
