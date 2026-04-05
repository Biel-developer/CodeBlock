import { HttpService } from '@http/HttpService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

/**
 * Users HTTP Service
 * Handles all API calls related to users
 */
export class UsersHttpService extends HttpService {
  constructor() {
    super('/users');
  }

  async getAll(): Promise<User[]> {
    const response = await this.get<{ status: string; data: User[] }>();
    return response.data;
  }

  async getById(id: string): Promise<User> {
    const response = await this.get<{ status: string; data: User }>(`/${id}`);
    return response.data;
  }

  async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const response = await this.post<{ status: string; data: User }>('', data);
    return response.data;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const response = await this.put<{ status: string; data: User }>(`/${id}`, data);
    return response.data;
  }
}

export const usersHttpService = new UsersHttpService();
