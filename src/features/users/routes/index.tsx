import { Routes, Route, Navigate } from 'react-router-dom';
import { UsersListPage } from '../pages/UsersListPage';
import { UsersCreateUpdatePage } from '../pages/UsersCreateUpdatePage';
import { useAuth } from '@context/UserAuthentication';
import { Environment } from '@/Environment';
import { ReactNode } from 'react';

// Protected route for admin only
// Quando ENABLE_MOCK_API=true, qualquer usuário pode acessar (modo apresentação)
function AdminRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  if (Environment.ENABLE_MOCK_API) {
    return <>{children}</>;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

export function UsersRoutes() {
  return (
    <Routes>
      <Route index element={
        <AdminRoute>
          <UsersListPage />
        </AdminRoute>
      } />
      <Route path="create" element={
        <AdminRoute>
          <UsersCreateUpdatePage />
        </AdminRoute>
      } />
      <Route path="edit/:id" element={
        <AdminRoute>
          <UsersCreateUpdatePage />
        </AdminRoute>
      } />
    </Routes>
  );
}
