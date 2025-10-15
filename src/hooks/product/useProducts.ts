import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { productService } from '@/services/product/ProductService';
import { queryKeys, queryConfigs } from '@/config/queryClient';
import { ProductFilters, Product, Category } from '@/schemas';

/**
 * Hook para gerenciar produtos
 * Aplicando Single Responsibility Principle
 */
export const useProducts = (filters: ProductFilters = {}) => {
  const queryClient = useQueryClient();

  // Query para buscar produtos com filtros
  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.getProducts(filters),
    ...queryConfigs.dynamic,
  });

  // Query para buscar categorias
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: queryKeys.products.categories,
    queryFn: () => productService.getCategories(),
    ...queryConfigs.static,
  });

  // Query para buscar produtos em destaque
  const {
    data: featuredProducts,
    isLoading: isFeaturedLoading,
    error: featuredError,
  } = useQuery({
    queryKey: [...queryKeys.products.all, 'featured'],
    queryFn: () => productService.getFeaturedProducts(8),
    ...queryConfigs.dynamic,
  });

  // Query para buscar produtos mais vendidos
  const {
    data: bestSellers,
    isLoading: isBestSellersLoading,
    error: bestSellersError,
  } = useQuery({
    queryKey: [...queryKeys.products.all, 'best-sellers'],
    queryFn: () => productService.getBestSellers(8),
    ...queryConfigs.dynamic,
  });

  // Query para buscar produtos promocionais
  const {
    data: promotionalProducts,
    isLoading: isPromotionalLoading,
    error: promotionalError,
  } = useQuery({
    queryKey: [...queryKeys.products.all, 'promotional'],
    queryFn: () => productService.getPromotionalProducts(8),
    ...queryConfigs.dynamic,
  });

  // Memoiza os dados dos produtos
  const products = useMemo(() => productsData?.data || [], [productsData?.data]);
  const pagination = useMemo(() => productsData?.pagination, [productsData?.pagination]);
  const categories = useMemo(() => categoriesData?.data || [], [categoriesData?.data]);

  // Função para buscar produtos por categoria
  const getProductsByCategory = useCallback(
    (categoryId: string, additionalFilters: Omit<ProductFilters, 'category'> = {}) => {
      return productService.getProductsByCategory(categoryId, additionalFilters);
    },
    []
  );

  // Função para buscar produtos por termo de pesquisa
  const searchProducts = useCallback(
    (query: string, additionalFilters: Omit<ProductFilters, 'search'> = {}) => {
      return productService.searchProducts(query, additionalFilters);
    },
    []
  );

  // Função para buscar sugestões de pesquisa
  const getSearchSuggestions = useCallback(
    (query: string, limit: number = 5) => {
      return productService.getSearchSuggestions(query, limit);
    },
    []
  );

  // Função para buscar produtos relacionados
  const getRelatedProducts = useCallback(
    (productId: string, limit: number = 4) => {
      return productService.getRelatedProducts(productId, limit);
    },
    []
  );

  // Função para buscar produtos por faixa de preço
  const getProductsByPriceRange = useCallback(
    (minPrice: number, maxPrice: number, additionalFilters: Omit<ProductFilters, 'minPrice' | 'maxPrice'> = {}) => {
      return productService.getProductsByPriceRange(minPrice, maxPrice, additionalFilters);
    },
    []
  );

  // Função para buscar produtos por tamanho
  const getProductsBySize = useCallback(
    (size: string, additionalFilters: Omit<ProductFilters, 'sizes'> = {}) => {
      return productService.getProductsBySize(size, additionalFilters);
    },
    []
  );

  // Função para buscar produtos por tipo de preço
  const getProductsByPriceType = useCallback(
    (priceType: 'retail' | 'wholesale' | 'promotional', additionalFilters: Omit<ProductFilters, 'priceType'> = {}) => {
      return productService.getProductsByPriceType(priceType, additionalFilters);
    },
    []
  );

  // Função para buscar produtos ordenados
  const getProductsSorted = useCallback(
    (sortBy: 'name' | 'price' | 'category' | 'createdAt', sortOrder: 'asc' | 'desc' = 'asc', additionalFilters: Omit<ProductFilters, 'sortBy' | 'sortOrder'> = {}) => {
      return productService.getProductsSorted(sortBy, sortOrder, additionalFilters);
    },
    []
  );

  // Função para invalidar cache de produtos
  const invalidateProducts = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
  }, [queryClient]);

  // Função para invalidar cache de categorias
  const invalidateCategories = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.categories });
  }, [queryClient]);

  // Função para pré-carregar dados de um produto
  const prefetchProduct = useCallback(
    (productId: string) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.products.detail(productId),
        queryFn: () => productService.getProductById(productId),
        ...queryConfigs.dynamic,
      });
    },
    [queryClient]
  );

  return {
    // Dados dos produtos
    products,
    pagination,
    categories,
    featuredProducts: featuredProducts || [],
    bestSellers: bestSellers || [],
    promotionalProducts: promotionalProducts || [],

    // Estados de loading
    isProductsLoading,
    isCategoriesLoading,
    isFeaturedLoading,
    isBestSellersLoading,
    isPromotionalLoading,

    // Erros
    productsError,
    categoriesError,
    featuredError,
    bestSellersError,
    promotionalError,

    // Funções
    refetchProducts,
    getProductsByCategory,
    searchProducts,
    getSearchSuggestions,
    getRelatedProducts,
    getProductsByPriceRange,
    getProductsBySize,
    getProductsByPriceType,
    getProductsSorted,
    invalidateProducts,
    invalidateCategories,
    prefetchProduct,
  };
};

/**
 * Hook para gerenciar um produto específico
 */
export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();

  // Query para buscar produto por ID
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId,
    ...queryConfigs.dynamic,
  });

  // Query para buscar produtos relacionados
  const {
    data: relatedProducts,
    isLoading: isRelatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: [...queryKeys.products.detail(productId), 'related'],
    queryFn: () => productService.getRelatedProducts(productId, 4),
    enabled: !!productId,
    ...queryConfigs.dynamic,
  });

  // Função para invalidar cache do produto
  const invalidateProduct = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(productId) });
  }, [queryClient, productId]);

  return {
    product,
    relatedProducts: relatedProducts || [],
    isProductLoading,
    isRelatedLoading,
    productError,
    relatedError,
    refetchProduct,
    invalidateProduct,
  };
};

/**
 * Hook para gerenciar busca de produtos
 */
export const useProductSearch = (query: string) => {
  const queryClient = useQueryClient();

  // Query para buscar produtos
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => productService.searchProducts(query),
    enabled: !!query && query.length >= 2,
    ...queryConfigs.dynamic,
  });

  // Query para buscar sugestões
  const {
    data: suggestions,
    isLoading: isSuggestionsLoading,
    error: suggestionsError,
  } = useQuery({
    queryKey: [...queryKeys.products.search(query), 'suggestions'],
    queryFn: () => productService.getSearchSuggestions(query, 5),
    enabled: !!query && query.length >= 2,
    ...queryConfigs.dynamic,
  });

  // Função para invalidar cache de busca
  const invalidateSearch = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.search(query) });
  }, [queryClient, query]);

  return {
    searchResults: searchResults?.data || [],
    suggestions: suggestions || [],
    totalResults: searchResults?.total || 0,
    isSearchLoading,
    isSuggestionsLoading,
    searchError,
    suggestionsError,
    refetchSearch,
    invalidateSearch,
  };
};
