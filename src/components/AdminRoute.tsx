import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { paths } from '@/routes/paths';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAdmin, isLoading, isAuthenticated } = useAuthContext();

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
    return <Navigate to={paths.login} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={paths.catalog} replace />;
  }

  return <>{children}</>;
};

