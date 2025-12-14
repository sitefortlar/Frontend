import { BaseService } from '../base/BaseService';
import { Product, Category, ProductFilters } from '@/schemas';
import { Pagination } from '@/types';

/**
 * Interface para resposta paginada de produtos
 */
export interface ProductsResponse {
  data: Product[];
  pagination: Pagination;
  filters: ProductFilters;
}

/**
 * Interface para resposta de categorias
 */
export interface CategoriesResponse {
  data: Category[];
  total: number;
}

/**
 * Interface para resposta de busca
 */
export interface SearchResponse {
  data: Product[];
  query: string;
  total: number;
  suggestions: string[];
}

/**
 * Serviço de produtos
 * Aplicando Single Responsibility Principle
 */
export class ProductService extends BaseService {
  constructor() {
    super('/products');
  }

  /**
   * Busca produtos com filtros e paginação
   */
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const queryString = this.buildQueryString(filters);
    const endpoint = queryString ? `?${queryString}` : '';
    
    return this.get<ProductsResponse>(endpoint);
  }

  /**
   * Busca um produto por ID
   */
  async getProductById(id: string): Promise<Product> {
    return this.get<Product>(`/${id}`);
  }

  /**
   * Busca produtos por categoria
   */
  async getProductsByCategory(categoryId: string, filters: Omit<ProductFilters, 'category'> = {}): Promise<ProductsResponse> {
    const queryString = this.buildQueryString({ ...filters, category: categoryId });
    const endpoint = queryString ? `?${queryString}` : '';
    
    return this.get<ProductsResponse>(`/category/${categoryId}${endpoint}`);
  }

  /**
   * Busca produtos por termo de pesquisa
   */
  async searchProducts(query: string, filters: Omit<ProductFilters, 'search'> = {}): Promise<SearchResponse> {
    const queryString = this.buildQueryString({ ...filters, search: query });
    const endpoint = queryString ? `?${queryString}` : '';
    
    return this.get<SearchResponse>(`/search${endpoint}`);
  }

  /**
   * Busca sugestões de pesquisa
   */
  async getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
    const queryString = this.buildQueryString({ query, limit });
    
    return this.get<string[]>(`/search/suggestions?${queryString}`);
  }

  /**
   * Busca produtos relacionados
   */
  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    const queryString = this.buildQueryString({ limit });
    
    return this.get<Product[]>(`/${productId}/related?${queryString}`);
  }

  /**
   * Busca produtos em destaque
   */
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const queryString = this.buildQueryString({ limit });
    
    return this.get<Product[]>(`/featured?${queryString}`);
  }

  /**
   * Busca produtos mais vendidos
   */
  async getBestSellers(limit: number = 8): Promise<Product[]> {
    const queryString = this.buildQueryString({ limit });
    
    return this.get<Product[]>(`/best-sellers?${queryString}`);
  }

  /**
   * Busca produtos em promoção
   */
  async getPromotionalProducts(limit: number = 8): Promise<Product[]> {
    const queryString = this.buildQueryString({ limit });
    
    return this.get<Product[]>(`/promotional?${queryString}`);
  }

  /**
   * Busca todas as categorias
   */
  async getCategories(): Promise<CategoriesResponse> {
    return this.get<CategoriesResponse>('/categories');
  }

  /**
   * Busca uma categoria por ID
   */
  async getCategoryById(id: string): Promise<Category> {
    return this.get<Category>(`/categories/${id}`);
  }

  /**
   * Busca produtos por faixa de preço
   */
  async getProductsByPriceRange(minPrice: number, maxPrice: number, filters: Omit<ProductFilters, 'minPrice' | 'maxPrice'> = {}): Promise<ProductsResponse> {
    const queryString = this.buildQueryString({ 
      ...filters, 
      minPrice, 
      maxPrice 
    });
    
    return this.get<ProductsResponse>(`?${queryString}`);
  }

  /**
   * Busca produtos por tamanho
   */
  async getProductsBySize(size: string, filters: Omit<ProductFilters, 'sizes'> = {}): Promise<ProductsResponse> {
    const queryString = this.buildQueryString({ 
      ...filters, 
      sizes: [size] 
    });
    
    return this.get<ProductsResponse>(`?${queryString}`);
  }

  /**
   * Busca produtos por tipo de preço
   */
  async getProductsByPriceType(priceType: 'retail' | 'wholesale' | 'promotional', filters: Omit<ProductFilters, 'priceType'> = {}): Promise<ProductsResponse> {
    const queryString = this.buildQueryString({ 
      ...filters, 
      priceType 
    });
    
    return this.get<ProductsResponse>(`?${queryString}`);
  }

  /**
   * Busca produtos ordenados
   */
  async getProductsSorted(sortBy: 'name' | 'price' | 'category' | 'createdAt', sortOrder: 'asc' | 'desc' = 'asc', filters: Omit<ProductFilters, 'sortBy' | 'sortOrder'> = {}): Promise<ProductsResponse> {
    const queryString = this.buildQueryString({ 
      ...filters, 
      sortBy, 
      sortOrder 
    });
    
    return this.get<ProductsResponse>(`?${queryString}`);
  }

  /**
   * Busca produtos com múltiplos filtros
   */
  async getProductsWithFilters(filters: ProductFilters): Promise<ProductsResponse> {
    const queryString = this.buildQueryString(filters);
    const endpoint = queryString ? `?${queryString}` : '';
    
    return this.get<ProductsResponse>(endpoint);
  }

  /**
   * Busca estatísticas de produtos
   */
  async getProductStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    categories: number;
    averagePrice: number;
  }> {
    return this.get<{
      total: number;
      active: number;
      inactive: number;
      categories: number;
      averagePrice: number;
    }>('/stats');
  }

  /**
   * Faz upload de arquivo CSV ou Excel para importar produtos
   * O upload substitui completamente todos os produtos existentes
   * 
   * @param file Arquivo CSV ou Excel (.csv, .xls, .xlsx)
   * @returns Promise<void>
   */
  async upload(file: File): Promise<void> {
    // Validar tipo de arquivo
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const allowedExtensions = ['.csv', '.xls', '.xlsx'];
    
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    const isValidType = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
    
    if (!isValidType) {
      throw new Error('Tipo de arquivo inválido. Apenas arquivos CSV ou Excel (.csv, .xls, .xlsx) são permitidos.');
    }

    // Criar FormData para multipart/form-data
    const formData = new FormData();
    formData.append('file', file);

    // Fazer upload - axios detecta automaticamente multipart/form-data quando FormData é usado
    // O endpoint é /product (não /products) conforme especificação da API
    try {
      await this.client.post('/product', formData);
    } catch (error: any) {
      // Preservar o erro original
      if (error.response) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Erro ao fazer upload do arquivo';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }
}

/**
 * Instância singleton do serviço de produtos
 */
export const productService = new ProductService();
