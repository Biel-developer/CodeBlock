import { Routes, Route } from 'react-router-dom';
import { SettingsPage } from '../pages/SettingsPage';

export function SettingsRoutes() {
  return (
    <Routes>
      <Route index element={<SettingsPage />} />
    </Routes>
  );
}
