import { Routes, Route } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';

export function ProfileRoutes() {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
    </Routes>
  );
}
