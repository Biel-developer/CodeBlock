import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/UserAuthentication';

interface PrivateRouteProps {
  children: React.ReactElement;
}

/**
 * Private Route Component
 * Wraps routes that require authentication
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        Carregando...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
