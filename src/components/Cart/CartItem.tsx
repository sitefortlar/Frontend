import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/Cart';
import { Product, PriceType } from '@/types/Product';

interface CartItemProps {
  item: CartItemType;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  product: Product;
  priceType: PriceType; // REGRA: priceType é global, passado como prop
}

export const CartItem = ({ 
  item, 
  onRemove, 
  onUpdateQuantity, 
  product,
  priceType
}: CartItemProps) => {
  /**
   * REGRA DE NEGÓCIO:
   * - KIT: quantidade_kit controla a quantidade de kits
   * - UNIT: quantity controla a quantidade de unidades
   */
  const isKit = item.type === 'KIT';
  const displayQuantity = isKit ? (item.quantidade_kit || item.quantity || 1) : item.quantity;
  
  // Debug: verificar se priceType está sendo passado
  if (!priceType) {
    console.error('❌ priceType não foi passado para CartItem:', item.id, item.name);
  }
  
  // REGRA: Calcular preço usando prices do item e priceType global
  const getPrice = (): number => {
    // Debug: verificar se prices existe
    if (!item.prices || typeof item.prices !== 'object') {
      console.error('❌ Item sem prices válido:', item.id, item.name, item);
      return 0;
    }
    
    // Acessar price diretamente usando priceType
    // priceType pode ser 'avista', 'dias30' ou 'dias90'
    let price: number | undefined;
    
    if (priceType === 'avista') {
      price = item.prices.avista;
    } else if (priceType === 'dias30') {
      price = item.prices.dias30;
    } else if (priceType === 'dias90') {
      price = item.prices.dias90;
    }
    
    // Converter para número e validar
    const numericPrice = price !== undefined && price !== null ? Number(price) : 0;
    
    if (isNaN(numericPrice) || numericPrice < 0) {
      console.warn('⚠️ Preço inválido para', priceType, 'no item:', {
        id: item.id,
        name: item.name,
        prices: item.prices,
        priceType,
        rawPrice: price,
        numericPrice
      });
      return 0;
    }
    
    return numericPrice;
  };
  
  // Calcular subtotal corretamente
  const calculateSubtotal = (): number => {
    const price = getPrice();
    if (isKit) {
      // REGRA: Kit = price * quantidade_kit
      const quantidade = item.quantidade_kit || item.quantity || 1;
      return price * quantidade;
    }
    // Produto unitário = price * quantity
    return price * item.quantity;
  };

  const subtotal = calculateSubtotal();
  const unitPrice = getPrice();

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
