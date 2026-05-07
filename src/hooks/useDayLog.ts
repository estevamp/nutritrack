import { useState, useEffect, useCallback, useMemo } from 'react';
import type { DayLog, MealType, FoodItem, MealEntry, NutrientInfo, NutrientGoals } from '../types';
import { auth, initializeAuth } from '../services/firebase';
import { saveDayLog, getDayLog, getSettings, saveSettings } from '../services/db';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DEFAULT_GOALS: NutrientGoals = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  sugar: 50,
  fat: 70,
  fiber: 30,
  sodium: 2300,
};

const emptyTotals = (): NutrientInfo => ({
  calories: 0, protein: 0, carbs: 0, sugar: 0,
  fat: 0, saturatedFat: 0, fiber: 0, sodium: 0,
});

function computeTotals(meals: Record<MealType, MealEntry[]>): NutrientInfo {
  const totals = emptyTotals();
  (Object.values(meals) as MealEntry[][]).flat().forEach(entry => {
    totals.calories     += entry.nutrients.calories;
    totals.protein      += entry.nutrients.protein;
    totals.carbs        += entry.nutrients.carbs;
    totals.sugar        += entry.nutrients.sugar;
    totals.fat          += entry.nutrients.fat;
    totals.saturatedFat += entry.nutrients.saturatedFat;
    totals.fiber        += entry.nutrients.fiber;
    totals.sodium       += entry.nutrients.sodium;
  });
  (Object.keys(totals) as (keyof NutrientInfo)[]).forEach(k => {
    totals[k] = Number(totals[k].toFixed(1));
  });
  return totals;
}

async function getUserId(): Promise<string> {
  if (auth.currentUser) {
    console.log(`[useDayLog] Using cached user: ${auth.currentUser.uid}`);
    return auth.currentUser.uid;
  }
  console.log('[useDayLog] No cached user, initializing auth...');
  const user = await initializeAuth();
  if (!user) throw new Error('Unable to authenticate with Firebase');
  console.log(`[useDayLog] Auth initialized, user: ${user.uid}`);
  return user.uid;
}

// ---------------------------------------------------------------------------
// useDayLog
// ---------------------------------------------------------------------------

