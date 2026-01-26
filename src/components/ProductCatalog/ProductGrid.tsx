import { memo } from 'react';
import { ProductCard } from './ProductCard';
import { Product, PriceType } from '@/types/Product';

interface ProductGridProps {
  products: Product[];
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType) => void;
}

/**
 * Componente de grid de produtos.
 * Otimizado com React.memo para evitar re-renderizações desnecessárias.
 */
export const ProductGrid = memo(({ products, priceType, onAddToCart }: ProductGridProps) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Nenhum produto encontrado com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        if (!product || !product.id_produto) {
          return null;
        }
        return (
          <ProductCard
            key={product.id_produto}
            product={product}
            priceType={priceType}
            onAddToCart={onAddToCart}
          />
        );
      })}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';