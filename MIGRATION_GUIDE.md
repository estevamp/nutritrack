# 🔄 Guia de Migração: IndexedDB → Firebase

## Passo 1: Criar o arquivo de migração

Crie o arquivo `src/utils/migrateToFirebase.ts`:

```typescript
import { db } from '../services/firebase';
import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';

// Lê dados do IndexedDB
async function getAllDataFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NutriTrackDB', 1);
    
    request.onsuccess = () => {
      const database = request.result;
      const foods = [];
      const meals = [];
      const dayLogs = [];
      
      // Ler alimentos
      const foodStore = database.transaction('foods', 'readonly').objectStore('foods');
      const foodRequest = foodStore.getAll();
      
      foodRequest.onsuccess = () => {
        foods.push(...foodRequest.result);
        
        // Ler refeições
        const mealStore = database.transaction('meals', 'readonly').objectStore('meals');
        const mealRequest = mealStore.getAll();
        
        mealRequest.onsuccess = () => {
          meals.push(...mealRequest.result);
          
          // Ler logs diários
          const logStore = database.transaction('dayLogs', 'readonly').objectStore('dayLogs');
          const logRequest = logStore.getAll();
          
          logRequest.onsuccess = () => {
            dayLogs.push(...logRequest.result);
            resolve({ foods, meals, dayLogs });
          };
        };
      };
    };
    
    request.onerror = () => reject(request.error);
  });
}

// Importa alimentos para Firebase
async function importFoodsToFirebase(foods) {
  if (foods.length === 0) return;
  
  const batch = writeBatch(db);
  const foodsRef = collection(db, 'foods');
  
  foods.forEach((food) => {
    const docRef = doc(foodsRef);
    batch.set(docRef, {
      ...food,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  
  await batch.commit();
  console.log(`✅ ${foods.length} alimentos importados!`);
}

// Importa refeições para Firebase
async function importMealsToFirebase(meals) {
  if (meals.length === 0) return;
  
  const batch = writeBatch(db);
  const mealsRef = collection(db, 'meals');
  
  meals.forEach((meal) => {
    const docRef = doc(mealsRef);
    batch.set(docRef, {
      ...meal,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  
  await batch.commit();
  console.log(`✅ ${meals.length} refeições importadas!`);
}

// Importa logs diários para Firebase
async function importDayLogsToFirebase(dayLogs) {
  if (dayLogs.length === 0) return;
  
  const batch = writeBatch(db);
  const logsRef = collection(db, 'dayLogs');
  
  dayLogs.forEach((log) => {
    const docRef = doc(logsRef);
    batch.set(docRef, {
      ...log,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  
  await batch.commit();
  console.log(`✅ ${dayLogs.length} logs diários importados!`);
}

// Função principal de migração
export async function migrateIndexedDBToFirebase() {
  try {
    console.log('🚀 Iniciando migração...');
    
    const { foods, meals, dayLogs } = await getAllDataFromIndexedDB();
    
    console.log(`📊 Dados encontrados: ${foods.length} alimentos, ${meals.length} refeições, ${dayLogs.length} logs`);
    
    await importFoodsToFirebase(foods);
    await importMealsToFirebase(meals);
    await importDayLogsToFirebase(dayLogs);
    
    console.log('✨ Migração concluída!');
    return { success: true };
  } catch (error) {
    console.error('❌ Erro:', error);
    return { success: false, error };
  }
}
```

## Passo 2: Criar um componente de migração

Crie `src/components/MigrationModal.tsx`:

```typescript
import { useState } from 'react';
import { migrateIndexedDBToFirebase } from '../utils/migrateToFirebase';

export function MigrationModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleMigrate = async () => {
    setIsLoading(true);
    setStatus('Migrando dados...');
    
    const result = await migrateIndexedDBToFirebase();
    
    if (result.success) {
      setStatus('✅ Migração concluída com sucesso!');
    } else {
      setStatus('❌ Erro na migração: ' + result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Migrar dados para Firebase</h2>
      <p>Clique no botão abaixo para migrar seus dados do IndexedDB para o Firebase.</p>
      
      <button 
        onClick={handleMigrate} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? 'Migrando...' : 'Iniciar Migração'}
      </button>
      
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </div>
  );
}
```

## Passo 3: Adicionar ao App.tsx

```typescript
import { MigrationModal } from './components/MigrationModal';

function App() {
  return (
    <div>
      {/* ... seu código existente ... */}
      <MigrationModal />
    </div>
  );
}
```

## Passo 4: Executar a migração

1. Abra seu app no navegador
2. Clique em "Iniciar Migração"
3. Aguarde a conclusão
4. Verifique no Firebase Console se os dados foram importados

## ✅ Verificar dados no Firebase

No Firebase Console:
1. Vá para **Firestore Database**
2. Verifique as coleções: `foods`, `meals`, `dayLogs`
3. Confirme que os documentos foram criados

## 🔒 Após a migração bem-sucedida

Você pode:
1. **Remover o IndexedDB** (opcional)
2. **Atualizar seus hooks** para ler do Firebase em vez do IndexedDB
3. **Testar a sincronização** entre dispositivos

## ⚠️ Troubleshooting

| Problema | Solução |
|----------|---------|
| "Nenhum dado encontrado" | Verifique se o IndexedDB tem dados (DevTools → Application → IndexedDB) |
| "Erro de permissão" | Verifique as regras de segurança do Firebase |
| "Dados duplicados" | Limpe o Firebase antes de migrar novamente |

