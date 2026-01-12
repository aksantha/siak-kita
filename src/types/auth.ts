export type UserRole = 'administrator' | 'akademik' | 'dosen' | 'mahasiswa';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  prodi_id?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
