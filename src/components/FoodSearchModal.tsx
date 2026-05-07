import React, { useState, useMemo, useEffect } from 'react';
import type { FoodItem, NutrientInfo, MealEntry } from '../types';
import { useFoodDatabase } from '../hooks/useFoodDatabase';
import { Search, X, ChevronRight, Plus, Minus, Edit2 } from 'lucide-react';

interface FoodSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (food: FoodItem, servings: number) => void;
  editingEntry?: MealEntry | null;
}

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'grain', label: 'Grãos' },
  { id: 'protein', label: 'Proteínas' },
  { id: 'dairy', label: 'Laticínios' },
  { id: 'vegetable', label: 'Vegetais' },
  { id: 'fruit', label: 'Frutas' },
  { id: 'fat', label: 'Gorduras' },
  { id: 'beverage', label: 'Bebidas' },
  { id: 'snack', label: 'Lanches' },
];

const FoodSearchModal: React.FC<FoodSearchModalProps> = ({ isOpen, onClose, onSelectFood, editingEntry }) => {
  const { foods, searchFoods } = useFoodDatabase();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState(1);
  const [activeTab, setActiveTab] = useState<'all' | 'custom'>('all');

  // When editing an entry, pre-populate the modal with the food and servings
  useEffect(() => {
    if (editingEntry && isOpen) {
      // Find the food in the database
      const food = foods.find(f => f.id === editingEntry.foodId);
      if (food) {
        queueMicrotask(() => {
          setSelectedFood(food);
          setServings(editingEntry.servingsConsumed);
        });
      }
    } else if (!editingEntry) {
      queueMicrotask(() => {
        setSelectedFood(null);
        setServings(1);
      });
    }
  }, [editingEntry, isOpen, foods]);

  // Debounce search
  const filteredFoods = useMemo(() => {
    let results = query ? searchFoods(query) : foods;
    
    if (selectedCategory !== 'all') {
      results = results.filter(f => f.category === selectedCategory);
    }
    
    if (activeTab === 'custom') {
      results = results.filter(f => f.isCustom);
    }
    
    return results;
  }, [query, selectedCategory, activeTab, foods, searchFoods]);

  if (!isOpen) return null;

  const handleSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setServings(1);
  };

  const handleConfirm = () => {
    if (selectedFood) {
      onSelectFood(selectedFood, servings);
      setSelectedFood(null);
      setQuery('');
      onClose();
    }
  };

  const calculatePreview = (nutrients: NutrientInfo, qty: number) => {
    return {
      calories: Math.round(nutrients.calories * qty),
      protein: (nutrients.protein * qty).toFixed(1)
    };
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '480px',
        height: '90vh',
        margin: '0 auto',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{editingEntry ? 'Editar Alimento' : 'Adicionar Alimento'}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
        </div>

        {!selectedFood ? (
          <>
            {/* Search & Tabs */}
            <div style={{ padding: '16px' }}>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar alimento..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 12px 12px 40px', 
                    borderRadius: '12px', 
                    border: '1px solid #e5e7eb',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button 
                  onClick={() => setActiveTab('all')}
                  style={{ 
                    flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
                    backgroundColor: activeTab === 'all' ? '#16a34a' : '#f3f4f6',
                    color: activeTab === 'all' ? '#fff' : '#374151',
                    fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setActiveTab('custom')}
                  style={{ 
                    flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
                    backgroundColor: activeTab === 'custom' ? '#16a34a' : '#f3f4f6',
                    color: activeTab === 'custom' ? '#fff' : '#374151',
                    fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Meus Alimentos
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{ 
                      whiteSpace: 'nowrap', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e5e7eb',
                      backgroundColor: selectedCategory === cat.id ? '#16a34a' : '#fff',
                      color: selectedCategory === cat.id ? '#fff' : '#374151',
                      fontSize: '0.85rem', cursor: 'pointer'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
              {filteredFoods.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                  Nenhum alimento encontrado
                </div>
              ) : (
                filteredFoods.map(food => (
                  <div 
                    key={food.id} 
                    onClick={() => handleSelect(food)}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      padding: '12px 0', borderBottom: '1px solid #f3f4f6', cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500 }}>{food.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {food.servingLabel} • {food.nutrients.calories} kcal
                      </div>
                    </div>
                    <ChevronRight size={18} color="#9ca3af" />
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* Selection Detail */
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 8px 0' }}>{selectedFood.name}</h2>
              <p style={{ color: '#6b7280', margin: 0 }}>{selectedFood.servingLabel}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
              <button 
                onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Minus />
              </button>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{servings}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>porções</div>
              </div>
              <button 
                onClick={() => setServings(servings + 0.5)}
                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Plus />
              </button>
            </div>

            <div style={{ 
              backgroundColor: '#f9fafb', padding: '16px', borderRadius: '16px',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f97316' }}>
                  {calculatePreview(selectedFood.nutrients, servings).calories}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>kcal</div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>
                  {calculatePreview(selectedFood.nutrients, servings).protein}g
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>proteína</div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setSelectedFood(null)}
                style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff', fontWeight: 600 }}
              >
                Voltar
              </button>
              <button 
                onClick={handleConfirm}
                style={{ flex: 2, padding: '14px', borderRadius: '12px', border: 'none', background: '#16a34a', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {editingEntry ? <><Edit2 size={18} /> Salvar</> : <><Plus size={18} /> Adicionar</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodSearchModal;
