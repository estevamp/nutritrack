import React from 'react';
import { useAuth } from '../auth/useAuth';

export default function LoginPage() {
  const { signIn, loading } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: '#f9fafb'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: 24
      }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#16a34a' }}>NutriTrack</h1>
        <p style={{ marginTop: 8, color: '#374151' }}>
          Entre com sua conta Google para usar o app.
        </p>

        <button
          onClick={() => void signIn()}
          disabled={loading}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '12px 14px',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            background: loading ? '#f3f4f6' : '#111827',
            color: loading ? '#6b7280' : '#fff',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
