import { RouteObject } from 'react-router-dom';
import { LoginPage, RegisterPage } from '@features/auth';

/**
 * Public Routes
 * Routes accessible without authentication
 */
export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
];
