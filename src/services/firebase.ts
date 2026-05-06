/**
 * Serviço de Banco de Dados Firebase Firestore
 * 
 * Este arquivo implementa a integração com o Firebase Firestore
 * para substituir ou complementar o banco de dados IndexedDB atual.
 * 
 * PRÉ-REQUISITOS:
 * 1. Instale o Firebase: npm install firebase
 * 2. Crie um projeto no Firebase Console (https://console.firebase.google.com/)
 * 3. Registre um aplicativo web no seu projeto Firebase
 * 4. Copie as credenciais do seu projeto
 * 5. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
 * 
 * VITE_FIREBASE_API_KEY=sua_api_key
 * VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
 * VITE_FIREBASE_PROJECT_ID=seu_project_id
 * VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
 * VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
 * VITE_FIREBASE_APP_ID=seu_app_id
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
  type QueryDocumentSnapshot,
  type DocumentData
} from 'firebase/firestore';
import { getAuth, type Auth, signInAnonymously, onAuthStateChanged, type User } from 'firebase/auth';
import type { FoodItem, DayLog, UserSettings, MealType, MealEntry } from '../types';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyvk2-Dsd9wARSiPy57vjzI0XMF09WGpM",
  authDomain: "nutritrack-silk.firebaseapp.com",
  projectId: "nutritrack-silk",
  storageBucket: "nutritrack-silk.firebasestorage.app",
  messagingSenderId: "1031560309871",
  appId: "1:1031560309871:web:019e83d9cdaa66fe3b719a"
};

// Inicialização do Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let currentUser: User | null = null;

/**
 * Inicializa o Firebase e retorna a instância do Firestore
 */
export function initializeFirebase(): Firestore {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  
  if (!db) {
    db = getFirestore(app);
  }
  
  if (!auth) {
    auth = getAuth(app);
    
    // Autenticação anônima para sincronização de dados
    signInAnonymously(auth).catch((error) => {
      console.error('Erro na autenticação anônima:', error);
    });
    
    onAuthStateChanged(auth, (user) => {
      currentUser = user;
      console.log('Estado da autenticação alterado:', user ? 'Autenticado' : 'Não autenticado');
    });
  }
  
  return db;
}

/**
 * Garante que o usuário está autenticado antes de operações de escrita
 */
function ensureAuthenticated(): Promise<User> {
  return new Promise((resolve, reject) => {
    if (currentUser) {
      resolve(currentUser);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Usuário não autenticado'));
        }
      });
    }
  });
}

// ==================== FOODS (Alimentos) ====================

const FOODS_COLLECTION = 'foods';

/**
 * Obtém todos os alimentos do Firestore
 */
export async function getAllFoodsFromFirestore(): Promise<FoodItem[]> {
  const db = initializeFirebase();
  const foodsRef = collection(db, FOODS_COLLECTION);
  const snapshot = await getDocs(foodsRef);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as FoodItem));
}

/**
 * Obtém um alimento específico pelo ID
 */
export async function getFoodByIdFromFirestore(id: string): Promise<FoodItem | null> {
  const db = initializeFirebase();
  const foodRef = doc(db, FOODS_COLLECTION, id);
  const snapshot = await getDoc(foodRef);
  
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as FoodItem;
  }
  
  return null;
}

/**
 * Busca alimentos por nome ou categoria
 */
export async function searchFoodsFromFirestore(queryText: string): Promise<FoodItem[]> {
  const db = initializeFirebase();
  const foodsRef = collection(db, FOODS_COLLECTION);
  
  // Normaliza a query para busca
  const normalizedQuery = queryText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Nota: Firestore não suporta busca por texto parcial nativamente
  // Para produção, considere usar Algolia ou ElasticSearch
  const snapshot = await getDocs(foodsRef);
  
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as FoodItem))
    .filter(food => {
      const normalizedName = food.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedName.includes(normalizedQuery) || 
             food.category.toLowerCase().includes(normalizedQuery);
    });
}

/**
 * Salva um alimento no Firestore
 */
