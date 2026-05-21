export interface NutrientInfo {
  calories: number;       // kcal
  protein: number;        // g
  carbs: number;          // g
  sugar: number;          // g
  fat: number;            // g
  saturatedFat: number;   // g
  fiber: number;          // g
  sodium: number;         // mg
}

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  category: 'grain' | 'protein' | 'dairy' | 'vegetable' | 'fruit' | 'fat' | 'beverage' | 'snack' | 'other';
  servingSize: number;    // gramas ou ml
  servingUnit: 'g' | 'ml' | 'unit';
  servingLabel: string;   // ex: "1 fatia", "1 xícara", "100g"
  nutrients: NutrientInfo; // valores por porção definida
  isCustom: boolean;      // true se foi criado pelo usuário
}

// Alias for backwards compatibility
export type Food = FoodItem;

export interface MealEntry {
  id: string;
  foodId: string;
  foodName: string;
  servingsConsumed: number;
  nutrients: NutrientInfo; // calculado com base em servingsConsumed
  addedAt: string;        // ISO string
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface DayLog {
  date: string;           // formato YYYY-MM-DD
  meals: {
    breakfast: MealEntry[];
    lunch: MealEntry[];
    dinner: MealEntry[];
    snack: MealEntry[];
  };
  totals: NutrientInfo;
  goals: NutrientGoals;
}

export interface NutrientGoals {
  calories: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface UserSettings {
  goals: NutrientGoals;
  name: string;
  heightCm?: number;
  targetWeightKg?: number;
}

export interface WeightEntry {
  id?: string;
  date: string;           // formato YYYY-MM-DD
  weightKg: number;
}
