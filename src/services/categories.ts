import { api } from './api';
import type { 
  Category, 
  Subcategory, 
  CategoryRequest, 
  SubcategoryRequest,
  CategoryListParams
} from '@/types/Product';
import type { ListCategoriesParams } from '@/types/pagination';

export interface CategoryFilters extends Partial<ListCategoriesParams> {
  id_category?: string | number;
  id_subcategory?: string | number;
  skip?: number;
  limit?: number;
  search_name?: string;
}

/**
 * Serviço completo para gerenciamento de categorias e subcategorias
 * 
 * Todos os endpoints de escrita (POST, PUT, DELETE) requerem autenticação
 * com token JWT e role ADMIN.
 */
export const categoryService = {
  /**
   * Lista todas as categorias (público)
   * 
   * @param filters - Filtros opcionais para busca e paginação
   * @returns Array de categorias com suas subcategorias
   */
  async getCategories(filters?: CategoryFilters): Promise<Category[]> {
    try {
      const params: Record<string, any> = {};
      
      if (filters?.id_category) {
        params.id_category = filters.id_category;
      }
      if (filters?.id_subcategory) {
        params.id_subcategory = filters.id_subcategory;
      }
      if (filters?.search_name) {
        params.search_name = filters.search_name;
      }

      // Paginação (valores padrão se não fornecidos)
      params.skip = filters?.skip ?? 0;
      params.limit = filters?.limit ?? 100;

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

  /**
   * Busca uma categoria específica por ID (requer ADMIN)
   * 
   * @param categoryId - ID da categoria
   * @returns Categoria com suas subcategorias
   */
  async getCategory(categoryId: number): Promise<Category> {
    try {
      const response = await api.get(`/category/${categoryId}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao buscar categoria');
    }
  },

  /**
   * Cria uma nova categoria (requer ADMIN)
   * 
   * @param categoryData - Dados da categoria e subcategorias opcionais
   * @returns Categoria criada com suas subcategorias
   */
  async createCategory(categoryData: CategoryRequest): Promise<Category> {
    try {
      const response = await api.post('/category', categoryData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao criar categoria');
    }
  },

  /**
   * Atualiza uma categoria existente (requer ADMIN)
   * 
   * @param categoryId - ID da categoria
   * @param categoryData - Dados atualizados da categoria
   * @returns Categoria atualizada
   */
  async updateCategory(categoryId: number, categoryData: Partial<CategoryRequest>): Promise<Category> {
    try {
      const response = await api.put(`/category/${categoryId}`, categoryData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao atualizar categoria');
    }
  },

  /**
   * Deleta uma categoria (requer ADMIN)
   * 
   * Nota: Ao deletar uma categoria, todas as subcategorias são deletadas em cascade.
   * 
   * @param categoryId - ID da categoria
   */
  async deleteCategory(categoryId: number): Promise<void> {
    try {
      await api.delete(`/category/${categoryId}`);
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao deletar categoria');
    }
  },

  /**
   * Cria uma nova subcategoria para uma categoria (requer ADMIN)
   * 
   * @param categoryId - ID da categoria
   * @param subcategoryData - Dados da subcategoria
   * @returns Subcategoria criada
   */
  async createSubcategory(
    categoryId: number,
    subcategoryData: SubcategoryRequest
  ): Promise<Subcategory> {
    try {
      const response = await api.post(
        `/category/${categoryId}/subcategory`,
        subcategoryData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao criar subcategoria');
    }
  },

  /**
   * Atualiza uma subcategoria existente (requer ADMIN)
   * 
   * @param categoryId - ID da categoria
   * @param subcategoryId - ID da subcategoria
   * @param subcategoryData - Dados atualizados da subcategoria
   * @returns Subcategoria atualizada
   */
  async updateSubcategory(
    categoryId: number,
    subcategoryId: number,
    subcategoryData: SubcategoryRequest
  ): Promise<Subcategory> {
    try {
      const response = await api.put(
        `/category/${categoryId}/subcategory/${subcategoryId}`,
        subcategoryData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao atualizar subcategoria');
    }
  },

  /**
   * Deleta uma subcategoria (requer ADMIN)
   * 
   * @param categoryId - ID da categoria
   * @param subcategoryId - ID da subcategoria
   */
  async deleteSubcategory(
    categoryId: number,
    subcategoryId: number
  ): Promise<void> {
    try {
      await api.delete(`/category/${categoryId}/subcategory/${subcategoryId}`);
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error(error.response?.data?.message || 'Erro ao deletar subcategoria');
    }
  },
};

