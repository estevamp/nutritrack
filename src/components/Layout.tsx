import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <header style={{
        padding: '16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #f3f4f6',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#16a34a', fontWeight: 800 }}>NutriTrack</h1>
      </header>

      <main style={{ flex: 1, paddingBottom: '80px' }}>
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;
