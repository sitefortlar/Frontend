export interface Kit {
  id: string;
  units: number;
  prices: {
    avista: number;
    '2x': number;
    '4x': number;
    '10x': number;
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
    '2x': number;
    '4x': number;
    '10x': number;
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
export type PriceType = 'avista' | '2x' | '4x' | '10x';

export interface FilterState {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedSize: string | null;
  showKitsOnly: boolean;
  sortBy: SortOption;
  priceType: PriceType;
}