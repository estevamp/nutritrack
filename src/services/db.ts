/**
 * db.ts - Firebase Database Service
 * 
 * This module provides all database operations for NutriTrack.
 * All data is stored in Firebase Firestore. No local storage is used.
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
  QueryConstraint,
  limit,
} from 'firebase/firestore';
import { db as firebaseDb } from './firebase';
import { auth, initializeAuth } from './firebaseService';
import type { DayLog, Food } from '../types';

const LOGS_COLLECTION = 'dayLogs';
const FOODS_COLLECTION = 'foods';
const SETTINGS_COLLECTION = 'settings';

/**
 * Get current user ID from Firebase Auth
 */
async function getCurrentUserId(): Promise<string> {
  if (auth.currentUser) return auth.currentUser.uid;
  const user = await initializeAuth();
  if (!user) throw new Error('Unable to authenticate with Firebase');
  return user.uid;
}

// ==================== Day Log Functions ====================

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
  } as unknown as DayLog));
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

  const doc_snapshot = querySnapshot.docs[0];
  return { id: doc_snapshot.id, ...doc_snapshot.data() } as unknown as DayLog;
}

export async function deleteDayLog(userId: string, date: string): Promise<void> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);
  for (const doc_ref of querySnapshot.docs) {
    await deleteDoc(doc_ref.ref);
  }
}

export async function getRecentLogs(userId: string, days: number): Promise<DayLog[]> {
  const logsRef = collection(firebaseDb, LOGS_COLLECTION);
  const q = query(
    logsRef,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(days)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as DayLog));
}

// ==================== Food Functions ====================

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

// ==================== Settings Functions ====================

export async function getSettings(userId: string): Promise<{ name: string; goals: any } | null> {
  const settingsRef = doc(firebaseDb, SETTINGS_COLLECTION, userId);
  const snapshot = await getDoc(settingsRef);
  if (snapshot.exists()) {
    return snapshot.data() as { name: string; goals: any };
  }
  return null;
}

export async function saveSettings(userId: string, settings: { name: string; goals: any }): Promise<void> {
  const settingsRef = doc(firebaseDb, SETTINGS_COLLECTION, userId);
  await setDoc(settingsRef, settings, { merge: true });
}

