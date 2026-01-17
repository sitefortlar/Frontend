import { ProductKitCard } from './ProductKitCard';
import { Product, Kit, PriceType } from '@/types/Product';

interface ProductKitSectionProps {
  kits: Kit[];
  priceType: PriceType;
  onAddKit: (kit: Kit, quantity: number, priceType: PriceType) => void;
}

export const ProductKitSection = ({ kits, priceType, onAddKit }: ProductKitSectionProps) => {
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
            onAddKit={onAddKit}
          />
        ))}
      </div>
    </div>
  );
};
