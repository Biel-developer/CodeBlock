import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authHttpService } from '@features/auth/http/AuthHttpService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const UserAuthenticationContext = createContext<AuthContextData>({} as AuthContextData);

interface UserAuthenticationProviderProps {
  children: ReactNode;
}

export function UserAuthenticationProvider({ children }: UserAuthenticationProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage, token, etc.)
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authHttpService.login({ email, password });
      
      // Store token
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      
      // Store user data
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
      };
      
      setUser(userData);
      localStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
    localStorage.removeItem('auth_token');
  };

  return (
    <UserAuthenticationContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </UserAuthenticationContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(UserAuthenticationContext);
  if (!context) {
    throw new Error('useAuth must be used within UserAuthenticationProvider');
  }
  return context;
};
