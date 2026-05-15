import { useState, useEffect, useCallback } from 'react';
import { type FoodItem } from '../types';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, Timestamp, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { commonFoods } from '../data/commonFoods';
import { useAuth } from '../auth/useAuth';

const FOODS_COLLECTION = 'foods';
const GLOBAL_FOOD_OVERRIDES_COLLECTION = 'globalFoodOverrides';
const GLOBAL_FOOD_DELETIONS_COLLECTION = 'globalFoodDeletions';

async function getCustomFoods(userId: string): Promise<FoodItem[]> {
  const foodsRef = collection(db, FOODS_COLLECTION);
  const q = query(
    foodsRef,
    where('userId', '==', userId),
    where('isCustom', '==', true)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as unknown as FoodItem));
}

async function getGlobalFoodOverrides(): Promise<FoodItem[]> {
  const snapshot = await getDocs(collection(db, GLOBAL_FOOD_OVERRIDES_COLLECTION));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    isCustom: false,
  } as unknown as FoodItem));
}

async function getGlobalFoodDeletionIds(): Promise<Set<string>> {
  const snapshot = await getDocs(collection(db, GLOBAL_FOOD_DELETIONS_COLLECTION));
  return new Set(snapshot.docs.map(doc => doc.id));
}

export function useFoodDatabase() {
  const { user } = useAuth();
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshFoods = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!user) {
        setFoods(commonFoods);
        return;
      }
      const userId = user.uid;
      console.log(`[useFoodDatabase] Loading foods for user ${userId}`);
      const [customFoods, globalOverrides, globalDeletionIds] = await Promise.all([
        getCustomFoods(userId),
        getGlobalFoodOverrides(),
        getGlobalFoodDeletionIds(),
      ]);

      const overridesById = new Map(globalOverrides.map(food => [food.id, food]));
      const globalFoods = commonFoods
        .filter(food => !globalDeletionIds.has(food.id))
        .map(food => overridesById.get(food.id) ?? food);
      
      const allFoods = [...globalFoods, ...customFoods];
      console.log(`[useFoodDatabase] Loaded ${allFoods.length} foods (${globalFoods.length} global + ${customFoods.length} custom)`);
      setFoods(allFoods);
    } catch (error) {
      console.error('[useFoodDatabase] Erro ao carregar banco de alimentos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void Promise.resolve().then(refreshFoods);
  }, [refreshFoods]);

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const searchFoods = useCallback((query: string) => {
    const normalizedQuery = normalizeText(query);
    
    return foods.filter(food => {
      const normalizedName = normalizeText(food.name);
      const normalizedCategory = normalizeText(food.category);
      return normalizedName.includes(normalizedQuery) || normalizedCategory.includes(normalizedQuery);
    });
  }, [foods]);

  const addCustomFood = async (foodData: Omit<FoodItem, 'id' | 'isCustom'>): Promise<FoodItem | undefined> => {
    try {
      if (!user) return;
      const userId = user.uid;
      const foodsRef = collection(db, FOODS_COLLECTION);
      
      const docRef = await addDoc(foodsRef, {
        ...foodData,
        userId,
        isCustom: true,
        createdAt: Timestamp.now(),
      });
      
      await refreshFoods();
      return {
        ...foodData,
        id: docRef.id,
        isCustom: true,
      };
    } catch (error) {
      console.error('Erro ao adicionar alimento customizado:', error);
      throw error;
    }
  };

  const updateFood = async (food: FoodItem): Promise<void> => {
    try {
      if (!user) return;
      const existingFood = foods.find(f => f.id === food.id);
      if (!existingFood) return;

      if (existingFood.isCustom) {
        const foodRef = doc(db, FOODS_COLLECTION, food.id);
        const snapshot = await getDoc(foodRef);
        if (!snapshot.exists() || snapshot.data().userId !== user.uid) {
          console.warn('Não é possível alterar alimento personalizado de outro usuário.');
          return;
        }

        await setDoc(foodRef, {
          ...food,
          userId: user.uid,
          isCustom: true,
          updatedAt: Timestamp.now(),
        }, { merge: true });
      } else {
        const overrideRef = doc(db, GLOBAL_FOOD_OVERRIDES_COLLECTION, food.id);
        await setDoc(overrideRef, {
          ...food,
          isCustom: false,
          updatedAt: Timestamp.now(),
        }, { merge: true });
      }
      
      await refreshFoods();
    } catch (error) {
      console.error('Erro ao atualizar alimento:', error);
      throw error;
    }
  };

  const deleteFood = async (id: string): Promise<void> => {
    try {
      if (!user) return;
      const food = foods.find(f => f.id === id);
      if (!food) return;

      if (food.isCustom) {
        const foodRef = doc(db, FOODS_COLLECTION, id);
        const snapshot = await getDoc(foodRef);
        if (!snapshot.exists() || snapshot.data().userId !== user.uid) {
          console.warn('Não é possível deletar alimento personalizado de outro usuário.');
          return;
        }

        await deleteDoc(foodRef);
      } else {
        await setDoc(doc(db, GLOBAL_FOOD_DELETIONS_COLLECTION, id), {
          foodId: id,
          deletedAt: Timestamp.now(),
          deletedBy: user.uid,
        });
      }

      await refreshFoods();
    } catch (error) {
      console.error('Erro ao deletar alimento:', error);
      throw error;
    }
  };

  const deleteCustomFood = async (id: string) => {
    try {
      const food = foods.find(f => f.id === id);
      if (!food?.isCustom) {
        await deleteFood(id);
        return;
      }

      await deleteFood(id);
    } catch (error) {
      console.error('Erro ao deletar alimento:', error);
      throw error;
    }
  };

  return {
    foods,
    isLoading,
    searchFoods,
    addCustomFood,
    updateFood,
    deleteFood,
    deleteCustomFood,
    refreshFoods
  };
}
