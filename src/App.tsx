import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './auth/useAuth';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FoodsPage from './pages/FoodsPage';
import HistoryPage from './pages/HistoryPage';
import WeightPage from './pages/WeightPage';
import SettingsPage from './pages/SettingsPage';
import UpdatePrompt from './components/UpdatePrompt';
import LoginPage from './pages/LoginPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Carregando…</div>;
  if (!user) return <LoginPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="foods" element={<FoodsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="weight" element={<WeightPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <UpdatePrompt />
    </BrowserRouter>
  );
}

export default App;
