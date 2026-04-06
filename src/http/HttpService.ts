import { IHttpAdapter } from './IHttpAdapter';
import { AxiosAdapter } from './adapters/AxiosAdapter';
import { MockAdapter } from './adapters/MockAdapter';
import { Environment } from '@/Environment';

/**
 * Base HTTP Service
 * Provides common HTTP methods for services
 * 
 * Quando Environment.ENABLE_MOCK_API === true, usa MockAdapter (standalone).
 * Caso contrário, usa AxiosAdapter (backend real).
 */
export class HttpService {
  protected httpAdapter: IHttpAdapter;
  protected basePath: string;

  constructor(basePath: string, httpAdapter?: IHttpAdapter) {
    this.basePath = basePath;
    this.httpAdapter = httpAdapter || (Environment.ENABLE_MOCK_API ? new MockAdapter() : new AxiosAdapter());
  }

  protected async get<T>(endpoint: string = ''): Promise<T> {
    return this.httpAdapter.get<T>(`${this.basePath}${endpoint}`);
  }

  protected async post<T>(endpoint: string = '', data?: any): Promise<T> {
    return this.httpAdapter.post<T>(`${this.basePath}${endpoint}`, data);
  }

  protected async put<T>(endpoint: string = '', data?: any): Promise<T> {
    return this.httpAdapter.put<T>(`${this.basePath}${endpoint}`, data);
  }

  protected async patch<T>(endpoint: string = '', data?: any): Promise<T> {
    return this.httpAdapter.patch<T>(`${this.basePath}${endpoint}`, data);
  }

  protected async delete<T>(endpoint: string = ''): Promise<T> {
    return this.httpAdapter.delete<T>(`${this.basePath}${endpoint}`);
  }
}
