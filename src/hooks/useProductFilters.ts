import { useState, useMemo, useCallback } from 'react';
import { Product, PriceType, SortOption } from '@/types/Product';

export interface FilterState {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  sortBy: SortOption;
  priceType: PriceType;
}

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: null,
    selectedSubcategory: null,
    sortBy: 'price-low',
    priceType: 'avista',
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (filters.selectedCategory) {
      filtered = filtered.filter(product => product.category === filters.selectedCategory);
    }

    if (filters.selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === filters.selectedSubcategory);
    }

    // Sort products by price only
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const priceA = a.prices[filters.priceType];
      const priceB = b.prices[filters.priceType];

      if (filters.sortBy === 'price-high') {
        return priceB - priceA;
      } else {
        return priceA - priceB;
      }
    });

    return sorted;
  }, [products, filters]);


  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      selectedCategory: null,
      selectedSubcategory: null,
      sortBy: 'price-low',
      priceType: 'avista',
    });
  }, []);

  return {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
  };
};
