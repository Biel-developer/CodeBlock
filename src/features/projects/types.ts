export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Skill {
  id: number;
  name: string;
  slug: string;
}

export interface Contractor {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  city?: string;
  state?: string;
}

export interface Project {
  id: number;
  contractorId: number;
  categoryId: number;
  title: string;
  description: string;
  scope: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: 'draft' | 'published' | 'closed';
  category?: Category;
  skills?: Skill[];
  contractor?: Contractor;
  candidatesCount?: number;
  createdAt?: string;
}

export interface Candidate {
  id: number;
  userId: number;
  name: string;
  email: string;
  avatarUrl?: string;
  status: 'pending' | 'accepted' | 'rejected';
  proposedValue?: number;
  proposalText?: string;
}

export interface CreateProjectPayload {
  title: string;
  categoryId: number;
  description: string;
  scope: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  skills: string[];
}

export interface AvailableProject extends Project {
  alreadyApplied: boolean;
}

export interface ApplicationPayload {
  proposedValue: number;
  proposalText: string;
}

export interface MyJob {
  id: number;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: string;
  category: { name: string; slug: string } | null;
  skills: Skill[];
}

export interface MyApplication {
  applicationId: number;
  applicationStatus: 'pending' | 'accepted' | 'rejected';
  proposedValue: number;
  id: number;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: string;
}
