import React, { useState, useMemo } from 'react';
import { useFoodDatabase } from '../hooks/useFoodDatabase';
import { Search, Plus, Trash2, Info } from 'lucide-react';
import AddCustomFoodModal from '../components/AddCustomFoodModal';

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
  { id: 'other', label: 'Outros' },
];

const FoodsPage: React.FC = () => {
  const { foods, isLoading, addCustomFood, deleteCustomFood, searchFoods } = useFoodDatabase();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredFoods = useMemo(() => {
    let results = query ? searchFoods(query) : foods;
    if (selectedCategory !== 'all') {
      results = results.filter(f => f.category === selectedCategory);
    }
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }, [query, selectedCategory, foods, searchFoods]);

  if (isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;

  return (
    <div className="page-container" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Alimentos</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          style={{ 
            backgroundColor: '#16a34a', color: '#fff', border: 'none', 
            padding: '8px 16px', borderRadius: '12px', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
          }}
        >
          <Plus size={18} /> Novo
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
        <input 
          type="text" 
          placeholder="Buscar na base..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ 
            width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', 
            border: '1px solid #e5e7eb', fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ 
              whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '20px', border: '1px solid #e5e7eb',
              backgroundColor: selectedCategory === cat.id ? '#16a34a' : '#fff',
              color: selectedCategory === cat.id ? '#fff' : '#374151',
              fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="foods-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredFoods.map(food => (
          <div key={food.id} style={{ 
            backgroundColor: '#fff', padding: '16px', borderRadius: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600 }}>{food.name}</span>
                {food.isCustom && (
                  <span style={{ 
                    fontSize: '0.65rem', backgroundColor: '#dcfce7', color: '#166534', 
                    padding: '2px 6px', borderRadius: '4px', fontWeight: 700
                  }}>MEU</span>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>
                {food.servingLabel} • {food.nutrients.calories} kcal • {food.nutrients.protein}g prot
              </div>
            </div>
            
            {food.isCustom ? (
              <button 
                onClick={() => deleteCustomFood(food.id)}
                aria-label={`Excluir ${food.name}`}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
              >
                <Trash2 size={18} />
              </button>
            ) : (
              <div style={{ color: '#9ca3af', padding: '8px' }}><Info size={18} /></div>
            )}
          </div>
        ))}
      </div>

      <AddCustomFoodModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={addCustomFood} 
      />
    </div>
  );
};

export default FoodsPage;