export function useDayLog(date: string) {
  const [dayLog, setDayLog] = useState<DayLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshLog = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      const daylog = await getDayLog(userId, date);

      if (daylog) {
        setDayLog(daylog);
      } else {
        const settings = await getSettings(userId);
        const goals: NutrientGoals = settings?.goals ?? DEFAULT_GOALS;
        const newLog: DayLog = {
          date,
          meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
          totals: emptyTotals(),
          goals,
        };
        setDayLog(newLog);
      }
    } catch (error) {
      console.error('Erro ao carregar log do dia:', error);
      setDayLog(null);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    refreshLog();
  }, [refreshLog]);

  const addFood = async (meal: MealType, food: FoodItem, servings: number) => {
    try {
      const nutrients: NutrientInfo = {
        calories:     Math.round(food.nutrients.calories * servings),
        protein:      Number((food.nutrients.protein * servings).toFixed(1)),
        carbs:        Number((food.nutrients.carbs * servings).toFixed(1)),
        sugar:        Number((food.nutrients.sugar * servings).toFixed(1)),
        fat:          Number((food.nutrients.fat * servings).toFixed(1)),
        saturatedFat: Number((food.nutrients.saturatedFat * servings).toFixed(1)),
        fiber:        Number((food.nutrients.fiber * servings).toFixed(1)),
        sodium:       Math.round(food.nutrients.sodium * servings),
      };

      const entry: MealEntry = {
        id: crypto.randomUUID(),
        foodId: food.id,
        foodName: food.name,
        servingsConsumed: servings,
        nutrients,
        addedAt: new Date().toISOString(),
      };

      if (!dayLog) return;

      const userId = await getUserId();
      const updatedMeals = {
        ...dayLog.meals,
        [meal]: [...dayLog.meals[meal], entry],
      };
      const updatedLog: DayLog = { 
        ...dayLog, 
        meals: updatedMeals, 
        totals: computeTotals(updatedMeals) 
      };
      
      await saveDayLog(userId, updatedLog);
      await refreshLog();
    } catch (error) {
      console.error('Erro ao adicionar alimento:', error);
      throw error;
    }
  };

  const removeEntry = async (meal: MealType, entryId: string) => {
    try {
      if (!dayLog) return;

      const userId = await getUserId();
      const updatedMeals = {
        ...dayLog.meals,
        [meal]: dayLog.meals[meal].filter(e => e.id !== entryId),
      };
      const updatedLog: DayLog = {
        ...dayLog,
        meals: updatedMeals,
        totals: computeTotals(updatedMeals)
      };
      
      await saveDayLog(userId, updatedLog);
      await refreshLog();
    } catch (error) {
      console.error('Erro ao remover alimento:', error);
      throw error;
    }
  };

  const updateEntry = async (meal: MealType, entryId: string, servings: number) => {
    try {
      if (!dayLog) return;

      const userId = await getUserId();
      const updatedMeals = {
        ...dayLog.meals,
        [meal]: dayLog.meals[meal].map(e => {
          if (e.id !== entryId) return e;
          const ratio = servings / e.servingsConsumed;
          const n = e.nutrients;
          return {
            ...e,
            servingsConsumed: servings,
            nutrients: {
              calories:     Math.round(n.calories * ratio),
              protein:      Number((n.protein * ratio).toFixed(1)),
              carbs:        Number((n.carbs * ratio).toFixed(1)),
              sugar:        Number((n.sugar * ratio).toFixed(1)),
              fat:          Number((n.fat * ratio).toFixed(1)),
              saturatedFat: Number((n.saturatedFat * ratio).toFixed(1)),
              fiber:        Number((n.fiber * ratio).toFixed(1)),
              sodium:       Math.round(n.sodium * ratio),
            },
          };
        }),
      };
      const updatedLog: DayLog = {
        ...dayLog,
        meals: updatedMeals,
        totals: computeTotals(updatedMeals)
      };
      
      await saveDayLog(userId, updatedLog);
      await refreshLog();
    } catch (error) {
      console.error('Erro ao atualizar alimento:', error);
      throw error;
    }
  };

  const totals = useMemo(() => dayLog?.totals ?? emptyTotals(), [dayLog]);

  const mealTotals = useMemo(() => {
    const result: Record<MealType, NutrientInfo> = {
      breakfast: emptyTotals(), lunch: emptyTotals(),
      dinner: emptyTotals(),    snack: emptyTotals(),
    };
    if (!dayLog) return result;

    (Object.keys(dayLog.meals) as MealType[]).forEach(mealType => {
      result[mealType] = dayLog.meals[mealType].reduce((acc, curr) => ({
        calories:     acc.calories     + curr.nutrients.calories,
        protein:      acc.protein      + curr.nutrients.protein,
        carbs:        acc.carbs        + curr.nutrients.carbs,
        sugar:        acc.sugar        + curr.nutrients.sugar,
        fat:          acc.fat          + curr.nutrients.fat,
        saturatedFat: acc.saturatedFat + curr.nutrients.saturatedFat,
        fiber:        acc.fiber        + curr.nutrients.fiber,
        sodium:       acc.sodium       + curr.nutrients.sodium,
      }), emptyTotals());
    });
    return result;
  }, [dayLog]);

  const progressPercent = (nutrient: keyof NutrientGoals) => {
    if (!dayLog || !dayLog.goals[nutrient]) return 0;
    const current = totals[nutrient as keyof NutrientInfo] || 0;
    return Math.min(Math.round((current / dayLog.goals[nutrient]) * 100), 200);
  };

  return { dayLog, isLoading, addFood, removeEntry, updateEntry, totals, mealTotals, progressPercent, refreshLog };
}

// ---------------------------------------------------------------------------
// useGoals
// ---------------------------------------------------------------------------

export function useGoals() {
  const [goals, setGoals] = useState<NutrientGoals>(DEFAULT_GOALS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const userId = await getUserId();
        const settings = await getSettings(userId);
        if (settings?.goals) setGoals(settings.goals);
      } catch (error) {
        console.error('Erro ao carregar metas:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGoals();
  }, []);

  const saveGoals = async (newGoals: NutrientGoals) => {
    const userId = await getUserId();
    const existing = await getSettings(userId);
    await saveSettings(userId, { name: existing?.name ?? 'Usuário', goals: newGoals });
    setGoals(newGoals);
  };

  return { goals, saveGoals, isLoading };
}