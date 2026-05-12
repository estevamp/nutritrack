import React, { useState, useEffect, useRef } from 'react';
import type { FoodItem, NutrientInfo } from '../types';
import { X, Sparkles, Loader2, Camera} from 'lucide-react';
import { searchFoodByName, type FoodSearchResult } from '../services/foodSearch';
import FoodSuggestionList from './FoodSuggestionList';
import NutritionCameraModal, { type ExtractedNutrition } from './NutritionCameraModal';

type FoodCategory = FoodItem['category'];

interface AddCustomFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (food: Omit<FoodItem, 'id' | 'isCustom'>) => void | Promise<FoodItem | void>;
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
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const nameInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nameInputRef.current && !nameInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  const handleSearch = async () => {
    if (name.trim().length < 3) return;

    setIsSearching(true);
    setSearchError(null);
    setShowSuggestions(true);

    try {
      const results = await searchFoodByName(name);
      setSearchResults(results);
      if (results.length === 0) {
        setSearchError('Nenhum resultado. Preencha manualmente.');
      }
    } catch (error) {
      setSearchError('Não foi possível buscar. Tente novamente.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSuggestion = (item: FoodSearchResult) => {
    setName(item.name);
    setCategory(item.category);
    setServingLabel(item.servingLabel);
    setNutrients(item.nutrients);
    setShowSuggestions(false);
    setSearchResults([]);
    setSearchError(null);
  };

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

  const handleExtractedNutrition = ( ExtractedNutrition) => {
    // Preencher todos os campos nutricionais
    setNutrients({
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      sugar: data.sugar,
      fat: data.fat,
      saturatedFat: data.saturatedFat,
      fiber: data.fiber,
      sodium: data.sodium,
    });

    // Preencher servingLabel e dados de porção
    setServingLabel(data.servingLabel);

    // Preencher nome se vier da IA e o campo estiver vazio
    if (data.name && !name) {
      setName(data.name);
    }
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
          <div ref={nameInputRef} style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Nome</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Ex: Whey Protein Morango"
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={name.trim().length < 3 || isSearching}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: name.trim().length < 3 || isSearching ? '#d1d5db' : '#16a34a',
                  color: '#fff',
                  cursor: name.trim().length < 3 || isSearching ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isSearching ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsCameraOpen(true)}
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px dashed #16a34a',
                background: '#f0fdf4',
                color: '#16a34a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: 500,
              }}
            >
              <Camera size={18} />
              Fotografar Tabela Nutricional
            </button>
            {showSuggestions && searchResults.length > 0 && (
              <FoodSuggestionList
                suggestions={searchResults}
                onSelect={handleSelectSuggestion}
              />
            )}
            {searchError && (
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px', marginBottom: 0 }}>
                {searchError}
              </p>
            )}
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

      <NutritionCameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onExtracted={handleExtractedNutrition}
      />      
    </div>
  );
};

export default AddCustomFoodModal;
