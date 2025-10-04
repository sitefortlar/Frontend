import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Send, Trash2 } from 'lucide-react';
import { CheckoutData } from '@/types/Cart';

interface CartFooterProps {
  totalPrice: number;
  onClearCart: () => void;
  onGenerateWhatsAppMessage: (data: CheckoutData) => string;
}

export const CartFooter = ({ 
  totalPrice, 
  onClearCart, 
  onGenerateWhatsAppMessage 
}: CartFooterProps) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    name: '',
    cnpj: '',
    whatsapp: '',
    email: '',
    paymentType: 'avista'
  });

  const handleWhatsAppRedirect = () => {
    const message = onGenerateWhatsAppMessage(checkoutData);
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const isFormValid = checkoutData.name && checkoutData.cnpj && checkoutData.whatsapp && checkoutData.email;

  return (
    <div className="border-t border-border/20 pt-4 space-y-4">
      <div className="text-center">
        <div className="cart-total">
          Total: R$ {totalPrice.toFixed(2)}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Dados para Orçamento</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="paymentType" className="text-sm font-medium">
              Forma de Pagamento:
            </Label>
            <Select
              value={checkoutData.paymentType}
              onValueChange={(value: 'avista' | 'dias30' | 'dias90') => 
                setCheckoutData(prev => ({ ...prev, paymentType: value }))
              }
            >
              <SelectTrigger className="w-32">
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
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={handleWhatsAppRedirect}
          disabled={!isFormValid}
          className="flex-1"
        >
          <Send className="h-4 w-4 mr-2" />
          Enviar por WhatsApp
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
  );
};
