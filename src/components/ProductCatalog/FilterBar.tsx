import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowDown, ArrowUp, Search, FilterX, Box } from 'lucide-react';
import { SortOption } from '@/types/Product';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
  onBackToCategories?: () => void;
  title: string;
  onClearFilters: () => void;
  searchCode: string;
  searchName: string;
  onSearchCodeChange: (value: string) => void;
  onSearchNameChange: (value: string) => void;
}

export const FilterBar = ({
  sortBy,
  onSortChange,
  productCount,
  onBackToCategories,
  title,
  onClearFilters,
  searchCode,
  searchName,
  onSearchCodeChange,
  onSearchNameChange,
}: FilterBarProps) => {
  const sortMode: 'name' | 'price' = sortBy.startsWith('name') ? 'name' : 'price';
  const isNameAsc = sortBy === 'name-asc';
  const isNameDesc = sortBy === 'name-desc';
  const isPriceLow = sortBy === 'price-low';
  const isPriceHigh = sortBy === 'price-high';

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft space-y-4">
      {/* Linha 1: título + badge + limpar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {onBackToCategories && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onBackToCategories}
              aria-label="Voltar"
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="font-semibold text-base sm:text-lg truncate">{title}</h2>
            {productCount > 0 && (
              <Badge variant="secondary" className="gap-1.5 shrink-0">
                <Box className="h-3.5 w-3.5" aria-hidden />
                {productCount} produto{productCount !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="gap-2 shrink-0"
          onClick={onClearFilters}
        >
          <FilterX className="h-4 w-4" aria-hidden />
          Limpar filtros
        </Button>
      </div>

      {/* Linha 2: inputs + ordenação */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={searchCode}
              onChange={(e) => onSearchCodeChange(e.target.value)}
              placeholder="Ex.: 1234"
              className="pl-9"
              autoComplete="off"
              aria-label="Buscar por código"
            />
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={searchName}
              onChange={(e) => onSearchNameChange(e.target.value)}
              placeholder="Buscar por nome do produto"
              className="pl-9"
              autoComplete="off"
              aria-label="Buscar por nome"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <div className="flex items-center rounded-md border border-border overflow-hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={sortMode === 'name' && isNameAsc ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-none font-serif font-bold"
                  onClick={() => onSortChange('name-asc')}
                  aria-label="Nome: A–Z"
                >
                  A
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Nome: A–Z</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={sortMode === 'name' && isNameDesc ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => onSortChange('name-desc')}
                  aria-label="Nome: Z–A"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Nome: Z–A</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center rounded-md border border-border overflow-hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={sortMode === 'price' && isPriceLow ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-none font-bold"
                  onClick={() => onSortChange('price-low')}
                  aria-label="Preço: menor primeiro"
                >
                  $
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Preço: menor primeiro</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={sortMode === 'price' && isPriceHigh ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => onSortChange('price-high')}
                  aria-label="Preço: maior primeiro"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Preço: maior primeiro</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
