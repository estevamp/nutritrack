import React, { useEffect, useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getRecentLogs, getDayLog } from '.././services/db';
import { type DayLog, type MealType, type NutrientGoals } from '../types';
import { Calendar, ChevronRight, Edit2, Trash2, X } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

type TrackedNutrient = keyof NutrientGoals;

const nutrientCharts: Array<{
  key: TrackedNutrient;
  goalKey: `${TrackedNutrient}Meta`;
  title: string;
  unit: string;
  color: string;
}> = [
  { key: 'protein', goalKey: 'proteinMeta', title: 'Proteínas', unit: 'g', color: 'var(--color-protein, #3b82f6)' },
  { key: 'sugar', goalKey: 'sugarMeta', title: 'Açúcares', unit: 'g', color: 'var(--color-sugar, #a855f7)' },
  { key: 'fat', goalKey: 'fatMeta', title: 'Gorduras', unit: 'g', color: 'var(--color-fat, #ec4899)' },
  { key: 'carbs', goalKey: 'carbsMeta', title: 'Carbo', unit: 'g', color: 'var(--color-carbs, #eab308)' },
  { key: 'fiber', goalKey: 'fiberMeta', title: 'Fibras', unit: 'g', color: 'var(--color-fiber, #14b8a6)' },
  { key: 'sodium', goalKey: 'sodiumMeta', title: 'Sódio', unit: 'mg', color: 'var(--color-sodium, #6b7280)' },
];

