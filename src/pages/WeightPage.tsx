import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Save, Scale, Trash2 } from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import { deleteWeightEntry, getSettings, getWeightEntries, saveWeightEntry } from '../services/db';
import type { WeightEntry } from '../types';

const WeightPage: React.FC = () => {
  const { user } = useAuth();
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [targetWeightKg, setTargetWeightKg] = useState<number | null>(null);
  const [weightDate, setWeightDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [weightKg, setWeightKg] = useState('');
  const [weightError, setWeightError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingWeight, setIsSavingWeight] = useState(false);
  const userId = user?.uid ?? null;

  useEffect(() => {
    const loadWeightData = async () => {
      if (!userId) {
        setWeightEntries([]);
        setTargetWeightKg(null);
        setIsLoading(false);
        return;
      }

      const [weights, settings] = await Promise.all([
        getWeightEntries(userId),
        getSettings(userId),
      ]);

      setWeightEntries(weights);
      setTargetWeightKg(settings?.targetWeightKg ?? null);
      setIsLoading(false);
    };

    loadWeightData();
  }, [userId]);

  const refreshWeightEntries = async () => {
    if (!userId) return;
    const weights = await getWeightEntries(userId);
    setWeightEntries(weights);
  };

  const handleSaveWeight = async () => {
    if (!userId) return;

    const parsedWeight = Number(weightKg);
    if (!weightDate || !Number.isFinite(parsedWeight) || parsedWeight <= 0) {
      setWeightError('Informe uma data e um peso válido.');
      return;
    }

    setWeightError('');
    setIsSavingWeight(true);
    try {
      await saveWeightEntry(userId, {
        date: weightDate,
        weightKg: Number(parsedWeight.toFixed(1)),
      });
      setWeightKg('');
      await refreshWeightEntries();
    } finally {
      setIsSavingWeight(false);
    }
  };

  const handleDeleteWeight = async (date: string) => {
    if (!userId) return;
    await deleteWeightEntry(userId, date);
    await refreshWeightEntries();
  };

  const weightChartData = useMemo(() => {
    return [...weightEntries]
      .reverse()
      .map(entry => ({
        name: format(parseISO(entry.date), 'dd/MM'),
        weight: entry.weightKg,
        targetWeight: targetWeightKg ?? undefined,
      }));
  }, [targetWeightKg, weightEntries]);

  if (isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;

  return (
    <div className="page-container" style={{ padding: '16px' }}>
      <h2 style={{ marginBottom: '20px' }}>Peso</h2>

      <div style={{
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#e0f2fe', padding: '10px', borderRadius: '12px' }}>
            <Scale color="#0284c7" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Nova pesagem</h3>
            {targetWeightKg && (
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>
                Peso alvo: {targetWeightKg.toLocaleString('pt-BR')} kg
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Data da pesagem</label>
            <input
              type="date"
              value={weightDate}
              onChange={e => setWeightDate(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>Peso (kg)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              value={weightKg}
              onChange={e => setWeightKg(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
          </div>
        </div>

        {weightError && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px' }}>
            {weightError}
          </div>
        )}

        <button
          onClick={handleSaveWeight}
          disabled={isSavingWeight}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#0284c7',
            color: '#fff',
            fontWeight: 600,
            cursor: isSavingWeight ? 'not-allowed' : 'pointer',
            opacity: isSavingWeight ? 0.75 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Save size={18} /> {isSavingWeight ? 'Salvando...' : 'Salvar Pesagem'}
        </button>
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        {weightEntries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '28px 0', color: '#9ca3af' }}>
            Cadastre sua primeira pesagem para acompanhar a evolução do peso.
          </div>
        ) : (
          <>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>Evolução do peso</h3>
            <div style={{ width: '100%', minWidth: 0, height: 240, minHeight: 240 }}>
              <ResponsiveContainer width="100%" height={240} minWidth={0} debounce={50}>
                <LineChart data={weightChartData} margin={{ top: 4, right: 8, bottom: 0, left: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip
                    formatter={(value, name) => [`${Number(value).toLocaleString('pt-BR')} kg`, name === 'targetWeight' ? 'Peso alvo' : 'Peso']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontWeight: 600 }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#0284c7" strokeWidth={3} dot={{ r: 3, fill: '#0284c7' }} activeDot={{ r: 5 }} />
                  {targetWeightKg && (
                    <Line type="monotone" dataKey="targetWeight" stroke="#94a3b8" strokeDasharray="5 5" dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {weightEntries.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#6b7280' }}>Pesagens recentes</h4>
          {weightEntries.map(entry => (
            <div
              key={entry.date}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>
                  {entry.weightKg.toLocaleString('pt-BR')} kg
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {format(parseISO(entry.date), "d 'de' MMMM", { locale: ptBR })}
                </div>
              </div>
              <button
                onClick={() => handleDeleteWeight(entry.date)}
                aria-label="Excluir pesagem"
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
};

export default WeightPage;
