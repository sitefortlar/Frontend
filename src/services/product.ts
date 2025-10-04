import { authService } from './auth';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Produto A',
    description: 'Descrição do produto A',
    price: 100.00,
    category: 'Categoria 1',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'prod_2',
    name: 'Produto B',
    description: 'Descrição do produto B',
    price: 200.00,
    category: 'Categoria 2',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 'prod_3',
    name: 'Produto C',
    description: 'Descrição do produto C',
    price: 300.00,
    category: 'Categoria 1',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  }
];

export const productService = {
  async getProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check authentication
        if (!authService.isTokenValid()) {
          reject(new Error('Token inválido ou expirado'));
          return;
        }

        resolve(mockProducts.filter(product => product.isActive));
      }, 1000); // Simulate network delay
    });
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check authentication
        if (!authService.isTokenValid()) {
          reject(new Error('Token inválido ou expirado'));
          return;
        }

        const newProduct: Product = {
          ...product,
          id: `prod_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        mockProducts.push(newProduct);
        resolve(newProduct);
      }, 1200); // Simulate network delay
    });
  },

  async getProductById(id: string): Promise<Product> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check authentication
        if (!authService.isTokenValid()) {
          reject(new Error('Token inválido ou expirado'));
          return;
        }

        const product = mockProducts.find(p => p.id === id);
        if (!product) {
          reject(new Error('Produto não encontrado'));
          return;
        }

        resolve(product);
      }, 600); // Simulate network delay
    });
  }
};
