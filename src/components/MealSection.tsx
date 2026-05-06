import React from 'react';
import type { MealType, MealEntry } from '../types';
import { Plus, Trash2, Edit2, Coffee, Utensils, Moon, Apple } from 'lucide-react';

interface MealSectionProps {
  mealType: MealType;
  entries: MealEntry[];
  onAdd: () => void;
  onRemove: (entryId: string) => void;
  onEdit: (entry: MealEntry) => void;
}

const mealConfig = {
  breakfast: { label: 'Café da Manhã', icon: Coffee, color: '#f59e0b' },
  lunch: { label: 'Almoço', icon: Utensils, color: '#10b981' },
  dinner: { label: 'Jantar', icon: Moon, color: '#6366f1' },
  snack: { label: 'Lanches', icon: Apple, color: '#ec4899' },
};

const MealSection: React.FC<MealSectionProps> = ({ mealType, entries, onAdd, onRemove, onEdit }) => {
  const config = mealConfig[mealType];
  const Icon = config.icon;

  const mealCalories = entries.reduce((acc, curr) => acc + curr.nutrients.calories, 0);
  const mealProtein = entries.reduce((acc, curr) => acc + curr.nutrients.protein, 0);

  return (
    <div className="meal-section" style={{ 
      backgroundColor: '#ffffff', 
      borderRadius: '16px', 
      padding: '16px', 
      boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.06)',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            backgroundColor: `${config.color}20`, 
            padding: '8px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={20} color={config.color} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{config.label}</h4>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              {mealCalories} kcal • {mealProtein.toFixed(1)}g prot
            </span>
          </div>
        </div>
        <button 
          onClick={onAdd}
          aria-label={`Adicionar alimento ao ${config.label}`}
          style={{ 
            backgroundColor: '#f3f4f6', 
            border: 'none', 
            borderRadius: '50%', 
            width: '32px', 
            height: '32px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#374151'
          }}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="meal-entries">
        {entries.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', textAlign: 'center', margin: '12px 0' }}>
            Nenhum alimento adicionado
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {entries.map((entry) => (
              <li key={entry.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '8px 0',
                borderTop: '1px solid #f3f4f6'
              }}>
                <div style={{ flex: 1 }} onClick={() => onEdit(entry)} role="button" tabIndex={0}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{entry.foodName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {entry.servingsConsumed} porção(ões) • {entry.nutrients.calories} kcal
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button 
                    onClick={() => onEdit(entry)}
                    aria-label={`Editar ${entry.foodName}`}
                    style={{ 
                      backgroundColor: 'transparent', 
                      border: 'none', 
                      color: '#6b7280', 
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onRemove(entry.id)}
                    aria-label={`Remover ${entry.foodName}`}
                    style={{ 
                      backgroundColor: 'transparent', 
                      border: 'none', 
                      color: '#ef4444', 
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MealSection;
