import { useMemo } from 'react';
import { paths } from '@/routes/paths';

export const useRoutes = () => {
  const routeConfig = useMemo(() => ({
    // Public routes
    public: {
      login: paths.login,
      cadastro: paths.cadastro,
      esqueciSenha: paths.esqueciSenha,
      redefinirSenha: paths.redefinirSenha,
      confirmarCadastro: paths.confirmarCadastro,
    },
    
    // Protected routes
    protected: {
      catalog: paths.catalog,
    },
    
    // Error routes
    error: {
      notFound: paths.notFound,
    },
  }), []);

  const isPublicRoute = (pathname: string): boolean => {
    return Object.values(routeConfig.public).includes(pathname as any);
  };

  const isProtectedRoute = (pathname: string): boolean => {
    return Object.values(routeConfig.protected).includes(pathname as any);
  };

  const isErrorRoute = (pathname: string): boolean => {
    return Object.values(routeConfig.error).includes(pathname as any);
  };

  return {
    routes: routeConfig,
    isPublicRoute,
    isProtectedRoute,
    isErrorRoute,
  };
};
