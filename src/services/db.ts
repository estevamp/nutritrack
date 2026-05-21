/**
 * db.ts - Firebase Database Service (single source of truth)
 *
 * All app data is stored in Firebase Firestore (no local storage).
 * This module uses the already-initialized Firestore instance from firebase.ts.
 */

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  orderBy,
  limit,
  deleteField,
  type QueryConstraint,
} from 'firebase/firestore';

import { db } from './firebase';
import type { DayLog, Food, UserSettings, WeightEntry } from '../types';

const LOGS_COLLECTION = 'dayLogs';
const FOODS_COLLECTION = 'foods';
const SETTINGS_COLLECTION = 'settings';
const WEIGHT_ENTRIES_COLLECTION = 'weightEntries';

// ==================== Day Logs ====================

export async function saveDayLog(userId: string, dayLog: DayLog): Promise<string> {
  const logsRef = collection(db, LOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', dayLog.date)
  );

  const existingDocs = await getDocs(q);

  if (existingDocs.empty) {
    const docRef = await addDoc(logsRef, {
      userId,
      date: dayLog.date,
      meals: dayLog.meals,
      totals: dayLog.totals,
      goals: dayLog.goals,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  }

  const docId = existingDocs.docs[0].id;
  await updateDoc(doc(db, LOGS_COLLECTION, docId), {
    date: dayLog.date,
    meals: dayLog.meals,
    totals: dayLog.totals,
    goals: dayLog.goals,
    updatedAt: Timestamp.now(),
  });
  return docId;
}

export async function getDayLog(userId: string, date: string): Promise<DayLog | null> {
  const logsRef = collection(db, LOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;

  const snap = querySnapshot.docs[0];
  return { id: snap.id, ...(snap.data() as Omit<DayLog, 'id'>) } as DayLog;
}

export async function getDayLogs(
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<DayLog[]> {
  const logsRef = collection(db, LOGS_COLLECTION);
  const constraints: QueryConstraint[] = [where('userId', '==', userId)];

  if (startDate) constraints.push(where('date', '>=', startDate));
  if (endDate) constraints.push(where('date', '<=', endDate));
  constraints.push(orderBy('date', 'desc'));

  const q = query(logsRef, ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<DayLog, 'id'>) } as DayLog));
}

export async function getRecentLogs(userId: string, days: number): Promise<DayLog[]> {
  const logsRef = collection(db, LOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(days)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<DayLog, 'id'>) } as DayLog));
}

export async function deleteDayLog(userId: string, date: string): Promise<void> {
  const logsRef = collection(db, LOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);
  for (const d of querySnapshot.docs) {
    await deleteDoc(d.ref);
  }
}

// ==================== Foods ====================

export async function saveCustomFood(userId: string, food: Food): Promise<string> {
  const foodsRef = collection(db, FOODS_COLLECTION);
  const docRef = await addDoc(foodsRef, {
    userId,
    ...food,
    isCustom: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getCustomFoods(userId: string): Promise<Food[]> {
  const foodsRef = collection(db, FOODS_COLLECTION);

  const q = query(
    foodsRef,
    where('userId', '==', userId),
    where('isCustom', '==', true),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Food, 'id'>) } as Food));
}

export async function deleteCustomFood(foodId: string): Promise<void> {
  await deleteDoc(doc(db, FOODS_COLLECTION, foodId));
}

export async function updateCustomFood(foodId: string, food: Partial<Food>): Promise<void> {
  await updateDoc(doc(db, FOODS_COLLECTION, foodId), {
    ...food,
    updatedAt: Timestamp.now(),
  });
}

export async function getFoodById(id: string): Promise<Food | null> {
  const foodRef = doc(db, FOODS_COLLECTION, id);
  const snapshot = await getDoc(foodRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...(snapshot.data() as Omit<Food, 'id'>) } as Food;
}

// ==================== Settings ====================

export async function getSettings(userId: string): Promise<UserSettings | null> {
  const settingsRef = doc(db, SETTINGS_COLLECTION, userId);
  const snapshot = await getDoc(settingsRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as UserSettings;
}

export async function saveSettings(
  userId: string,
  settings: UserSettings
): Promise<void> {
  const settingsRef = doc(db, SETTINGS_COLLECTION, userId);
  await setDoc(
    settingsRef,
    {
      ...settings,
      heightCm: settings.heightCm ?? deleteField(),
      targetWeightKg: settings.targetWeightKg ?? deleteField(),
    },
    { merge: true }
  );
}

// ==================== Weight Entries ====================

export async function saveWeightEntry(userId: string, entry: WeightEntry): Promise<string> {
  const entriesRef = collection(db, WEIGHT_ENTRIES_COLLECTION);

  const q = query(
    entriesRef,
    where('userId', '==', userId),
    where('date', '==', entry.date),
    limit(1)
  );

  const existingDocs = await getDocs(q);
  const payload = {
    userId,
    date: entry.date,
    weightKg: entry.weightKg,
    updatedAt: Timestamp.now(),
  };

  if (existingDocs.empty) {
    const docRef = await addDoc(entriesRef, {
      ...payload,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  }

  const docId = existingDocs.docs[0].id;
  await updateDoc(doc(db, WEIGHT_ENTRIES_COLLECTION, docId), payload);
  return docId;
}

export async function getWeightEntries(userId: string): Promise<WeightEntry[]> {
  const entriesRef = collection(db, WEIGHT_ENTRIES_COLLECTION);

  const q = query(
    entriesRef,
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<WeightEntry, 'id'>) } as WeightEntry));
}

export async function deleteWeightEntry(userId: string, date: string): Promise<void> {
  const entriesRef = collection(db, WEIGHT_ENTRIES_COLLECTION);

  const q = query(
    entriesRef,
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const snapshot = await getDocs(q);
  for (const d of snapshot.docs) {
    await deleteDoc(d.ref);
  }
}
