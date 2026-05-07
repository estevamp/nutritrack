import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FoodsPage from './pages/FoodsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import UpdatePrompt from './components/UpdatePrompt';
import { useEffect } from 'react';
import { initializeAuth } from './services/firebase';

function App() {
    useEffect(() => {
    // Initialize Firebase authentication
    initializeAuth();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="foods" element={<FoodsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <UpdatePrompt />
    </BrowserRouter>
  );
}

export default App;
