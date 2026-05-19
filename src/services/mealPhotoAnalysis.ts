import type { FoodItem, NutrientInfo } from '../types';

export interface MealPhotoItem {
  name: string;
  category: FoodItem['category'];
  estimatedAmount: string;
  servingSize: number;
  servingUnit: FoodItem['servingUnit'];
  servingLabel: string;
  servings: number;
  confidence?: number;
  nutrients: NutrientInfo;
}

type MealPhotoAnalysisResponse = {
  items?: MealPhotoItem[];
  error?: string;
  message?: string;
};

export class MealPhotoAnalysisError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'MealPhotoAnalysisError';
    this.code = code;
    this.status = status;
  }
}

export async function analyzeMealPhoto(imageBase64: string, mimeType = 'image/jpeg'): Promise<MealPhotoItem[]> {
  const response = await fetch('/api/meal-photo-analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageBase64,
      mimeType,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as MealPhotoAnalysisResponse;

  if (!response.ok || !payload.items) {
    throw new MealPhotoAnalysisError(
      payload.message || 'Não foi possível analisar a refeição.',
      payload.error || 'analysis_failed',
      response.status
    );
  }

  return payload.items;
}
