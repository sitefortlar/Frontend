import { Navigate, createBrowserRouter } from 'react-router-dom';
import { paths, baseUrl } from './paths';
import Layout from '@/components/Layout';

const router = createBrowserRouter([
  // Home: catálogo é público, não deve exigir login para navegar
  {
    path: '/',
    element: <Navigate to={paths.catalog} replace />,
  },
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
  
  // Main layout (catálogo é público; rotas de admin/pedidos se protegem internamente via AdminRoute/useAuthGuard)
  {
    element: <Layout />,
    children: [
      {
        path: paths.catalog,
        loader: () => import('@/pages/catalog/loader').then(module => module.catalogLoader()),
        lazy: () => import('@/pages/catalog').then(module => ({ Component: module.default })),
      },
      {
        path: paths.catalogAll,
        loader: () => import('@/pages/catalog/loader').then(module => module.catalogLoader()),
        lazy: () => import('@/pages/catalog').then(module => ({ Component: module.default })),
      },
      {
        path: paths.orders,
        lazy: () => import('@/pages/orders').then(module => ({ Component: module.default })),
      },
      {
        path: paths.importProdutos,
        lazy: () => import('@/pages/import-produtos').then(module => ({ Component: module.default })),
      },
      {
        path: paths.couponManagement,
        lazy: () => import('@/pages/coupon-management').then(module => ({ Component: module.default })),
      },
      {
        path: paths.adminCategorias,
        lazy: () => import('@/pages/admin/categorias').then(module => ({ Component: module.default })),
      },
      {
        path: paths.admin.produtos,
        lazy: () => import('@/pages/admin/produtos').then(module => ({ Component: module.default })),
      },
      {
        path: '/admin/produtos/:productId',
        lazy: () => import('@/pages/admin/produtos/AdminProdutoEdit').then(module => ({ Component: module.default })),
      },
      {
        path: paths.admin.descontos,
        lazy: () => import('@/pages/admin/descontos').then(module => ({ Component: module.default })),
      },
      {
        path: paths.admin.cupons,
        lazy: () => import('@/pages/admin/cupons').then(module => ({ Component: module.default })),
      },
      {
        path: paths.admin.orders,
        lazy: () => import('@/pages/admin/orders').then(module => ({ Component: module.default })),
      },
      {
        path: paths.admin.empresas,
        lazy: () => import('@/pages/admin/empresas').then(module => ({ Component: module.default })),
      },
    ],
  },
  
  // Error routes
  {
    path: paths.notFound,
    lazy: () => import('@/pages/not-found').then(module => ({ Component: module.default })),
  },
  
  // Catch all route - rota desconhecida não deve exigir login, apenas 404
  {
    path: '*',
    element: <Navigate to={paths.notFound} replace />,
  },
], { 
  basename: baseUrl 
});

export default router;
