import { useState, useCallback, useEffect } from 'react';
import * as db from '../services/db';

export interface SyncConfig {
  enabled: boolean;
  syncInterval?: number; // minutos
  lastSync?: string;
  folderLink?: string; // Link do Google Drive ou similar
  folderId?: string; // ID da pasta
}

// Extrai o ID da pasta do Google Drive do link
function extractGoogleDriveFolderId(link: string): string | null {
  // Padrões comuns de links do Google Drive
  const patterns = [
    /\/folders\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = link.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Valida se é um link do Google Drive válido
function isValidGoogleDriveLink(link: string): boolean {
  return link.includes('drive.google.com') && extractGoogleDriveFolderId(link) !== null;
}

export function useDataSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncConfig, setSyncConfig] = useState<SyncConfig>({ enabled: false });
  const [error, setError] = useState<string | null>(null);
  const [folderLinkInput, setFolderLinkInput] = useState('');

  // Carrega configuração de sync do localStorage
  const loadSyncConfig = useCallback(() => {
    try {
      const stored = localStorage.getItem('nutritrack-sync-config');
      if (stored) {
        const config = JSON.parse(stored);
        setSyncConfig(config);
        if (config.folderLink) {
          setFolderLinkInput(config.folderLink);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar config de sync:', err);
    }
  }, []);

  // Salva configuração de sync no localStorage
  const saveSyncConfig = useCallback((config: SyncConfig) => {
    try {
      localStorage.setItem('nutritrack-sync-config', JSON.stringify(config));
      setSyncConfig(config);
    } catch (err) {
      console.error('Erro ao salvar config de sync:', err);
    }
  }, []);

  // Configura pasta via link do Google Drive
  const setFolderByLink = useCallback(async (link: string): Promise<boolean> => {
    if (!link.trim()) {
      setError('Por favor, insira um link válido.');
      return false;
    }

    if (!isValidGoogleDriveLink(link)) {
      setError('Link inválido. Use um link do Google Drive (ex: https://drive.google.com/drive/folders/...)');
      return false;
    }

    const folderId = extractGoogleDriveFolderId(link);
    if (!folderId) {
      setError('Não foi possível extrair o ID da pasta do link.');
      return false;
    }

    // Salva configuração
    saveSyncConfig({ 
      enabled: true, 
      folderLink: link,
      folderId: folderId,
      lastSync: undefined 
    });
    
    setError(null);
    return true;
  }, [saveSyncConfig]);

  // Exporta dados para Google Drive usando API
  const exportToGoogleDrive = useCallback(async (): Promise<void> => {
    const config = syncConfig;
    if (!config.folderId || !config.folderLink) {
      throw new Error('Nenhuma pasta configurada para sincronização.');
    }

    const data = await db.exportAllData();
    const fileName = 'nutritrack-data.json';
    
    // Nota: Para uma implementação completa, seria necessário:
    // 1. Autenticação OAuth2 com Google
    // 2. Usar Google Drive API para upload
    // Aqui faremos uma abordagem simplificada usando download manual
    
    // Cria blob e inicia download
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    saveSyncConfig({ 
      ...config, 
      lastSync: new Date().toISOString(),
      enabled: true 
    });
  }, [syncConfig, saveSyncConfig]);

  // Importa dados - usuário deve selecionar arquivo manualmente
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const importFromGoogleDrive = useCallback(async (): Promise<void> => {
    // Como não podemos acessar diretamente o Google Drive sem autenticação,
    // orientamos o usuário a baixar o arquivo e importar manualmente
    throw new Error('Para importar, baixe o arquivo "nutritrack-data.json" do seu Google Drive e use a opção "Importar JSON" abaixo.');
  }, []);

  // Sincroniza dados
  const sync = useCallback(async (): Promise<void> => {
    if (!syncConfig.enabled || !syncConfig.folderId) {
      setError('Nenhuma pasta configurada para sincronização.');
      return;
    }

    setIsSyncing(true);
    setError(null);

    try {
      // Exporta dados atuais (download do arquivo)
      await exportToGoogleDrive();
      
      // Orienta usuário sobre próximos passos
      alert('Arquivo exportado! Faça o upload para sua pasta do Google Drive.\n\nNo outro dispositivo:\n1. Baixe o arquivo da pasta\n2. Use "Importar JSON" nesta página');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  }, [syncConfig, exportToGoogleDrive]);

  // Descarrega a pasta selecionada
  const disconnect = useCallback(() => {
    setFolderLinkInput('');
    saveSyncConfig({ enabled: false, folderLink: undefined, folderId: undefined });
    setError(null);
  }, [saveSyncConfig]);

  // Carrega config ao montar componente
  useEffect(() => {
    loadSyncConfig();
  }, [loadSyncConfig]);

  return {
    isSyncing,
    syncConfig,
    error,
    folderLinkInput,
    setFolderLinkInput,
    setFolderByLink,
    sync,
    disconnect,
    loadSyncConfig,
    isValidGoogleDriveLink,
  };
}

// Helper para obter config atual
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getSyncConfig(): Promise<SyncConfig> {
  const stored = localStorage.getItem('nutritrack-sync-config');
  return stored ? JSON.parse(stored) : { enabled: false };
}
