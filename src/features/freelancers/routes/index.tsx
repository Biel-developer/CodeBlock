import { Routes, Route } from 'react-router-dom';
import { FreelancersPage } from '../pages/FreelancersPage';

export function FreelancersRoutes() {
  return (
    <Routes>
      <Route index element={<FreelancersPage />} />
    </Routes>
  );
}
