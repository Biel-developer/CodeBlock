/**
 * Global Configuration
 * 
 * Application-wide configuration settings
 */

export const config = {
  app: {
    name: 'CodeBlock',
    description: 'Projeto CodeBlock',
    version: '1.0.0',
  },
  api: {
    timeout: 30000,
    retries: 3,
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
  storage: {
    tokenKey: 'auth_token',
    userKey: 'user_data',
  },
} as const;
