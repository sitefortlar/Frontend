import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowDown, ArrowUp, Search } from 'lucide-react';
import { SortOption } from '@/types/Product';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
  onBackToCategories?: () => void;
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
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between sm:flex-wrap">
        <div className="flex flex-wrap items-center gap-2">
          {onBackToCategories && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={onBackToCategories}
              aria-label="Voltar para explorar categorias"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver todas as categorias
            </Button>
          )}
          {onBackToCategories && <span className="text-border hidden sm:inline">|</span>}
          {productCount > 0 && (
            <Badge variant="secondary" className="w-fit">
              {productCount} produto{productCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="search-code" className="text-sm">
            Código
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="search-code"
              value={searchCode}
              onChange={(e) => onSearchCodeChange(e.target.value)}
              placeholder="Ex.: 1234"
              className="pl-9"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="search-name" className="text-sm">
            Nome
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="search-name"
              value={searchName}
              onChange={(e) => onSearchNameChange(e.target.value)}
              placeholder="Buscar por nome do produto"
              className="pl-9"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted-foreground sm:pt-1">Ordenar</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-end">
          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Nome</span>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={sortMode === 'name' ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9 font-serif font-bold text-base"
                    onClick={() => onSortChange('name-asc')}
                    aria-pressed={sortMode === 'name'}
                    aria-label="Ordenar por nome"
                  >
                    A
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Ordenar por nome (A–Z / Z–A com as setas)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={sortMode === 'name' && isNameAsc ? 'secondary' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => onSortChange('name-asc')}
                    aria-pressed={sortMode === 'name' && isNameAsc}
                    aria-label="Nome de A a Z"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Nome: A a Z (crescente)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={sortMode === 'name' && isNameDesc ? 'secondary' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => onSortChange('name-desc')}
                    aria-pressed={sortMode === 'name' && isNameDesc}
                    aria-label="Nome de Z a A"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Nome: Z a A (decrescente)</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Preço</span>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={sortMode === 'price' ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9 font-bold text-base"
                    onClick={() => onSortChange('price-low')}
                    aria-pressed={sortMode === 'price'}
                    aria-label="Ordenar por preço"
                  >
                    $
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Ordenar por preço (com as setas)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={sortMode === 'price' && isPriceLow ? 'secondary' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => onSortChange('price-low')}
                    aria-pressed={sortMode === 'price' && isPriceLow}
                    aria-label="Preço: menor para maior"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Preço: do menor para o maior</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={sortMode === 'price' && isPriceHigh ? 'secondary' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => onSortChange('price-high')}
                    aria-pressed={sortMode === 'price' && isPriceHigh}
                    aria-label="Preço: maior para menor"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Preço: do maior para o menor</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
