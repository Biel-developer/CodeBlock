import { Routes, Route } from 'react-router-dom';
import { ProjectsPage } from '../pages/ProjectsPage';

export function ProjectsRoutes() {
  return (
    <Routes>
      <Route index element={<ProjectsPage />} />
    </Routes>
  );
}
