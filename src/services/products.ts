import { api } from './api';

// Re-export types from the types directory
export type { Product, Category, Subcategory, Kit, SortOption, PriceType } from '@/types/Product';

// Re-export data from the data directory (mock data for development)
export { products, categories, productLines } from '@/data/products';

export interface ProductFilters {
  id_category?: string | number;
  id_subcategory?: string | number;
  order_price?: 'ASC' | 'DESC';
  limit?: number | null;
  user_estate?: string | null;
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
      if (filters?.limit !== undefined && filters?.limit !== null) {
        params.limit = filters.limit;
      }
      if (filters?.user_estate) {
        params.estado = filters.user_estate;
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
