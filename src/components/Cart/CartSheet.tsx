import { 
  Sheet,
  SheetContent,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart } from 'lucide-react';
import { CartItem, CheckoutData } from '@/types/Cart';
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
  onUpdatePriceType: (itemId: string, priceType: PriceType, product: Product) => void;
  getTotalPrice: number;
  generateWhatsAppMessage: (data: CheckoutData) => string;
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
  onUpdatePriceType,
  getTotalPrice,
  generateWhatsAppMessage,
  onClearCart,
  onUpdateAllItemsPriceType,
  allProducts = [],
}: CartSheetProps) => {
  const { toast } = useToast();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <CartHeader onClose={onClose} itemCount={items.length} />

        <div className="flex flex-col h-full">
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
                <div className="space-y-0">
                  {items.map((item) => {
                    const product = allProducts.find(p => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        product={product}
                        onRemove={onRemoveItem}
                        onUpdateQuantity={onUpdateQuantity}
                        onUpdatePriceType={onUpdatePriceType}
                      />
                    );
                  })}
                </div>
              </ScrollArea>

              <CartFooter
                totalPrice={getTotalPrice}
                onClearCart={onClearCart}
                onGenerateWhatsAppMessage={generateWhatsAppMessage}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;