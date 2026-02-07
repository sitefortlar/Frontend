import { useRef } from 'react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, CheckCircle2, ShoppingBag, ArrowDown } from 'lucide-react';
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
  onScrollToCheckout,
}: CartSheetProps) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const validItems = Array.isArray(items) ? items : [];
  const validProducts = Array.isArray(allProducts) ? allProducts : [];
  const validTotalPrice = typeof getTotalPrice === 'number' && !isNaN(getTotalPrice)
    ? getTotalPrice
    : 0;

  const handleContinueShopping = () => {
    onClose();
    toast({
      title: 'Continuar comprando',
      description: 'Carrinho mantido. Você pode continuar adicionando produtos.',
    });
  };

  const handleScrollToCheckout = () => {
    if (onScrollToCheckout) {
      onScrollToCheckout();
    } else {
      footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    toast({
      title: 'Finalizar pedido',
      description: 'Confira os itens e finalize seu pedido abaixo.',
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="w-full sm:max-w-lg flex flex-col p-0 [&>button]:hidden"
        side="right"
        aria-describedby={undefined}
      >
        <CartHeader onClose={onClose} itemCount={validItems.length} />

        <div className="flex flex-col flex-1 overflow-hidden">
          {validItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
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
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4 py-4">
                  {/* Confirmação de produto adicionado */}
                  {lastAddedItem && (
                    <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800 p-4 space-y-3">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        <span className="font-semibold text-base">
                          Produto adicionado ao carrinho com sucesso!
                        </span>
                      </div>
                      <div className="flex gap-3 bg-background/80 rounded-md p-3">
                        <img
                          src={lastAddedItem.image}
                          alt={lastAddedItem.name}
                          className="h-16 w-16 rounded object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{lastAddedItem.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {lastAddedItem.quantity} · R$ {(lastAddedItem.unitPrice * lastAddedItem.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 order-2 sm:order-1"
                          onClick={handleContinueShopping}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Continuar comprando
                        </Button>
                        <Button
                          className="flex-1 gap-2 order-1 sm:order-2"
                          onClick={handleScrollToCheckout}
                        >
                          <ArrowDown className="h-4 w-4" />
                          Finalizar pedido
                        </Button>
                      </div>
                    </div>
                  )}

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

              <div ref={footerRef} className="mt-auto -mx-6 px-6 border-t bg-background">
                {!lastAddedItem && validItems.length > 0 && (
                  <div className="flex gap-2 py-3">
                    <Button variant="outline" className="flex-1 gap-2" onClick={handleContinueShopping}>
                      <ShoppingBag className="h-4 w-4" />
                      Continuar comprando
                    </Button>
                    <Button className="flex-1 gap-2" onClick={handleScrollToCheckout}>
                      Finalizar pedido
                    </Button>
                  </div>
                )}
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