import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Utensils, BarChart2, Settings } from 'lucide-react';

const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Hoje', icon: Home },
    { to: '/foods', label: 'Alimentos', icon: Utensils },
    { to: '/history', label: 'Histórico', icon: BarChart2 },
    { to: '/settings', label: 'Config', icon: Settings },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid #f3f4f6',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          aria-label={item.label}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: isActive ? '#16a34a' : '#9ca3af',
            gap: '4px',
            transition: 'color 0.2s ease'
          })}
        >
          <item.icon size={24} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
