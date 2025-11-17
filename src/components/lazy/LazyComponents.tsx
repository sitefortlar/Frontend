import { lazy } from 'react';

// Lazy load page components
export const LazyLogin = lazy(() => import('@/pages/login/Login'));
export const LazyCadastro = lazy(() => import('@/pages/cadastro/Cadastro'));
export const LazyEsqueciSenha = lazy(() => import('@/pages/esqueci-senha/EsqueciSenha'));
export const LazyRedefinirSenha = lazy(() => import('@/pages/redefinir-senha/RedefinirSenha'));
export const LazyCatalog = lazy(() => import('@/pages/catalog/CatalogPage'));

// Lazy load component pieces
export const LazyProductCatalog = lazy(() => import('@/components/ProductCatalog/ProductCatalog'));
export const LazyProductModal = lazy(() => import('@/components/ProductCatalog/ProductModal'));
export const LazyCartDrawer = lazy(() => import('@/components/Cart/CartDrawer'));
export const LazyCartSheet = lazy(() => import('@/components/Cart/CartSheet'));
