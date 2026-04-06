import { Routes, Route } from 'react-router-dom';
import { RankingPage } from '../pages/RankingPage';

export function RankingRoutes() {
  return (
    <Routes>
      <Route index element={<RankingPage />} />
    </Routes>
  );
}
