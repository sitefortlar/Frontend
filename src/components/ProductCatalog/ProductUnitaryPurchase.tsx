import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';

interface ProductUnitaryPurchaseProps {
  product: Product;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType, quantity: number) => void;
}

export const ProductUnitaryPurchase = ({ product, priceType, onAddToCart }: ProductUnitaryPurchaseProps) => {
  const [unitQuantity, setUnitQuantity] = useState(1);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Compra Unitária</h3>
      
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={() => setUnitQuantity(Math.max(1, unitQuantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-16 text-center text-2xl font-medium">{unitQuantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={() => setUnitQuantity(unitQuantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {onAddToCart && (
          <Button 
            onClick={() => onAddToCart(product, '', priceType, unitQuantity)}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        )}
      </div>
    </div>
  );
};

