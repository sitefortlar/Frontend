/**
 * Tipos para paginação e parâmetros de API
 */

/**
 * Parâmetros base de paginação
 */
export interface PaginationParams {
  skip?: number;
  limit?: number;
}

/**
 * Resposta paginada do backend
 */
export interface PaginationResponse<T> {
  data: T[];
  total?: number;
  skip: number;
  limit: number;
}

/**
 * Parâmetros para listagem de produtos
 */
export interface ListProductsParams extends PaginationParams {
  estado: string;
  id_category?: number;
  id_subcategory?: number;
  order_price?: 'ASC' | 'DESC';
  active_only?: boolean;
  include_kits?: boolean;
  search_name?: string;
  min_price?: number;
  max_price?: number;
}

/**
 * Parâmetros para listagem de empresas
 */
export interface ListCompaniesParams extends PaginationParams {
  active_only?: boolean;
  vendedor_id?: number;
  search_name?: string;
}

/**
 * Parâmetros para listagem de contatos
 */
export interface ListContactsParams extends PaginationParams {
  empresa_id?: number;
  search_name?: string;
  email?: string;
  phone?: string;
}

/**
 * Parâmetros para listagem de endereços
 */
export interface ListAddressesParams extends PaginationParams {
  empresa_id?: number;
  cep?: string;
  cidade?: string;
  uf?: string;
  ibge?: string;
  search_address?: string;
}

/**
 * Parâmetros para listagem de categorias
 */
export interface ListCategoriesParams extends PaginationParams {
  id_category?: number;
  id_subcategory?: number;
}

/**
 * Parâmetros para listagem de subcategorias
 */
export interface ListSubcategoriesParams extends PaginationParams {
  id_category?: number;
}
