import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { queryKeys } from '@/config/queryClient';
import { CartItem, CheckoutData, Product, PriceType } from '@/types';

/**
 * Interface para dados do carrinho
 */
interface CartData {
  items: CartItem[];
  total: number;
  itemCount: number;
}

/**
 * Hook para gerenciar carrinho
 * Aplicando Single Responsibility Principle
 */
export const useCart = () => {
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Query para obter itens do carrinho
  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: queryKeys.cart.items,
    queryFn: () => {
      // Simula busca do carrinho (pode ser implementado com API real)
      const items = JSON.parse(localStorage.getItem('cart_items') || '[]');
      const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      const itemCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      
      return { items, total, itemCount };
    },
    staleTime: 1000 * 60 * 2, // 2 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });

  // Mutation para adicionar item ao carrinho
  const addToCartMutation = useMutation({
    mutationFn: async ({ product, size, priceType, quantity }: {
      product: Product;
      size: string;
      priceType: PriceType;
      quantity: number;
    }) => {
      const items = JSON.parse(localStorage.getItem('cart_items') || '[]');
      const existingItemIndex = items.findIndex(
        (item: CartItem) => item.productId === product.id && item.size === size && item.name === product.name
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = items.map((item: CartItem, index: number) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${size}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          image: product.images[0] || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=64&h=64&fit=crop",
          size,
          priceType,
          price: product.prices[priceType],
          quantity,
        };
        newItems = [...items, newItem];
      }

      localStorage.setItem('cart_items', JSON.stringify(newItems));
      return Promise.resolve(newItems);
    },
    onSuccess: () => {
      // Invalida o cache do carrinho
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items });
      setIsDrawerOpen(true);
    },
  });

  // Mutation para remover item do carrinho
  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const items = JSON.parse(localStorage.getItem('cart_items') || '[]');
      const newItems = items.filter((item: CartItem) => item.id !== itemId);
      localStorage.setItem('cart_items', JSON.stringify(newItems));
      return Promise.resolve(newItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items });
    },
  });

  // Mutation para atualizar quantidade
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const items = JSON.parse(localStorage.getItem('cart_items') || '[]');
      let newItems: CartItem[];
      
      if (quantity <= 0) {
        newItems = items.filter((item: CartItem) => item.id !== itemId);
      } else {
        newItems = items.map((item: CartItem) =>
          item.id === itemId ? { ...item, quantity } : item
        );
      }
      
      localStorage.setItem('cart_items', JSON.stringify(newItems));
      return Promise.resolve(newItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items });
    },
  });

  // Mutation para atualizar tipo de preço
  const updatePriceTypeMutation = useMutation({
    mutationFn: async ({ itemId, priceType, product }: {
      itemId: string;
      priceType: PriceType;
      product: Product;
    }) => {
      const items = JSON.parse(localStorage.getItem('cart_items') || '[]');
      const newItems = items.map((item: CartItem) =>
        item.id === itemId 
          ? { ...item, priceType, price: product.prices[priceType] }
          : item
      );
      
      localStorage.setItem('cart_items', JSON.stringify(newItems));
      return Promise.resolve(newItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items });
    },
  });

  // Mutation para atualizar tipo de preço de todos os itens
  const updateAllItemsPriceTypeMutation = useMutation({
    mutationFn: async ({ priceType, allProducts }: {
      priceType: PriceType;
      allProducts: Product[];
    }) => {
      const items = JSON.parse(localStorage.getItem('cart_items') || '[]');
      const newItems = items.map((item: CartItem) => {
        const originalProduct = allProducts.find(p => p.id === item.productId);
        if (originalProduct) {
          return {
            ...item,
            priceType,
            price: originalProduct.prices[priceType]
          };
        }
        return { ...item, priceType };
      });
      
      localStorage.setItem('cart_items', JSON.stringify(newItems));
      return Promise.resolve(newItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items });
    },
  });

  // Mutation para limpar carrinho
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('cart_items');
      return Promise.resolve([]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items });
    },
  });

  // Memoiza os dados do carrinho
  const items = useMemo(() => cartData?.items || [], [cartData?.items]);
  const total = useMemo(() => cartData?.total || 0, [cartData?.total]);
  const itemCount = useMemo(() => cartData?.itemCount || 0, [cartData?.itemCount]);

  // Função para adicionar item ao carrinho
  const addToCart = useCallback(
    (product: Product, size: string, priceType: PriceType, quantity: number = 1) => {
      addToCartMutation.mutate({ product, size, priceType, quantity });
    },
    [addToCartMutation]
  );

  // Função para remover item do carrinho
  const removeFromCart = useCallback(
    (itemId: string) => {
      removeFromCartMutation.mutate(itemId);
    },
    [removeFromCartMutation]
  );

  // Função para atualizar quantidade
  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      updateQuantityMutation.mutate({ itemId, quantity });
    },
    [updateQuantityMutation]
  );

  // Função para atualizar tipo de preço
  const updatePriceType = useCallback(
    (itemId: string, priceType: PriceType, product: Product) => {
      updatePriceTypeMutation.mutate({ itemId, priceType, product });
    },
    [updatePriceTypeMutation]
  );

  // Função para atualizar tipo de preço de todos os itens
  const updateAllItemsPriceType = useCallback(
    (priceType: PriceType, allProducts: Product[]) => {
      updateAllItemsPriceTypeMutation.mutate({ priceType, allProducts });
    },
    [updateAllItemsPriceTypeMutation]
  );

  // Função para limpar carrinho
  const clearCart = useCallback(() => {
    clearCartMutation.mutate();
  }, [clearCartMutation]);

  // Função para gerar mensagem do WhatsApp
  const generateWhatsAppMessage = useCallback(
    (checkoutData: CheckoutData) => {
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
    },
    [items, total]
  );

  // Função para abrir/fechar drawer
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(prev => !prev);
  }, []);

  // Função para abrir drawer
  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  // Função para fechar drawer
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return {
    // Dados do carrinho
    items,
    total,
    itemCount,
    isDrawerOpen,
    setIsDrawerOpen,
    
    // Alias para compatibilidade
    getItemCount: itemCount,
    getTotalPrice: () => total,

    // Estados de loading
    isCartLoading,
    isAddingToCart: addToCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isUpdatingPriceType: updatePriceTypeMutation.isPending,
    isUpdatingAllPriceTypes: updateAllItemsPriceTypeMutation.isPending,
    isClearingCart: clearCartMutation.isPending,

    // Erros
    cartError,
    addToCartError: addToCartMutation.error,
    removeFromCartError: removeFromCartMutation.error,
    updateQuantityError: updateQuantityMutation.error,
    updatePriceTypeError: updatePriceTypeMutation.error,
    updateAllPriceTypesError: updateAllItemsPriceTypeMutation.error,
    clearCartError: clearCartMutation.error,

    // Funções
    addToCart,
    removeFromCart,
    updateQuantity,
    updatePriceType,
    updateAllItemsPriceType,
    clearCart,
    generateWhatsAppMessage,
    toggleDrawer,
    openDrawer,
    closeDrawer,
  };
};
