import React, { useState, useEffect } from 'react';
import { useGoals } from '../hooks/useDayLog';
import { useDataSync } from '../hooks/useDataSync';
import { getSettings, saveSettings, exportAllData, importData } from '../services/db';
import { Download, Upload, Trash2, Save, User, FolderSync, Link as LinkIcon, Unlink } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { goals, saveGoals, isLoading: goalsLoading } = useGoals();
  const { 
    isSyncing, 
    syncConfig, 
    error: syncError, 
    folderLinkInput,
    setFolderLinkInput,
    setFolderByLink,
    sync, 
    disconnect 
  } = useDataSync();
  const [userName, setUserName] = useState('Usuário');
  const [localGoals, setLocalGoals] = useState(goals);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      if (settings) {
        setUserName(settings.name);
        setLocalGoals(settings.goals);
      }
    };
    loadSettings();
  }, [goals]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveSettings({ name: userName, goals: localGoals });
    await saveGoals(localGoals);
    setIsSaving(false);
    alert('Configurações salvas com sucesso!');
  };

  const handleExport = async () => {
    const data = await exportAllData();
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
        await importData(json);
        alert('Dados importados com sucesso! O app será recarregado.');
        window.location.reload();
      } catch (err) {
        alert('Erro ao importar arquivo. Verifique se o formato é válido.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = async () => {
    if (confirm('TEM CERTEZA? Isso apagará todos os seus registros e alimentos personalizados permanentemente.')) {
      indexedDB.deleteDatabase('nutrition-tracker-db');
      alert('Todos os dados foram apagados. O app será reiniciado.');
      window.location.reload();
    }
  };

  const handleSetFolderByLink = async () => {
    const success = await setFolderByLink(folderLinkInput);
    if (success) {
      alert('Pasta do Google Drive configurada com sucesso!');
      // Orienta sobre primeiros passos
      alert('Próximos passos:\n1. Clique em "Sincronizar Agora" para exportar seus dados\n2. Faça upload do arquivo baixado para sua pasta do Google Drive\n3. No outro dispositivo, configure o mesmo link e importe o arquivo');
    }
  };

  const handleSync = async () => {
    try {
      await sync();
      // Sync já mostra alerta interno
    } catch (err: any) {
      alert(`Erro na sincronização: ${err.message}`);
    }
  };

  const handleDisconnect = () => {
    if (confirm('Deseja desconectar a pasta de sincronização? Os dados locais serão mantidos.')) {
      disconnect();
      alert('Pasta desconectada.');
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
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>Dados e Backup</h3>
        
        {/* Sync Section */}
        <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ backgroundColor: '#0ea5e9', padding: '8px', borderRadius: '10px' }}>
              <FolderSync color="#fff" size={20} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Sincronização com Google Drive</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Cole o link da sua pasta do Google Drive para sincronizar os dados entre dispositivos
              </p>
            </div>
          </div>

          {syncError && (
            <div style={{ padding: '10px', backgroundColor: '#fee2e2', borderRadius: '8px', marginBottom: '12px', fontSize: '0.85rem', color: '#991b1b' }}>
              ⚠️ {syncError}
            </div>
          )}

          {syncConfig.enabled ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.85rem', color: '#0369a1', marginBottom: '8px' }}>
                ✓ Sincronização configurada{syncConfig.lastSync && ` • Última: ${new Date(syncConfig.lastSync).toLocaleString('pt-BR')}`}
              </div>
              
              {/* Mostra link da pasta */}
              <div style={{ fontSize: '0.75rem', color: '#64748b', wordBreak: 'break-all', backgroundColor: '#fff', padding: '8px', borderRadius: '6px', marginBottom: '8px' }}>
                📁 {syncConfig.folderLink}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  style={{ 
                    flex: 1, padding: '10px', borderRadius: '8px', border: 'none', 
                    backgroundColor: isSyncing ? '#94a3b8' : '#0ea5e9', color: '#fff', 
                    fontWeight: 600, cursor: isSyncing ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <FolderSync size={16} className={isSyncing ? 'spin' : ''} /> 
                  {isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}
                </button>
                <button 
                  onClick={handleDisconnect}
                  style={{ 
                    padding: '10px', borderRadius: '8px', border: 'none', 
                    backgroundColor: '#f1f5f9', color: '#64748b', 
                    fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <Unlink size={16} /> Desconectar
                </button>
              </div>
              
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px', lineHeight: '1.4' }}>
                💡 <strong>Como usar:</strong><br/>
                1. Clique em "Sincronizar Agora" para baixar seus dados<br/>
                2. Faça upload do arquivo para sua pasta do Google Drive<br/>
                3. No outro dispositivo, configure o mesmo link e importe o arquivo
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', marginBottom: '4px' }}>
                  Link da Pasta do Google Drive
                </label>
                <input 
                  type="text" 
                  value={folderLinkInput}
                  onChange={(e) => setFolderLinkInput(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  style={{ 
                    width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', 
                    fontSize: '0.9rem', boxSizing: 'border-box'
                  }}
                />
              </div>
              <button 
                onClick={handleSetFolderByLink}
                disabled={!folderLinkInput.trim()}
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '10px', border: 'none', 
                  backgroundColor: !folderLinkInput.trim() ? '#e2e8f0' : '#0ea5e9', 
                  color: '#fff', fontWeight: 600, 
                  cursor: !folderLinkInput.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                <LinkIcon size={18} /> Configurar Pasta
              </button>
              
              <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4' }}>
                💡 <strong>Como obter o link:</strong><br/>
                1. Abra o Google Drive e crie uma pasta<br/>
                2. Clique com botão direito → "Compartilhar"<br/>
                3. Copie o link e cole acima
              </div>
            </div>
          )}
        </div>

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
    </div>
  );
};

export default SettingsPage;
