import { api } from './api';

// Re-export types from the types directory
export type { Product, Category, Subcategory, SortOption, PriceType } from '@/types/Product';

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

  async uploadProducts(file: File): Promise<void> {
    try {
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
      // Não precisamos definir Content-Type manualmente, o axios faz isso automaticamente
      const response = await api.post('/product', formData);

      return response.data;
    } catch (error: any) {
      // Preservar o erro original
      if (error.response) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Erro ao fazer upload do arquivo';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },
};
