import { Routes, Route } from 'react-router-dom';
import { ProjectsPage } from '../pages/ProjectsPage';
import { CreateProjectPage } from '../pages/CreateProjectPage';
import { MyProjectsPage } from '../pages/MyProjectsPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';
import { ApplicationsPage } from '../pages/ApplicationsPage';
import { MyJobsPage } from '../pages/MyJobsPage';

export function ProjectsRoutes() {
  return (
    <Routes>
      <Route index element={<ProjectsPage />} />
      <Route path="my" element={<MyProjectsPage />} />
      <Route path="my/create" element={<CreateProjectPage />} />
      <Route path="applications" element={<ApplicationsPage />} />
      <Route path="my-jobs" element={<MyJobsPage />} />
    </Routes>
  );
}

export function ProjetoRoutes() {
  return (
    <Routes>
      <Route path=":id" element={<ProjectDetailsPage />} />
    </Routes>
  );
}
