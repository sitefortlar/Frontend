import React from 'react';
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  totalItems?: number;
  className?: string;
}

/**
 * Componente de paginação reutilizável
 * 
 * @example
 * <Pagination
 *   currentPage={page}
 *   totalPages={totalPages}
 *   pageSize={pageSize}
 *   onPageChange={setPage}
 *   onPageSizeChange={setPageSize}
 *   totalItems={total}
 * />
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = true,
  pageSizeOptions = [10, 25, 50, 100, 200],
  totalItems,
  className,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!totalPages || currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (value: string) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(value));
      // Resetar para a primeira página quando mudar o tamanho
      onPageChange(1);
    }
  };

  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : undefined;
  const endItem = totalItems
    ? Math.min(currentPage * pageSize, totalItems)
    : undefined;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className || ''}`}>
      <div className="flex items-center gap-2">
        {totalItems !== undefined && (
          <span className="text-sm text-muted-foreground">
            {startItem !== undefined && endItem !== undefined
              ? `Mostrando ${startItem}-${endItem} de ${totalItems}`
              : `Total: ${totalItems}`}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label htmlFor="page-size" className="text-sm text-muted-foreground">
              Itens por página:
            </label>
            <Select
              value={pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger id="page-size" className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <UIPagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrev}
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="px-4 py-2 text-sm">
                Página {currentPage}
                {totalPages && ` de ${totalPages}`}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                className={
                  totalPages && currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                aria-disabled={totalPages ? currentPage >= totalPages : false}
              />
            </PaginationItem>
          </PaginationContent>
        </UIPagination>
      </div>
    </div>
  );
};
