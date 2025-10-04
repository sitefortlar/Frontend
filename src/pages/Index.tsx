import { useLoaderData } from 'react-router-dom';
import { ProductCatalog } from '@/components/ProductCatalog/ProductCatalog';

interface HomeLoaderData {
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  token: string;
  error?: string;
}

const Index = () => {
  const { products, error } = useLoaderData() as HomeLoaderData;

  if (error) {
    return (
      <div className="loading-overlay">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Erro ao carregar produtos
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return <ProductCatalog />;
};

export default Index;
