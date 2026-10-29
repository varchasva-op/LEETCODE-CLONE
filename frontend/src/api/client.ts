const BASE_URL = 'http://localhost:4000/api';

export interface AuthResponse {
  message: string;
  token: string;
  user: { id: string; username: string; email: string };
}
export interface MeResponse {
  user: { id: string; username: string; email: string };
}
export interface ProblemSummary {
  _id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
export interface Example {
  input: string;
  output: string;
  explanation?: string;
}
export interface ProblemDetail {
  _id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Example[];
  createdAt: string;
  updatedAt: string;
}
interface ProblemsListResponse { count: number; problems: ProblemSummary[] }
interface ProblemDetailResponse { problem: ProblemDetail }

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data as T;
}

export const api = {
  signup: (userData: { username: string; email: string; password: string }) =>
    request<AuthResponse>('/auth/signup', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  me: () => request<MeResponse>('/auth/me'),
  getProblems: () => request<ProblemsListResponse>('/problems'),
  getProblem: (slug: string) => request<ProblemDetailResponse>(`/problems/${slug}`),
};