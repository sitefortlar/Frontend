import { Product, PriceType } from '@/types/Product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  priceType: PriceType;
}

export const ProductGrid = ({ products, priceType }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
        <p className="text-muted-foreground max-w-md">
          Não encontramos produtos que correspondam aos filtros selecionados. 
          Tente ajustar os filtros ou navegar por outras categorias.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          priceType={priceType}
        />
      ))}
    </div>
  );
};