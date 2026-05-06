import React, { useEffect, useState } from 'react';
import { format, parseISO, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getRecentLogs } from '../services/db';
import { DayLog } from '../types';
import { Calendar, ChevronRight } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const recentLogs = await getRecentLogs(30);
      setLogs(recentLogs);
      setIsLoading(false);
    };
    loadHistory();
  }, []);

  const chartData = useMemo(() => {
    return [...logs]
      .reverse()
      .slice(-7)
      .map(log => ({
        name: format(parseISO(log.date), 'dd/MM'),
        calorias: log.totals.calories,
        meta: log.goals.calories
      }));
  }, [logs]);

  if (isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;

  return (
    <div className="page-container" style={{ padding: '16px' }}>
      <h2 style={{ marginBottom: '20px' }}>Histórico</h2>

      {/* Chart Section */}
      <div style={{ 
        backgroundColor: '#fff', padding: '16px', borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' 
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#6b7280' }}>Calorias (Últimos 7 dias)</h4>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="calorias" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="meta" stroke="#e5e7eb" strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* List Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#6b7280' }}>Registros Recentes</h4>
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
    </div>
  );
};

import { useMemo } from 'react';
export default HistoryPage;
