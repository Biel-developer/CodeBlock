import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}
