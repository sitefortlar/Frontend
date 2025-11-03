import { useState, useMemo, useCallback } from 'react';
import { Product, PriceType, SortOption } from '@/types/Product';

export interface FilterState {
  selectedCategory: number | null;
  selectedSubcategory: number | null;
  sortBy: SortOption;
  priceType: PriceType;
}

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: null,
    selectedSubcategory: null,
    sortBy: 'price-low',
    priceType: 'avista', // Mantido para compatibilidade futura
  });

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => product != null);

    if (filters.selectedCategory) {
      filtered = filtered.filter(product => 
        product.id_categoria === filters.selectedCategory
      );
    }

    if (filters.selectedSubcategory) {
      filtered = filtered.filter(product => 
        product.id_subcategoria === filters.selectedSubcategory
      );
    }

    // Sort products by price based on priceType
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      // Get price based on priceType, fallback to avista, then valor_base
      const getPrice = (product: Product) => {
        if (filters.priceType === 'avista') {
          return product.avista || product.valor_base || 0;
        } else if (filters.priceType === 'dias30') {
          return product['30_dias'] || product.valor_base || 0;
        } else if (filters.priceType === 'dias90') {
          // Se for 90 dias mas só temos 60, usa 60_dias
          return product['60_dias'] || product.valor_base || 0;
        }
        return product.avista || product.valor_base || 0;
      };

      const priceA = getPrice(a);
      const priceB = getPrice(b);

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
