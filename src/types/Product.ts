// Backend Product structure
export interface Product {
  id_produto: number;
  codigo: string;
  nome: string;
  descricao?: string;
  quantidade?: number;
  cod_kit?: string | null;
  id_categoria: number;
  id_subcategoria: number;
  valor_base?: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
  categoria: string;
  subcategoria: string;
  imagens: string[];
  avista?: number;
  '30_dias'?: number;
  '60_dias'?: number;
  kits?: Product[]; // Array de produtos que são kits
}

export interface Category {
  id_categoria: number;
  nome: string;
  created_at: string;
  updated_at: string;
  subcategorias: Subcategory[];
}

export interface Subcategory {
  id_subcategoria: number;
  nome: string;
  created_at: string;
  updated_at: string;
}

export type SortOption = 'price-high' | 'price-low';
export type PriceType = 'avista' | 'dias30' | 'dias90';