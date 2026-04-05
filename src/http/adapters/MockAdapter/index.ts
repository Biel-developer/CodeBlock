import { IHttpAdapter } from '../../IHttpAdapter';

/**
 * Mock HTTP Adapter
 * 
 * Implementação local de IHttpAdapter que simula um backend completo
 * usando localStorage para persistência de dados.
 * 
 * Ativado quando Environment.ENABLE_MOCK_API === true.
 * Para reverter ao backend real, basta setar VITE_ENABLE_MOCK_API=false.
 */

interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

const MOCK_USERS_KEY = 'mock_users';
const MOCK_DELAY_MS = 300;

const SEED_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Admin CodeBlock',
    email: 'admin@codeblock.com',
    password: 'qualquer',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'João Freelancer',
    email: 'joao@email.com',
    password: 'qualquer',
    role: 'client',
    createdAt: '2024-02-15T00:00:00.000Z',
  },
];

function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getUsers(): MockUser[] {
  const raw = localStorage.getItem(MOCK_USERS_KEY);
  if (!raw) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(SEED_USERS));
    return [...SEED_USERS];
  }
  return JSON.parse(raw);
}

function saveUsers(users: MockUser[]): void {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function nameFromEmail(email: string): string {
  const local = email.split('@')[0] || 'Usuário';
  return local
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getLoggedUser(): MockUser | null {
  const raw = localStorage.getItem('user_data');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Resolve uma URL mockada e retorna a resposta simulada.
 */
function resolveRoute(method: string, url: string, data?: any): any {
  const users = getUsers();

  // Normalizar URL removendo barras duplas e trailing slash
  const cleanUrl = url.replace(/\/+/g, '/').replace(/\/$/, '');

  // ─── POST /users/login ───
  if (method === 'POST' && cleanUrl === '/users/login') {
    const email = data?.email || 'usuario@mock.com';
    const existing = users.find((u) => u.email === email);

    const user = existing || {
      id: generateId(),
      name: nameFromEmail(email),
      email,
      password: 'mock',
      role: 'admin', // acesso completo na apresentação
      createdAt: new Date().toISOString(),
    };

    // Se criou user dinâmico, persiste no seed
    if (!existing) {
      users.push(user);
      saveUsers(users);
    }

    return {
      status: 'success',
      data: {
        token: `mock-token-${Date.now()}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    };
  }

  // ─── POST /users/register ───
  if (method === 'POST' && cleanUrl === '/users/register') {
    const newUser: MockUser = {
      id: generateId(),
      name: data?.name || 'Novo Usuário',
      email: data?.email || `user-${Date.now()}@mock.com`,
      password: data?.password || 'mock',
      role: 'client',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    return { status: 'success', data: newUser };
  }

  // ─── POST /users/logout ───
  if (method === 'POST' && cleanUrl === '/users/logout') {
    return { status: 'success', data: {} };
  }

  // ─── GET /users/me ───
  if (method === 'GET' && cleanUrl === '/users/me') {
    const loggedUser = getLoggedUser();
    if (loggedUser) {
      const found = users.find((u) => u.id === loggedUser.id) || loggedUser;
      return {
        status: 'success',
        data: {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role,
          createdAt: (found as MockUser).createdAt || new Date().toISOString(),
        },
      };
    }
    return { status: 'success', data: {} };
  }

  // ─── PUT /users/me ───
  if (method === 'PUT' && cleanUrl === '/users/me') {
    const loggedUser = getLoggedUser();
    if (loggedUser) {
      const idx = users.findIndex((u) => u.id === loggedUser.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...data };
        saveUsers(users);
        return { status: 'success', data: users[idx] };
      }
    }
    return { status: 'success', data: {} };
  }

  // ─── GET /users/:id ───
  const getUserByIdMatch = cleanUrl.match(/^\/users\/([^/]+)$/);
  if (method === 'GET' && getUserByIdMatch) {
    const id = getUserByIdMatch[1];
    const user = users.find((u) => u.id === id);
    if (user) {
      return { status: 'success', data: user };
    }
    return { status: 'error', message: 'Usuário não encontrado' };
  }

  // ─── PUT /users/:id ───
  const putUserByIdMatch = cleanUrl.match(/^\/users\/([^/]+)$/);
  if (method === 'PUT' && putUserByIdMatch) {
    const id = putUserByIdMatch[1];
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data };
      saveUsers(users);
      return { status: 'success', data: users[idx] };
    }
    return { status: 'error', message: 'Usuário não encontrado' };
  }

  // ─── POST /users (criar novo) ───
  if (method === 'POST' && cleanUrl === '/users') {
    const newUser: MockUser = {
      id: generateId(),
      name: data?.name || 'Novo Usuário',
      email: data?.email || `user-${Date.now()}@mock.com`,
      password: data?.password || 'mock',
      role: data?.role || 'client',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    return { status: 'success', data: newUser };
  }

  // ─── GET /users (listar todos) ───
  if (method === 'GET' && cleanUrl === '/users') {
    return { status: 'success', data: users };
  }

  // ─── DELETE /users/:id ───
  const deleteUserByIdMatch = cleanUrl.match(/^\/users\/([^/]+)$/);
  if (method === 'DELETE' && deleteUserByIdMatch) {
    const id = deleteUserByIdMatch[1];
    const filtered = users.filter((u) => u.id !== id);
    saveUsers(filtered);
    return { status: 'success', data: {} };
  }

  // ─── Fallback: rota não mapeada ───
  console.warn(`[MockAdapter] Rota não mapeada: ${method} ${cleanUrl}`);
  return { status: 'success', data: {} };
}

export class MockAdapter implements IHttpAdapter {
  constructor() {
    // Garantir seed na primeira execução
    if (!localStorage.getItem(MOCK_USERS_KEY)) {
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(SEED_USERS));
    }
    console.log('🧪 MockAdapter ativado — modo standalone sem backend');
  }

  async get<T>(url: string): Promise<T> {
    await delay();
    return resolveRoute('GET', url) as T;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    await delay();
    return resolveRoute('POST', url, data) as T;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    await delay();
    return resolveRoute('PUT', url, data) as T;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    await delay();
    return resolveRoute('PATCH', url, data) as T;
  }

  async delete<T>(url: string): Promise<T> {
    await delay();
    return resolveRoute('DELETE', url) as T;
  }
}
