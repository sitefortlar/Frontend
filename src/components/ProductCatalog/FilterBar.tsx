import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowDown, Search, Package, Filter } from 'lucide-react';
import { SortOption } from '@/types/Product';

type SortMode = 'name' | 'price';
type SortDirection = 'asc' | 'desc';

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
  const sortMode: SortMode = sortBy.startsWith('name') ? 'name' : 'price';
  const isNameAsc = sortBy === 'name-asc';
  const isNameDesc = sortBy === 'name-desc';
  const isPriceLow = sortBy === 'price-low';
  const isPriceHigh = sortBy === 'price-high';

  const isNameActive = sortMode === 'name';
  const isPriceActive = sortMode === 'price';

  const nameDirection: SortDirection = isNameDesc ? 'desc' : 'asc';
  const priceDirection: SortDirection = isPriceHigh ? 'desc' : 'asc';

  const handleDirectionClick = (mode: SortMode) => {
    if (mode === 'name') {
      if (!isNameActive) {
        onSortChange('name-asc'); // troca critério -> padrão ASC
        return;
      }
      onSortChange(nameDirection === 'asc' ? 'name-desc' : 'name-asc'); // toggle
      return;
    }

    // price
    if (!isPriceActive) {
      onSortChange('price-low'); // troca critério -> padrão ASC
      return;
    }
    onSortChange(priceDirection === 'asc' ? 'price-high' : 'price-low'); // toggle
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-soft space-y-4">
      {/* Linha 1: título + badge + limpar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {onBackToCategories && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onBackToCategories}
              aria-label="Voltar"
              className="shrink-0 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="font-semibold text-base sm:text-lg truncate">{title}</h2>
            {productCount > 0 && (
              <Badge variant="secondary" className="gap-2 shrink-0 px-3 py-1.5 rounded-full">
                <Package className="h-4 w-4" aria-hidden />
                <span className="tabular-nums">
                  {productCount} produto{productCount !== 1 ? 's' : ''}
                </span>
              </Badge>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="gap-2 shrink-0 rounded-xl"
          onClick={onClearFilters}
        >
          <Filter className="h-4 w-4" aria-hidden />
          Limpar filtros
        </Button>
      </div>

      {/* Linha 2: inputs + ordenação */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={searchCode}
              onChange={(e) => onSearchCodeChange(e.target.value)}
              placeholder="Ex.: 1234"
              className="pl-10 rounded-xl"
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
              className="pl-10 rounded-xl"
              autoComplete="off"
              aria-label="Buscar por nome"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          {/* Nome (A–Z / Z–A) */}
          <div className="flex items-center rounded-xl border border-border overflow-hidden bg-background">
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={[
                    'h-10 w-10 grid place-items-center select-none',
                    isNameActive ? 'text-primary bg-primary/5' : 'text-muted-foreground',
                  ].join(' ')}
                  aria-label="Ordenar por nome"
                >
                  <span className="text-xs font-semibold leading-none">
                    A
                    <span className="ml-0.5 text-[10px] align-top">Z</span>
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Ordenar por nome</TooltipContent>
            </Tooltip>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={[
                'h-10 w-10 rounded-none',
                isNameActive ? 'bg-primary/10 text-primary hover:bg-primary/15' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
              onClick={() => handleDirectionClick('name')}
              aria-label={isNameActive ? 'Alternar direção (nome)' : 'Ativar ordenação por nome'}
              aria-pressed={isNameActive}
            >
              <ArrowDown
                className={[
                  'h-4 w-4 transition-transform duration-200 ease-in-out',
                  isNameActive && nameDirection === 'asc' ? 'rotate-180' : 'rotate-0',
                ].join(' ')}
              />
            </Button>
          </div>

          {/* Preço (menor/maior) */}
          <div className="flex items-center rounded-xl border border-border overflow-hidden bg-background">
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={[
                    'h-10 w-10 grid place-items-center select-none font-semibold',
                    isPriceActive ? 'text-primary bg-primary/5' : 'text-muted-foreground',
                  ].join(' ')}
                  aria-label="Ordenar por preço"
                >
                  $
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Ordenar por preço</TooltipContent>
            </Tooltip>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={[
                'h-10 w-10 rounded-none',
                isPriceActive ? 'bg-primary/10 text-primary hover:bg-primary/15' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
              onClick={() => handleDirectionClick('price')}
              aria-label={isPriceActive ? 'Alternar direção (preço)' : 'Ativar ordenação por preço'}
              aria-pressed={isPriceActive}
            >
              <ArrowDown
                className={[
                  'h-4 w-4 transition-transform duration-200 ease-in-out',
                  isPriceActive && priceDirection === 'asc' ? 'rotate-180' : 'rotate-0',
                ].join(' ')}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
