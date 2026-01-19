import { api } from './api';
import type { ListProductsParams } from '@/types/pagination';

// Re-export types from the types directory
export type { Product, Category, Subcategory, SortOption, PriceType } from '@/types/Product';

export interface ProductFilters extends Partial<ListProductsParams> {
  id_category?: string | number;
  id_subcategory?: string | number;
  order_price?: 'ASC' | 'DESC';
  limit?: number | null;
  user_estate?: string | null;
  skip?: number;
}

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<import('@/types/Product').Product[]> {
    try {
      const params: Record<string, any> = {};
      
      if (filters?.id_category !== undefined) {
        params.id_category = filters.id_category;
      }
      if (filters?.id_subcategory !== undefined) {
        params.id_subcategory = filters.id_subcategory;
      }
      if (filters?.order_price) {
        params.order_price = filters.order_price;
      }
      if (filters?.user_estate) {
        params.estado = filters.user_estate;
      }
      if (filters?.active_only !== undefined) {
        params.active_only = filters.active_only;
      }
      if (filters?.include_kits !== undefined) {
        params.include_kits = filters.include_kits;
      }
      if (filters?.search_name) {
        params.search_name = filters.search_name;
      }
      if (filters?.min_price !== undefined) {
        params.min_price = filters.min_price;
      }
      if (filters?.max_price !== undefined) {
        params.max_price = filters.max_price;
      }
      
      // Paginação (valores padrão se não fornecidos)
      params.skip = filters?.skip ?? 0;
      if (filters?.limit !== undefined && filters?.limit !== null) {
        params.limit = filters.limit;
      } else {
        // Limite padrão de 100 se não especificado
        params.limit = 100;
      }

      const response = await api.get('/product/', { params });
      return response.data;
    } catch (error: any) {
      // Preservar o erro original para permitir verificação de status HTTP no loader
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos');
    }
  },

  async getProductById(id: string | number): Promise<import('@/types/Product').Product> {
    try {
      const response = await api.get(`/product/${id}`);
      return response.data;
    } catch (error: any) {
      // Preservar o erro original para permitir verificação de status HTTP no loader
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao buscar produto');
    }
  },
};
