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
      <div className="border-t border-border/20 pt-4 space-y-4">
        <div className="text-center">
          <div className="cart-total">
            Total: R$ {totalPrice.toFixed(2)}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="paymentType" className="text-sm font-medium">
              Forma de Pagamento:
            </Label>
            <Select
              value={paymentType}
              onValueChange={handlePaymentTypeChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="avista">À vista</SelectItem>
                <SelectItem value="dias30">30 dias</SelectItem>
                <SelectItem value="dias90">60 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleRealizarPedido}
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Realizar Pedido
          </Button>
          <Button
            variant="outline"
            onClick={onClearCart}
            className="px-3"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pedido Enviado com Sucesso!</DialogTitle>
            <DialogDescription>
              Seu pedido foi enviado por email. Em breve entraremos em contato com você.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsModalOpen(false)}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
