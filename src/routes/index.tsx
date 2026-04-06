import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@layouts/AppLayout';
import { PrivateRoute } from './utils';
import { publicRoutes } from './public';
import { privateRoutes } from './private';

/**
 * Main Application Routes
 * Combines public and private routes
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Private Routes */}
      {privateRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <PrivateRoute>
              <AppLayout>{route.element}</AppLayout>
            </PrivateRoute>
          }
        />
      ))}

      {/* Fallback - 404 */}
      <Route path="*" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}><h1>404</h1><p>Página não encontrada</p></div>} />
    </Routes>
  );
}
