import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import { PriceType, Product } from '@/types/Product';
import { CartItem } from '@/types/Cart';
import { orderService } from '@/services/order/OrderService';
import type { SendOrderEmailRequest } from '@/services/order/OrderService';
import { useToast } from '@/hooks/use-toast';
import { useCouponContext } from '@/contexts/CouponContext';
import { CouponSection } from './CouponSection';

interface CartFooterProps {
  totalPrice: number;
  items: CartItem[];
  allProducts: Product[];
  companyId: number;
  onClearCart: () => void;
  onUpdateAllItemsPriceType?: (priceType: PriceType, allProducts: Product[]) => void;
}

export const CartFooter = ({ 
  totalPrice, 
  items,
  allProducts,
  companyId,
  onClearCart,
  onUpdateAllItemsPriceType,
}: CartFooterProps) => {
  const { toast } = useToast();
  const { appliedCoupon, calculateDiscount, removeCoupon } = useCouponContext();
  const [paymentType, setPaymentType] = useState<PriceType>('avista');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calcular desconto e total final
  const discount = calculateDiscount(totalPrice);
  const finalTotal = totalPrice - discount;

  const handlePaymentTypeChange = (value: PriceType) => {
    setPaymentType(value);
    if (onUpdateAllItemsPriceType) {
      onUpdateAllItemsPriceType(value, allProducts);
    }
  };

  // Função para mapear paymentType do frontend para o formato do backend
  const mapPaymentTypeToBackend = (paymentType: PriceType): "avista" | "30_dias" | "60_dias" => {
    switch (paymentType) {
      case 'avista':
        return 'avista';
      case 'dias30':
        return '30_dias';
      case 'dias90':
        return '60_dias'; // dias90 no frontend mapeia para 60_dias no backend
      default:
        return 'avista';
    }
  };

  const handleRealizarPedido = async () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar o pedido.",
        variant: "destructive",
      });
      return;
    }

    if (!companyId || companyId === 0) {
      toast({
        title: "Erro de configuração",
        description: "Não foi possível identificar a empresa. Por favor, faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mapear items do carrinho para OrderItemRequest
      // REGRA DE NEGÓCIO: Para kits, quantidade_pedida = quantidade_kit, valor_total = valor_total * quantidade_kit
      // Para produtos unitários, quantidade_pedida = quantity, valor_total = price * quantity
      const orderItems: SendOrderEmailRequest['itens'] = items.map((item) => {
        // Encontrar o produto completo para obter código, categoria e subcategoria
        const product = allProducts.find(p => p.id_produto === item.productId);
        
        if (item.type === 'KIT') {
          // REGRA: Para kits, quantidade_pedida = quantidade de kits
          // valor_unitario = valor_total do kit (preço por kit)
          // valor_total = valor_total * quantidade_kit
          return {
            id_produto: item.productId,
            codigo: product?.codigo || item.codigo || '',
            nome: item.name,
            quantidade_pedida: item.quantidade_kit || 1,
            valor_unitario: item.valor_total || item.price,
            valor_total: (item.valor_total || item.price) * (item.quantidade_kit || 1),
            categoria: product?.categoria,
            subcategoria: product?.subcategoria,
          };
        } else {
          // Produtos unitários: quantidade_pedida = quantity, valor_total = price * quantity
          return {
            id_produto: item.productId,
            codigo: product?.codigo || '',
            nome: item.name,
            quantidade_pedida: item.quantity,
            valor_unitario: item.price,
            valor_total: item.price * item.quantity,
            categoria: product?.categoria,
            subcategoria: product?.subcategoria,
          };
        }
      });

      const orderRequest: SendOrderEmailRequest = {
        company_id: companyId,
        forma_pagamento: mapPaymentTypeToBackend(paymentType),
        itens: orderItems,
        // Incluir id_cupom se houver cupom aplicado
        ...(appliedCoupon && { id_cupom: appliedCoupon.id_cupom }),
      };

      const response = await orderService.sendOrderEmail(orderRequest);

      // Mostrar modal de sucesso
      setIsModalOpen(true);
      
      // Limpar cupom após pedido enviado com sucesso
      removeCoupon();
      
      toast({
        title: "Pedido enviado com sucesso!",
        description: `Email enviado para ${response.email_enviado}`,
      });

    } catch (error: any) {
      console.error('Erro ao enviar pedido:', error);
      
      toast({
        title: "Erro ao enviar pedido",
        description: error.message || "Ocorreu um erro ao enviar o pedido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Limpa o carrinho e cupom após fechar o modal
    onClearCart();
    removeCoupon();
  };

  return (
    <>
      <div className="border-t border-border/20 pt-4 pb-4 space-y-4 bg-background">
        {/* Seção de Cupom */}
        <CouponSection disabled={isLoading} />

        {/* Resumo de Valores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Desconto:</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                -R$ {discount.toFixed(2)}
              </span>
            </div>
          )}
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              R$ {finalTotal.toFixed(2)}
            </span>
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
              disabled={isLoading}
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
            disabled={isLoading || items.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Realizar Pedido
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onClearCart}
            className="h-12 w-12 p-0"
            size="icon"
            disabled={isLoading}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl">Pedido Enviado com Sucesso!</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Seu pedido foi enviado por email. Em breve entraremos em contato com você.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleCloseModal} className="h-12 text-base font-semibold">
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
