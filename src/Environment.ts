/**
 * Environment Configuration
 * 
 * Centralized configuration for environment variables
 */

export const Environment = {
  /**
   * API Configuration
   */
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

  /**
   * Application Configuration
   */
  APP_NAME: import.meta.env.VITE_APP_NAME || 'CodeBlock',
  APP_ENV: import.meta.env.MODE || 'development',

  /**
   * Feature Flags
   */
  DEBUG: import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEBUG === 'true',

  /**
   * Modo Standalone (Mock)
   * Quando true, o frontend funciona sem backend/banco de dados.
   * Todos os HttpServices usarão MockAdapter com dados locais (localStorage).
   * Para reconectar ao backend real: setar VITE_ENABLE_MOCK_API=false no .env
   */
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'false' ? false : true,

  /**
   * Pagination
   */
  ITEMS_PER_PAGE: Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 10,

  /**
   * Storage Keys
   */
  STORAGE_TOKEN_KEY: import.meta.env.VITE_STORAGE_TOKEN_KEY || 'auth_token',
  STORAGE_USER_KEY: import.meta.env.VITE_STORAGE_USER_KEY || 'user_data',

  /**
   * External Services (Optional)
   */
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
} as const;
