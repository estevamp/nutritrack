/**
 * Firebase (single source of truth)
 *
 * - One Firebase app instance
 * - Exports: auth, db, initializeAuth
 * - Firestore model:
 *   - settings/{uid}
 *   - foods/{autoId} with userId
 *   - dayLogs/{autoId} with userId + date (unique per user/date via query)
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  type Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
  type QueryConstraint,
} from 'firebase/firestore';
import {
  getAuth,
  type Auth,
  signInAnonymously,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

import type { DayLog, FoodItem, MealEntry, MealType, UserSettings } from '../types';

// ==================== Firebase init ====================

const firebaseConfig = {
  apiKey: 'AIzaSyDyvk2-Dsd9wARSiPy57vjzI0XMF09WGpM',
  authDomain: 'nutritrack-silk.firebaseapp.com',
  projectId: 'nutritrack-silk',
  storageBucket: 'nutritrack-silk.firebasestorage.app',
  messagingSenderId: '1031560309871',
  appId: '1:1031560309871:web:019e83d9cdaa66fe3b719a',
};

let app: FirebaseApp | undefined;
export let db: Firestore;
export let auth: Auth;

let currentUser: User | null = null;

function ensureInitialized(): void {
  if (!app) app = initializeApp(firebaseConfig);
  if (!db) db = getFirestore(app);
  if (!auth) {
    auth = getAuth(app);

    // Keep currentUser updated
    onAuthStateChanged(auth, (user) => {
      currentUser = user;
    });
  }
}

/**
 * Ensures an authenticated user exists (anonymous auth).
 */
export async function initializeAuth(): Promise<User> {
  ensureInitialized();

  if (auth.currentUser) {
    currentUser = auth.currentUser;
    return auth.currentUser;
  }

  const result = await signInAnonymously(auth);
  currentUser = result.user;
  return result.user;
}

async function requireUser(): Promise<User> {
  ensureInitialized();

  if (currentUser) return currentUser;
  if (auth.currentUser) {
    currentUser = auth.currentUser;
    return auth.currentUser;
  }

  // Wait for auth state or sign in
  try {
    return await initializeAuth();
  } catch {
    // fallback: wait for state change
    return await new Promise<User>((resolve, reject) => {
      const unsub = onAuthStateChanged(auth, (user) => {
        unsub();
        if (user) {
          currentUser = user;
          resolve(user);
        } else {
          reject(new Error('Usuário não autenticado'));
        }
      });
    });
  }
}

// ==================== Collections ====================

const FOODS_COLLECTION = 'foods';
const DAYLOGS_COLLECTION = 'dayLogs';
const SETTINGS_COLLECTION = 'settings';

// ==================== Settings (1 doc per user) ====================

export async function getSettingsFromFirestore(userId: string): Promise<UserSettings | null> {
  ensureInitialized();
  const ref = doc(db, SETTINGS_COLLECTION, userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as UserSettings;
}

export async function saveSettingsToFirestore(
  userId: string,
  settings: UserSettings
): Promise<void> {
  await requireUser();
  const ref = doc(db, SETTINGS_COLLECTION, userId);
  await setDoc(
    ref,
    {
      ...settings,
      updatedAt: Timestamp.now(),
    } as any,
    { merge: true }
  );
}

// ==================== Foods ====================

export async function getAllFoodsFromFirestore(userId: string): Promise<FoodItem[]> {
  ensureInitialized();
  const foodsRef = collection(db, FOODS_COLLECTION);

  const q = query(
    foodsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as FoodItem));
}

