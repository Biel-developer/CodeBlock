import { Routes, Route } from 'react-router-dom';
import { FeedPage } from '../pages/FeedPage';

export function FeedRoutes() {
  return (
    <Routes>
      <Route index element={<FeedPage />} />
    </Routes>
  );
}