const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editingLog, setEditingLog] = useState<DayLog | null>(null);
  const userId = user?.uid ?? null;

  useEffect(() => {
    const loadHistory = async () => {
      if (!userId) {
        setLogs([]);
        setIsLoading(false);
        return;
      }
      const recentLogs = await getRecentLogs(userId, 30);
      setLogs(recentLogs);
      setIsLoading(false);
    };
    loadHistory();
  }, [userId]);

  const handleEditDay = async (date: string) => {
    if (!userId) return;
    const log = await getDayLog(userId, date);
    if (log) {
      setEditingDate(date);
      setEditingLog(log);
    }
  };

  const handleCloseEdit = () => {
    setEditingDate(null);
    setEditingLog(null);
  };

  const handleDeleteEntry = (mealType: MealType, entryId: string) => {
    if (!editingLog) return;
    
    const updatedLog = { ...editingLog };
    updatedLog.meals[mealType] = updatedLog.meals[mealType].filter(e => e.id !== entryId);
    
    // Recalculate totals
    const allEntries = [
      ...updatedLog.meals.breakfast,
      ...updatedLog.meals.lunch,
      ...updatedLog.meals.dinner,
      ...updatedLog.meals.snack
    ];

    updatedLog.totals = allEntries.reduce((acc, curr) => ({
      calories: acc.calories + curr.nutrients.calories,
      protein: acc.protein + curr.nutrients.protein,
      carbs: acc.carbs + curr.nutrients.carbs,
      sugar: acc.sugar + curr.nutrients.sugar,
      fat: acc.fat + curr.nutrients.fat,
      saturatedFat: acc.saturatedFat + curr.nutrients.saturatedFat,
      fiber: acc.fiber + curr.nutrients.fiber,
      sodium: acc.sodium + curr.nutrients.sodium,
    }), { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 });

    setEditingLog(updatedLog);
  };

  const handleSaveEdits = async () => {
    if (!editingLog || !editingDate || !userId) return;
    
    const { saveDayLog } = await import('.././services/db');
    await saveDayLog(userId, editingLog);
    
    // Reload logs to reflect changes
    const recentLogs = await getRecentLogs(userId, 30);
    setLogs(recentLogs);
    handleCloseEdit();
  };

  const chartData = useMemo(() => {
    return [...logs]
      .reverse()
      .slice(-7)
      .map(log => ({
        name: format(parseISO(log.date), 'dd/MM'),
        calories: log.totals.calories,
        caloriesMeta: log.goals.calories,
        protein: log.totals.protein,
        proteinMeta: log.goals.protein,
        sugar: log.totals.sugar,
        sugarMeta: log.goals.sugar,
        fat: log.totals.fat,
        fatMeta: log.goals.fat,
        carbs: log.totals.carbs,
        carbsMeta: log.goals.carbs,
        fiber: log.totals.fiber,
        fiberMeta: log.goals.fiber,
        sodium: log.totals.sodium,
        sodiumMeta: log.goals.sodium,
      }));
  }, [logs]);

  const renderChart = (
    title: string,
    dataKey: string,
    goalKey: string,
    color: string,
    unit: string,
    height: number,
    strokeWidth: number
  ) => (
    <>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#6b7280' }}>
        {title} (Últimos 7 dias)
      </h4>
      <div style={{ width: '100%', minWidth: 0, height, minHeight: height }}>
        <ResponsiveContainer width="100%" height={height} minWidth={0} debounce={50}>
          <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis hide />
            <Tooltip
              formatter={(value, name) => [`${Number(value).toLocaleString('pt-BR')} ${unit}`, name === goalKey ? 'Meta' : title]}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={strokeWidth} dot={{ r: 3, fill: color }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey={goalKey} stroke="#e5e7eb" strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  if (isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;

  return (
    <div className="page-container" style={{ padding: '16px' }}>
      <h2 style={{ marginBottom: '20px' }}>Histórico</h2>

      {/* Chart Section */}
      <div style={{ 
        backgroundColor: '#fff', padding: '16px', borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' 
      }}>
        {renderChart('Calorias', 'calories', 'caloriesMeta', 'var(--color-calories, #f97316)', 'kcal', 200, 3)}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        {nutrientCharts.map(chart => (
          <div
            key={chart.key}
            style={{
              backgroundColor: '#fff',
              padding: '12px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              minWidth: 0
            }}
          >
            {renderChart(chart.title, chart.key, chart.goalKey, chart.color, chart.unit, 140, 2)}
          </div>
        ))}
      </div>

      {/* List Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#6b7280' }}>Últimos 30 registros de alimentação</h4>
        {logs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
            Nenhum registro encontrado nos últimos 30 dias.
          </div>
        ) : (
          logs.map(log => {
            const percent = Math.round((log.totals.calories / log.goals.calories) * 100);
            return (
              <div key={log.date} style={{ 
                backgroundColor: '#fff', padding: '16px', borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '10px' }}>
                    <Calendar size={20} color="#6b7280" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {format(parseISO(log.date), "d 'de' MMMM", { locale: ptBR })}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {log.totals.calories} / {log.goals.calories} kcal ({percent}%)
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleEditDay(log.date)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '8px',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className="edit-btn"
                  >
                    <Edit2 size={18} color="#3b82f6" />
                  </button>
                  <div style={{ 
                    width: '40px', height: '4px', backgroundColor: '#f3f4f6', borderRadius: '2px', overflow: 'hidden'
                  }}>
                    <div style={{ 
                      height: '100%', width: `${Math.min(percent, 100)}%`, 
                      backgroundColor: percent > 100 ? '#ef4444' : '#16a34a' 
                    }} />
                  </div>
                  <ChevronRight size={18} color="#9ca3af" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Modal */}
      {editingLog && editingDate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>
                Editar {format(parseISO(editingDate), "d 'de' MMMM", { locale: ptBR })}
              </h3>
              <button
                onClick={handleCloseEdit}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>

            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map(mealType => {
              const mealNames: Record<MealType, string> = {
                breakfast: 'Café da Manhã',
                lunch: 'Almoço',
                dinner: 'Jantar',
                snack: 'Lanche'
              };

              const entries = editingLog.meals[mealType];

              return (
                <div key={mealType} style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#374151' }}>
                    {mealNames[mealType]}
                  </h4>
                  {entries.length === 0 ? (
                    <div style={{ padding: '12px', color: '#9ca3af', fontSize: '0.9rem' }}>
                      Nenhum alimento registrado
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {entries.map(entry => (
                        <div
                          key={entry.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 500 }}>{entry.foodName}</div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                              {entry.nutrients.calories} kcal • {entry.servingsConsumed}x
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteEntry(mealType, entry.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '8px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ef4444'
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{
              borderTop: '1px solid #e5e7eb',
              paddingTop: '16px',
              marginTop: '20px',
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleCloseEdit}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdits}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
