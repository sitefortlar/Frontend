import { 
  Sheet,
  SheetContent,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '@/types/Cart';
import { PriceType, Product } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';
import { CartHeader } from './CartHeader';
import { CartItem as CartItemComponent } from './CartItem';
import { CartFooter } from './CartFooter';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  getTotalPrice: number;
  onClearCart: () => void;
  onUpdateAllItemsPriceType?: (priceType: PriceType, allProducts: Product[]) => void;
  allProducts?: Product[];
}

const CartSheet = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  getTotalPrice,
  onClearCart,
  onUpdateAllItemsPriceType,
  allProducts = [],
}: CartSheetProps) => {
  const { toast } = useToast();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <CartHeader onClose={onClose} itemCount={items.length} />

        <div className="flex flex-col flex-1 overflow-hidden">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Carrinho vazio</h3>
              <p className="text-muted-foreground mb-4">
                Adicione alguns produtos para começar
              </p>
              <Button onClick={onClose}>
                Continuar comprando
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4 py-4">
                  {items.map((item) => {
                    const product = allProducts.find(p => p.id_produto === item.productId);
                    
                    return (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        product={product!}
                        onRemove={onRemoveItem}
                        onUpdateQuantity={onUpdateQuantity}
                      />
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="mt-auto -mx-6 px-6">
                <CartFooter
                  totalPrice={getTotalPrice}
                  onClearCart={onClearCart}
                  onUpdateAllItemsPriceType={onUpdateAllItemsPriceType}
                  allProducts={allProducts}
                />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;