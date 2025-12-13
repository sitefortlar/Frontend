import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth/auth';
import { companyService, Company } from '@/services/company';

export interface User {
  id: string;
  email: string;
  name: string;
  perfil?: string;
  company?: Company;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        setUser(null);
        return;
      }

      const userData = authService.getCurrentUserFromStorage();
      if (!userData) {
        setUser(null);
        return;
      }

      // Buscar dados da empresa para obter o perfil
      try {
        const company = await companyService.getCompanyById(userData.id);
        const userWithProfile: User = {
          ...userData,
          perfil: company.perfil,
          company,
        };
        setUser(userWithProfile);
      } catch (error) {
        // Se falhar ao buscar empresa, usar dados básicos
        setUser(userData as User);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshUser();
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.perfil === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

