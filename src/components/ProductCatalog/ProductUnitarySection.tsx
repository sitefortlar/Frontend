import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';

interface ProductUnitarySectionProps {
  product: Product;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType, quantity?: number) => void;
}

export const ProductUnitarySection = ({ 
  product, 
  priceType, 
  onAddToCart 
}: ProductUnitarySectionProps) => {
  const [unitQuantity, setUnitQuantity] = useState(1);

  // Verificar se é produto unitário (cod_kit === null)
  const isUnitaryProduct = product.cod_kit === null;

  if (!isUnitaryProduct) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Produto Unitário</h3>
      
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            <strong className="text-foreground">Produto:</strong> {product.nome}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Quantidade mínima:</strong> 1 unidade
          </p>
        </div>

        {/* Preços */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {product.avista !== undefined && (
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 font-medium">À vista</div>
              <div className="text-2xl font-bold text-green-600">
                R$ {product.avista.toFixed(2)}
              </div>
            </div>
          )}
          {product['30_dias'] !== undefined && (
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="text-sm text-muted-foreground">30 dias</div>
              <div className="text-2xl font-semibold">
                R$ {product['30_dias'].toFixed(2)}
              </div>
            </div>
          )}
          {product['60_dias'] !== undefined && (
            <div className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="text-sm text-muted-foreground">60 dias</div>
              <div className="text-2xl font-semibold">
                R$ {product['60_dias'].toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Controles de quantidade */}
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

        {/* Botão adicionar */}
        {onAddToCart && (
          <Button 
            onClick={() => onAddToCart(product, '', priceType, unitQuantity)}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar ao carrinho
          </Button>
        )}
      </div>
    </div>
  );
};
