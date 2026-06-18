import axios from 'axios';
import { HttpService } from '@http/HttpService';
import { Environment } from '@/Environment';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  accountType: 'freelancer' | 'contractor' | 'explorer';
  bio?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  createdAt?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  bio?: string;
  location?: string;
  accountType?: 'freelancer' | 'contractor' | 'explorer';
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

function normalizeProfile(raw: any): UserProfile {
  return {
    id: Number(raw?.id),
    name: raw?.name ?? '',
    email: raw?.email ?? '',
    role: raw?.role ?? 'client',
    accountType: raw?.accountType ?? raw?.account_type ?? 'explorer',
    bio: raw?.bio ?? null,
    location: raw?.location ?? null,
    avatarUrl: raw?.avatarUrl ?? raw?.avatar_url ?? null,
    createdAt: raw?.createdAt ?? raw?.created_at,
  };
}

export function buildAvatarUrl(avatarUrl?: string | null): string | null {
  if (!avatarUrl) return null;

  const normalized = String(avatarUrl)
    .trim()
    .replace(/^['\"]|['\"]$/g, '');

  if (!normalized) return null;
  if (normalized.startsWith('http')) return normalized;

  const base = Environment.API_BASE_URL.replace(/\/api$/, '');
  const path = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${base}${path}`;
}

class ProfileHttpServiceClass extends HttpService {
  constructor() {
    super('/users');
  }

  async getMe(): Promise<{ status: string; data: UserProfile }> {
    const response = await this.get<{ status: string; data: any }>('/me');
    return {
      status: response.status,
      data: normalizeProfile(response.data),
    };
  }

  async updateMe(payload: UpdateProfilePayload): Promise<{ status: string; data: UserProfile }> {
    const response = await this.put<{ status: string; data: any }>('/me', payload);
    return {
      status: response.status,
      data: normalizeProfile(response.data),
    };
  }

  async updateAvatar(file: File): Promise<{ status: string; data: UserProfile }> {
    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axios.patch(
      `${Environment.API_BASE_URL}/users/me/avatar`,
      formData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return {
      status: response.data.status,
      data: normalizeProfile(response.data.data),
    };
  }
}

export const profileHttpService = new ProfileHttpServiceClass();
