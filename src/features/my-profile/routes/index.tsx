import { Routes, Route } from 'react-router-dom';
import { MyProfilePage } from '../pages/MyProfilePage';

export function MyProfileRoutes() {
  return (
    <Routes>
      <Route index element={<MyProfilePage />} />
    </Routes>
  );
}
