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
   * Função centralizada para calcular preço de item do carrinho
   * 
   * REGRA DE NEGÓCIO OBRIGATÓRIA:
   * 
   * 1. Produto UNITÁRIO (cod_kit = null):
   *    - Preço = preço_unitário_do_prazo × quantidade
   *    - Usa: avista, 30_dias, 60_dias (valores unitários)
   * 
   * 2. Produto KIT (cod_kit != null):
   *    - Preço = valor_total_[prazo selecionado]
   *    - Usa EXCLUSIVAMENTE: valor_total_avista, valor_total_30, valor_total_60
   *    - NÃO multiplicar por quantidade interna
   *    - NÃO usar avista/30_dias/60_dias unitários
   *    - NÃO usar fallback para valor_base
   * 
   * @param item - Item do carrinho
   * @param product - Produto original do backend
   * @param priceType - Tipo de prazo selecionado
   * @returns Preço calculado conforme regra de negócio
   */
  const calculateCartItemPrice = useCallback((
    item: CartItem,
    product: Product | undefined,
    priceType: PriceType
  ): number => {
    // DETECÇÃO EXPLÍCITA: Verificar se é KIT
    const isKit = item.type === 'KIT' || (product?.cod_kit !== null && product?.cod_kit !== undefined);
    
    if (isKit) {
      // REGRA CRÍTICA: Para KIT, usar EXCLUSIVAMENTE valor_total_* da estrutura Kit
      // NÃO usar fallback para valor_base ou preços unitários
      
      // Tentar 1: Buscar kit na estrutura kits do produto original
      if (product?.kits && item.codigo) {
        const kit = product.kits.find(k => k.codigo === item.codigo);
        if (kit) {
          // Usar valores totais do kit conforme prazo selecionado
          if (priceType === 'avista') {
            return kit.valor_total_avista;
          } else if (priceType === 'dias30') {
            return kit.valor_total_30;
          } else if (priceType === 'dias90') {
            return kit.valor_total_60;
          }
        }
      }
      
      // Tentar 2: Se o produto foi convertido (ProductModal), os valores totais
      // já estão nos campos avista/30_dias/60_dias (preenchidos com valor_total_*)
      // IMPORTANTE: Verificar se o produto tem cod_kit (é um kit convertido)
      if (product && product.cod_kit !== null && product.cod_kit !== undefined) {
        if (priceType === 'avista' && product.avista !== undefined && product.avista > 0) {
          return product.avista;
        } else if (priceType === 'dias30' && product['30_dias'] !== undefined && product['30_dias'] > 0) {
          return product['30_dias'];
        } else if (priceType === 'dias90' && product['60_dias'] !== undefined && product['60_dias'] > 0) {
          return product['60_dias'];
        }
      }
      
      // Tentar 3: Buscar em todos os produtos que têm kits (caso o produto original não tenha kits populados)
      // Esta busca é feita no updateAllItemsPriceType, mas aqui é um fallback adicional
      // Se o item já tem valor_total armazenado e estamos apenas verificando, usar esse valor
      // Mas apenas se o priceType não mudou (caso contrário precisa recalcular)
      if (item.valor_total !== undefined && item.priceType === priceType) {
        return item.valor_total;
      }
      
      // ERRO: Não foi possível encontrar o preço do kit
      // NÃO usar fallback silencioso para valor_base
      console.error('Erro: Não foi possível calcular preço do kit', {
        itemId: item.id,
        codigo: item.codigo,
        productId: item.productId,
        priceType,
        hasProduct: !!product,
        hasKits: !!product?.kits,
        productCodKit: product?.cod_kit
      });
      return 0; // Retornar 0 em vez de valor_base incorreto
    } else {
      // REGRA: Produto UNITÁRIO - usar preço unitário conforme prazo
      if (!product) {
        // Se não encontrar o produto, usar o preço atual do item
        return item.price;
      }
      
      // Buscar preço unitário conforme tabela de prazo
      if (priceType === 'avista') {
        return product.avista ?? product.valor_base ?? 0;
      } else if (priceType === 'dias30') {
        return product['30_dias'] ?? product.valor_base ?? 0;
      } else if (priceType === 'dias90') {
        return product['60_dias'] ?? product.valor_base ?? 0;
      }
      return product.avista ?? product.valor_base ?? 0;
    }
  }, []);

  /**
   * Helper function to get price from product (mantida para compatibilidade)
   * REGRA DE NEGÓCIO: Para kits, os valores avista/30_dias/60_dias já são os valores TOTAIS do kit
   * (não unitários), pois são preenchidos com valor_total_avista/valor_total_30/valor_total_60
   * quando o kit é convertido em Product no ProductModal.
   * Para produtos unitários, retorna o preço unitário conforme a tabela de prazo.
   */
  const getPrice = useCallback((prod: Product, pt: PriceType): number => {
    // Verificar se é kit (cod_kit não é null)
    const isKit = prod.cod_kit !== null && prod.cod_kit !== undefined;
    
    if (isKit) {
      // REGRA: Para kits, os valores avista/30_dias/60_dias já são os valores TOTAIS
      // (preenchidos no ProductModal quando o kit é convertido)
      if (pt === 'avista') {
        return prod.avista ?? 0; // NÃO usar valor_base como fallback para kits
      } else if (pt === 'dias30') {
        return prod['30_dias'] ?? 0;
      } else if (pt === 'dias90') {
        return prod['60_dias'] ?? 0;
      }
      return prod.avista ?? 0;
    } else {
      // Produto unitário: usar preço unitário com fallback para valor_base
      if (pt === 'avista') {
        return prod.avista ?? prod.valor_base ?? 0;
      } else if (pt === 'dias30') {
        return prod['30_dias'] ?? prod.valor_base ?? 0;
      } else if (pt === 'dias90') {
        return prod['60_dias'] ?? prod.valor_base ?? 0;
      }
      return prod.avista ?? prod.valor_base ?? 0;
    }
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
        // REGRA: Para kits, getPrice retorna valor_total (já preenchido no ProductModal)
        // Para produtos unitários, getPrice retorna preço unitário
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
          // REGRA CRÍTICA: valor_total = preço do kit conforme tabela de prazo selecionada
          // Para kits, price já é o valor_total (não unitário)
          baseItem.valor_total = price;
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
   * 
   * REGRA DE NEGÓCIO:
   * - Para kits: usar EXCLUSIVAMENTE valor_total_* da estrutura Kit
   * - Para produtos unitários: usar preço unitário conforme tabela de prazo
   * 
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
          // Usar função centralizada para calcular preço
          const newPrice = calculateCartItemPrice(item, product, priceType);
          
          // DETECÇÃO EXPLÍCITA: Verificar se é KIT
          if (item.type === 'KIT') {
            // REGRA CRÍTICA: Para kits, atualizar valor_total e price com o mesmo valor
            return {
              ...item,
              priceType,
              price: newPrice,
              valor_total: newPrice // Garantir que valor_total sempre reflete o preço correto do kit
            };
          } else {
            // REGRA: Para produtos unitários, atualizar price normalmente
            return { ...item, priceType, price: newPrice };
          }
        }
        return item;
      })
    );
  }, [calculateCartItemPrice]);

  /**
   * Atualiza a forma de pagamento (prazo) de TODOS os itens do carrinho
   * 
   * REGRA DE NEGÓCIO CRÍTICA:
   * - Deve recalcular o preço de TODOS os itens (unitários e kits) conforme a tabela de prazo selecionada.
   * - Para kits: usar EXCLUSIVAMENTE valor_total_avista/30/60 da estrutura Kit
   * - Para produtos unitários: usar preço unitário conforme tabela de prazo
   * - Garantir consistência matemática do subtotal e total
   */
  const updateAllItemsPriceType = useCallback((priceType: PriceType, allProducts: Product[]) => {
    setItems(prev =>
      prev.map(item => {
        // DETECÇÃO EXPLÍCITA: Verificar se é KIT
        const isKit = item.type === 'KIT';
        
        let originalProduct: Product | undefined;
        
        if (isKit && item.codigo) {
          // REGRA CRÍTICA: Para kits, buscar produto que contém o kit com o código correspondente
          // Estratégia de busca em múltiplas etapas:
          
          // Tentar 1: Buscar produto que tem o kit no array kits com código correspondente
          originalProduct = allProducts.find(p => {
            if (p.kits && p.kits.length > 0) {
              return p.kits.some(k => k.codigo === item.codigo);
            }
            return false;
          });
          
          // Tentar 2: Se não encontrou, buscar produto que é o próprio kit (convertido no ProductModal)
          // Isso acontece quando o kit foi adicionado como Product convertido
          if (!originalProduct) {
            originalProduct = allProducts.find(p => 
              p.codigo === item.codigo && 
              p.cod_kit !== null && 
              p.cod_kit !== undefined
            );
          }
          
          // Tentar 3: Se ainda não encontrou, buscar pelo id_produto
          // (pode ser que o produto original tenha o kit mas não esteja no array allProducts)
          if (!originalProduct) {
            originalProduct = allProducts.find(p => p.id_produto === item.productId);
          }
        } else {
          // Para produtos unitários, buscar pelo id_produto
          originalProduct = allProducts.find(p => p.id_produto === item.productId);
        }
        
        // Usar função centralizada para calcular preço
        const newPrice = calculateCartItemPrice(item, originalProduct, priceType);
        
        if (isKit) {
          // REGRA CRÍTICA: Para kits, atualizar valor_total e price com o mesmo valor
          // (valor_total é o preço do kit conforme prazo selecionado)
          return {
            ...item,
            priceType,
            price: newPrice,
            valor_total: newPrice // Garantir que valor_total sempre reflete o preço correto do kit
          };
        } else {
          // REGRA: Para produtos unitários, atualizar price normalmente
          return {
            ...item,
            priceType,
            price: newPrice
          };
        }
      })
    );
  }, [calculateCartItemPrice]);

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
