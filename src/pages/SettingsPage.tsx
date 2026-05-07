import React, { useState, useEffect } from 'react';
import { useGoals } from '../hooks/useDayLog';
import { useAuth } from '../auth/useAuth';
import { getSettings, saveSettings } from '../services/db';
import { exportAllDataFromFirestore, importDataToFirestore } from '../services/firebase';
import { Download, Upload, Trash2, Save, User, LogOut } from 'lucide-react';
import { auth } from '../services/firebase';

const SettingsPage: React.FC = () => {
  const { signOut } = useAuth();
  const { goals, saveGoals, isLoading: goalsLoading } = useGoals();
  const [userName, setUserName] = useState('Usuário');
  const [localGoals, setLocalGoals] = useState(goals);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      if (!auth.currentUser) return;
      const settings = await getSettings(auth.currentUser.uid);
      if (settings) {
        setUserName(settings.name);
        setLocalGoals(settings.goals);
      }
    };
    loadSettings();
  }, [goals]);

  const handleSave = async () => {
    setIsSaving(true);
    if (auth.currentUser) {
      await saveSettings(auth.currentUser.uid, { name: userName, goals: localGoals });
      await saveGoals(localGoals);
    }
    setIsSaving(false);
    alert('Configurações salvas com sucesso!');
  };

  const handleExport = async () => {
    const data = await exportAllDataFromFirestore();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutritrack-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = event.target?.result as string;
        await importDataToFirestore(json);
        alert('Dados importados com sucesso! O app será recarregado.');
        window.location.reload();
      } catch {
        alert('Erro ao importar arquivo. Verifique se o formato é válido.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = async () => {
    if (confirm('TEM CERTEZA? Isso apagará todos os seus registros e alimentos personalizados permanentemente.')) {
      // Note: Clearing all data requires backend support or manual deletion
      // For now, users should delete their account through Firebase console
      alert('Para apagar todos os dados, acesse as configurações da sua conta Firebase.');
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (goalsLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;

  return (
    <div className="page-container" style={{ padding: '16px' }}>
      <h2 style={{ marginBottom: '20px' }}>Configurações</h2>

      {/* Profile Section */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#dcfce7', padding: '10px', borderRadius: '12px' }}>
            <User color="#16a34a" />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Perfil</h3>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', marginBottom: '4px' }}>Seu Nome</label>
          <input 
            type="text" 
            value={userName} 
            onChange={e => setUserName(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '1rem' }}
          />
        </div>
      </div>

      {/* Goals Section */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>Metas Diárias</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { key: 'calories', label: 'Calorias (kcal)' },
            { key: 'protein', label: 'Proteína (g)' },
            { key: 'carbs', label: 'Carbos (g)' },
            { key: 'fat', label: 'Gordura (g)' },
            { key: 'sugar', label: 'Açúcar (g)' },
            { key: 'fiber', label: 'Fibra (g)' },
            { key: 'sodium', label: 'Sódio (mg)' },
          ].map(goal => (
            <div key={goal.key}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>{goal.label}</label>
              <input 
                type="number" 
                value={localGoals[goal.key as keyof typeof localGoals]} 
                onChange={e => setLocalGoals({ ...localGoals, [goal.key]: parseInt(e.target.value) || 0 })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          style={{ 
            width: '100%', marginTop: '20px', padding: '14px', borderRadius: '12px', border: 'none', 
            backgroundColor: '#16a34a', color: '#fff', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <Save size={20} /> {isSaving ? 'Salvando...' : 'Salvar Metas'}
        </button>
      </div>

      {/* Data Management */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>Dados e Backup</h3>

        {/* Traditional Export/Import */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={handleExport}
            style={{ 
              width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', 
              backgroundColor: '#fff', color: '#374151', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            <Download size={18} /> Exportar JSON (Download)
          </button>
          
          <label style={{ 
            width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', 
            backgroundColor: '#fff', color: '#374151', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textAlign: 'center'
          }}>
            <Upload size={18} /> Importar JSON (Arquivo)
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
          
          <button 
            onClick={handleClearData}
            style={{ 
              width: '100%', padding: '12px', borderRadius: '10px', border: 'none', 
              backgroundColor: '#fee2e2', color: '#ef4444', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px'
            }}
          >
            <Trash2 size={18} /> Limpar Tudo
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#fee2e2', padding: '10px', borderRadius: '12px' }}>
            <LogOut color="#ef4444" />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Conta</h3>
        </div>

        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#ef4444',
            color: '#fff',
            fontWeight: 600,
            cursor: isSigningOut ? 'not-allowed' : 'pointer',
            opacity: isSigningOut ? 0.7 : 1
          }}
        >
          <LogOut size={18} />
          {isSigningOut ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
