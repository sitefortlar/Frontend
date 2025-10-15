import { lazy, Suspense } from 'react';
import { RouteLoading } from '@/components/RouteLoading';

/**
 * Componentes lazy-loaded para melhor performance
 * Aplicando Lazy Loading Pattern
 */

// Páginas principais
export const LazyHomePage = lazy(() => import('@/pages/home/HomePage'));
export const LazyLoginPage = lazy(() => import('@/pages/login/Login'));
export const LazyCadastroPage = lazy(() => import('@/pages/cadastro/Cadastro'));
export const LazyCatalogPage = lazy(() => import('@/pages/catalog/CatalogPage'));
export const LazyNotFoundPage = lazy(() => import('@/pages/not-found/NotFound'));
export const LazyEsqueciSenhaPage = lazy(() => import('@/pages/esqueci-senha/EsqueciSenha'));
export const LazyWelcomePage = lazy(() => import('@/pages/welcome/Welcome'));

// Formulários
export const LazyRegistrationForm = lazy(() => import('@/pages/RegistrationForm'));
export const LazyEnhancedRegistrationForm = lazy(() => import('@/pages/EnhancedRegistrationForm'));

// Componentes de carrinho
export const LazyCartDrawer = lazy(() => import('@/components/Cart/CartDrawer'));
export const LazyCartSheet = lazy(() => import('@/components/Cart/CartSheet'));

// Componentes de catálogo
export const LazyProductCatalog = lazy(() => import('@/components/ProductCatalog/ProductCatalog'));
export const LazyProductModal = lazy(() => import('@/components/ProductCatalog/ProductModal'));

/**
 * HOC para envolver componentes lazy com Suspense
 */
export const withSuspense = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={fallback || <RouteLoading />}>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `withSuspense(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

/**
 * Componentes lazy com Suspense já configurado
 */
export const SuspenseHomePage = withSuspense(LazyHomePage);
export const SuspenseLoginPage = withSuspense(LazyLoginPage);
export const SuspenseCadastroPage = withSuspense(LazyCadastroPage);
export const SuspenseCatalogPage = withSuspense(LazyCatalogPage);
export const SuspenseNotFoundPage = withSuspense(LazyNotFoundPage);
export const SuspenseEsqueciSenhaPage = withSuspense(LazyEsqueciSenhaPage);
export const SuspenseWelcomePage = withSuspense(LazyWelcomePage);
export const SuspenseRegistrationForm = withSuspense(LazyRegistrationForm);
export const SuspenseEnhancedRegistrationForm = withSuspense(LazyEnhancedRegistrationForm);
export const SuspenseCartDrawer = withSuspense(LazyCartDrawer);
export const SuspenseCartSheet = withSuspense(LazyCartSheet);
export const SuspenseProductCatalog = withSuspense(LazyProductCatalog);
export const SuspenseProductModal = withSuspense(LazyProductModal);
