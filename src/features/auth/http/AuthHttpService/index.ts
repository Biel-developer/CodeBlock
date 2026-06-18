import { HttpService } from '@http/HttpService';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    accountType?: 'freelancer' | 'contractor' | 'explorer';
    avatarUrl?: string;
  };
}

/**
 * Authentication HTTP Service
 * Handles all API calls related to authentication
 */
export class AuthHttpService extends HttpService {
  constructor() {
    super('/users');
  }

  async register(data: RegisterData): Promise<any> {
    return this.post<any>('/register', data);
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.post<{ status: string; data: LoginResponse }>(
      '/login',
      credentials
    );
    return response.data;
  }

  async logout(): Promise<void> {
    return this.post<void>('/logout');
  }

  async refreshToken(): Promise<{ token: string }> {
    return this.post<{ token: string }>('/refresh');
  }

  async forgotPassword(email: string): Promise<void> {
    return this.post<void>('/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    return this.post<void>('/reset-password', { token, newPassword });
  }
}

export const authHttpService = new AuthHttpService();
