import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Package, ArrowUpDown, DollarSign } from 'lucide-react';
import { SortOption, PriceType } from '@/types/Product';

interface FilterBarProps {
  selectedSize: string | null;
  showKitsOnly: boolean;
  sortBy: SortOption;
  priceType: PriceType;
  availableSizes: string[];
  onSizeChange: (size: string | null) => void;
  onKitsToggle: () => void;
  onSortChange: (sort: SortOption) => void;
  onPriceTypeChange: (priceType: PriceType) => void;
  productCount: number;
}

export const FilterBar = ({
  selectedSize,
  showKitsOnly,
  sortBy,
  priceType,
  availableSizes,
  onSizeChange,
  onKitsToggle,
  onSortChange,
  onPriceTypeChange,
  productCount,
}: FilterBarProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-kitchen-copper" />
          <span className="font-medium">Filtros</span>
          {productCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {productCount} produto{productCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Price Type Selector */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-kitchen-copper" />
            <Select value={priceType} onValueChange={onPriceTypeChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vista">À vista</SelectItem>
                <SelectItem value="dias30">30 dias</SelectItem>
                <SelectItem value="dias90">90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size Filter */}
          <Select value={selectedSize || "all"} onValueChange={(value) => onSizeChange(value === "all" ? null : value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tamanhos</SelectItem>
              {availableSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Kits Filter */}
          <Button
            variant={showKitsOnly ? "kitchen" : "filter"}
            onClick={onKitsToggle}
            className="gap-2"
          >
            <Package className="h-4 w-4" />
            {showKitsOnly ? "Mostrando Kits" : "Apenas Kits"}
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-kitchen-copper" />
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};