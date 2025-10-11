import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types/Product';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
}

export const FilterBar = ({
  sortBy,
  onSortChange,
  productCount,
}: FilterBarProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-primary" />
          <span className="font-medium">Ordenar por Preço</span>
          {productCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {productCount} produto{productCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-high">Maior preço</SelectItem>
              <SelectItem value="price-low">Menor preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};