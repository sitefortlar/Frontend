import { authService } from '@/services/auth/auth';
import { companyService, Company } from '@/services/company';
import { Product, Category } from '@/services/products';

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
  // 1. Verificar autenticação
  const token = authService.getToken();
  console.log('token2', token);
  if (!token ) {
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
  console.log('user', user);
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
    // 3. Buscar dados da empresa do usuário
    const company = await companyService.getCompanyById(user.id);
    console.log('company', company);
    
    const result = {
      products: [],
      categories: [],
      user: {
        ...user,
        company, // Incluir dados da empresa no usuário
      },
    };
    
    console.log('Loader returning data:', result);
    return result;
  } catch (error) {
    console.error('Error loading catalog data:', error);
    
    // Em caso de erro, retornar dados vazios mas manter usuário logado
    const fallbackResult = {
      products: [],
      categories: [],
      user,
    };
    
    console.log('Loader returning fallback data:', fallbackResult);
    return fallbackResult;
  }
};
