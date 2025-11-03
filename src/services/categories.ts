import { api } from './api';
import type { Category } from '@/types/Product';

export interface CategoryFilters {
  id_category?: string | number;
  id_subcategory?: string | number;
}

export const categoryService = {
  async getCategories(filters?: CategoryFilters): Promise<Category[]> {
    try {
      const params: Record<string, any> = {};
      
      if (filters?.id_category) {
        params.id_category = filters.id_category;
      }
      if (filters?.id_subcategory) {
        params.id_subcategory = filters.id_subcategory;
      }

      const response = await api.get('/category', { params });
      return response.data;
    } catch (error: any) {
      // Preservar o erro original para permitir verificação de status HTTP no loader
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao buscar categorias');
    }
  },
};

