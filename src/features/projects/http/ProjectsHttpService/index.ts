import { HttpService } from '@http/HttpService';
import { Category, Skill, Project, CreateProjectPayload, Candidate, AvailableProject, ApplicationPayload, MyApplication, MyJob } from '../../types';

class CategoriesHttpServiceClass extends HttpService {
  constructor() {
    super('/categories');
  }
  async getAll(): Promise<{ status: string; data: Category[] }> {
    return this.get<{ status: string; data: Category[] }>();
  }
}

class SkillsHttpServiceClass extends HttpService {
  constructor() {
    super('/skills');
  }
  async getAll(): Promise<{ status: string; data: Skill[] }> {
    return this.get<{ status: string; data: Skill[] }>();
  }
}

class ProjectsHttpServiceClass extends HttpService {
  constructor() {
    super('/projects');
  }

  async createProject(payload: CreateProjectPayload): Promise<{ status: string; data: Project }> {
    return this.post<{ status: string; data: Project }>('', payload);
  }

  async updateProject(id: number, payload: CreateProjectPayload): Promise<{ status: string; data: Project }> {
    return this.put<{ status: string; data: Project }>(`/${id}`, payload);
  }

  async deleteProject(id: number): Promise<void> {
    return this.delete<void>(`/${id}`);
  }

  async getMyProjects(): Promise<{ status: string; data: Project[] }> {
    return this.get<{ status: string; data: Project[] }>('/my');
  }

  async getProjectById(id: number): Promise<{ status: string; data: Project }> {
    return this.get<{ status: string; data: Project }>(`/${id}`);
  }

  async getCandidates(projectId: number): Promise<{ status: string; data: Candidate[] }> {
    return this.get<{ status: string; data: Candidate[] }>(`/${projectId}/candidates`);
  }

  async updateCandidateStatus(projectId: number, candidateId: number, status: 'accepted' | 'rejected'): Promise<void> {
    return this.patch<void>(`/${projectId}/candidates/${candidateId}/status`, { status });
  }

  async getAvailableProjects(): Promise<{ status: string; data: AvailableProject[] }> {
    return this.get<{ status: string; data: AvailableProject[] }>('/available');
  }

  async applyToProject(projectId: number, payload: ApplicationPayload): Promise<{ status: string; data: unknown }> {
    return this.post<{ status: string; data: unknown }>(`/${projectId}/apply`, payload);
  }

  async getMyApplications(): Promise<{ status: string; data: MyApplication[] }> {
    return this.get<{ status: string; data: MyApplication[] }>('/my-applications');
  }

  async getMyJobs(): Promise<{ status: string; data: MyJob[] }> {
    return this.get<{ status: string; data: MyJob[] }>('/my-jobs');
  }
}

export const categoriesHttpService = new CategoriesHttpServiceClass();
export const skillsHttpService = new SkillsHttpServiceClass();
export const projectsHttpService = new ProjectsHttpServiceClass();
