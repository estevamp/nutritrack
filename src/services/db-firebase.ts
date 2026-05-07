import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
  QueryConstraint,
} from 'firebase/firestore';
import { db as firebaseDb } from './firebase';
import type { DayLog, Food } from '../types';

// Collection references
const LOGS_COLLECTION = 'dayLogs';
const FOODS_COLLECTION = 'foods';

/**
 * Save or update a day log in Firebase
 */
export async function saveDayLog(userId: string, dayLog: DayLog): Promise<string> {
  try {
    const logsRef = collection(firebaseDb, LOGS_COLLECTION);
    
    // Check if log already exists for this date
    const q = query(
      logsRef,
      where('userId', '==', userId),
      where('date', '==', dayLog.date)
    );
    
    const existingDocs = await getDocs(q);
    
    if (existingDocs.empty) {
      // Create new log
      const docRef = await addDoc(logsRef, {
        userId,
        ...dayLog,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } else {
      // Update existing log
      const docId = existingDocs.docs[0].id;
      await updateDoc(doc(firebaseDb, LOGS_COLLECTION, docId), {
        ...dayLog,
        updatedAt: Timestamp.now(),
      });
      return docId;
    }
  } catch (error) {
    console.error('Error saving day log:', error);
    throw error;
  }
}

/**
 * Get day logs for a specific date range
 */
export async function getDayLogs(
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<DayLog[]> {
  try {
    const logsRef = collection(firebaseDb, LOGS_COLLECTION);
    const constraints: QueryConstraint[] = [where('userId', '==', userId)];

    if (startDate) {
      constraints.push(where('date', '>=', startDate));
    }
    if (endDate) {
      constraints.push(where('date', '<=', endDate));
    }

    constraints.push(orderBy('date', 'desc'));

    const q = query(logsRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as DayLog));
  } catch (error) {
    console.error('Error getting day logs:', error);
    throw error;
  }
}

/**
 * Get a specific day log
 */
export async function getDayLog(userId: string, date: string): Promise<DayLog | null> {
  try {
    const logsRef = collection(firebaseDb, LOGS_COLLECTION);
    const q = query(
      logsRef,
      where('userId', '==', userId),
      where('date', '==', date)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as DayLog;
  } catch (error) {
    console.error('Error getting day log:', error);
    throw error;
  }
}

/**
 * Delete a day log
 */
export async function deleteDayLog(userId: string, date: string): Promise<void> {
  try {
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
  } catch (error) {
    console.error('Error deleting day log:', error);
    throw error;
  }
}

/**
 * Save a custom food to user's food database
 */
export async function saveCustomFood(userId: string, food: Food): Promise<string> {
  try {
    const foodsRef = collection(firebaseDb, FOODS_COLLECTION);

    const docRef = await addDoc(foodsRef, {
      userId,
      ...food,
      isCustom: true,
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving custom food:', error);
    throw error;
  }
}

/**
 * Get all custom foods for a user
 */
export async function getCustomFoods(userId: string): Promise<Food[]> {
  try {
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
  } catch (error) {
    console.error('Error getting custom foods:', error);
    throw error;
  }
}

/**
 * Delete a custom food
 */
export async function deleteCustomFood(foodId: string): Promise<void> {
  try {
    await deleteDoc(doc(firebaseDb, FOODS_COLLECTION, foodId));
  } catch (error) {
    console.error('Error deleting custom food:', error);
    throw error;
  }
}

/**
 * Update a custom food
 */
export async function updateCustomFood(foodId: string, food: Partial<Food>): Promise<void> {
  try {
    await updateDoc(doc(firebaseDb, FOODS_COLLECTION, foodId), {
      ...food,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating custom food:', error);
    throw error;
  }
}
