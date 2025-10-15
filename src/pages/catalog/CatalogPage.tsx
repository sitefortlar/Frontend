import { useAuthGuard } from '@/hooks/useAuthGuard';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';

const CatalogPage = () => {
  const { isAuthenticated, isLoading } = useAuthGuard();

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

  return (
    <div className="min-h-screen">
      <ProductCatalog />
    </div>
  );
};

export default CatalogPage;
