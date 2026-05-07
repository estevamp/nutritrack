import React, { useState } from 'react';
import type { FoodItem, NutrientInfo } from '../types';
import { X } from 'lucide-react';

type FoodCategory = FoodItem['category'];

interface AddCustomFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (food: Omit<FoodItem, 'id' | 'isCustom'>) => void;
}

const AddCustomFoodModal: React.FC<AddCustomFoodModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('other');
  const [servingLabel, setServingLabel] = useState('100g');
  const [nutrients, setNutrients] = useState<NutrientInfo>({
    calories: 0,
    protein: 0,
    carbs: 0,
    sugar: 0,
    fat: 0,
    saturatedFat: 0,
    fiber: 0,
    sodium: 0
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAdd({
      name,
      category,
      servingSize: 100, // Default base
      servingUnit: 'g',
      servingLabel,
      nutrients
    });

    // Reset form
    setName('');
    setNutrients({
      calories: 0,
      protein: 0,
      carbs: 0,
      sugar: 0,
      fat: 0,
      saturatedFat: 0,
      fiber: 0,
      sodium: 0
    });
    onClose();
  };

  const handleNutrientChange = (key: keyof NutrientInfo, value: string) => {
    const numValue = parseFloat(value) || 0;
    setNutrients(prev => ({ ...prev, [key]: numValue }));
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: '#ffffff', width: '90%', maxWidth: '400px', maxHeight: '90vh',
        borderRadius: '24px', padding: '24px', overflowY: 'auto', position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none' }}>
          <X />
        </button>

        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Novo Alimento</h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Nome</label>
            <input 
              type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="Ex: Whey Protein Morango"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Categoria</label>
              <select 
                value={category} onChange={e => setCategory(e.target.value as FoodCategory)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              >
                <option value="grain">Grãos</option>
                <option value="protein">Proteína</option>
                <option value="dairy">Laticínio</option>
                <option value="vegetable">Vegetal</option>
                <option value="fruit">Fruta</option>
                <option value="fat">Gordura</option>
                <option value="beverage">Bebida</option>
                <option value="snack">Lanche</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Porção</label>
              <input 
                type="text" value={servingLabel} onChange={e => setServingLabel(e.target.value)}
                placeholder="Ex: 1 scoop (30g)"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>Nutrientes (por porção)</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { key: 'calories', label: 'Calorias (kcal)' },
                { key: 'protein', label: 'Proteína (g)' },
                { key: 'carbs', label: 'Carbos (g)' },
                { key: 'fat', label: 'Gordura (g)' },
                { key: 'sugar', label: 'Açúcar (g)' },
                { key: 'fiber', label: 'Fibra (g)' },
                { key: 'sodium', label: 'Sódio (mg)' },
                { key: 'saturatedFat', label: 'Gord. Sat. (g)' },
              ].map(nut => (
                <div key={nut.key}>
                  <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>{nut.label}</label>
                  <input 
                    type="number" step="0.1" min="0"
                    value={nutrients[nut.key as keyof NutrientInfo]}
                    onChange={e => handleNutrientChange(nut.key as keyof NutrientInfo, e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            style={{ 
              marginTop: '12px', padding: '14px', borderRadius: '12px', border: 'none', 
              background: '#16a34a', color: '#fff', fontWeight: 600, cursor: 'pointer'
            }}
          >
            Salvar Alimento
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomFoodModal;
