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
  } | null;
}

/**
 * Catálogo é público: produtos e categorias são carregados independente de login.
 * Quando há sessão válida, dados da empresa são anexados (usados para preços
 * regionais e para habilitar o checkout), mas uma sessão inválida/expirada
 * nunca bloqueia a navegação — o usuário simplesmente é tratado como visitante.
 */
export const catalogLoader = async (): Promise<CatalogLoaderData> => {
  const token = authService.getToken();
  let user: CatalogLoaderData['user'] = null;
  let userEstate: string | null = null;

  if (token) {
    const storedUser = authService.getCurrentUserFromStorage();
    if (storedUser) {
      try {
        const company = await companyService.getCompanyById(storedUser.id);

        userEstate = company.enderecos && company.enderecos.length > 0
          ? company.enderecos[0].uf
          : null;

        if (userEstate) {
          authService.setUserEstate(userEstate);
        }

        user = { ...storedUser, company };
      } catch (error) {
        console.warn('Não foi possível validar a sessão atual; continuando como visitante:', error);
      }
    }
  }

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

  return { products, categories, user };
};