export async function saveFoodToFirestore(food: FoodItem): Promise<void> {
  await ensureAuthenticated();
  const db = initializeFirebase();
  const foodRef = doc(db, FOODS_COLLECTION, food.id);
  
  await setDoc(foodRef, {
    ...food,
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

/**
 * Exclui um alimento do Firestore
 */
export async function deleteFoodFromFirestore(id: string): Promise<void> {
  await ensureAuthenticated();
  const db = initializeFirebase();
  const foodRef = doc(db, FOODS_COLLECTION, id);
  
  await deleteDoc(foodRef);
}

// ==================== DAY LOGS (Registros Diários) ====================

const DAYLOGS_COLLECTION = 'dayLogs';

/**
 * Obtém o registro de um dia específico
 */
export async function getDayLogFromFirestore(date: string): Promise<DayLog | null> {
  const db = initializeFirebase();
  const logRef = doc(db, DAYLOGS_COLLECTION, date);
  const snapshot = await getDoc(logRef);
  
  if (snapshot.exists()) {
    return { date: snapshot.id, ...snapshot.data() } as DayLog;
  }
  
  return null;
}

/**
 * Salva um registro diário no Firestore
 */
export async function saveDayLogToFirestore(log: DayLog): Promise<void> {
  await ensureAuthenticated();
  const db = initializeFirebase();
  const logRef = doc(db, DAYLOGS_COLLECTION, log.date);
  
  await setDoc(logRef, {
    ...log,
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

/**
 * Obtém os registros mais recentes
 */
export async function getRecentLogsFromFirestore(days: number): Promise<DayLog[]> {
  const db = initializeFirebase();
  const logsRef = collection(db, DAYLOGS_COLLECTION);
  
  const q = query(
    logsRef,
    orderBy('date', 'desc'),
    limit(days)
  );
  
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    date: doc.id,
    ...doc.data()
  } as DayLog));
}

/**
 * Adiciona uma entrada de refeição ao registro diário
 */
export async function addMealEntryToFirestore(
  date: string, 
  meal: MealType, 
  entry: MealEntry
): Promise<void> {
  await ensureAuthenticated();
  const db = initializeFirebase();
  const logRef = doc(db, DAYLOGS_COLLECTION, date);
  
  // Obtém o log existente ou cria um novo
  const snapshot = await getDoc(logRef);
  let log: DayLog;
  
  if (snapshot.exists()) {
    log = { date: snapshot.id, ...snapshot.data() } as DayLog;
  } else {
    log = {
      date,
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
      totals: { 
        calories: 0, 
        protein: 0, 
        carbs: 0, 
        sugar: 0, 
        fat: 0, 
        saturatedFat: 0, 
        fiber: 0, 
        sodium: 0 
      },
      goals: { 
        calories: 2000, 
        protein: 150, 
        carbs: 250, 
        sugar: 50, 
        fat: 70, 
        fiber: 30, 
        sodium: 2300 
      }
    };
  }
  
  // Adiciona a entrada
  log.meals[meal].push(entry);
  
  // Recalcula os totais
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
  }), { 
    calories: 0, 
    protein: 0, 
    carbs: 0, 
    sugar: 0, 
    fat: 0, 
    saturatedFat: 0, 
    fiber: 0, 
    sodium: 0 
  });
  
  await updateDoc(logRef, {
    ...log,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Remove uma entrada de refeição do registro diário
 */
export async function removeMealEntryFromFirestore(
  date: string, 
  meal: MealType, 
  entryId: string
): Promise<void> {
  await ensureAuthenticated();
  const db = initializeFirebase();
  const logRef = doc(db, DAYLOGS_COLLECTION, date);
  
  const snapshot = await getDoc(logRef);
  if (!snapshot.exists()) return;
  
  const log = { date: snapshot.id, ...snapshot.data() } as DayLog;
  
  // Remove a entrada
  log.meals[meal] = log.meals[meal].filter(e => e.id !== entryId);
  
  // Recalcula os totais
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
  }), { 
    calories: 0, 
    protein: 0, 
    carbs: 0, 
    sugar: 0, 
    fat: 0, 
    saturatedFat: 0, 
    fiber: 0, 
    sodium: 0 
  });
  
  await updateDoc(logRef, {
    ...log,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Atualiza uma entrada de refeição no registro diário
 */
export async function updateMealEntryFromFirestore(
  date: string, 
  meal: MealType, 
  entryId: string, 
  servingsConsumed: number
): Promise<void> {
  await ensureAuthenticated();
  const db = initializeFirebase();
  const logRef = doc(db, DAYLOGS_COLLECTION, date);
  
  const snapshot = await getDoc(logRef);
  if (!snapshot.exists()) return;
  
  const log = { date: snapshot.id, ...snapshot.data() } as DayLog;
  
  const entryIndex = log.meals[meal].findIndex(e => e.id === entryId);
  if (entryIndex === -1) return;
  
  const entry = log.meals[meal][entryIndex];
  
  // Obtém o alimento original para recalcular nutrientes
  const originalFood = await getFoodByIdFromFirestore(entry.foodId);
  if (!originalFood) return;
  
  // Recalcula nutrientes com novas porções
  const newNutrients = {
    calories: Math.round(originalFood.nutrients.calories * servingsConsumed),
    protein: Number((originalFood.nutrients.protein * servingsConsumed).toFixed(1)),
    carbs: Number((originalFood.nutrients.carbs * servingsConsumed).toFixed(1)),
    sugar: Number((originalFood.nutrients.sugar * servingsConsumed).toFixed(1)),
    fat: Number((originalFood.nutrients.fat * servingsConsumed).toFixed(1)),
    saturatedFat: Number((originalFood.nutrients.saturatedFat * servingsConsumed).toFixed(1)),
    fiber: Number((originalFood.nutrients.fiber * servingsConsumed).toFixed(1)),
    sodium: Math.round(originalFood.nutrients.sodium * servingsConsumed),
  };
  
  // Atualiza a entrada
  log.meals[meal][entryIndex] = {
    ...entry,
    servingsConsumed,
    nutrients: newNutrients
  };
  
  // Recalcula os totais
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
  }), { 
    calories: 0, 
    protein: 0, 
    carbs: 0, 
    sugar: 0, 
    fat: 0, 
    saturatedFat: 0, 
    fiber: 0, 
    sodium: 0 
  });
  
  await updateDoc(logRef, {
    ...log,
    updatedAt: Timestamp.now(),
  });
}

