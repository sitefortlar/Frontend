import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService } from '@/services/auth/auth';
import { companyService, Company } from '@/services/company';

export interface User {
  id: string;
  email: string;
  name: string;
  perfil?: string;
  role?: string;
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

  const refreshUser = useCallback(async () => {
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
      let company: Company | undefined;
      let userPerfil: string | undefined;
      
      try {
        company = await companyService.getCompanyById(userData.id);
        // O perfil vem da empresa, não do usuário
        userPerfil = company?.perfil;
      } catch (error) {
        console.warn('Could not load company data:', error);
        // Se falhar, tentar usar perfil do localStorage ou userData
        userPerfil = userData.perfil || userData.role;
      }

      const userWithProfile: User = {
        ...userData,
        perfil: userPerfil, // Perfil da empresa ou do localStorage
        role: userPerfil, // Usar perfil como role também
        company,
      };
      
      setUser(userWithProfile);
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshUser();
      setIsLoading(false);
    };

    initAuth();
  }, [refreshUser]);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.perfil === 'admin' || user?.role === 'admin';

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

