import { useState, useCallback, useMemo } from 'react';
import { CartItem, CheckoutData } from '@/types/Cart';
import { Product, PriceType } from '@/types/Product';
import { convertDriveUrlToImage } from '@/utils/imageUtils';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    // Verificar se é um kit (cod_kit não é null)
    const isKit = product.cod_kit !== null && product.cod_kit !== undefined;

    setItems(prev => {
      // Para kits, usar cod_kit como identificador único
      // Para produtos unitários, usar productId + size + name
      const existingItemIndex = prev.findIndex(item => {
        if (isKit) {
          // Kits: comparar por productId e codigo (cod_kit)
          return item.productId === product.id_produto && 
                 item.type === 'KIT' && 
                 item.codigo === product.codigo;
        } else {
          // Produtos unitários: comparar por productId, size e name
          return item.productId === product.id_produto && 
                 item.size === size && 
                 item.name === product.nome &&
                 item.type !== 'KIT';
        }
      });

      if (existingItemIndex >= 0) {
        // Item já existe, incrementar quantidade
        return prev.map((item, index) => 
          index === existingItemIndex 
            ? { 
                ...item, 
                quantity: isKit ? item.quantidade_kit! + quantity : item.quantity + quantity,
                // Atualizar quantidade_kit se for kit
                ...(isKit && { quantidade_kit: item.quantidade_kit! + quantity })
              }
            : item
        );
      } else {
        // Novo item
        const price = getPrice(product, priceType);
        const baseItem: CartItem = {
          id: `${product.id_produto}-${isKit ? 'kit' : 'unit'}-${size}-${Date.now()}`,
          productId: product.id_produto,
          name: product.nome || 'Produto sem nome',
          image: product.imagens && product.imagens.length > 0 
            ? convertDriveUrlToImage(product.imagens[0])
            : "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=64&h=64&fit=crop",
          size,
          priceType,
          price,
          quantity: isKit ? 1 : quantity, // Para kits, quantity representa unidades totais
        };

        // Adicionar campos específicos de kit
        if (isKit) {
          baseItem.type = 'KIT';
          baseItem.codigo = product.codigo;
          baseItem.quantidade_kit = quantity; // Quantidade de kits
          baseItem.quantidade_itens_por_kit = product.quantidade || 1; // Quantidade de itens por kit
          baseItem.valor_total = price; // Valor total já vem da API (valor_total_avista, etc)
          // Para kits, o price já é o valor total do kit (não unitário)
          baseItem.quantity = (product.quantidade || 1) * quantity; // Total de unidades
        } else {
          baseItem.type = 'UNIT';
        }

        return [...prev, baseItem];
      }
    });
    setIsDrawerOpen(true);
  }, [getPrice]);

  const removeFromCart = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          if (item.type === 'KIT') {
            // Para kits, atualizar quantidade_kit e recalcular quantity (unidades totais)
            const quantidade_kit = quantity;
            const quantidade_itens_por_kit = item.quantidade_itens_por_kit || 1;
            return {
              ...item,
              quantidade_kit,
              quantity: quantidade_kit * quantidade_itens_por_kit
            };
          } else {
            // Para produtos unitários, atualizar quantity normalmente
            return { ...item, quantity };
          }
        }
        return item;
      })
    );
  }, [removeFromCart]);

  const updatePriceType = useCallback((itemId: string, priceType: PriceType, product: Product) => {
    if (!product) {
      console.error('Invalid product for updatePriceType:', product);
      return;
    }

    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const newPrice = getPrice(product, priceType);
          if (item.type === 'KIT') {
            // Para kits, atualizar valor_total e price
            return {
              ...item,
              priceType,
              price: newPrice,
              valor_total: newPrice
            };
          } else {
            // Para produtos unitários, atualizar price normalmente
            return { ...item, priceType, price: newPrice };
          }
        }
        return item;
      })
    );
  }, [getPrice]);

  const updateAllItemsPriceType = useCallback((priceType: PriceType, allProducts: Product[]) => {
    setItems(prev =>
      prev.map(item => {
        // Encontrar o produto original para obter os preços corretos
        const originalProduct = allProducts.find(p => p.id_produto === item.productId);
        if (originalProduct) {
          const newPrice = getPrice(originalProduct, priceType);
          if (item.type === 'KIT') {
            // Para kits, atualizar valor_total e price
            return {
              ...item,
              priceType,
              price: newPrice,
              valor_total: newPrice
            };
          } else {
            // Para produtos unitários, atualizar price normalmente
            return {
              ...item,
              priceType,
              price: newPrice
            };
          }
        }
        // Se não encontrar o produto, mantém o preço atual
        return {
          ...item,
          priceType
        };
      })
    );
  }, [getPrice]);

  const getTotalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      // Para kits, usar valor_total * quantidade_kit
      if (item.type === 'KIT' && item.valor_total && item.quantidade_kit) {
        return total + (item.valor_total * item.quantidade_kit);
      }
      // Para produtos unitários, usar price * quantity
      return total + (item.price * item.quantity);
    }, 0);
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
      
      if (item.type === 'KIT') {
        message += `   Tipo: Kit\n`;
        message += `   Código do kit: ${item.codigo || 'N/A'}\n`;
        message += `   Quantidade de kits: ${item.quantidade_kit || 1}\n`;
        message += `   Itens por kit: ${item.quantidade_itens_por_kit || 1}\n`;
        message += `   Total de unidades: ${item.quantity}\n`;
        message += `   Valor total do kit: R$ ${item.valor_total?.toFixed(2) || item.price.toFixed(2)}\n`;
        const subtotal = (item.valor_total || item.price) * (item.quantidade_kit || 1);
        message += `   Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
      } else {
        message += `   Tipo: Produto unitário\n`;
        message += `   Tamanho: ${item.size}\n`;
        message += `   Quantidade: ${item.quantity}\n`;
        message += `   Preço unitário: R$ ${item.price.toFixed(2)}\n`;
        message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
      }
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