// ==================== SETTINGS (Configurações) ====================

const SETTINGS_COLLECTION = 'settings';

/**
 * Obtém as configurações do usuário
 */
export async function getSettingsFromFirestore(): Promise<UserSettings | null> {
  const db = initializeFirebase();
  const settingsRef = doc(db, SETTINGS_COLLECTION, 'user-settings');
  const snapshot = await getDoc(settingsRef);
  
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as UserSettings;
  }
  
  return null;
}

/**
 * Salva as configurações do usuário
 */
export async function saveSettingsToFirestore(settings: UserSettings): Promise<void> {
  await ensureAuthenticated();
  const db = initializeFirebase();
  const settingsRef = doc(db, SETTINGS_COLLECTION, 'user-settings');
  
  await setDoc(settingsRef, {
    ...settings,
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

// ==================== SYNC (Sincronização) ====================

/**
 * Exporta todos os dados do Firestore
 */
export async function exportAllDataFromFirestore(): Promise<string> {
  const db = initializeFirebase();
  
  const foods = await getAllFoodsFromFirestore();
  const dayLogsSnapshot = await getDocs(collection(db, DAYLOGS_COLLECTION));
  const dayLogs = dayLogsSnapshot.docs.map(doc => ({
    date: doc.id,
    ...doc.data()
  } as DayLog));
  
  const settings = await getSettingsFromFirestore();
  
  return JSON.stringify({
    foods,
    dayLogs,
    settings,
    exportedAt: new Date().toISOString()
  }, null, 2);
}

/**
 * Importa dados para o Firestore
 */
export async function importDataToFirestore(jsonString: string): Promise<void> {
  await ensureAuthenticated();
  const data = JSON.parse(jsonString);
  
  const db = initializeFirebase();
  
  // Importa alimentos
  if (data.foods) {
    for (const food of data.foods) {
      const foodRef = doc(db, FOODS_COLLECTION, food.id);
      await setDoc(foodRef, {
        ...food,
        updatedAt: Timestamp.now(),
      });
    }
  }
  
  // Importa registros diários
  if (data.dayLogs) {
    for (const log of data.dayLogs) {
      const logRef = doc(db, DAYLOGS_COLLECTION, log.date);
      await setDoc(logRef, {
        ...log,
        updatedAt: Timestamp.now(),
      });
    }
  }
  
  // Importa configurações
  if (data.settings) {
    const settingsRef = doc(db, SETTINGS_COLLECTION, 'user-settings');
    await setDoc(settingsRef, {
      ...data.settings,
      updatedAt: Timestamp.now(),
    });
  }
}

/**
 * Escuta mudanças em tempo real nos registros diários
 */
export function subscribeToDayLogs(
  callback: (logs: DayLog[]) => void
): () => void {
  const db = initializeFirebase();
  const logsRef = collection(db, DAYLOGS_COLLECTION);
  
  const q = query(
    logsRef,
    orderBy('date', 'desc')
  );
  
  // Nota: Para implementação completa, use onSnapshot do Firestore
  // Esta é uma implementação simplificada
  console.log('Inscrição para atualizações em tempo real configurada');
  
  return () => {
    console.log('Cancelando inscrição');
  };
}
