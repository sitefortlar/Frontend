import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product, Category } from '@/services/products';
import { products as allProducts, categories as allCategories } from '@/services/products';

interface ProductsFilters {
  page?: number;
  limit?: number;
  inStock?: boolean;
  search?: string;
  category?: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

interface UseProductsOptions {
  initialFilters?: ProductsFilters;
  autoFetch?: boolean;
}

interface UseProductsReturn {
  // Data
  products: Product[];
  categories: Category[];
  response: ProductsResponse | null;
  
  // Loading states
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  
  // Filters
  filters: ProductsFilters;
  setFilters: (filters: ProductsFilters | ((prev: ProductsFilters) => ProductsFilters)) => void;
  updateFilter: <K extends keyof ProductsFilters>(key: K, value: ProductsFilters[K]) => void;
  clearFilters: () => void;
  
  // Actions
  refetch: () => Promise<void>;
  search: (query: string) => Promise<void>;
  
  // Computed
  hasProducts: boolean;
  totalPages: number;
  currentPage: number;
}

const DEFAULT_FILTERS: ProductsFilters = {
  page: 1,
  limit: 20,
  inStock: true,
};

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const { initialFilters = {}, autoFetch = true } = options;
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [response, setResponse] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductsFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  // Memoized values
  const hasProducts = useMemo(() => products.length > 0, [products.length]);
  const totalPages = useMemo(() => {
    if (!response) return 0;
    return Math.ceil(response.total / (filters.limit || 20));
  }, [response, filters.limit]);
  const currentPage = useMemo(() => filters.page || 1, [filters.page]);

  // Fetch products function
  const fetchProducts = useCallback(async (customFilters?: ProductsFilters) => {
    const filtersToUse = customFilters || filters;
    
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      // Simulate API call with local data
      let filteredProducts = [...allProducts];
      
      if (filtersToUse.search) {
        const searchLower = filtersToUse.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower)
        );
      }
      
      if (filtersToUse.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category === filtersToUse.category
        );
      }
      
      if (filtersToUse.inStock) {
        filteredProducts = filteredProducts.filter(p => {
          const hasPrices = p.prices && Object.keys(p.prices).length > 0;
          return hasPrices;
        });
      }
      
      const page = filtersToUse.page || 1;
      const limit = filtersToUse.limit || 20;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      const paginatedProducts = filteredProducts.slice(start, end);
      
      setProducts(paginatedProducts);
      setResponse({
        products: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
      setIsError(true);
      setProducts([]);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch categories function
  const fetchCategories = useCallback(async () => {
    try {
      setCategories(allCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Update filter function
  const updateFilter = useCallback(<K extends keyof ProductsFilters>(
    key: K, 
    value: ProductsFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset to first page when filters change
      ...(key !== 'page' && { page: 1 }),
    }));
  }, []);

  // Clear filters function
  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Search function
  const search = useCallback(async (query: string) => {
    const searchFilters = { ...filters, search: query, page: 1 };
    await fetchProducts(searchFilters);
  }, [filters, fetchProducts]);

  // Refetch function
  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  // Auto-fetch effect
  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    // Data
    products,
    categories,
    response,
    
    // Loading states
    isLoading,
    isError,
    error,
    
    // Filters
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    
    // Actions
    refetch,
    search,
    
    // Computed
    hasProducts,
    totalPages,
    currentPage,
  };
};

