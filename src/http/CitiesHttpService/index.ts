import { HttpService } from '../HttpService';

interface City {
  id: string;
  name: string;
  state: string;
}

/**
 * Cities HTTP Service
 * Handles API calls related to cities
 */
export class CitiesHttpService extends HttpService {
  constructor() {
    super('/cities');
  }

  async getAll(): Promise<City[]> {
    return this.get<City[]>();
  }

  async getById(id: string): Promise<City> {
    return this.get<City>(`/${id}`);
  }

  async getByState(state: string): Promise<City[]> {
    return this.get<City[]>(`?state=${state}`);
  }
}

export const citiesHttpService = new CitiesHttpService();
