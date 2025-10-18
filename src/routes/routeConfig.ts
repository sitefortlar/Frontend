import { lazy } from 'react';
import { paths } from './paths';

// Lazy load pages for better performance
export const routeConfig = {
  // Public routes
  public: [
    {
      path: paths.login,
      Component: lazy(() => import('@/pages/login')),
      title: 'Login - Fort-Lar',
    },
    {
      path: paths.cadastro,
      Component: lazy(() => import('@/pages/cadastro')),
      title: 'Cadastro - Fort-Lar',
    },
    {
      path: paths.esqueciSenha,
      Component: lazy(() => import('@/pages/esqueci-senha')),
      title: 'Esqueci Senha - Fort-Lar',
    },
    {
      path: paths.redefinirSenha,
      Component: lazy(() => import('@/pages/redefinir-senha')),
      title: 'Redefinir Senha - Fort-Lar',
    },
  ],
  
  // Protected routes (wrapped in Layout)
  protected: [
    {
      path: paths.catalog,
      Component: lazy(() => import('@/pages/catalog')),
      title: 'Fort-Lar - Catálogo de Produtos',
    },
  ],
  
  // Error routes
  error: [
    {
      path: paths.notFound,
      Component: lazy(() => import('@/pages/not-found')),
      title: '404 - Página Não Encontrada',
    },
  ],
} as const;
