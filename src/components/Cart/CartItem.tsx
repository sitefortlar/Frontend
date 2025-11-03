import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
      return;
    }
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{item.name}</h3>
        {item.size && <p className="text-xs text-muted-foreground">Tamanho: {item.size}</p>}
        
        <div className="mt-2">
          <div className="cart-quantity">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="h-8 w-16 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <div className="text-right">
          <div className="font-semibold text-base">
            R$ {(item.price * item.quantity).toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            R$ {item.price.toFixed(2)} cada
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
