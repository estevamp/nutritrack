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
import { DayLog, Food } from '../types';

const LOGS_COLLECTION = 'dayLogs';
const FOODS_COLLECTION = 'foods';

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