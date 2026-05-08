import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useDayLog } from '../hooks/useDayLog';
import NutrientSummaryCard from '../components/NutrientSummaryCard';
import MealSection from '../components/MealSection';
import FoodSearchModal from '../components/FoodSearchModal';
import type { MealType, FoodItem, MealEntry } from '../types';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  
  const { dayLog, isLoading, addFood, removeEntry, updateEntry, totals } = useDayLog(dateStr);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMeal, setActiveMeal] = useState<MealType>('breakfast');
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MealEntry | null>(null);

  const handlePrevDay = () => setSelectedDate(subDays(selectedDate, 1));
  const handleNextDay = () => setSelectedDate(addDays(selectedDate, 1));

  const openSearch = (meal: MealType) => {
    setActiveMeal(meal);
    setEditingEntry(null);
    setShowMealSelector(false);
    setIsSearchOpen(true);
  };

  const openMealRegistration = () => {
    setActiveMeal('breakfast');
    setEditingEntry(null);
    setShowMealSelector(true);
    setIsSearchOpen(true);
  };

  const handleEdit = (meal: MealType, entry: MealEntry) => {
    setActiveMeal(meal);
    setEditingEntry(entry);
    setShowMealSelector(false);
    setIsSearchOpen(true);
  };

  const handleSelectFood = (food: FoodItem, servings: number) => {
    if (editingEntry) {
      updateEntry(activeMeal, editingEntry.id, servings);
    } else {
      addFood(activeMeal, food, servings);
    }
    setEditingEntry(null);
  };

  if (isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;

  return (
    <div className="page-container" style={{ padding: '16px' }}>
      {/* Date Selector */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        backgroundColor: '#fff',
        padding: '12px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <button onClick={handlePrevDay} aria-label="Dia anterior" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft /></button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </div>
          {format(new Date(), 'yyyy-MM-dd') === dateStr && (
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>HOJE</div>
          )}
        </div>
        <button onClick={handleNextDay} aria-label="Próximo dia" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronRight /></button>
      </div>

      {dayLog && <NutrientSummaryCard totals={totals} goals={dayLog.goals} />}

      <div className="meals-container">
        <MealSection 
          mealType="breakfast" 
          entries={dayLog?.meals.breakfast || []} 
          onAdd={() => openSearch('breakfast')} 
          onRemove={(id) => removeEntry('breakfast', id)} 
          onEdit={(entry) => handleEdit('breakfast', entry)}
        />
        <MealSection 
          mealType="lunch" 
          entries={dayLog?.meals.lunch || []} 
          onAdd={() => openSearch('lunch')} 
          onRemove={(id) => removeEntry('lunch', id)} 
          onEdit={(entry) => handleEdit('lunch', entry)}
        />
        <MealSection 
          mealType="dinner" 
          entries={dayLog?.meals.dinner || []} 
          onAdd={() => openSearch('dinner')} 
          onRemove={(id) => removeEntry('dinner', id)} 
          onEdit={(entry) => handleEdit('dinner', entry)}
        />
        <MealSection 
          mealType="snack" 
          entries={dayLog?.meals.snack || []} 
          onAdd={() => openSearch('snack')} 
          onRemove={(id) => removeEntry('snack', id)} 
          onEdit={(entry) => handleEdit('snack', entry)}
        />
      </div>

      {/* FAB for registering a meal */}
      <button 
        onClick={openMealRegistration}
        aria-label="Cadastrar refeição"
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '28px',
          backgroundColor: '#16a34a',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 90
        }}
      >
        <Plus size={28} />
      </button>

      <FoodSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => {
          setIsSearchOpen(false);
          setEditingEntry(null);
          setShowMealSelector(false);
        }} 
        onSelectFood={handleSelectFood} 
        editingEntry={editingEntry}
        selectedMeal={activeMeal}
        onSelectMeal={setActiveMeal}
        showMealSelector={showMealSelector}
      />
    </div>
  );
};

export default HomePage;
