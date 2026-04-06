import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
