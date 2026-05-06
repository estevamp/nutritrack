import { useState, useEffect, useCallback } from 'react';
import { type FoodItem } from '../types';
import * as db from '../services/db';
import { commonFoods } from '../data/commonFoods';

export function useFoodDatabase() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshFoods = useCallback(async () => {
    setIsLoading(true);
    try {
      const allFoods = await db.getAllFoods();
      
      // Se o banco estiver vazio, popula com os alimentos comuns
      if (allFoods.length === 0) {
        for (const food of commonFoods) {
          await db.saveFood(food);
        }
        const populatedFoods = await db.getAllFoods();
        setFoods(populatedFoods);
      } else {
        setFoods(allFoods);
      }
    } catch (error) {
      console.error('Erro ao carregar banco de alimentos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFoods();
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
    const newFood: FoodItem = {
      ...foodData,
      id: crypto.randomUUID(),
      isCustom: true
    };
    await db.saveFood(newFood);
    await refreshFoods();
  };

  const deleteCustomFood = async (id: string) => {
    const food = await db.getFoodById(id);
    if (food?.isCustom) {
      await db.deleteFood(id);
      await refreshFoods();
    } else {
      console.warn('Não é possível deletar alimentos padrão do sistema.');
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
