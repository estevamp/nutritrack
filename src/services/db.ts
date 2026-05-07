import { getDoc, setDoc, doc } from 'firebase/firestore';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  QueryConstraint,
  limit,
} from 'firebase/firestore';
import { db as firebaseDb } from './firebase';
import type { DayLog, Food } from '../types';

const LOGS_COLLECTION = 'dayLogs';
const FOODS_COLLECTION = 'foods';
const SETTINGS_COLLECTION = 'settings';

export async function saveDayLog(userId: string, dayLog: DayLog): Promise<string> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', dayLog.date)
  );
  
  const existingDocs = await getDocs(q);
  
  if (existingDocs.empty) {
    const docRef = await addDoc(logsRef, {
      userId,
      ...dayLog,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } else {
    const docId = existingDocs.docs[0].id;
    await updateDoc(doc(firebaseDb, LOGS_COLLECTION, docId), {
      ...dayLog,
      updatedAt: Timestamp.now(),
    });
    return docId;
  }
}

export async function getDayLogs(
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<DayLog[]> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const constraints: QueryConstraint[] = [where('userId', '==', userId)];

  if (startDate) constraints.push(where('date', '>=', startDate));
  if (endDate) constraints.push(where('date', '<=', endDate));
  constraints.push(orderBy('date', 'desc'));

  const q = query(logsRef, ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as DayLog));
}

export async function getDayLog(userId: string, date: string): Promise<DayLog | null> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;

  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as DayLog;
}

export async function deleteDayLog(userId: string, date: string): Promise<void> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);
  for (const doc of querySnapshot.docs) {
    await deleteDoc(doc.ref);
  }
}

export async function saveCustomFood(userId: string, food: Food): Promise<string> {
  const foodsRef = collection(firebaseDb, FOODS_COLLECTION);
  const docRef = await addDoc(foodsRef, {
    userId,
    ...food,
    isCustom: true,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getCustomFoods(userId: string): Promise<Food[]> {
  const foodsRef = collection(firebaseDb, FOODS_COLLECTION);
  const q = query(
    foodsRef,
    where('userId', '==', userId),
    where('isCustom', '==', true),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as Food));
}

export async function deleteCustomFood(foodId: string): Promise<void> {
  await deleteDoc(doc(firebaseDb, FOODS_COLLECTION, foodId));
}

export async function updateCustomFood(foodId: string, food: Partial<Food>): Promise<void> {
  await updateDoc(doc(firebaseDb, FOODS_COLLECTION, foodId), {
    ...food,
    updatedAt: Timestamp.now(),
  });
}

// ==================== Food Functions (for backwards compatibility) ====================

export async function getAllFoods(): Promise<Food[]> {
  const foodsRef = collection(firebaseDb, FOODS_COLLECTION);
  const snapshot = await getDocs(foodsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Food));
}

export async function saveFood(food: Food): Promise<string> {
  const foodsRef = collection(firebaseDb, FOODS_COLLECTION);
  const docRef = await addDoc(foodsRef, {
    ...food,
    isCustom: true,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getFoodById(id: string): Promise<Food | null> {
  const foodRef = doc(firebaseDb, FOODS_COLLECTION, id);
  const snapshot = await getDoc(foodRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Food;
  }
  return null;
}

export async function deleteFood(id: string): Promise<void> {
  await deleteDoc(doc(firebaseDb, FOODS_COLLECTION, id));
}

// ==================== DayLog Functions (for backwards compatibility) ====================

export async function getAllDayLogs(): Promise<DayLog[]> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const snapshot = await getDocs(logsRef);
  return snapshot.docs.map(doc => ({ date: doc.id, ...doc.data() } as DayLog));
}

export async function getRecentLogs(days: number): Promise<DayLog[]> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const q = query(
    logsRef,
    orderBy('date', 'desc'),
    limit(days)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ date: doc.id, ...doc.data() } as DayLog));
}

// ==================== Settings Functions ====================

export async function getSettings(): Promise<{ name: string; goals: any } | null> {
  const settingsRef = doc(firebaseDb, SETTINGS_COLLECTION, 'user-settings');
  const snapshot = await getDoc(settingsRef);
  if (snapshot.exists()) {
    return snapshot.data() as { name: string; goals: any };
  }
  return null;
}

export async function saveSettings(settings: { name: string; goals: any }): Promise<void> {
  const settingsRef = doc(firebaseDb, SETTINGS_COLLECTION, 'user-settings');
  await setDoc(settingsRef, settings, { merge: true });
}

// ==================== Export/Import Data ====================

export async function exportAllData(): Promise<string> {
  const foods = await getAllFoods();
  const dayLogs = await getAllDayLogs();
  const settings = await getSettings();
  
  return JSON.stringify({
    foods,
    dayLogs,
    settings,
    exportedAt: new Date().toISOString()
  }, null, 2);
}

export async function importData(jsonString: string): Promise<void> {
  const data = JSON.parse(jsonString);
  
  // Import foods
  if (data.foods) {
    for (const food of data.foods) {
      await saveFood(food);
    }
  }
  
  // Import day logs
  if (data.dayLogs) {
    for (const log of data.dayLogs) {
      await saveDayLog('', log);
    }
  }
  
  // Import settings
  if (data.settings) {
    await saveSettings(data.settings);
  }
}
