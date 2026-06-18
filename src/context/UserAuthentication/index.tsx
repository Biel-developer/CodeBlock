import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authHttpService } from '@features/auth/http/AuthHttpService';
import { profileHttpService } from '@features/my-profile/http/ProfileHttpService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  accountType?: 'freelancer' | 'contractor' | 'explorer';
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
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
    const bootstrap = async () => {
      const storedUser = localStorage.getItem('user_data');
      const token = localStorage.getItem('auth_token');

      if (!storedUser || !token) {
        setLoading(false);
        return;
      }

      try {
        const parsed = JSON.parse(storedUser) as User;
        let hydratedUser: User = parsed;

        // Refresh profile on startup so accountType/avatar stay in sync with backend.
        const res = await profileHttpService.getMe();
        hydratedUser = {
          ...parsed,
          accountType: res.data.accountType,
          avatarUrl: res.data.avatarUrl ?? parsed.avatarUrl,
          name: res.data.name || parsed.name,
          email: res.data.email || parsed.email,
          role: res.data.role || parsed.role,
        };

        setUser(hydratedUser);
        localStorage.setItem('user_data', JSON.stringify(hydratedUser));
      } catch {
        // If profile fetch fails, keep the stored user as fallback.
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('user_data');
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
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
      const userData: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        accountType: response.user.accountType,
        avatarUrl: response.user.avatarUrl,
      };

      // Fetch full profile to get accountType and avatarUrl
      try {
        const res = await profileHttpService.getMe();
        userData.accountType = res.data.accountType;
        userData.avatarUrl = res.data.avatarUrl;
      } catch {
        // non-critical, proceed without it
      }

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

  const updateUser = (partial: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial };
      localStorage.setItem('user_data', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserAuthenticationContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
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
