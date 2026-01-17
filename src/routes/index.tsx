import { Navigate, createBrowserRouter } from 'react-router-dom';
import { paths, baseUrl } from './paths';
import Layout from '@/components/Layout';

const router = createBrowserRouter([
  // Public routes
  {
    path: paths.login,
    loader: () => import('@/pages/login/loader').then(module => module.loginLoader()),
    lazy: () => import('@/pages/login').then(module => ({ Component: module.default })),
  },
  {
    path: paths.cadastro,
    lazy: () => import('@/pages/cadastro').then(module => ({ Component: module.default })),
  },
  {
    path: paths.esqueciSenha,
    lazy: () => import('@/pages/esqueci-senha').then(module => ({ Component: module.default })),
  },
  {
    path: paths.redefinirSenha,
    lazy: () => import('@/pages/redefinir-senha').then(module => ({ Component: module.default })),
  },
  {
    path: paths.confirmarCadastro,
    lazy: () => import('@/pages/confirmar-cadastro').then(module => ({ Component: module.default })),
  },
  
  // Main layout with protected routes
  {
    element: <Layout />,
    children: [
      {
        path: paths.catalog,
        loader: () => import('@/pages/catalog/loader').then(module => module.catalogLoader()),
        lazy: () => import('@/pages/catalog').then(module => ({ Component: module.default })),
      },
      {
        path: paths.importProdutos,
        lazy: () => import('@/pages/import-produtos').then(module => ({ Component: module.default })),
      },
      {
        path: paths.couponManagement,
        lazy: () => import('@/pages/coupon-management').then(module => ({ Component: module.default })),
      },
    ],
  },
  
  // Error routes
  {
    path: paths.notFound,
    lazy: () => import('@/pages/not-found').then(module => ({ Component: module.default })),
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