export async function searchFoodsFromFirestore(userId: string, queryText: string): Promise<FoodItem[]> {
  const all = await getAllFoodsFromFirestore(userId);

  const normalizedQuery = queryText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return all.filter((food) => {
    const name = (food.name ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const category = (food.category ?? '').toLowerCase();
    return name.includes(normalizedQuery) || category.includes(normalizedQuery);
  });
}

export async function saveFoodToFirestore(userId: string, food: FoodItem): Promise<string> {
  await requireUser();

  // If food has an id, upsert by id; otherwise create new doc
  if (food.id) {
    const ref = doc(db, FOODS_COLLECTION, food.id);
    await setDoc(
      ref,
      {
        ...food,
        userId,
        updatedAt: Timestamp.now(),
      } as any,
      { merge: true }
    );
    return food.id;
  }

  const foodsRef = collection(db, FOODS_COLLECTION);
  const docRef = await addDoc(foodsRef, {
    ...food,
    userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  } as any);

  return docRef.id;
}

export async function deleteFoodFromFirestore(foodId: string): Promise<void> {
  await requireUser();
  await deleteDoc(doc(db, FOODS_COLLECTION, foodId));
}

// ==================== Day Logs ====================
// Model: one log per user/date (enforced by query + update)

export async function getDayLogFromFirestore(userId: string, date: string): Promise<DayLog | null> {
  ensureInitialized();
  const logsRef = collection(db, DAYLOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', date),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const d = snapshot.docs[0];
  return { id: d.id, ...(d.data() as any) } as DayLog;
}

export async function saveDayLogToFirestore(userId: string, log: DayLog): Promise<string> {
  await requireUser();
  const logsRef = collection(db, DAYLOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', log.date),
    limit(1)
  );

  const existing = await getDocs(q);

  if (existing.empty) {
    const docRef = await addDoc(logsRef, {
      ...log,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    } as any);
    return docRef.id;
  }

  const docId = existing.docs[0].id;
  await setDoc(
    doc(db, DAYLOGS_COLLECTION, docId),
    {
      ...log,
      userId,
      updatedAt: Timestamp.now(),
    } as any,
    { merge: true }
  );

  return docId;
}

export async function getRecentLogsFromFirestore(userId: string, days: number): Promise<DayLog[]> {
  ensureInitialized();
  const logsRef = collection(db, DAYLOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(days)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as DayLog));
}

export async function getDayLogsFromFirestore(
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<DayLog[]> {
  ensureInitialized();
  const logsRef = collection(db, DAYLOGS_COLLECTION);

  const constraints: QueryConstraint[] = [where('userId', '==', userId)];
  if (startDate) constraints.push(where('date', '>=', startDate));
  if (endDate) constraints.push(where('date', '<=', endDate));
  constraints.push(orderBy('date', 'desc'));

  const q = query(logsRef, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as DayLog));
}

export async function deleteDayLogFromFirestore(userId: string, date: string): Promise<void> {
  await requireUser();
  const logsRef = collection(db, DAYLOGS_COLLECTION);

  const q = query(
    logsRef,
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const snapshot = await getDocs(q);
  for (const d of snapshot.docs) {
    await deleteDoc(d.ref);
  }
}

// Optional helpers for meal entries (kept minimal; adjust to your DayLog shape)
export async function addMealEntryToFirestore(
  userId: string,
  date: string,
  meal: MealType,
  entry: MealEntry
): Promise<void> {
  const log = await getDayLogFromFirestore(userId, date);
  if (!log) throw new Error('DayLog não encontrado');

  const meals = (log as any).meals ?? {};
  meals[meal] = [...(meals[meal] ?? []), entry];

  await saveDayLogToFirestore(userId, { ...(log as any), meals } as DayLog);
}

// ==================== Export / Import ====================

export async function exportAllDataFromFirestore(): Promise<string> {
  const user = await requireUser();

  const foods = await getAllFoodsFromFirestore(user.uid);
  const dayLogs = await getDayLogsFromFirestore(user.uid);
  const settings = await getSettingsFromFirestore(user.uid);

  return JSON.stringify(
    {
      foods,
      dayLogs,
      settings,
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export async function importDataToFirestore(jsonString: string): Promise<void> {
  const user = await requireUser();
  const data = JSON.parse(jsonString);

  ensureInitialized();

  // Foods
  if (Array.isArray(data.foods)) {
    for (const food of data.foods) {
      const id = food.id;
      if (id) {
        await setDoc(
          doc(db, FOODS_COLLECTION, id),
          {
            ...food,
            userId: user.uid,
            updatedAt: Timestamp.now(),
          },
          { merge: true }
        );
      } else {
        await addDoc(collection(db, FOODS_COLLECTION), {
          ...food,
          userId: user.uid,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      }
    }
  }

  // DayLogs
  if (Array.isArray(data.dayLogs)) {
    for (const log of data.dayLogs) {
      // keep same behavior: upsert by (userId,date)
      await saveDayLogToFirestore(user.uid, { ...log, userId: user.uid } as DayLog);
    }
  }

  // Settings (1 doc per user)
  if (data.settings) {
    await setDoc(
      doc(db, SETTINGS_COLLECTION, user.uid),
      {
        ...data.settings,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  }
}