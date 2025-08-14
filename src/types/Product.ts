export interface Kit {
  id: string;
  units: number;
  prices: {
    avista: number;
    dias30: number;
    dias90: number;
  };
  popular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  prices: {
    avista: number;
    dias30: number;
    dias90: number;
  };
  sizes: string[];
  defaultSize: string;
  isKit: boolean;
  images: string[];
  icon: string;
  kits: Kit[];
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
export type PriceType = 'avista' | 'dias30' | 'dias90';

export interface FilterState {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedSize: string | null;
  showKitsOnly: boolean;
  sortBy: SortOption;
  priceType: PriceType;
}