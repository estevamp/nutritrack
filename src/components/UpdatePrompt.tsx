import React, { useState } from 'react';

import { useRegisterSW } from 'virtual:pwa-register/react';

const UpdatePrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(true);

  const {
    offlineReady,
    needUpdate,
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error: Error) {
      console.log('SW registration error', error);
    },
  });

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  // Só mostra se há algo a mostrar E o usuário não fechou
  if (!showPrompt || (!offlineReady && !needUpdate)) {
    return null;
  }

  return (
    needUpdate && (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '20px',
      right: '20px',
      backgroundColor: '#fff',
      padding: '16px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      border: '1px solid #f3f4f6',
      animation: 'slideUp 0.3s ease-out'
    }}>
      {needUpdate && (
        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
          <span>Nova versão disponível! Deseja atualizar?</span>
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '8px' }}>
        {needUpdate && (
          <button
            onClick={handleUpdate}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#16a34a',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Atualizar agora
          </button>
        )}
        <button
          onClick={handleClose}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Fechar
        </button>
      </div>
    </div>
    )
  );
};

export default UpdatePrompt;
