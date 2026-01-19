import { useState, useEffect, useCallback } from 'react';
import { companyService } from '@/services/company';
import { usePagination } from './usePagination';
import { useDebounce } from './useDebounce';
import type { Company } from '@/services/company';
import type { ListCompaniesParams } from '@/types/pagination';
import { validatePaginationParams } from '@/utils/pagination';

interface UseCompaniesParams extends Omit<ListCompaniesParams, 'skip' | 'limit'> {
  initialPage?: number;
  initialPageSize?: number;
  debounceSearch?: number;
}

interface UseCompaniesReturn {
  companies: Company[];
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
 * Hook para buscar e gerenciar empresas com paginação
 * 
 * @param params - Parâmetros de busca e paginação
 * @returns Objeto com empresas, estado de loading, erros e controles de paginação
 * 
 * @example
 * const {
 *   companies,
 *   loading,
 *   page,
 *   setPage
 * } = useCompanies({
 *   active_only: true,
 *   initialPageSize: 50
 * });
 */
export function useCompanies(params: UseCompaniesParams = {}): UseCompaniesReturn {
  const {
    initialPage = 1,
    initialPageSize = 100,
    debounceSearch = 500,
    ...searchParams
  } = params;

  const { page, pageSize, skip, limit, setPage, setPageSize, nextPage, prevPage, resetPagination } =
    usePagination(initialPage, initialPageSize);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);

  // Debounce para search_name se fornecido
  const debouncedSearchName = useDebounce(
    searchParams.search_name || '',
    debounceSearch
  );

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Validar parâmetros de paginação
      const { skip: validatedSkip, limit: validatedLimit } =
        validatePaginationParams(skip, limit);

      // Preparar parâmetros de busca
      const fetchParams: ListCompaniesParams = {
        ...searchParams,
        skip: validatedSkip,
        limit: validatedLimit,
        // Usar o valor debounced se search_name estiver presente
        search_name: debouncedSearchName || searchParams.search_name,
      };

      const data = await companyService.listCompanies(fetchParams);
      setCompanies(data);
      
      // Se o backend retornar informações de total, atualizar
      // Por enquanto, assumimos que não temos essa informação
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar empresas';
      setError(errorMessage);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [
    skip,
    limit,
    searchParams.active_only,
    searchParams.vendedor_id,
    debouncedSearchName,
  ]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Resetar paginação quando os filtros mudarem
  useEffect(() => {
    resetPagination();
  }, [
    searchParams.active_only,
    searchParams.vendedor_id,
  ]);

  return {
    companies,
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
    refetch: fetchCompanies,
    totalItems,
  };
}
