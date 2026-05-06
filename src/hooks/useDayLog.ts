import { useState, useEffect, useCallback, useMemo } from 'react';
import type { DayLog, MealType, FoodItem, MealEntry, NutrientInfo, NutrientGoals } from '../types';
import * as db from '../services/db';

export function useDayLog(date: string) {
  const [dayLog, setDayLog] = useState<DayLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshLog = useCallback(async () => {
    setIsLoading(true);
    try {
      const log = await db.getDayLog(date);
      if (log) {
        setDayLog(log);
      } else {
        // Se não existir log para o dia, cria um objeto vazio com as metas atuais
        const settings = await db.getSettings();
        const defaultGoals: NutrientGoals = settings?.goals || {
          calories: 2000,
          protein: 150,
          carbs: 250,
          sugar: 50,
          fat: 70,
          fiber: 30,
          sodium: 2300
        };

        const newLog: DayLog = {
          date,
          meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
          totals: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 },
          goals: defaultGoals
        };
        setDayLog(newLog);
      }
    } catch (error) {
      console.error('Erro ao carregar log do dia:', error);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    refreshLog();
  }, [refreshLog]);

  const addFood = async (meal: MealType, food: FoodItem, servings: number) => {
    const nutrients: NutrientInfo = {
      calories: Math.round(food.nutrients.calories * servings),
      protein: Number((food.nutrients.protein * servings).toFixed(1)),
      carbs: Number((food.nutrients.carbs * servings).toFixed(1)),
      sugar: Number((food.nutrients.sugar * servings).toFixed(1)),
      fat: Number((food.nutrients.fat * servings).toFixed(1)),
      saturatedFat: Number((food.nutrients.saturatedFat * servings).toFixed(1)),
      fiber: Number((food.nutrients.fiber * servings).toFixed(1)),
      sodium: Math.round(food.nutrients.sodium * servings),
    };

    const entry: MealEntry = {
      id: crypto.randomUUID(),
      foodId: food.id,
      foodName: food.name,
      servingsConsumed: servings,
      nutrients,
      addedAt: new Date().toISOString()
    };

    await db.addMealEntry(date, meal, entry);
    await refreshLog();
  };

  const removeEntry = async (meal: MealType, entryId: string) => {
    await db.removeMealEntry(date, meal, entryId);
    await refreshLog();
  };

  const totals = useMemo(() => {
    return dayLog?.totals || { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 };
  }, [dayLog]);

  const mealTotals = useMemo(() => {
    const emptyNutrients = () => ({ calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 });
    
    const result: Record<MealType, NutrientInfo> = {
      breakfast: emptyNutrients(),
      lunch: emptyNutrients(),
      dinner: emptyNutrients(),
      snack: emptyNutrients()
    };

    if (!dayLog) return result;

    (Object.keys(dayLog.meals) as MealType[]).forEach(mealType => {
      result[mealType] = dayLog.meals[mealType].reduce((acc, curr) => ({
        calories: acc.calories + curr.nutrients.calories,
        protein: acc.protein + curr.nutrients.protein,
        carbs: acc.carbs + curr.nutrients.carbs,
        sugar: acc.sugar + curr.nutrients.sugar,
        fat: acc.fat + curr.nutrients.fat,
        saturatedFat: acc.saturatedFat + curr.nutrients.saturatedFat,
        fiber: acc.fiber + curr.nutrients.fiber,
        sodium: acc.sodium + curr.nutrients.sodium,
      }), emptyNutrients());
    });

    return result;
  }, [dayLog]);

  const progressPercent = (nutrient: keyof NutrientGoals) => {
    if (!dayLog || !dayLog.goals[nutrient]) return 0;
    const current = totals[nutrient as keyof NutrientInfo] || 0;
    const goal = dayLog.goals[nutrient];
    return Math.min(Math.round((current / goal) * 100), 200); // Cap at 200% for UI
  };

  return {
    dayLog,
    isLoading,
    addFood,
    removeEntry,
    totals,
    mealTotals,
    progressPercent,
    refreshLog
  };
}

export function useGoals() {
  const [goals, setGoals] = useState<NutrientGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    sugar: 50,
    fat: 70,
    fiber: 30,
    sodium: 2300
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoals = async () => {
      const settings = await db.getSettings();
      if (settings?.goals) {
        setGoals(settings.goals);
      }
      setIsLoading(false);
    };
    loadGoals();
  }, []);

  const saveGoals = async (newGoals: NutrientGoals) => {
    const settings = await db.getSettings() || { name: 'Usuário', goals: newGoals };
    await db.saveSettings({ ...settings, goals: newGoals });
    setGoals(newGoals);
  };

  return { goals, saveGoals, isLoading };
}
