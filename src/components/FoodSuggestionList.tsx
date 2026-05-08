import React from 'react';

export interface FoodSearchResult {
  name: string;
  brand?: string;
  category: string;

  servingLabel: string;
  servingSize: number;
  servingUnit: string;

  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    sugar: number;
    fat: number;
    saturatedFat: number;
    fiber: number;
    sodium: number;
  };

  displayLabel: string;
}

interface FoodSuggestionListProps {
  suggestions: FoodSearchResult[];
  onSelect: (item: FoodSearchResult) => void;
}

const FoodSuggestionList: React.FC<FoodSuggestionListProps> = ({
  suggestions,
  onSelect,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <ul
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        listStyle: 'none',
        padding: 0,
        margin: '4px 0 0 0',
        zIndex: 100,
        maxHeight: '200px',
        overflowY: 'auto',
      }}
    >
      {suggestions.map((item, index) => (
        <li
          key={`${item.name}-${index}`}
          onClick={() => onSelect(item)}
          style={{
            padding: '10px 12px',
            cursor: 'pointer',
            borderBottom:
              index < suggestions.length - 1
                ? '1px solid #f3f4f6'
                : 'none',
            fontSize: '0.875rem',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          <div
            style={{
              fontWeight: 500,
              color: '#111827',
              marginBottom: '2px',
            }}
          >
            {item.name}
          </div>

          <div
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap',
            }}
          >
            {item.brand && <span>{item.brand} •</span>}

            <span>{item.nutrients.calories} cal</span>

            <span>•</span>

            <span>{item.servingLabel}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FoodSuggestionList;
