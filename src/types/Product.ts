export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  prices: {
    vista: number;
    dias30: number;
    dias90: number;
  };
  sizes: string[];
  defaultSize: string;
  isKit: boolean;
  images: string[];
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

export type SortOption = 'price-high' | 'price-low' | 'name';
export type PriceType = 'vista' | 'dias30' | 'dias90';

export interface FilterState {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedSize: string | null;
  showKitsOnly: boolean;
  sortBy: SortOption;
  priceType: PriceType;
}