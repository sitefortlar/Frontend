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
  ],
  
  // Protected routes (wrapped in Layout)
  protected: [
    {
      path: paths.home,
      Component: lazy(() => import('@/pages/home')),
      title: 'Fort-Lar - Catálogo de Produtos',
    },
    // Add more protected routes here
    // {
    //   path: paths.dashboard,
    //   Component: lazy(() => import('@/pages/Dashboard')),
    //   title: 'Dashboard - Fort-Lar',
    // },
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
