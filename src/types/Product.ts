// Backend Product structure (listagem, GET por ID, PUT)
export interface Product {
  id_produto: number;
  codigo: string;
  nome: string;
  descricao: string | null;
  quantidade: number;
  cod_kit: string | null;
  id_categoria: number;
  id_subcategoria: number | null;
  valor_base: number;
  ativo: boolean;
  created_at: string;
  updated_at: string | null;
  categoria: string | null;
  subcategoria: string | null;
  imagens: string[];
  avista?: number | null;
  dias_30?: number | null;
  dias_60?: number | null;
  '30_dias'?: number | null;
  '60_dias'?: number | null;
  valor_base_total?: number;
  valor_total_avista?: number;
  valor_total_30?: number;
  valor_total_60?: number;
  kits?: Product[];
}

/** Body para PUT (atualização parcial) - apenas campos que quiser alterar */
export interface UpdateProductRequest {
  nome?: string;
  descricao?: string | null;
  quantidade?: number;
  cod_kit?: string | null;
  id_categoria?: number;
  id_subcategoria?: number | null;
  valor_base?: number;
  ativo?: boolean;
}

/** Resposta do POST de imagem ao produto */
export interface AddImageResponse {
  id_imagem: number;
  url: string;
  id_produto: number;
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