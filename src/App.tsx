import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FoodsPage from './pages/FoodsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import UpdatePrompt from './components/UpdatePrompt';
import MigrationTool from './components/MigrationTool';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="foods" element={<FoodsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        {/* Rota para ferramenta de migração */}
        <Route path="/migrate" element={<MigrationTool />} />
      </Routes>
      <UpdatePrompt />
    </BrowserRouter>
  );
}

export default App;
