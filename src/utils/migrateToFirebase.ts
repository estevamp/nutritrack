import { db } from '../services/firebase';
import { collection, writeBatch, doc, setDoc, query, where, getDocs } from 'firebase/firestore';

/**
 * Interface para tipagem dos dados
 */
interface Food {
  id?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  servingSize?: string;
}

interface Meal {
  id?: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: string[]; // IDs dos alimentos
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
}

interface DayLog {
  id?: string;
  date: string;
  meals: Meal[];
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
}

/**
 * Lê todos os dados do IndexedDB
 */
async function getAllDataFromIndexedDB(): Promise<{
  foods: Food[];
  meals: Meal[];
  dayLogs: DayLog[];
}> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NutriTrackDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const foods: Food[] = [];
      const meals: Meal[] = [];
      const dayLogs: DayLog[] = [];

      // Ler alimentos
      const foodStore = db.transaction('foods', 'readonly').objectStore('foods');
      const foodRequest = foodStore.getAll();

      foodRequest.onsuccess = () => {
        foods.push(...foodRequest.result);

        // Ler refeições
        const mealStore = db.transaction('meals', 'readonly').objectStore('meals');
        const mealRequest = mealStore.getAll();

        mealRequest.onsuccess = () => {
          meals.push(...mealRequest.result);

          // Ler logs diários
          const logStore = db.transaction('dayLogs', 'readonly').objectStore('dayLogs');
          const logRequest = logStore.getAll();

          logRequest.onsuccess = () => {
            dayLogs.push(...logRequest.result);
            resolve({ foods, meals, dayLogs });
          };

          logRequest.onerror = () => reject(logRequest.error);
        };

        mealRequest.onerror = () => reject(mealRequest.error);
      };

      foodRequest.onerror = () => reject(foodRequest.error);
    };
  });
}

/**
 * Importa alimentos para o Firebase
 */
async function importFoodsToFirebase(foods: Food[]): Promise<void> {
  if (foods.length === 0) {
    console.log('⚠️ Nenhum alimento para importar');
    return;
  }

  try {
    const batch = writeBatch(db);
    const foodsRef = collection(db, 'foods');

    foods.forEach((food) => {
      const docRef = doc(foodsRef);
      batch.set(docRef, {
        ...food,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await batch.commit();
    console.log(`✅ ${foods.length} alimentos importados com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao importar alimentos:', error);
    throw error;
  }
}

/**
 * Importa refeições para o Firebase
 */
async function importMealsToFirebase(meals: Meal[]): Promise<void> {
  if (meals.length === 0) {
    console.log('⚠️ Nenhuma refeição para importar');
    return;
  }

  try {
    const batch = writeBatch(db);
    const mealsRef = collection(db, 'meals');

    meals.forEach((meal) => {
      const docRef = doc(mealsRef);
      batch.set(docRef, {
        ...meal,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await batch.commit();
    console.log(`✅ ${meals.length} refeições importadas com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao importar refeições:', error);
    throw error;
  }
}

/**
 * Importa logs diários para o Firebase
 */
async function importDayLogsToFirebase(dayLogs: DayLog[]): Promise<void> {
  if (dayLogs.length === 0) {
    console.log('⚠️ Nenhum log diário para importar');
    return;
  }

  try {
    const batch = writeBatch(db);
    const logsRef = collection(db, 'dayLogs');

    dayLogs.forEach((log) => {
      const docRef = doc(logsRef);
      batch.set(docRef, {
        ...log,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await batch.commit();
    console.log(`✅ ${dayLogs.length} logs diários importados com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao importar logs diários:', error);
    throw error;
  }
}

/**
 * Função principal de migração
 * Executa a migração completa do IndexedDB para Firebase
 */
export async function migrateIndexedDBToFirebase(): Promise<{
  success: boolean;
  foodsCount: number;
  mealsCount: number;
  logsCount: number;
  error?: string;
}> {
  try {
    console.log('🚀 Iniciando migração do IndexedDB para Firebase...');

    // 1. Ler dados do IndexedDB
    console.log('📖 Lendo dados do IndexedDB...');
    const { foods, meals, dayLogs } = await getAllDataFromIndexedDB();

    console.log(`📊 Dados encontrados:`);
    console.log(`   - ${foods.length} alimentos`);
    console.log(`   - ${meals.length} refeições`);
    console.log(`   - ${dayLogs.length} logs diários`);

    // 2. Importar para Firebase
    console.log('📤 Enviando dados para Firebase...');
    await importFoodsToFirebase(foods);
    await importMealsToFirebase(meals);
    await importDayLogsToFirebase(dayLogs);

    console.log('✨ Migração concluída com sucesso!');

    return {
      success: true,
      foodsCount: foods.length,
      mealsCount: meals.length,
      logsCount: dayLogs.length,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('❌ Erro durante a migração:', errorMessage);
    return {
      success: false,
      foodsCount: 0,
      mealsCount: 0,
      logsCount: 0,
      error: errorMessage,
    };
  }
}

/**
 * Verifica se há dados no Firebase
 */
export async function checkFirebaseData(): Promise<{
  foodsCount: number;
  mealsCount: number;
  logsCount: number;
}> {
  try {
    const foodsSnapshot = await getDocs(collection(db, 'foods'));
    const mealsSnapshot = await getDocs(collection(db, 'meals'));
    const logsSnapshot = await getDocs(collection(db, 'dayLogs'));

    return {
      foodsCount: foodsSnapshot.size,
      mealsCount: mealsSnapshot.size,
      logsCount: logsSnapshot.size,
    };
  } catch (error) {
    console.error('❌ Erro ao verificar dados do Firebase:', error);
    return {
      foodsCount: 0,
      mealsCount: 0,
      logsCount: 0,
    };
  }
}

/**
 * Limpa dados do Firebase (use com cuidado!)
 */
export async function clearFirebaseData(): Promise<void> {
  try {
    console.log('⚠️ Limpando dados do Firebase...');

    const collections = ['foods', 'meals', 'dayLogs'];

    for (const collectionName of collections) {
      const snapshot = await getDocs(collection(db, collectionName));
      const batch = writeBatch(db);

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    }

    console.log('✅ Dados do Firebase limpos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao limpar dados do Firebase:', error);
    throw error;
  }
}
