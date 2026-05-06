import { useState, useCallback, useEffect } from 'react';
import * as db from '../services/db';

export interface SyncConfig {
  enabled: boolean;
  syncInterval?: number; // minutos
  lastSync?: string;
}

export function useDataSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncHandle, setSyncHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [syncConfig, setSyncConfig] = useState<SyncConfig>({ enabled: false });
  const [error, setError] = useState<string | null>(null);

  // Verifica se a File System Access API está disponível
  const isFileSystemAccessSupported = typeof window !== 'undefined' && 
    'showDirectoryPicker' in window;

  // Carrega configuração de sync do localStorage
  const loadSyncConfig = useCallback(() => {
    try {
      const stored = localStorage.getItem('nutritrack-sync-config');
      if (stored) {
        setSyncConfig(JSON.parse(stored));
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

  // Solicita acesso a uma pasta do usuário
  const selectFolder = useCallback(async (): Promise<boolean> => {
    if (!isFileSystemAccessSupported) {
      setError('API de Sistema de Arquivos não suportada neste navegador.');
      return false;
    }

    try {
      const handle = await (window as any).showDirectoryPicker({
        mode: 'readwrite',
      });
      
      // Verifica permissão
      const permission = await handle.requestPermission({ mode: 'readwrite' });
      if (permission !== 'granted') {
        setError('Permissão negada para acessar a pasta.');
        return false;
      }

      setSyncHandle(handle);
      saveSyncConfig({ ...syncConfig, enabled: true });
      setError(null);
      return true;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Seleção de pasta cancelada.');
      } else {
        setError(`Erro ao selecionar pasta: ${err.message}`);
      }
      return false;
    }
  }, [isFileSystemAccessSupported, syncConfig, saveSyncConfig]);

  // Exporta dados para arquivo JSON na pasta selecionada
  const exportToFile = useCallback(async (handle: FileSystemDirectoryHandle): Promise<void> => {
    const data = await db.exportAllData();
    const fileName = 'nutritrack-data.json';
    
    try {
      const fileHandle = await handle.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(data);
      await writable.close();
      
      const config = await getSyncConfig();
      saveSyncConfig({ 
        ...config, 
        lastSync: new Date().toISOString(),
        enabled: true 
      });
    } catch (err: any) {
      throw new Error(`Erro ao exportar dados: ${err.message}`);
    }
  }, [saveSyncConfig]);

  // Importa dados de arquivo JSON da pasta selecionada
  const importFromFile = useCallback(async (handle: FileSystemDirectoryHandle): Promise<void> => {
    const fileName = 'nutritrack-data.json';
    
    try {
      const fileHandle = await handle.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      const text = await file.text();
      await db.importData(text);
      
      const config = await getSyncConfig();
      saveSyncConfig({ 
        ...config, 
        lastSync: new Date().toISOString(),
        enabled: true 
      });
    } catch (err: any) {
      if (err.name === 'NotFoundError') {
        throw new Error('Arquivo de dados não encontrado na pasta selecionada.');
      }
      throw new Error(`Erro ao importar dados: ${err.message}`);
    }
  }, [saveSyncConfig]);

  // Sincroniza dados (exporta e importa)
  const sync = useCallback(async (): Promise<void> => {
    if (!syncHandle) {
      setError('Nenhuma pasta configurada para sincronização.');
      return;
    }

    setIsSyncing(true);
    setError(null);

    try {
      // Primeiro importa dados mais recentes da pasta (se existirem)
      try {
        await importFromFile(syncHandle);
      } catch (err: any) {
        // Se não houver arquivo, continua apenas com exportação
        if (!err.message.includes('não encontrado')) {
          throw err;
        }
      }

      // Depois exporta dados atuais
      await exportToFile(syncHandle);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  }, [syncHandle, importFromFile, exportToFile]);

  // Descarrega a pasta selecionada
  const disconnect = useCallback(() => {
    setSyncHandle(null);
    saveSyncConfig({ enabled: false });
    setError(null);
  }, [saveSyncConfig]);

  // Carrega config ao montar componente
  useEffect(() => {
    loadSyncConfig();
  }, [loadSyncConfig]);

  return {
    isSyncing,
    isFileSystemAccessSupported,
    syncConfig,
    error,
    selectFolder,
    sync,
    disconnect,
    loadSyncConfig,
  };
}

// Helper para obter config atual
async function getSyncConfig(): Promise<SyncConfig> {
  const stored = localStorage.getItem('nutritrack-sync-config');
  return stored ? JSON.parse(stored) : { enabled: false };
}
