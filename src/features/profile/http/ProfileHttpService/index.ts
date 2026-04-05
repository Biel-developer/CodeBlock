import { HttpService } from '@http/HttpService';

export interface UpdateProfileData {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

/**
 * Profile HTTP Service
 * Handles all API calls related to user profile
 */
export class ProfileHttpService extends HttpService {
  constructor() {
    super('/users');
  }

  async getProfile(): Promise<ProfileData> {
    const response = await this.get<{ status: string; data: ProfileData }>('/me');
    return response.data;
  }

  async updateProfile(data: UpdateProfileData): Promise<ProfileData> {
    const response = await this.put<{ status: string; data: ProfileData }>('/me', data);
    return response.data;
  }
}

export const profileHttpService = new ProfileHttpService();
