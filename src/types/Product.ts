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
  kits?: Kit[]; // Array de kits disponíveis para este produto
}

// Kit structure from API
export interface Kit {
  id_produto: number;
  codigo: string;
  cod_kit: string;
  quantidade: number; // Quantidade de itens por kit
  valor_base_total?: number;
  valor_total_avista: number; // Valor total do kit à vista
  valor_total_30: number; // Valor total do kit em 30 dias
  valor_total_60: number; // Valor total do kit em 60 dias
  nome?: string;
  descricao?: string;
  imagens?: string[];
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
  id_categoria?: number; // Opcional, pode não estar presente em todas as respostas
  created_at: string;
  updated_at: string;
}

// Tipos para requisições de categorias
export interface CategoryRequest {
  name: string;
  subcategory?: SubcategoryRequest[];
}

export interface SubcategoryRequest {
  name: string;
}

export interface CategoryListParams {
  skip?: number;
  limit?: number;
  search_name?: string;
}

export type SortOption = 'price-high' | 'price-low';
export type PriceType = 'avista' | 'dias30' | 'dias90';