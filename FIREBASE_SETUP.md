# Guia de Configuração do Firebase

Este guia explica como configurar e usar o Firebase Firestore no seu projeto.

## 1. Instalação das Dependências

Devido a limitações de espaço em disco no ambiente atual, você precisará instalar o Firebase localmente:

```bash
npm install firebase
```

## 2. Criação do Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou selecione um projeto existente
3. Siga as instruções para configurar seu projeto

## 3. Registro do Aplicativo Web

1. No Firebase Console, clique no ícone de web (`</>`)
2. Registre seu aplicativo com um nickname
3. Copie as credenciais do SDK

## 4. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto copiando o `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

## 5. Configuração do Firestore

1. No Firebase Console, vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo de produção ou teste (recomendado começar com teste)
4. Selecione a localização mais próxima dos seus usuários

### Regras de Segurança

Para começar, configure as regras de segurança assim:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 6. Uso no Código

O arquivo `src/services/firebase.ts` já está configurado com todas as funções necessárias:

### Importando

```typescript
import { 
  initializeFirebase,
  getAllFoodsFromFirestore,
  saveFoodToFirestore,
  getDayLogFromFirestore,
  saveDayLogToFirestore,
  // ... outras funções
} from './services/firebase';
```

### Inicializando

```typescript
// Em seu componente principal ou App.tsx
import { useEffect } from 'react';
import { initializeFirebase } from './services/firebase';

useEffect(() => {
  initializeFirebase();
}, []);
```

### Exemplo de Uso

```typescript
// Salvar um alimento
const food = {
  id: 'unique-id',
  name: 'Maçã',
  category: 'frutas',
  nutrients: {
    calories: 52,
    protein: 0.3,
    carbs: 14,
    sugar: 10,
    fat: 0.2,
    saturatedFat: 0.1,
    fiber: 2.4,
    sodium: 1
  },
  servingSize: 100,
  servingUnit: 'g'
};

await saveFoodToFirestore(food);

// Buscar alimentos
const foods = await getAllFoodsFromFirestore();

// Salvar registro diário
const dayLog = {
  date: '2024-01-15',
  meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
  totals: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 },
  goals: { calories: 2000, protein: 150, carbs: 250, sugar: 50, fat: 70, fiber: 30, sodium: 2300 }
};

await saveDayLogToFirestore(dayLog);
```

## 7. Migração do IndexedDB para Firebase

Se você deseja migrar os dados existentes do IndexedDB para o Firebase:

1. Exporte os dados do IndexedDB usando a função `exportAllData()` do `db.ts`
2. Importe os dados para o Firebase usando `importDataToFirestore()`

```typescript
import { exportAllData } from './services/db';
import { importDataToFirestore } from './services/firebase';

async function migrateData() {
  const data = await exportAllData();
  await importDataToFirestore(data);
  console.log('Migração concluída!');
}
```

## 8. Considerações Importantes

### Autenticação
- O serviço usa autenticação anônima por padrão
- Para produção, considere implementar autenticação completa (Email/Senha, Google, etc.)

### Busca de Texto
- Firestore não suporta busca por texto parcial nativamente
- Para buscas avançadas, considere integrar com Algolia ou ElasticSearch

### Custos
- Firestore tem um nível gratuito generoso
- Monitore seu uso no Firebase Console para evitar custos inesperados

### Offline
- Firestore suporta persistência offline automaticamente
- Os dados são sincronizados quando a conexão é restabelecida

## 9. Estrutura do Banco de Dados

O Firebase Firestore usará as seguintes coleções:

- `foods`: Todos os alimentos cadastrados
- `dayLogs`: Registros diários de alimentação
- `settings`: Configurações do usuário

Cada documento terá um campo `updatedAt` com timestamp para controle de versões.

## 10. Links Úteis

- [Documentação do Firebase](https://firebase.google.com/docs)
- [Documentação do Firestore](https://firebase.google.com/docs/firestore)
- [Preços do Firestore](https://firebase.google.com/pricing)
- [Regras de Segurança](https://firebase.google.com/docs/firestore/security/get-started)
