import { api } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  images: string[];
  prices: {
    avista: number;
    dias30: number;
    dias90: number;
  };
  stock: number;
  isActive: boolean;
  specifications?: Record<string, string>;
  kits?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    popular?: boolean;
  }>;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface ProductsResponse {
  products: Product[];
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductsFilters {
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
}

class ProductsService {
  private readonly baseEndpoint = '/products';

  async getProducts(filters: ProductsFilters = {}): Promise<ProductsResponse> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const response = await api.get(`${this.baseEndpoint}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Erro ao carregar produtos');
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Erro ao carregar produto');
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get(`${this.baseEndpoint}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Erro ao carregar categorias');
    }
  }

  async searchProducts(query: string, filters: Omit<ProductsFilters, 'search'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...filters, search: query });
  }
}

export const productsService = new ProductsService();

