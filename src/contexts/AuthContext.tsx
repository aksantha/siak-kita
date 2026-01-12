import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<string, User> = {
  admin: {
    id: 1,
    username: 'admin',
    email: 'admin@siak.ac.id',
    role: 'administrator',
    name: 'Super Administrator',
  },
  akademik: {
    id: 2,
    username: 'akademik',
    email: 'akademik@siak.ac.id',
    role: 'akademik',
    name: 'Staff Akademik TI',
    prodi_id: 1,
  },
  dosen: {
    id: 3,
    username: 'dosen',
    email: 'budi.santoso@siak.ac.id',
    role: 'dosen',
    name: 'Dr. Budi Santoso, M.Kom',
  },
  mahasiswa: {
    id: 4,
    username: 'mahasiswa',
    email: '2021001@mahasiswa.siak.ac.id',
    role: 'mahasiswa',
    name: 'Ahmad Rizki Pratama',
    prodi_id: 1,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = demoUsers[credentials.username];
    if (user && credentials.password === 'demo123') {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const roleToUsername: Record<UserRole, string> = {
      administrator: 'admin',
      akademik: 'akademik',
      dosen: 'dosen',
      mahasiswa: 'mahasiswa',
    };
    const user = demoUsers[roleToUsername[role]];
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
