import { useLoaderData } from 'react-router-dom';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useProducts } from '@/hooks/useProducts';
import { ProductCatalog } from '@/components/ProductCatalog/ProductCatalog';
import { CatalogLoaderData } from './loader';

const CatalogPage = () => {
  const { isAuthenticated, isLoading, user } = useAuthGuard();
  const loaderData = useLoaderData() as CatalogLoaderData;
  
  const {
    products,
    categories,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorMessage,
    filters,
    updateFilter,
    clearFilters,
    refetch,
    search,
  } = useProducts({
    initialFilters: {
      limit: 20,
      inStock: true,
    },
    autoFetch: false, // We'll use loader data initially
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Acesso não autorizado
          </h1>
          <p className="text-muted-foreground">
            Você precisa estar logado para acessar o catálogo.
          </p>
        </div>
      </div>
    );
  }

  // Show products error state
  if (productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Erro ao carregar produtos
          </h1>
          <p className="text-muted-foreground mb-4">{productsErrorMessage}</p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductCatalog 
        initialProducts={loaderData.products}
        initialCategories={loaderData.categories}
        user={user}
        onProductsUpdate={refetch}
        onSearch={search}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        currentFilters={filters}
        isLoading={productsLoading}
      />
    </div>
  );
};

export default CatalogPage;
