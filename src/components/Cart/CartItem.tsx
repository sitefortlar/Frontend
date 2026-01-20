import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/Cart';
import { Product } from '@/types/Product';

interface CartItemProps {
  item: CartItemType;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  product: Product;
}

export const CartItem = ({ 
  item, 
  onRemove, 
  onUpdateQuantity, 
  product 
}: CartItemProps) => {
  /**
   * REGRA DE NEGÓCIO:
   * - KIT: quantidade_kit controla a quantidade de kits. quantity sempre = 1.
   * - UNIT: quantity controla a quantidade de unidades.
   */
  const isKit = item.type === 'KIT';
  const displayQuantity = isKit ? (item.quantidade_kit || 1) : item.quantity;
  
  // Calcular subtotal corretamente
  const calculateSubtotal = (): number => {
    if (isKit && item.valor_total !== undefined && item.quantidade_kit !== undefined) {
      // REGRA: Kit = valor_total * quantidade_kit
      return item.valor_total * item.quantidade_kit;
    }
    // Produto unitário = price * quantity
    return item.price * item.quantity;
  };

  const subtotal = calculateSubtotal();
  const unitPrice = isKit ? (item.valor_total || item.price) : item.price;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
      return;
    }
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="border-b border-border/10 py-4">
      <div className="flex gap-3">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title and Price Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
              {item.size && !isKit && (
                <p className="text-xs text-muted-foreground mt-1">Tamanho: {item.size}</p>
              )}
              {isKit && item.quantidade_itens_por_kit && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.quantidade_itens_por_kit} unidades por kit
                </p>
              )}
            </div>
            
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-lg text-primary whitespace-nowrap">
                R$ {subtotal.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {isKit ? `R$ ${unitPrice.toFixed(2)} por kit` : `R$ ${unitPrice.toFixed(2)} cada`}
              </div>
            </div>
          </div>
          
          {/* Quantity Controls and Delete */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(displayQuantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-12 text-center font-medium">{displayQuantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(displayQuantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
