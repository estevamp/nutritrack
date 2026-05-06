import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { FoodItem, DayLog, UserSettings, MealType, MealEntry } from '../types';

interface NutriTrackDB extends DBSchema {
  foods: {
    key: string;
    value: FoodItem;
    indexes: { 'name': string; 'category': string };
  };
  dayLogs: {
    key: string;
    value: DayLog;
  };
  settings: {
    key: string;
    value: UserSettings;
  };
}

const DB_NAME = 'nutrition-tracker-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<NutriTrackDB>>;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<NutriTrackDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const foodStore = db.createObjectStore('foods', { keyPath: 'id' });
        foodStore.createIndex('name', 'name');
        foodStore.createIndex('category', 'category');

        db.createObjectStore('dayLogs', { keyPath: 'date' });
        db.createObjectStore('settings', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
};

// Foods
export async function getAllFoods(): Promise<FoodItem[]> {
  const db = await getDB();
  return db.getAll('foods');
}

export async function getFoodById(id: string): Promise<FoodItem | undefined> {
  const db = await getDB();
  return db.get('foods', id);
}

export async function searchFoods(query: string): Promise<FoodItem[]> {
  const db = await getDB();
  const allFoods = await db.getAll('foods');
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  return allFoods.filter(food => {
    const normalizedName = food.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedName.includes(normalizedQuery) || food.category.includes(normalizedQuery);
  });
}

export async function saveFood(food: FoodItem): Promise<void> {
  const db = await getDB();
  await db.put('foods', food);
}

export async function deleteFood(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('foods', id);
}

// Day Logs
export async function getDayLog(date: string): Promise<DayLog | undefined> {
  const db = await getDB();
  return db.get('dayLogs', date);
}

export async function saveDayLog(log: DayLog): Promise<void> {
  const db = await getDB();
  await db.put('dayLogs', log);
}

export async function getRecentLogs(days: number): Promise<DayLog[]> {
  const db = await getDB();
  const allLogs = await db.getAll('dayLogs');
  return allLogs
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, days);
}

export async function addMealEntry(date: string, meal: MealType, entry: MealEntry): Promise<void> {
  const db = await getDB();
  const log = await getDayLog(date) || {
    date,
    meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
    totals: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 },
    goals: { calories: 2000, protein: 150, carbs: 250, sugar: 50, fat: 70, fiber: 30, sodium: 2300 } // Default goals
  };

  log.meals[meal].push(entry);
  
  // Recalculate totals
  const allEntries = [
    ...log.meals.breakfast,
    ...log.meals.lunch,
    ...log.meals.dinner,
    ...log.meals.snack
  ];

  log.totals = allEntries.reduce((acc, curr) => ({
    calories: acc.calories + curr.nutrients.calories,
    protein: acc.protein + curr.nutrients.protein,
    carbs: acc.carbs + curr.nutrients.carbs,
    sugar: acc.sugar + curr.nutrients.sugar,
    fat: acc.fat + curr.nutrients.fat,
    saturatedFat: acc.saturatedFat + curr.nutrients.saturatedFat,
    fiber: acc.fiber + curr.nutrients.fiber,
    sodium: acc.sodium + curr.nutrients.sodium,
  }), { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 });

  await db.put('dayLogs', log);
}

export async function removeMealEntry(date: string, meal: MealType, entryId: string): Promise<void> {
  const db = await getDB();
  const log = await getDayLog(date);
  if (!log) return;

  log.meals[meal] = log.meals[meal].filter(e => e.id !== entryId);

  // Recalculate totals
  const allEntries = [
    ...log.meals.breakfast,
    ...log.meals.lunch,
    ...log.meals.dinner,
    ...log.meals.snack
  ];

  log.totals = allEntries.reduce((acc, curr) => ({
    calories: acc.calories + curr.nutrients.calories,
    protein: acc.protein + curr.nutrients.protein,
    carbs: acc.carbs + curr.nutrients.carbs,
    sugar: acc.sugar + curr.nutrients.sugar,
    fat: acc.fat + curr.nutrients.fat,
    saturatedFat: acc.saturatedFat + curr.nutrients.saturatedFat,
    fiber: acc.fiber + curr.nutrients.fiber,
    sodium: acc.sodium + curr.nutrients.sodium,
  }), { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 });

  await db.put('dayLogs', log);
}

// Settings
export async function getSettings(): Promise<UserSettings | undefined> {
  const db = await getDB();
  return db.get('settings', 'user-settings');
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  const db = await getDB();
  await db.put('settings', { ...settings, id: 'user-settings' } as any);
}

// Export/Import
export async function exportAllData(): Promise<string> {
  const db = await getDB();
  const foods = await db.getAll('foods');
  const dayLogs = await db.getAll('dayLogs');
  const settings = await db.get('settings', 'user-settings');

  return JSON.stringify({
    foods,
    dayLogs,
    settings,
    exportedAt: new Date().toISOString()
  }, null, 2);
}

export async function importData(jsonString: string): Promise<void> {
  const db = await getDB();
  const data = JSON.parse(jsonString);

  const tx = db.transaction(['foods', 'dayLogs', 'settings'], 'readwrite');
  
  if (data.foods) {
    for (const food of data.foods) {
      await tx.objectStore('foods').put(food);
    }
  }
  
  if (data.dayLogs) {
    for (const log of data.dayLogs) {
      await tx.objectStore('dayLogs').put(log);
    }
  }
  
  if (data.settings) {
    await tx.objectStore('settings').put(data.settings);
  }

  await tx.done;
}
