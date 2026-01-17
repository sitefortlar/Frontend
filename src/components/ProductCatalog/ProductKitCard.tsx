import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Kit, PriceType } from '@/types/Product';

interface ProductKitCardProps {
  kit: Kit;
  priceType: PriceType;
  onAddKit: (kit: Kit, quantity: number, priceType: PriceType) => void;
}

export const ProductKitCard = ({ kit, priceType, onAddKit }: ProductKitCardProps) => {
  const [kitQuantity, setKitQuantity] = useState(1);

  const getTotalPrice = (): number => {
    if (priceType === 'avista') {
      return kit.valor_total_avista;
    } else if (priceType === 'dias30') {
      return kit.valor_total_30;
    } else if (priceType === 'dias90') {
      return kit.valor_total_60;
    }
    return kit.valor_total_avista;
  };

  // Cálculo visual apenas para referência (não usado em lógica)
  const approximateUnitPrice = kit.valor_total_avista / kit.quantidade;

  const handleAddKit = () => {
    onAddKit(kit, kitQuantity, priceType);
  };

  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border/20">
      {/* Cabeçalho do Kit */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-blue-600 text-white">
            Kit com {kit.quantidade} unidades
          </Badge>
          {kit.codigo && (
            <span className="text-xs text-muted-foreground">Código do kit: {kit.codigo}</span>
          )}
        </div>
      </div>

      {/* Preço TOTAL do Kit (destaque principal) */}
      <div className="space-y-2 mb-4">
        <div className="text-sm font-semibold text-muted-foreground mb-2">
          Preço TOTAL do Kit:
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
            <span className="text-sm text-green-600 font-medium">À vista:</span>
            <span className="text-lg font-bold text-green-600">
              R$ {kit.valor_total_avista.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 text-sm">
            <span className="text-muted-foreground">30 dias:</span>
            <span className="font-semibold">R$ {kit.valor_total_30.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-2 text-sm">
            <span className="text-muted-foreground">60 dias:</span>
            <span className="font-semibold">R$ {kit.valor_total_60.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Informação complementar (visual apenas) */}
      <div className="mb-4 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
        <span className="font-medium">Valor unitário aproximado:</span>{' '}
        <span>R$ {approximateUnitPrice.toFixed(2)}</span>
        <span className="text-[10px] block mt-1 italic">
          (Apenas referência visual - não usado em cálculos)
        </span>
      </div>

      {/* Controles de quantidade (quantidade de kits, não unidades) */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs text-muted-foreground mr-2">Quantidade de kits:</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setKitQuantity(Math.max(1, kitQuantity - 1))}
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
          onClick={() => setKitQuantity(kitQuantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Botão adicionar kit */}
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2"
        onClick={handleAddKit}
      >
        <ShoppingCart className="h-3 w-3" />
        Adicionar kit ao carrinho
      </Button>
    </div>
  );
};
