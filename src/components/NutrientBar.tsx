import React from 'react';

interface NutrientBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

const NutrientBar: React.FC<NutrientBarProps> = ({ label, value, max, unit, color }) => {
  const percentage = Math.min(Math.round((value / max) * 100), 200);
  
  // Determinar cor da barra baseada no percentual
  const getBarColor = () => {
    if (percentage <= 80) return 'var(--color-success, #16a34a)';
    if (percentage <= 100) return 'var(--color-warning, #eab308)';
    return 'var(--color-danger, #ef4444)';
  };

  return (
    <div className="nutrient-bar-container" style={{ marginBottom: '12px' }}>
      <div className="nutrient-bar-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
        <span className="nutrient-label" style={{ fontWeight: 600 }}>{label}</span>
        <span className="nutrient-value">
          {value}{unit} <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>/ {max}{unit}</span>
        </span>
      </div>
      <div className="nutrient-bar-bg" style={{ height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          className="nutrient-bar-fill" 
          style={{ 
            height: '100%', 
            width: `${Math.min(percentage, 100)}%`, 
            backgroundColor: color || getBarColor(),
            transition: 'width 0.3s ease-in-out',
            borderRadius: '4px'
          }} 
        />
      </div>
      {percentage > 100 && (
        <div style={{ fontSize: '0.7rem', color: '#ef4444', textAlign: 'right', marginTop: '2px' }}>
          +{percentage - 100}% acima da meta
        </div>
      )}
    </div>
  );
};

export default NutrientBar;
