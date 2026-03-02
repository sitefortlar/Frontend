import React from 'react';
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const buildPageModel = (current: number, total: number) => {
    // Modelo: 1 … (c-1) c (c+1) … total (com limites)
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set<number>([1, total, current]);
    if (current - 1 >= 2) pages.add(current - 1);
    if (current + 1 <= total - 1) pages.add(current + 1);

    const sorted = [...pages].sort((a, b) => a - b);
    const model: Array<number | 'ellipsis'> = [];

    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];
      const prev = sorted[i - 1];
      if (prev && p - prev > 1) model.push('ellipsis');
      model.push(p);
    }
    return model;
  };

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
    <div
      className={cn(
        "w-full bg-card/70 border border-border rounded-lg p-3 sm:p-4 shadow-soft",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
        {totalItems !== undefined && (
          <span className="text-sm text-muted-foreground">
            {startItem !== undefined && endItem !== undefined
              ? `Mostrando ${startItem}-${endItem} de ${totalItems}`
              : `Total: ${totalItems}`}
          </span>
        )}
      </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {showPageSizeSelector && onPageSizeChange && (
            <div className="flex items-center gap-2 justify-between sm:justify-start">
              <label htmlFor="page-size" className="text-sm text-muted-foreground whitespace-nowrap">
                Itens:
              </label>
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger id="page-size" className="w-[110px] bg-background">
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

          <UIPagination className="justify-start sm:justify-end">
            <PaginationContent className="flex-wrap">
              <PaginationItem>
                <PaginationLink
                  size="default"
                  onClick={handlePrev}
                  className={cn(
                    "gap-1 pl-2.5",
                    currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                  )}
                  aria-disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </PaginationLink>
              </PaginationItem>

              {totalPages ? (
                buildPageModel(currentPage, totalPages).map((item, idx) => {
                  if (item === 'ellipsis') {
                    return (
                      <PaginationItem key={`e-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  const pageNum = item;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={pageNum === currentPage}
                        onClick={() => onPageChange(pageNum)}
                        className="cursor-pointer"
                        aria-label={`Ir para página ${pageNum}`}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })
              ) : (
                <PaginationItem>
                  <span className="px-3 py-2 text-sm text-muted-foreground">
                    Página {currentPage}
                  </span>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  size="default"
                  onClick={handleNext}
                  className={cn(
                    "gap-1 pr-2.5",
                    totalPages && currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                  )}
                  aria-disabled={totalPages ? currentPage >= totalPages : false}
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <ChevronRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </UIPagination>
        </div>
      </div>
    </div>
  );
};
