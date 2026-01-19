import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/products';
import { usePagination } from './usePagination';
import { useDebounce } from './useDebounce';
import type { Product } from '@/types/Product';
import type { ListProductsParams } from '@/types/pagination';
import { validateProductPaginationParams } from '@/utils/pagination';

interface UseProductsParams extends Omit<ListProductsParams, 'skip' | 'limit'> {
  initialPage?: number;
  initialPageSize?: number;
  debounceSearch?: number;
  enabled?: boolean; // Flag para habilitar/desabilitar requisições
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  skip: number;
  limit: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
  refetch: () => Promise<void>;
  totalItems?: number;
}

/**
 * Hook para buscar e gerenciar produtos com paginação
 * 
 * @param params - Parâmetros de busca e paginação
 * @returns Objeto com produtos, estado de loading, erros e controles de paginação
 * 
 * @example
 * const {
 *   products,
 *   loading,
 *   page,
 *   setPage,
 *   setPageSize
 * } = useProducts({
 *   estado: 'SP',
 *   id_category: 1,
 *   initialPageSize: 50
 * });
 */
export function useProducts(params: UseProductsParams): UseProductsReturn {
  const {
    initialPage = 1,
    initialPageSize = 100,
    debounceSearch = 500,
    enabled = true,
    ...searchParams
  } = params;

  const { page, pageSize, skip, limit, setPage, setPageSize, nextPage, prevPage, resetPagination } =
    usePagination(initialPage, initialPageSize);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);

  // Debounce para search_name se fornecido
  const debouncedSearchName = useDebounce(
    searchParams.search_name || '',
    debounceSearch
  );

  const fetchProducts = useCallback(async () => {
    // Não fazer requisição se o hook estiver desabilitado
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validar parâmetros de paginação
      const { skip: validatedSkip, limit: validatedLimit } =
        validateProductPaginationParams(skip, limit);

      // Preparar parâmetros de busca
      const fetchParams: ListProductsParams = {
        ...searchParams,
        skip: validatedSkip,
        limit: validatedLimit,
        // Usar o valor debounced se search_name estiver presente
        search_name: debouncedSearchName || searchParams.search_name,
      };

      const data = await productService.getProducts(fetchParams);
      setProducts(data);
      
      // Se o backend retornar informações de total, atualizar
      // Por enquanto, assumimos que não temos essa informação
      // Pode ser atualizado quando o backend retornar metadados de paginação
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [
    enabled,
    skip,
    limit,
    searchParams.estado,
    searchParams.id_category,
    searchParams.id_subcategory,
    searchParams.order_price,
    searchParams.active_only,
    searchParams.include_kits,
    searchParams.min_price,
    searchParams.max_price,
    debouncedSearchName,
  ]);

  useEffect(() => {
    if (enabled) {
      fetchProducts();
    }
  }, [enabled, fetchProducts]);

  // Resetar paginação quando os filtros mudarem (exceto search_name que é debounced)
  // Só resetar se o hook estiver habilitado
  useEffect(() => {
    if (enabled) {
      resetPagination();
    }
  }, [
    enabled,
    searchParams.estado,
    searchParams.id_category,
    searchParams.id_subcategory,
    searchParams.order_price,
    searchParams.active_only,
    searchParams.include_kits,
    searchParams.min_price,
    searchParams.max_price,
  ]);

  return {
    products,
    loading,
    error,
    page,
    pageSize,
    skip,
    limit,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    resetPagination,
    refetch: fetchProducts,
    totalItems,
  };
}
