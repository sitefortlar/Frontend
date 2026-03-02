import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowLeft } from 'lucide-react';
import { SortOption } from '@/types/Product';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
  onBackToCategories?: () => void;
}

export const FilterBar = ({
  sortBy,
  onSortChange,
  productCount,
  onBackToCategories,
}: FilterBarProps) => {
  const sortMode: 'name' | 'price' = sortBy.startsWith('name') ? 'name' : 'price';
  const sortDirection: 'asc' | 'desc' | 'low' | 'high' =
    sortMode === 'name'
      ? (sortBy === 'name-desc' ? 'desc' : 'asc')
      : (sortBy === 'price-high' ? 'high' : 'low');

  const sortLabel =
    sortMode === 'name'
      ? `Nome (${sortDirection === 'asc' ? 'A–Z' : 'Z–A'})`
      : `${sortDirection === 'low' ? 'Mais barato' : 'Mais caro'}`;

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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
          {onBackToCategories && <span className="text-border">|</span>}
          <ArrowUpDown className="h-5 w-5 text-primary" />
          <span className="font-medium">Ordenar</span>
          <span className="text-sm text-muted-foreground">({sortLabel})</span>
          {productCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {productCount} produto{productCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
            <Select
              value={sortMode}
              onValueChange={(value) => {
                if (value === 'name') onSortChange('name-asc');
                else onSortChange('price-low');
              }}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Preço</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Direção:</span>
            <Select
              value={sortDirection}
              onValueChange={(value) => {
                if (sortMode === 'name') {
                  onSortChange(value === 'desc' ? 'name-desc' : 'name-asc');
                } else {
                  onSortChange(value === 'high' ? 'price-high' : 'price-low');
                }
              }}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortMode === 'name' ? (
                  <>
                    <SelectItem value="asc">A–Z</SelectItem>
                    <SelectItem value="desc">Z–A</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="low">Mais barato</SelectItem>
                    <SelectItem value="high">Mais caro</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};