import { useState, useEffect, useCallback } from 'react';
import { type FoodItem } from '../types';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { commonFoods } from '../data/commonFoods';
import { useAuth } from '../auth/useAuth';

const FOODS_COLLECTION = 'foods';

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
      console.log(`[useFoodDatabase] Loading custom foods for user ${userId}`);
      const customFoods = await getCustomFoods(userId);
      
      // Combine common foods with custom foods
      const allFoods = [...commonFoods, ...customFoods];
      console.log(`[useFoodDatabase] Loaded ${allFoods.length} foods (${commonFoods.length} common + ${customFoods.length} custom)`);
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

  const addCustomFood = async (foodData: Omit<FoodItem, 'id' | 'isCustom'>) => {
    try {
      if (!user) return;
      const userId = user.uid;
      const foodsRef = collection(db, FOODS_COLLECTION);
      
      await addDoc(foodsRef, {
        ...foodData,
        userId,
        isCustom: true,
        createdAt: Timestamp.now(),
      });
      
      await refreshFoods();
    } catch (error) {
      console.error('Erro ao adicionar alimento customizado:', error);
      throw error;
    }
  };

  const deleteCustomFood = async (id: string) => {
    try {
      if (!user) return;
      const foodRef = doc(db, FOODS_COLLECTION, id);
      
      // Verify that the food belongs to the current user and is custom
      const food = foods.find(f => f.id === id);
      if (!food?.isCustom) {
        console.warn('Não é possível deletar alimentos padrão do sistema.');
        return;
      }
      
      await deleteDoc(foodRef);
      await refreshFoods();
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
    deleteCustomFood,
    refreshFoods
  };
}
