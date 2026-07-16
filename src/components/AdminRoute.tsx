import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { paths } from '@/routes/paths';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAdmin, isLoading, isAuthenticated } = useAuthContext();
  const location = useLocation();
  // Estabiliza a referência do state: um objeto novo a cada render faz o efeito
  // (sem deps) do <Navigate> disparar em loop.
  const redirectState = useMemo(
    () => ({ from: `${location.pathname}${location.search}` }),
    [location.pathname, location.search]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={paths.login} state={redirectState} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={paths.catalog} replace />;
  }

  return <>{children}</>;
};

