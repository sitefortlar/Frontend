import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { CartItem, CheckoutData } from '@/types/Cart';
import { Product, PriceType } from '@/types/Product';
import { convertDriveUrlToImage } from '@/utils/imageUtils';
import { authService } from '@/services/auth/auth';
import { productService } from '@/services/products';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<PriceType>('avista');
  const [isPricingLoading, setIsPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);

  // Helper function to get price from product
  const getPrice = useCallback((prod: Product, pt: PriceType): number => {
    if (pt === 'avista') {
      return prod.avista ?? prod.valor_base ?? 0;
    } else if (pt === 'dias30') {
      return prod['30_dias'] ?? prod.valor_base ?? 0;
    } else if (pt === 'dias90') {
      // Mapeia dias90 para 60_dias se disponível
      return prod['60_dias'] ?? prod.valor_base ?? 0;
    }
    return prod.avista ?? prod.valor_base ?? 0;
  }, []);

  const addToCart = useCallback((product: Product, size: string, priceType: PriceType, quantity: number = 1) => {
    // Validate product has required fields
    if (!product || !product.id_produto || !product.nome) {
      console.error('Invalid product:', product);
      return;
    }

    setItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.productId === product.id_produto && item.size === size && item.name === product.nome
      );

      if (existingItemIndex >= 0) {
        return prev.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${product.id_produto}-${size}-${Date.now()}`,
          productId: product.id_produto,
          name: product.nome || 'Produto sem nome',
          image: product.imagens && product.imagens.length > 0 
            ? convertDriveUrlToImage(product.imagens[0])
            : "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=64&h=64&fit=crop",
          size,
          // O tipo pode vir da UI, mas o preço final sempre será recalculado no backend
          priceType: paymentType,
          price: getPrice(product, paymentType),
          quantity,
        };
        return [...prev, newItem];
      }
    });
    setIsDrawerOpen(true);
  }, [getPrice, paymentType]);

  const removeFromCart = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const updatePriceType = useCallback((itemId: string, priceType: PriceType, product: Product) => {
    if (!product) {
      console.error('Invalid product for updatePriceType:', product);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === itemId 
          ? { ...item, priceType, price: getPrice(product, priceType) }
          : item
      )
    );
  }, [getPrice]);

  const updateAllItemsPriceType = useCallback((nextPaymentType: PriceType) => {
    setPaymentType(nextPaymentType);
    // Atualiza o priceType no UI imediatamente; o preço unitário será recalculado no backend
    setItems(prev => prev.map(item => ({ ...item, priceType: nextPaymentType })));
  }, []);

  const priceTypeToPrazo = useCallback((pt: PriceType): number => {
    switch (pt) {
      case 'avista':
        return 0;
      case 'dias30':
        return 30;
      case 'dias90':
        return 60; // dias90 no frontend representa 60 dias no backend
      default:
        return 0;
    }
  }, []);

  const idsKey = useMemo(() => {
    const ids = Array.from(new Set(items.map(i => i.productId))).sort((a, b) => a - b);
    return ids.join(',');
  }, [items]);

  const pricingAbortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    const ids = Array.from(new Set(items.map(i => i.productId)));
    if (ids.length === 0) {
      setPricingError(null);
      setIsPricingLoading(false);
      return;
    }

    const estado = authService.getUserEstate();
    if (!estado) {
      setPricingError('Não foi possível calcular preços: estado do usuário não encontrado.');
      return;
    }

    const prazo = priceTypeToPrazo(paymentType);

    pricingAbortRef.current?.abort();
    const controller = new AbortController();
    pricingAbortRef.current = controller;

    setIsPricingLoading(true);
    setPricingError(null);

    productService.getCartPrices(
      { estado, prazo, ids },
      { signal: controller.signal }
    ).then((resp) => {
      const priceById = new Map<number, number>();
      const hasMissing = resp.items?.some(i => !i.found || i.preco == null);
      resp.items?.forEach((i) => {
        if (i.found && i.preco != null) {
          priceById.set(i.id_produto, i.preco);
        }
      });

      setItems(prev =>
        prev.map(item => {
          const nextPrice = priceById.get(item.productId);
          return {
            ...item,
            priceType: paymentType,
            price: nextPrice ?? item.price,
          };
        })
      );

      if (hasMissing) {
        setPricingError('Alguns produtos não puderam ter o preço calculado no momento.');
      }
    }).catch((err: any) => {
      if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
      setPricingError(err?.message || 'Erro ao calcular preços do carrinho.');
    }).finally(() => {
      if (!controller.signal.aborted) setIsPricingLoading(false);
    });

    return () => controller.abort();
  }, [idsKey, paymentType, priceTypeToPrazo]);

  const getTotalPrice = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const getItemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const generateWhatsAppMessage = useCallback((checkoutData: CheckoutData) => {
    const total = getTotalPrice;
    
    let message = `*PEDIDO DE ORÇAMENTO*\n\n`;
    message += `*Cliente:* ${checkoutData.name}\n`;
    message += `*CNPJ:* ${checkoutData.cnpj}\n`;
    message += `*WhatsApp:* ${checkoutData.whatsapp}\n`;
    message += `*Email:* ${checkoutData.email}\n\n`;
    
    message += `*PRODUTOS:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Tamanho: ${item.size}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Preço unitário: R$ ${item.price.toFixed(2)}\n`;
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `*TOTAL GERAL: R$ ${total.toFixed(2)}*\n`;
    message += `*Forma de pagamento: ${checkoutData.paymentType === 'avista' ? 'À vista' : checkoutData.paymentType === 'dias30' ? '30 dias' : '90 dias'}*`;

    return encodeURIComponent(message);
  }, [items, getTotalPrice]);

  return {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    paymentType,
    setPaymentType: updateAllItemsPriceType,
    isPricingLoading,
    pricingError,
    addToCart,
    removeFromCart,
    updateQuantity,
    updatePriceType,
    updateAllItemsPriceType,
    getTotalPrice,
    getItemCount,
    clearCart,
    generateWhatsAppMessage,
  };
};
