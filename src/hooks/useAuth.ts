import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth/auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = authService.getToken();
      
      if (token) {
        try {
          // Usar dados do localStorage em vez de fazer requisição
          const userData = authService.getCurrentUserFromStorage();
          
          if (userData) {
            setUser(userData);
            // Only navigate if not already on catalog page
            if (window.location.pathname === '/login' || window.location.pathname === '/cadastro') {
              navigate('/catalog');
            }
          }
        } catch (error) {
          // Não fazer logout automático, apenas limpar dados inválidos
        }
      }
    };
    
    checkUser();
  }, [navigate]);

  const signIn = async (login: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authService.login({ login, password });
      setUser(response.user);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await authService.logout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
  };
};
