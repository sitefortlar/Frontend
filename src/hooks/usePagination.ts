import { useState, useCallback } from 'react';

export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  skip: number;
  limit: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
}

/**
 * Hook para gerenciar paginação
 * @param initialPage - Página inicial (padrão: 1)
 * @param initialPageSize - Tamanho da página inicial (padrão: 100)
 * @returns Objeto com estado e funções de paginação
 */
export function usePagination(
  initialPage: number = 1,
  initialPageSize: number = 100
): UsePaginationReturn {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    pageSize,
    skip,
    limit,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    resetPagination,
  };
}
