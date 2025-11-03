import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { PriceType } from '@/types/Product';

interface CartFooterProps {
  totalPrice: number;
  onClearCart: () => void;
  onUpdateAllItemsPriceType?: (priceType: PriceType, allProducts: any[]) => void;
  allProducts?: any[];
}

export const CartFooter = ({ 
  totalPrice, 
  onClearCart,
  onUpdateAllItemsPriceType,
  allProducts = []
}: CartFooterProps) => {
  const [paymentType, setPaymentType] = useState<PriceType>('avista');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaymentTypeChange = (value: PriceType) => {
    setPaymentType(value);
    if (onUpdateAllItemsPriceType) {
      onUpdateAllItemsPriceType(value, allProducts);
    }
  };

  const handleRealizarPedido = () => {
    // Aqui você pode adicionar a lógica de envio do pedido por email
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="border-t border-border/20 pt-4 pb-4 space-y-4 bg-background">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            Total: R$ {totalPrice.toFixed(2)}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="paymentType" className="text-sm font-medium whitespace-nowrap">
              Forma de Pagamento:
            </Label>
            <Select
              value={paymentType}
              onValueChange={handlePaymentTypeChange}
            >
              <SelectTrigger className="w-40 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="avista">À vista</SelectItem>
                <SelectItem value="dias30">30 dias</SelectItem>
                <SelectItem value="dias90">60 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleRealizarPedido}
            className="flex-1 h-12 text-base font-semibold"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Realizar Pedido
          </Button>
          <Button
            variant="outline"
            onClick={onClearCart}
            className="h-12 w-12 p-0"
            size="icon"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl">Pedido Enviado com Sucesso!</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Seu pedido foi enviado por email. Em breve entraremos em contato com você.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsModalOpen(false)} className="h-12 text-base font-semibold">
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
