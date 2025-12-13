import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  const refreshUser = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        setUser(null);
        return;
      }

      // Obter role diretamente do token (mais confiável)
      const roleFromToken = authService.getRoleFromToken();
      
      const userData = authService.getCurrentUserFromStorage();
      if (!userData) {
        setUser(null);
        return;
      }

      // Usar role do token (prioritário) ou do localStorage
      const userRole = roleFromToken || userData.role || userData.perfil;
      const userPerfil = userRole; // Mapear role para perfil

      // Buscar dados da empresa (opcional, para outras informações)
      let company: Company | undefined;
      try {
        company = await companyService.getCompanyById(userData.id);
      } catch (error) {
        console.warn('Could not load company data:', error);
        // Não é crítico se falhar, continuamos com os dados do token
      }

      const userWithProfile: User = {
        ...userData,
        perfil: userPerfil, // Usar role do token como perfil
        role: userRole,
        company,
      };
      
      setUser(userWithProfile);
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

