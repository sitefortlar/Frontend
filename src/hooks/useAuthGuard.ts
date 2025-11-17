import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/auth/auth';

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

interface UseAuthGuardReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  checkAuth: () => Promise<boolean>;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}): UseAuthGuardReturn => {
  const { redirectTo = '/login', requireAuth = true } = options;
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        if (requireAuth) {
          navigate(redirectTo, { 
            state: { from: location.pathname },
            replace: true 
          });
        }
        return false;
      }

      const userData = authService.getCurrentUserFromStorage();
      if (!userData) {
        if (requireAuth) {
          await authService.logout();
          navigate(redirectTo, { 
            state: { from: location.pathname },
            replace: true 
          });
        }
        return false;
      }

      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      if (requireAuth) {
        await authService.logout();
        navigate(redirectTo, { 
          state: { from: location.pathname },
          replace: true 
        });
      }
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await checkAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [location.pathname]);

  return {
    isAuthenticated,
    isLoading,
    user,
    checkAuth,
  };
};

