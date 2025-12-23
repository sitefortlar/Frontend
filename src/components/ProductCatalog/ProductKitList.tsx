import { Product, PriceType } from '@/types/Product';
import { ProductKitCard } from './ProductKitCard';

interface ProductKitListProps {
  kits: Product[];
  priceType: PriceType;
  onAddKitToCart: (kit: Product, quantity: number, priceType: PriceType) => void;
}

export const ProductKitList = ({ kits, priceType, onAddKitToCart }: ProductKitListProps) => {
  if (!kits || kits.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Kits Disponíveis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kits.map((kit) => (
          <ProductKitCard
            key={kit.id_produto}
            kit={kit}
            priceType={priceType}
            onAddKitToCart={onAddKitToCart}
          />
        ))}
      </div>

      {/* Texto informativo sobre kits */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          ℹ️ Kits possuem preço e código próprios e são vendidos separadamente do produto unitário.
        </p>
      </div>
    </div>
  );
};

