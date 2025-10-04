import { useState, useCallback, useMemo } from 'react';
import { CartItem, CheckoutData } from '@/types/Cart';
import { Product, PriceType } from '@/types/Product';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = useCallback((product: Product, size: string, priceType: PriceType, quantity: number = 1) => {
    setItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.productId === product.id && item.size === size && item.name === product.name
      );

      if (existingItemIndex >= 0) {
        return prev.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${size}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=64&h=64&fit=crop",
          size,
          priceType,
          price: product.prices[priceType],
          quantity,
        };
        return [...prev, newItem];
      }
    });
    setIsDrawerOpen(true);
  }, []);

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
    setItems(prev =>
      prev.map(item =>
        item.id === itemId 
          ? { ...item, priceType, price: product.prices[priceType] }
          : item
      )
    );
  }, []);

  const updateAllItemsPriceType = useCallback((priceType: PriceType, allProducts: Product[]) => {
    setItems(prev =>
      prev.map(item => {
        // Encontrar o produto original para obter os preços corretos
        const originalProduct = allProducts.find(p => p.id === item.productId);
        if (originalProduct) {
          return {
            ...item,
            priceType,
            price: originalProduct.prices[priceType]
          };
        }
        return {
          ...item,
          priceType
        };
      })
    );
  }, []);

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
