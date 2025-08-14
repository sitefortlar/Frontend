
import { useState } from 'react';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus, ShoppingCart, Send, X } from 'lucide-react';
import { CartItem, CheckoutData } from '@/types/Cart';
import { PriceType } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onUpdatePriceType: (itemId: string, priceType: PriceType, product: any) => void;
  getTotalPrice: () => number;
  generateWhatsAppMessage: (data: CheckoutData) => string;
  onClearCart: () => void;
  onUpdateAllItemsPriceType?: (priceType: PriceType, allProducts: any[]) => void;
  allProducts?: any[];
}

export const CartSheet = ({
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
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    name: '',
    cnpj: '',
    whatsapp: '',
    email: '',
    paymentType: 'avista',
  });

  const handleFinishOrder = () => {
    if (!checkoutData.name || !checkoutData.cnpj || !checkoutData.whatsapp || !checkoutData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar o pedido.",
        variant: "destructive",
      });
      return;
    }

    const message = generateWhatsAppMessage(checkoutData);
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado via WhatsApp.",
    });
    
    onClearCart();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] glass border-0 flex flex-col">
        <SheetHeader className="border-b border-border/20 pb-4">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <SheetTitle>Carrinho de Compras</SheetTitle>
            {items.length > 0 && (
              <Badge variant="secondary">
                {items.reduce((sum, item) => sum + item.quantity, 0)} item{items.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4 py-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-card rounded-lg p-4 border border-border/20 space-y-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-border/20"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Tamanho: {item.size}</p>
                          <p className="text-sm font-medium text-primary">R$ {item.price.toFixed(2)}</p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-sm font-semibold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-border/20 pt-4 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    Total: R$ {getTotalPrice().toFixed(2)}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Forma de Pagamento</Label>
                  <Select value={checkoutData.paymentType} onValueChange={(value: PriceType) => {
                    setCheckoutData(prev => ({ ...prev, paymentType: value }));
                    // Atualizar preços de todos os itens quando mudar a forma de pagamento
                    if (onUpdateAllItemsPriceType) {
                      onUpdateAllItemsPriceType(value, allProducts);
                    }
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avista">À vista</SelectItem>
                      <SelectItem value="dias30">30 dias</SelectItem>
                      <SelectItem value="dias90">90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Nome *</Label>
                    <Input
                      id="name"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Seu nome"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj" className="text-sm font-medium">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={checkoutData.cnpj}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, cnpj: e.target.value }))}
                      placeholder="00.000.000/0000-00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      value={checkoutData.whatsapp}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="(11) 99999-9999"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={checkoutData.email}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border/20 pt-4">
            <Button onClick={handleFinishOrder} className="w-full gap-2">
              <Send className="h-4 w-4" />
              Finalizar Pedido via WhatsApp
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
