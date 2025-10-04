import { withAuthenticationLoader } from '@/utils/withAuthenticationLoader';
import { productService } from '@/services';

export const homeLoader = async () => {
  // Use authentication loader to protect the route
  const { token } = await withAuthenticationLoader();

  try {
    // Call mock service to get products
    const products = await productService.getProducts();
    
    return { 
      products,
      token 
    };
  } catch (error) {
    // If error getting products, still return empty array
    // The authentication is already handled by withAuthenticationLoader
    return { 
      products: [],
      token,
      error: error instanceof Error ? error.message : 'Erro ao carregar produtos'
    };
  }
};
