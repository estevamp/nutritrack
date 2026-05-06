import React from 'react';
import type { NutrientInfo, NutrientGoals } from '../types';
import NutrientBar from './NutrientBar';

interface NutrientSummaryCardProps {
  totals: NutrientInfo;
  goals: NutrientGoals;
}

const NutrientSummaryCard: React.FC<NutrientSummaryCardProps> = ({ totals, goals }) => {
  return (
    <div className="summary-card" style={{ 
      backgroundColor: '#ffffff', 
      borderRadius: '16px', 
      padding: '16px', 
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.1rem', color: '#111827' }}>Resumo do Dia</h3>
      
      <div className="nutrients-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px' 
      }}>
        <NutrientBar 
          label="Calorias" 
          value={totals.calories} 
          max={goals.calories} 
          unit="kcal" 
          color="var(--color-calories, #f97316)" 
        />
        <NutrientBar 
          label="Proteínas" 
          value={totals.protein} 
          max={goals.protein} 
          unit="g" 
          color="var(--color-protein, #3b82f6)" 
        />
        <NutrientBar 
          label="Carbos" 
          value={totals.carbs} 
          max={goals.carbs} 
          unit="g" 
          color="var(--color-carbs, #eab308)" 
        />
        <NutrientBar 
          label="Gorduras" 
          value={totals.fat} 
          max={goals.fat} 
          unit="g" 
          color="var(--color-fat, #ec4899)" 
        />
        <NutrientBar 
          label="Açúcar" 
          value={totals.sugar} 
          max={goals.sugar} 
          unit="g" 
          color="var(--color-sugar, #a855f7)" 
        />
        <NutrientBar 
          label="Fibras" 
          value={totals.fiber} 
          max={goals.fiber} 
          unit="g" 
          color="var(--color-fiber, #14b8a6)" 
        />
        <NutrientBar 
          label="Sódio" 
          value={totals.sodium} 
          max={goals.sodium} 
          unit="mg" 
          color="var(--color-sodium, #6b7280)" 
        />
      </div>
    </div>
  );
};

export default NutrientSummaryCard;
