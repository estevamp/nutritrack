import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import type { User } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import type { FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyvk2-Dsd9wARSiPy57vjzI0XMF09WGpM",
  authDomain: "nutritrack-silk.firebaseapp.com",
  projectId: "nutritrack-silk",
  storageBucket: "nutritrack-silk.firebasestorage.app",
  messagingSenderId: "1031560309871",
  appId: "1:1031560309871:web:019e83d9cdaa66fe3b719a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export const initializeAuth = async (): Promise<User | null> => {
  try {
    if (auth.currentUser) {
      return auth.currentUser;
    }
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error("Error initializing auth:", error);
    return null;
  }
};

export interface FoodEntry {
  id?: string;
  userId: string;
  date: string;
  meal: string;
  foodName: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  timestamp: number;
}

export interface DayLog {
  id?: string;
  userId: string;
  date: string;
  entries: FoodEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
}

export const addFoodEntry = async (entry: Omit<FoodEntry, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "foodEntries"), {
      ...entry,
      timestamp: Date.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding food entry:", error);
    throw error;
  }
};

export const getFoodEntriesByDate = async (userId: string, date: string): Promise<FoodEntry[]> => {
  try {
    const q = query(
      collection(db, "foodEntries"),
      where("userId", "==", userId),
      where("date", "==", date)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FoodEntry));
  } catch (error) {
    console.error("Error fetching food entries:", error);
    return [];
  }
};

export const updateFoodEntry = async (entryId: string, updates: Partial<FoodEntry>): Promise<void> => {
  try {
    const entryRef = doc(db, "foodEntries", entryId);
    await updateDoc(entryRef, updates);
  } catch (error) {
    console.error("Error updating food entry:", error);
    throw error;
  }
};

export const deleteFoodEntry = async (entryId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "foodEntries", entryId));
  } catch (error) {
    console.error("Error deleting food entry:", error);
    throw error;
  }
};

export const saveDayLog = async (dayLog: Omit<DayLog, 'id'>): Promise<string> => {
  try {
    const docId = `${dayLog.userId}_${dayLog.date}`;
    const docRef = doc(db, "dayLogs", docId);
    await setDoc(docRef, dayLog);
    return docId;
  } catch (error) {
    console.error("Error saving day log:", error);
    throw error;
  }
};

export const getDayLog = async (userId: string, date: string): Promise<DayLog | null> => {
  try {
    const docId = `${userId}_${date}`;
    const docRef = doc(db, "dayLogs", docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as DayLog;
    }
    return null;
  } catch (error) {
    console.error("Error fetching day log:", error);
    return null;
  }
};

export const getUserDayLogs = async (userId: string, startDate: string, endDate: string): Promise<DayLog[]> => {
  try {
    const q = query(
      collection(db, "dayLogs"),
      where("userId", "==", userId),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DayLog));
  } catch (error) {
    console.error("Error fetching user day logs:", error);
    return [];
  }
};

export interface UserSettings {
  name: string;
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    sugar: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
}

export interface UserSettings {
  name: string;
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    sugar: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
}

export const getSettings = async (userId: string): Promise<UserSettings | null> => {
  try {
    const docRef = doc(db, 'settings', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data() as UserSettings;
    return null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

export const saveSettings = async (userId: string, settings: UserSettings): Promise<void> => {
  try {
    await setDoc(doc(db, 'settings', userId), settings);
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

export default app;