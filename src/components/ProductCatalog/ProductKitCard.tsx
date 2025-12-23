import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';

interface ProductKitCardProps {
  kit: Product;
  priceType: PriceType;
  onAddKitToCart: (kit: Product, quantity: number, priceType: PriceType) => void;
}

export const ProductKitCard = ({ kit, priceType, onAddKitToCart }: ProductKitCardProps) => {
  const [kitQuantity, setKitQuantity] = useState(1);

  // Calcular preço unitário aproximado (apenas visual, não usado para envio)
  const getUnitPrice = (totalPrice: number): number => {
    const quantity = kit.quantidade || 1;
    return totalPrice / quantity;
  };

  // Obter preço total do kit baseado no priceType
  const getKitPrice = (): number => {
    if (priceType === 'avista') {
      return kit.avista ?? 0;
    } else if (priceType === 'dias30') {
      return kit['30_dias'] ?? 0;
    } else if (priceType === 'dias90') {
      return kit['60_dias'] ?? 0;
    }
    return kit.avista ?? 0;
  };

  const updateQuantity = (delta: number) => {
    setKitQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddKit = () => {
    onAddKitToCart(kit, kitQuantity, priceType);
  };

  const kitPrice = getKitPrice();
  const unitPrice = getUnitPrice(kitPrice);
  const quantity = kit.quantidade || 1;

  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border/20">
      <div className="mb-3">
        {/* Badge e Código */}
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-blue-600 text-white">
            {quantity} unidades
          </Badge>
          {kit.codigo && (
            <span className="text-xs text-muted-foreground">Cód: {kit.codigo}</span>
          )}
        </div>

        {/* Descrição do kit (se houver) */}
        {kit.descricao && (
          <p className="text-sm text-muted-foreground mb-3">{kit.descricao}</p>
        )}

        {/* Preços do Kit - Destaque Principal */}
        <div className="space-y-2 mb-3">
          <div className="text-xs font-medium text-muted-foreground mb-1">Preço total do kit:</div>
          
          {kit.avista !== undefined && (
            <div className="flex justify-between items-center">
              <span className={`text-sm ${priceType === 'avista' ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                À vista:
              </span>
              <span className={`text-lg font-bold ${priceType === 'avista' ? 'text-green-600' : 'text-foreground'}`}>
                R$ {kit.avista.toFixed(2)}
              </span>
            </div>
          )}
          
          {kit['30_dias'] !== undefined && (
            <div className="flex justify-between items-center">
              <span className={`text-sm ${priceType === 'dias30' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                30 dias:
              </span>
              <span className={`text-lg font-semibold ${priceType === 'dias30' ? 'text-primary' : 'text-foreground'}`}>
                R$ {kit['30_dias'].toFixed(2)}
              </span>
            </div>
          )}
          
          {kit['60_dias'] !== undefined && (
            <div className="flex justify-between items-center">
              <span className={`text-sm ${priceType === 'dias90' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                60 dias:
              </span>
              <span className={`text-lg font-semibold ${priceType === 'dias90' ? 'text-primary' : 'text-foreground'}`}>
                R$ {kit['60_dias'].toFixed(2)}
              </span>
            </div>
          )}

          {/* Preço unitário informativo */}
          {kitPrice > 0 && (
            <div className="pt-2 mt-2 border-t border-border/20">
              <p className="text-xs text-muted-foreground italic">
                Valor unitário aproximado: R$ {unitPrice.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Controles de Quantidade do Kit */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(-1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">
          {kitQuantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Botão Adicionar Kit ao Carrinho */}
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2"
        onClick={handleAddKit}
      >
        <ShoppingCart className="h-3 w-3" />
        Adicionar Kit ao Carrinho
      </Button>
    </div>
  );
};

