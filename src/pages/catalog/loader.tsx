import { authService } from '@/services/auth/auth';
import { companyService, Company } from '@/services/company';
import { productService, ProductFilters } from '@/services/products';
import { categoryService } from '@/services/categories';
import type { Product, Category } from '@/types/Product';

export interface CatalogLoaderData {
  products: Product[];
  categories: Category[];
  user: {
    id: string;
    email: string;
    name: string;
    company: Company;
  };
}

export const catalogLoader = async (): Promise<CatalogLoaderData> => {
  // 1. Verificar se existe token
  const token = authService.getToken();
  if (!token) {
    console.log('token not found');
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }

  // 2. Buscar dados do usuário
  const user = authService.getCurrentUserFromStorage();
  if (!user) {
    console.log('user not found');
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }

  try {
    // 3. Validar autenticação através do get da company - se falhar (token inválido), redireciona
    const company = await companyService.getCompanyById(user.id);
    console.log('company', company);
    
    // 4. Extrair e salvar user_estate do primeiro endereço da company
    const userEstate = company.enderecos && company.enderecos.length > 0 
      ? company.enderecos[0].uf 
      : null;
    
    if (userEstate) {
      authService.setUserEstate(userEstate);
      console.log('user_estate saved:', userEstate);
    }
    
    // 5. Buscar produtos e categorias em paralelo (passando user_estate para produtos)
    const [products, categories] = await Promise.all([
      productService.getProducts({ user_estate: userEstate }).catch((error) => {
        console.error('Error loading products:', error);
        return [] as Product[];
      }),
      categoryService.getCategories().catch((error) => {
        console.error('Error loading categories:', error);
        return [] as Category[];
      }),
    ]);
    
    const result = {
      products,
      categories,
      user: {
        ...user,
        company, // Incluir dados da empresa no usuário
      },
    };
    
    console.log('Loader returning data:', result);
    return result;
  } catch (error: any) {
    console.error('Error loading catalog data:', error);
    
    // Se o erro for de autenticação (401/403), fazer logout e redirecionar
    if (error.response?.status === 401 || error.response?.status === 403) {
      await authService.logout();
      throw new Response(null, {
        status: 302,
        headers: {
          Location: '/login',
        },
      });
    }
    
    // Para outros erros, retornar dados vazios mas manter usuário logado
    const fallbackResult = {
      products: [],
      categories: [],
      user,
    };
    
    console.log('Loader returning fallback data:', fallbackResult);
    return fallbackResult;
  }
};
