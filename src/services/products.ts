import { api } from './api';
import type { ListProductsParams } from '@/types/pagination';
import type { Product, UpdateProductRequest, AddImageResponse } from '@/types/Product';

// Re-export types from the types directory
export type { Product, Category, Subcategory, SortOption, PriceType, UpdateProductRequest, AddImageResponse } from '@/types/Product';

export interface ProductFilters extends Omit<Partial<ListProductsParams>, 'id_category' | 'id_subcategory'> {
  id_category?: string | number;
  id_subcategory?: string | number;
  order_price?: 'ASC' | 'DESC';
  limit?: number | null;
  user_estate?: string | null;
  skip?: number;
}

/** Normaliza produto da API (30_dias/60_dias podem vir com nomes diferentes) */
function normalizeProduct(p: any): Product {
  return {
    ...p,
    dias_30: p.dias_30 ?? p['30_dias'] ?? null,
    dias_60: p.dias_60 ?? p['60_dias'] ?? null,
  };
}

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const params: Record<string, any> = {};
      
      const estado = (filters as Partial<ListProductsParams>)?.estado ?? filters?.user_estate ?? 'SP';
      params.estado = estado;
      
      if (filters?.id_category !== undefined) {
        params.id_category = filters.id_category;
      }
      if (filters?.id_subcategory !== undefined) {
        params.id_subcategory = filters.id_subcategory;
      }
      if (filters?.order_price) {
        params.order_price = filters.order_price;
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
      
      params.skip = filters?.skip ?? 0;
      if (filters?.limit !== undefined && filters?.limit !== null) {
        params.limit = filters.limit;
      } else {
        params.limit = 100;
      }

      const response = await api.get<Product[]>('/product', { params });
      const data = Array.isArray(response.data) ? response.data : [];
      return data.map(normalizeProduct);
    } catch (error: any) {
      if (error.response) throw error;
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos');
    }
  },

  async getProductById(id: string | number, estado: string = 'SP'): Promise<Product> {
    try {
      const response = await api.get<Product>(`/product/${id}`, { params: { estado } });
      return normalizeProduct(response.data);
    } catch (error: any) {
      if (error.response) throw error;
      throw new Error(error.response?.data?.message || 'Erro ao buscar produto');
    }
  },

  /** Atualiza produto (apenas campos enviados). Requer JWT admin. */
  async updateProduct(
    productId: number,
    body: UpdateProductRequest,
    estado: string = 'SP'
  ): Promise<Product> {
    try {
      const response = await api.put<Product>(`/product/${productId}`, body, {
        params: { estado },
      });
      return normalizeProduct(response.data);
    } catch (error: any) {
      const msg = error.response?.data?.detail ?? error.response?.data?.message ?? error.message;
      throw new Error(typeof msg === 'string' ? msg : 'Erro ao atualizar produto');
    }
  },

  /** Adiciona imagem ao produto (multipart/form-data, campo 'file'). Requer JWT admin. */
  async addProductImage(productId: number, file: File): Promise<AddImageResponse> {
    const form = new FormData();
    form.append('file', file);
    try {
      const response = await api.post<AddImageResponse>(`/product/${productId}/images`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.detail ?? error.response?.data?.message ?? error.message;
      throw new Error(typeof msg === 'string' ? msg : 'Erro ao enviar imagem');
    }
  },

  /** Remove imagem do produto. Requer JWT admin. Resposta 204. */
  async removeProductImage(productId: number, imageId: number): Promise<void> {
    try {
      await api.delete(`/product/${productId}/images/${imageId}`);
    } catch (error: any) {
      const msg = error.response?.data?.detail ?? error.response?.data?.message ?? error.message;
      throw new Error(typeof msg === 'string' ? msg : 'Erro ao remover imagem');
    }
  },
};
