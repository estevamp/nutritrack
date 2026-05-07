import { useState, useEffect, useCallback, useMemo } from 'react';
import type { DayLog, MealType, FoodItem, MealEntry, NutrientInfo, NutrientGoals } from '../types';
import { auth, initializeAuth, getSettings, saveSettings, db as firestoreDb } from '../services/firebaseService';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

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
  if (auth.currentUser) return auth.currentUser.uid;
  const user = await initializeAuth();
  if (!user) throw new Error('Unable to authenticate with Firebase');
  return user.uid;
}

function dayLogDocRef(userId: string, date: string) {
  return doc(firestoreDb, 'dayLogs', `${userId}_${date}`);
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
      const docSnap = await getDoc(dayLogDocRef(userId, date));

      if (docSnap.exists()) {
        setDayLog(docSnap.data() as DayLog);
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
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    refreshLog();
  }, [refreshLog]);

  const addFood = async (meal: MealType, food: FoodItem, servings: number) => {
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

    const userId = await getUserId();
    const ref = dayLogDocRef(userId, date);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const current = snap.data() as DayLog;
      const updatedMeals = {
        ...current.meals,
        [meal]: [...current.meals[meal], entry],
      };
      await updateDoc(ref, { meals: updatedMeals, totals: computeTotals(updatedMeals) });
    } else {
      const settings = await getSettings(userId);
      const goals: NutrientGoals = settings?.goals ?? DEFAULT_GOALS;
      const meals: Record<MealType, MealEntry[]> = {
        breakfast: [], lunch: [], dinner: [], snack: [],
        [meal]: [entry],
      };
      await setDoc(ref, { date, meals, totals: computeTotals(meals), goals });
    }

    await refreshLog();
  };

  const removeEntry = async (meal: MealType, entryId: string) => {
    const userId = await getUserId();
    const ref = dayLogDocRef(userId, date);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const current = snap.data() as DayLog;
    const updatedMeals = {
      ...current.meals,
      [meal]: current.meals[meal].filter(e => e.id !== entryId),
    };
    await updateDoc(ref, { meals: updatedMeals, totals: computeTotals(updatedMeals) });
    await refreshLog();
  };

  const updateEntry = async (meal: MealType, entryId: string, servings: number) => {
    const userId = await getUserId();
    const ref = dayLogDocRef(userId, date);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const current = snap.data() as DayLog;
    const updatedMeals = {
      ...current.meals,
      [meal]: current.meals[meal].map(e => {
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
    await updateDoc(ref, { meals: updatedMeals, totals: computeTotals(updatedMeals) });
    await refreshLog();
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