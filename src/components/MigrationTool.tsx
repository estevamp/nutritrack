import React, { useState, useEffect } from 'react';
import { Database, ArrowRight, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { getAllFoods, getAllDayLogs, getSettings, exportAllData } from '../services/db';
import { 
  saveFoodToFirestore, 
  saveDayLogToFirestore, 
  saveSettingsToFirestore,
  initializeFirebase 
} from '../services/firebase';
import type { FoodItem, DayLog, UserSettings } from '../types';

interface MigrationStatus {
  foods: { total: number; migrated: number; error?: string };
  dayLogs: { total: number; migrated: number; error?: string };
  settings: { total: number; migrated: number; error?: string };
}

interface MigrationResult {
  success: boolean;
  status: MigrationStatus;
  error?: string;
}

/**
 * Componente de Migração de Dados do IndexedDB para Firebase
 * 
 * Este componente permite que o usuário migre seus dados locais (IndexedDB)
 * para o banco de dados do Firebase Firestore.
 */
export const MigrationTool: React.FC = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [firebaseHasData, setFirebaseHasData] = useState<boolean | null>(null);

  // Verifica se já existem dados no Firebase
  useEffect(() => {
    checkFirebaseData();
  }, []);

  const checkFirebaseData = async () => {
    try {
      await initializeFirebase();
      // Tenta buscar alguns dados para ver se já existe algo no Firebase
      const { getAllFoodsFromFirestore } = await import('../services/firebase');
      const foods = await getAllFoodsFromFirestore();
      setFirebaseHasData(foods.length > 0);
    } catch (error) {
      console.error('Erro ao verificar dados do Firebase:', error);
      setFirebaseHasData(false);
    }
  };

  const migrateToFIREBASE = async () => {
    setIsMigrating(true);
    setResult(null);
    setMigrationComplete(false);

    const status: MigrationStatus = {
      foods: { total: 0, migrated: 0 },
      dayLogs: { total: 0, migrated: 0 },
      settings: { total: 0, migrated: 0 }
    };

    try {
      // Inicializa Firebase
      setCurrentStep('Inicializando Firebase...');
      await initializeFirebase();

      // 1. Migrar Alimentos
      setCurrentStep('Lendo alimentos do IndexedDB...');
      const foods = await getAllFoods();
      status.foods.total = foods.length;
      console.log(`📊 Encontrados ${foods.length} alimentos no IndexedDB`);

      if (foods.length > 0) {
        setCurrentStep(`Migrando alimentos (${foods.length})...`);
        for (const food of foods) {
          try {
            await saveFoodToFirestore(food);
            status.foods.migrated++;
          } catch (error) {
            console.error(`Erro ao migrar alimento ${food.name}:`, error);
            status.foods.error = `Erro em ${food.name}`;
          }
        }
      }

      // 2. Migrar Registros Diários
      setCurrentStep('Lendo registros diários do IndexedDB...');
      const db = await import('../services/db');
      const dayLogs = await db.getAllDayLogs ? await db.getAllDayLogs() : [];
      
      // Se não existir getAllDayLogs, usa getRecentLogs com número grande
      const allDayLogs: DayLog[] = dayLogs.length > 0 ? dayLogs : [];
      status.dayLogs.total = allDayLogs.length;
      console.log(`📊 Encontrados ${allDayLogs.length} registros diários no IndexedDB`);

      if (allDayLogs.length > 0) {
        setCurrentStep(`Migrando registros diários (${allDayLogs.length})...`);
        for (const log of allDayLogs) {
          try {
            await saveDayLogToFirestore(log);
            status.dayLogs.migrated++;
          } catch (error) {
            console.error(`Erro ao migrar registro de ${log.date}:`, error);
            status.dayLogs.error = `Erro em ${log.date}`;
          }
        }
      }

      // 3. Migrar Configurações
      setCurrentStep('Lendo configurações do IndexedDB...');
      const settings = await getSettings();
      status.settings.total = settings ? 1 : 0;

      if (settings) {
        setCurrentStep('Migrando configurações...');
        try {
          await saveSettingsToFirestore(settings);
          status.settings.migrated = 1;
        } catch (error) {
          console.error('Erro ao migrar configurações:', error);
          status.settings.error = 'Erro ao salvar configurações';
        }
      }

      setCurrentStep('Concluindo migração...');
      
      const hasErrors = 
        (status.foods.total > 0 && status.foods.migrated < status.foods.total) ||
        (status.dayLogs.total > 0 && status.dayLogs.migrated < status.dayLogs.total) ||
        (status.settings.total > 0 && status.settings.migrated < status.settings.total);

      setResult({
        success: !hasErrors,
        status,
        error: hasErrors ? 'Alguns itens não foram migrados. Verifique o console.' : undefined
      });

      setMigrationComplete(true);
      setCurrentStep('');

    } catch (error) {
      console.error('Erro crítico na migração:', error);
      setResult({
        success: false,
        status,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    } finally {
      setIsMigrating(false);
    }
  };

  const handleExportBackup = async () => {
    try {
      const data = await exportAllData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nutritrack-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      alert('Backup exportado com sucesso! Guarde este arquivo em um local seguro.');
    } catch (error) {
      alert('Erro ao exportar backup.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0fdf4',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '32px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            backgroundColor: '#dcfce7',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Database color="#16a34a" size={40} />
          </div>
          <h1 style={{ fontSize: '1.5rem', color: '#166534', margin: '0 0 8px' }}>
            Migração para Firebase
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Transfira seus dados do armazenamento local para a nuvem
          </p>
        </div>

        {/* Status do Firebase */}
        {firebaseHasData !== null && (
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            backgroundColor: firebaseHasData ? '#fef3c7' : '#f0fdf4',
            border: `1px solid ${firebaseHasData ? '#fcd34d' : '#86efac'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {firebaseHasData ? (
                <AlertCircle color="#d97706" size={24} />
              ) : (
                <CheckCircle color="#16a34a" size={24} />
              )}
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: firebaseHasData ? '#92400e' : '#166534' }}>
                  {firebaseHasData 
                    ? 'Firebase já contém dados' 
                    : 'Firebase pronto para receber dados'}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
                  {firebaseHasData 
                    ? 'A migração irá adicionar/sobrescrever os dados existentes' 
                    : 'Seus dados locais serão transferidos para a nuvem'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Passo a passo */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '16px' }}>
            Como funciona:
          </h3>
          <ol style={{ paddingLeft: '20px', color: '#4b5563', lineHeight: '1.8' }}>
            <li>Faça um backup dos seus dados atuais (recomendado)</li>
            <li>Clique em "Iniciar Migração"</li>
            <li>Aguarde a transferência dos dados para o Firebase</li>
            <li>Após concluir, seus dados estarão disponíveis em todos os dispositivos</li>
          </ol>
        </div>

        {/* Botão de Backup */}
        <button
          onClick={handleExportBackup}
          disabled={isMigrating}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff',
            color: '#374151',
            fontWeight: 600,
            cursor: isMigrating ? 'not-allowed' : 'pointer',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          📥 Exportar Backup Primeiro
        </button>

        {/* Botão de Migração */}
        <button
          onClick={migrateToFIREBASE}
          disabled={isMigrating || migrationComplete}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: isMigrating || migrationComplete ? '#9ca3af' : '#16a34a',
            color: '#fff',
            fontWeight: 600,
            cursor: isMigrating || migrationComplete ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '1rem'
          }}
        >
          {isMigrating ? (
            <>
              <Loader className="spin" size={24} />
              {currentStep || 'Migrando...'}
            </>
          ) : migrationComplete ? (
            <>
              <CheckCircle size={24} />
              Migração Concluída!
            </>
          ) : (
            <>
              Iniciar Migração
              <ArrowRight size={24} />
            </>
          )}
        </button>

        {/* Resultado da Migração */}
        {result && (
          <div style={{
            marginTop: '24px',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: result.success ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${result.success ? '#86efac' : '#fca5a5'}`
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              color: result.success ? '#166534' : '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {result.success ? (
                <>
                  <CheckCircle size={20} />
                  Migração Completa!
                </>
              ) : (
                <>
                  <AlertCircle size={20} />
                  Migração com Erros
                </>
              )}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151' }}>Alimentos:</span>
                <span style={{ fontWeight: 600, color: '#166534' }}>
                  {result.status.foods.migrated} / {result.status.foods.total}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151' }}>Registros Diários:</span>
                <span style={{ fontWeight: 600, color: '#166534' }}>
                  {result.status.dayLogs.migrated} / {result.status.dayLogs.total}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151' }}>Configurações:</span>
                <span style={{ fontWeight: 600, color: '#166534' }}>
                  {result.status.settings.migrated} / {result.status.settings.total}
                </span>
              </div>
            </div>

            {result.error && (
              <p style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
                color: '#991b1b',
                fontSize: '0.85rem',
                margin: '16px 0 0 0'
              }}>
                ⚠️ {result.error}
              </p>
            )}

            {result.success && (
              <p style={{
                marginTop: '16px',
                color: '#166534',
                fontSize: '0.85rem',
                margin: '16px 0 0 0'
              }}>
                ✅ Seus dados agora estão sincronizados com o Firebase! 
                Você pode acessar de qualquer dispositivo.
              </p>
            )}
          </div>
        )}

        {/* Link para voltar ao app */}
        {migrationComplete && (
          <a
            href="/"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '24px',
              color: '#16a34a',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            ← Voltar para o App
          </a>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MigrationTool;
