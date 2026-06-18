import { RouteObject } from 'react-router-dom';
import { DashboardRoutes } from '@features/dashboard/routes';
import { UsersRoutes } from '@features/users/routes';
import { ProfileRoutes } from '@features/profile/routes';
import { FeedRoutes } from '@features/feed/routes';
import { ProjectsRoutes, ProjetoRoutes } from '@features/projects/routes';
import { FreelancersRoutes } from '@features/freelancers/routes';
import { RankingRoutes } from '@features/ranking/routes';
import { MyProfileRoutes } from '@features/my-profile/routes';
import { SettingsRoutes } from '@features/settings/routes';

/**
 * Private Routes Configuration
 * Routes that require authentication
 */
export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardRoutes />,
  },
  {
    path: '/feed/*',
    element: <FeedRoutes />,
  },
  {
    path: '/projects/*',
    element: <ProjectsRoutes />,
  },
  {
    path: '/projetos/*',
    element: <ProjetoRoutes />,
  },
  {
    path: '/freelancers/*',
    element: <FreelancersRoutes />,
  },
  {
    path: '/ranking/*',
    element: <RankingRoutes />,
  },
  {
    path: '/my-profile/*',
    element: <MyProfileRoutes />,
  },
  {
    path: '/settings/*',
    element: <SettingsRoutes />,
  },
  {
    path: '/users/*',
    element: <UsersRoutes />,
  },
  {
    path: '/profile/*',
    element: <ProfileRoutes />,
  },
];
