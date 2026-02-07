import { useRef, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types/Cart';
import { PriceType, Product } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';
import { CartHeader } from './CartHeader';
import { CartItem as CartItemComponent } from './CartItem';
import { CartFooter } from './CartFooter';

export interface LastAddedItemDisplay {
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  getTotalPrice: number;
  companyId: number;
  onClearCart: () => void;
  onUpdateAllItemsPriceType?: (priceType: PriceType, allProducts: Product[]) => void;
  allProducts?: Product[];
  priceType: PriceType;
  lastAddedItem?: LastAddedItemDisplay | null;
  onScrollToCheckout?: () => void;
}

const CartSheet = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  getTotalPrice,
  companyId,
  onClearCart,
  onUpdateAllItemsPriceType,
  allProducts = [],
  priceType,
  lastAddedItem = null,
}: CartSheetProps) => {
  const addedToastDismissRef = useRef<(() => void) | null>(null);
  const { toast } = useToast();

  const validItems = Array.isArray(items) ? items : [];
  const validProducts = Array.isArray(allProducts) ? allProducts : [];
  const validTotalPrice = typeof getTotalPrice === 'number' && !isNaN(getTotalPrice)
    ? getTotalPrice
    : 0;

  const handleContinueShopping = () => {
    onClose();
    addedToastDismissRef.current?.();
    toast({
      title: 'Continuar comprando',
      description: 'Carrinho mantido. Você pode continuar adicionando produtos.',
    });
  };

  const handleContinueFromToast = () => {
    onClose();
    addedToastDismissRef.current?.();
  };

  useEffect(() => {
    if (!lastAddedItem) return;
    const { dismiss } = toast({
      title: 'Produto adicionado ao carrinho com sucesso!',
      description: `${lastAddedItem.name} · Quantidade: ${lastAddedItem.quantity}`,
      duration: 5000,
      action: (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 text-xs mt-2"
          onClick={handleContinueFromToast}
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
          Continuar comprando
        </Button>
      ),
    });
    addedToastDismissRef.current = dismiss;
    return () => {
      addedToastDismissRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- toast shown once per lastAddedItem; handlers are stable
  }, [lastAddedItem]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="w-full sm:max-w-lg flex flex-col p-0 gap-0 [&>button]:hidden"
        side="right"
        aria-describedby={undefined}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border/20 flex-shrink-0">
          <CartHeader onClose={onClose} itemCount={validItems.length} />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden px-5">
          {validItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Carrinho vazio</h3>
              <p className="text-muted-foreground mb-6">
                Adicione alguns produtos para começar
              </p>
              <Button onClick={handleContinueShopping} size="lg" className="gap-2">
                Continuar comprando
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="space-y-4 py-4">
                  {validItems.map((item) => {
                    try {
                      if (!item || !item.id || !item.productId) {
                        console.warn('Item inválido no carrinho:', item);
                        return null;
                      }

                      const product = validProducts.find(p => p?.id_produto === item.productId);

                      return (
                        <CartItemComponent
                          key={item.id}
                          item={item}
                          product={product}
                          onRemove={onRemoveItem}
                          onUpdateQuantity={onUpdateQuantity}
                          priceType={priceType}
                        />
                      );
                    } catch (error) {
                      console.error('Erro ao renderizar item do carrinho:', error, item);
                      return null;
                    }
                  })}
                </div>
              </ScrollArea>

              <div className="mt-auto pt-4 pb-5 border-t border-border/20 bg-background">
                <CartFooter
                  totalPrice={validTotalPrice}
                  items={validItems}
                  allProducts={validProducts}
                  companyId={companyId}
                  onClearCart={onClearCart}
                  onUpdateAllItemsPriceType={onUpdateAllItemsPriceType}
                  priceType={priceType}
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