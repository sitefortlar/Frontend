import { useState, useCallback, useMemo, useEffect } from 'react';
import { CartItem, CheckoutData } from '@/types/Cart';
import { Product, PriceType } from '@/types/Product';
import { convertDriveUrlToImage } from '@/utils/imageUtils';

const CART_STORAGE_KEY = 'fortlar_cart_items';
const CART_DRAWER_STORAGE_KEY = 'fortlar_cart_drawer_open';

// Função para carregar itens do localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erro ao carregar carrinho do localStorage:', error);
  }
  return [];
};

// Função para salvar itens no localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Erro ao salvar carrinho no localStorage:', error);
  }
};

export const useCart = () => {
  // Carregar itens do localStorage na inicialização
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  
  // Carregar estado do drawer do localStorage
  const [isDrawerOpen, setIsDrawerOpen] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_DRAWER_STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // Salvar itens no localStorage sempre que mudarem
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  // Salvar estado do drawer no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_DRAWER_STORAGE_KEY, String(isDrawerOpen));
    } catch (error) {
      console.error('Erro ao salvar estado do drawer:', error);
    }
  }, [isDrawerOpen]);

  /**
   * Helper function to get price from product
   * REGRA DE NEGÓCIO: Para kits, os valores avista/30_dias/60_dias já são os valores TOTAIS do kit
   * (não unitários), pois são preenchidos com valor_total_avista/valor_total_30/valor_total_60
   * quando o kit é convertido em Product no ProductModal.
   * Para produtos unitários, retorna o preço unitário conforme a tabela de prazo.
   */
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

  /**
   * Adiciona produto ao carrinho
   * REGRA DE NEGÓCIO CRÍTICA:
   * - KIT: É tratado como um SKU único. quantity sempre = 1 (representa 1 unidade de kit).
   *   quantidade_kit = quantidade de kits adicionados.
   *   NÃO multiplicar pela quantidade de itens por kit no cálculo do carrinho.
   * - UNIT: quantity = quantidade de unidades do produto.
   */
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
                // Para kits, incrementar quantidade_kit. quantity permanece 1.
                // Para produtos unitários, incrementar quantity normalmente.
                ...(isKit 
                  ? { quantidade_kit: (item.quantidade_kit || 1) + quantity }
                  : { quantity: item.quantity + quantity }
                )
              }
            : item
        );
      } else {
        // Novo item
        const price = getPrice(product, priceType);
        
        // REGRA: Nome do produto deve ter prefixo "KIT -" quando for kit
        const productName = isKit 
          ? `KIT - ${product.nome || 'Produto sem nome'}`
          : (product.nome || 'Produto sem nome');
        
        const baseItem: CartItem = {
          id: `${product.id_produto}-${isKit ? 'kit' : 'unit'}-${size}-${Date.now()}`,
          productId: product.id_produto,
          name: productName,
          image: product.imagens && product.imagens.length > 0 
            ? convertDriveUrlToImage(product.imagens[0])
            : "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=64&h=64&fit=crop",
          size,
          priceType,
          price,
          // REGRA CRÍTICA: Para kits, quantity sempre = 1 (representa 1 unidade de kit no carrinho)
          // quantidade_kit armazena a quantidade real de kits
          quantity: isKit ? 1 : quantity,
        };

        // Adicionar campos específicos de kit
        if (isKit) {
          baseItem.type = 'KIT';
          baseItem.codigo = product.codigo;
          baseItem.quantidade_kit = quantity; // Quantidade de kits adicionados
          baseItem.quantidade_itens_por_kit = product.quantidade || 1; // Quantidade de itens por kit (apenas informativo)
          baseItem.valor_total = price; // Valor total do kit conforme tabela de prazo selecionada
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

  /**
   * Atualiza a quantidade de um item no carrinho
   * REGRA DE NEGÓCIO:
   * - KIT: quantity sempre = 1. Atualizar apenas quantidade_kit.
   * - UNIT: Atualizar quantity normalmente.
   */
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          if (item.type === 'KIT') {
            // REGRA CRÍTICA: Para kits, quantity sempre = 1 (representa 1 unidade de kit)
            // Apenas atualizar quantidade_kit. NÃO multiplicar pela quantidade de itens por kit.
            return {
              ...item,
              quantidade_kit: quantity,
              // quantity permanece 1 para kits
              quantity: 1
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

  /**
   * Atualiza a forma de pagamento (prazo) de um item individual
   * NOTA: Esta função assume que o product passado já contém os valores totais do kit
   * (valor_total_avista/30/60) quando for um kit, como acontece no ProductModal.
   */
  const updatePriceType = useCallback((itemId: string, priceType: PriceType, product: Product) => {
    if (!product) {
      console.error('Invalid product for updatePriceType:', product);
      return;
    }

    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          // REGRA: getPrice funciona para kits porque o product já contém os valores totais
          // quando convertido em ProductModal (avista = valor_total_avista, etc)
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

  /**
   * Atualiza a forma de pagamento (prazo) de TODOS os itens do carrinho
   * REGRA DE NEGÓCIO CRÍTICA:
   * - Deve recalcular o preço de TODOS os itens (unitários e kits) conforme a tabela de prazo selecionada.
   * - Para kits: buscar o valor_total do kit na estrutura Kit original (valor_total_avista/30/60).
   * - Para produtos unitários: buscar o preço unitário conforme tabela de prazo.
   */
  const updateAllItemsPriceType = useCallback((priceType: PriceType, allProducts: Product[]) => {
    setItems(prev =>
      prev.map(item => {
        // Encontrar o produto original para obter os preços corretos
        const originalProduct = allProducts.find(p => p.id_produto === item.productId);
        if (originalProduct) {
          if (item.type === 'KIT') {
            // REGRA CRÍTICA: Para kits, buscar o valor_total do kit na estrutura Kit original
            // O kit está em originalProduct.kits, precisamos encontrar pelo codigo
            const kit = originalProduct.kits?.find(k => k.codigo === item.codigo);
            let newPrice = 0;
            
            if (kit) {
              // Usar os valores totais do kit conforme a tabela de prazo
              if (priceType === 'avista') {
                newPrice = kit.valor_total_avista;
              } else if (priceType === 'dias30') {
                newPrice = kit.valor_total_30;
              } else if (priceType === 'dias90') {
                newPrice = kit.valor_total_60;
              }
            } else {
              // Fallback: se não encontrar o kit, usar getPrice (pode ter sido convertido em Product)
              newPrice = getPrice(originalProduct, priceType);
            }
            
            return {
              ...item,
              priceType,
              price: newPrice,
              valor_total: newPrice
            };
          } else {
            // Para produtos unitários, atualizar price normalmente
            const newPrice = getPrice(originalProduct, priceType);
            return {
              ...item,
              priceType,
              price: newPrice
            };
          }
        }
        // Se não encontrar o produto, mantém o preço atual mas atualiza o priceType
        return {
          ...item,
          priceType
        };
      })
    );
  }, [getPrice]);

  /**
   * Função central de cálculo do total do carrinho
   * REGRA DE NEGÓCIO:
   * - KIT: valor_total * quantidade_kit (não multiplicar pela quantidade de itens por kit)
   * - UNIT: price * quantity
   * - Sempre recalcula do zero quando items mudam (reatividade garantida por useMemo)
   */
  const calculateCartTotal = useCallback((cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => {
      if (item.type === 'KIT' && item.valor_total !== undefined && item.quantidade_kit !== undefined) {
        // REGRA: Kit = valor_total do kit * quantidade de kits
        // NÃO multiplicar pela quantidade de itens por kit
        return total + (item.valor_total * item.quantidade_kit);
      }
      // Produtos unitários: preço unitário * quantidade
      return total + (item.price * item.quantity);
    }, 0);
  }, []);

  const getTotalPrice = useMemo(() => {
    return calculateCartTotal(items);
  }, [items, calculateCartTotal]);

  /**
   * Conta o número de itens distintos no carrinho
   * REGRA: Para kits, quantity sempre = 1, então conta 1 item por kit.
   * Se quiser contar unidades totais (incluindo unidades dentro dos kits),
   * seria necessário somar quantidade_kit * quantidade_itens_por_kit para kits.
   */
  const getItemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar carrinho do localStorage:', error);
    }
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
        // Calcular total de unidades: quantidade_kit * quantidade_itens_por_kit
        const totalUnidades = (item.quantidade_kit || 1) * (item.quantidade_itens_por_kit || 1);
        message += `   Total de unidades: ${totalUnidades}\n`;
        message += `   Valor total do kit: R$ ${item.valor_total?.toFixed(2) || item.price.toFixed(2)}\n`;
        // REGRA: Subtotal = valor_total * quantidade_kit
        const subtotal = (item.valor_total || item.price) * (item.quantidade_kit || 1);
        message += `   Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
      } else {
        message += `   Tipo: Produto unitário\n`;
        message += `   Tamanho: ${item.size}\n`;
        message += `   Quantidade: ${item.quantity}\n`;
        message += `   Preço unitário: R$ ${item.price.toFixed(2)}\n`;
        // REGRA: Subtotal = price * quantity
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
