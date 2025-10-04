import { Navigate, createBrowserRouter } from 'react-router-dom';
import { paths, baseUrl } from './paths';
import Layout from '@/components/Layout';

const router = createBrowserRouter([
  // Public routes
  {
    path: paths.login,
    loader: () => import('@/pages/login/loader').then(module => module.loginLoader()),
    lazy: () => import('@/pages/Login').then(module => ({ Component: module.default })),
  },
  {
    path: paths.cadastro,
    lazy: () => import('@/pages/Cadastro').then(module => ({ Component: module.default })),
  },
  {
    path: paths.esqueciSenha,
    lazy: () => import('@/pages/EsqueciSenha').then(module => ({ Component: module.default })),
  },
  
  // Protected routes
  {
    path: paths.welcome,
    loader: () => import('@/pages/welcome/loader').then(module => module.welcomeLoader()),
    lazy: () => import('@/pages/Welcome').then(module => ({ Component: module.default })),
  },
  
  // Main layout with protected routes
  {
    element: <Layout />,
    children: [
      {
        path: paths.home,
        loader: () => import('@/pages/home/loader').then(module => module.homeLoader()),
        lazy: () => import('@/pages/Index').then(module => ({ Component: module.default })),
      },
      // Add more protected routes here in the future
      // {
      //   path: paths.dashboard,
      //   lazy: () => import('@/pages/Dashboard').then(module => ({ Component: module.default })),
      // },
    ],
  },
  
  // Error routes
  {
    path: paths.notFound,
    lazy: () => import('@/pages/NotFound').then(module => ({ Component: module.default })),
  },
  
  // Catch all route - redirect to login
  {
    path: '*',
    element: <Navigate to={paths.login} replace />,
  },
], { 
  basename: baseUrl 
});

export default router;
