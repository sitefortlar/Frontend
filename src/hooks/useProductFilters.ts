import { useState, useMemo, useCallback } from 'react';
import { Product, PriceType, SortOption } from '@/types/Product';

export interface FilterState {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedSize: string | null;
  showKitsOnly: boolean;
  sortBy: SortOption;
  priceType: PriceType;
}

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSize: null,
    showKitsOnly: false,
    sortBy: 'name',
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

    if (filters.selectedSize) {
      filtered = filtered.filter(product => product.sizes.includes(filters.selectedSize));
    }

    if (filters.showKitsOnly) {
      filtered = filtered.filter(product => product.isKit);
    }

    // Sort products
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      
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

  const availableSizes = useMemo(() => {
    return Array.from(
      new Set(filteredProducts.flatMap(product => product.sizes))
    ).sort();
  }, [filteredProducts]);

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      selectedCategory: null,
      selectedSubcategory: null,
      selectedSize: null,
      showKitsOnly: false,
      sortBy: 'name',
      priceType: 'avista',
    });
  }, []);

  return {
    filters,
    filteredProducts,
    availableSizes,
    updateFilter,
    resetFilters,
  };
};
