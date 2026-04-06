/**
 * User Authentication Service
 * Handles authentication logic
 */
export class UserAuthenticationService {
  private static TOKEN_KEY = 'auth_token';
  private static USER_KEY = 'user_data';

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  /**
   * Get stored token
   */
  static getToken(): string | null {
    try {
      const item = localStorage.getItem(this.TOKEN_KEY);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  /**
   * Store token
   */
  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  /**
   * Get stored user data
   */
  static getUserData<T>(): T | null {
    try {
      const item = localStorage.getItem(this.USER_KEY);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  /**
   * Store user data
   */
  static setUserData<T>(userData: T): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  /**
   * Clear authentication data
   */
  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
