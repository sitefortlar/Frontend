import { useState, useCallback, useMemo, useEffect } from 'react';
import { CartItem, CheckoutData, ItemPrices } from '@/types/Cart';
import { Product, PriceType } from '@/types/Product';
import { convertDriveUrlToImage } from '@/utils/imageUtils';

const CART_STORAGE_KEY = 'fortlar_cart_items';
const CART_DRAWER_STORAGE_KEY = 'fortlar_cart_drawer_open';
const CART_PRICE_TYPE_KEY = 'fortlar_cart_price_type'; // Estado global do prazo selecionado

/**
 * Interface para item antigo (compatibilidade com migração)
 */
interface LegacyCartItem {
  id: string;
  productId: number;
  name: string;
  image: string;
  size: string;
  priceType?: 'avista' | 'dias30' | 'dias90';
  price?: number;
  quantity: number;
  type?: 'UNIT' | 'KIT';
  codigo?: string;
  quantidade_kit?: number;
  quantidade_itens_por_kit?: number;
  valor_total?: number;
}

/**
 * Migra item antigo para nova estrutura
 * REGRA: Converte estrutura antiga (com price final) para nova (com prices por prazo)
 */
const migrateCartItem = (legacyItem: LegacyCartItem, allProducts: Product[] = []): CartItem => {
  // Se já está na nova estrutura, retornar como está
  if ('prices' in legacyItem && legacyItem.prices && legacyItem.type) {
    return legacyItem as CartItem;
  }
  
  // Buscar produto original para obter preços corretos
  const product = allProducts.find(p => p.id_produto === legacyItem.productId);
  const isKit = legacyItem.type === 'KIT' || (product?.cod_kit !== null && product?.cod_kit !== undefined);
  
  let prices: ItemPrices = {
    avista: legacyItem.price || 0,
    dias30: legacyItem.price || 0,
    dias90: legacyItem.price || 0,
  };
  
  // Se é kit, tentar buscar valores totais do kit
  if (isKit && product) {
    if (product.kits && legacyItem.codigo) {
      const kit = product.kits.find(k => k.codigo === legacyItem.codigo);
      if (kit) {
        prices = {
          avista: kit.valor_total_avista,
          dias30: kit.valor_total_30,
          dias90: kit.valor_total_60,
        };
      }
    } else if (product.cod_kit !== null) {
      // Produto convertido (ProductModal)
      prices = {
        avista: product.avista || 0,
        dias30: product['30_dias'] || 0,
        dias90: product['60_dias'] || 0,
      };
    } else if (legacyItem.valor_total !== undefined) {
      // Usar valor_total como fallback (assumindo que era o valor à vista)
      prices = {
        avista: legacyItem.valor_total,
        dias30: legacyItem.valor_total,
        dias90: legacyItem.valor_total,
      };
    }
  } else if (product) {
    // Produto unitário
    prices = {
      avista: product.avista || product.valor_base || 0,
      dias30: product['30_dias'] || product.valor_base || 0,
      dias90: product['60_dias'] || product.valor_base || 0,
    };
  }
  
  return {
    id: legacyItem.id,
    productId: legacyItem.productId,
    name: legacyItem.name,
    image: legacyItem.image,
    size: legacyItem.size,
    quantity: legacyItem.quantity,
    prices,
    type: legacyItem.type || (isKit ? 'KIT' : 'UNIT'),
    codigo: legacyItem.codigo,
    quantidade_kit: legacyItem.quantidade_kit,
    quantidade_itens_por_kit: legacyItem.quantidade_itens_por_kit,
    // Manter campos deprecated para compatibilidade
    priceType: legacyItem.priceType,
    price: legacyItem.price,
    valor_total: legacyItem.valor_total,
  };
};

// Função para carregar itens do localStorage com migração automática
const loadCartFromStorage = (allProducts: Product[] = []): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Verificar se precisa migrar
      if (Array.isArray(parsed) && parsed.length > 0) {
        const needsMigration = parsed.some((item: any) => !item.prices || !item.type);
        if (needsMigration) {
          console.log('Migrando carrinho para nova estrutura...');
          const migrated = parsed.map((item: LegacyCartItem) => migrateCartItem(item, allProducts));
          // Salvar versão migrada
          saveCartToStorage(migrated);
          return migrated;
        }
        return parsed as CartItem[];
      }
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
  // REGRA OBRIGATÓRIA: priceType é estado GLOBAL do carrinho, não por item
  const [priceType, setPriceType] = useState<PriceType>(() => {
    try {
      const stored = localStorage.getItem(CART_PRICE_TYPE_KEY);
      if (stored && (stored === 'avista' || stored === 'dias30' || stored === 'dias90')) {
        return stored as PriceType;
      }
    } catch {
      // Ignorar erro
    }
    return 'avista'; // Default
  });
  
  // Carregar itens do localStorage na inicialização
  // REGRA: Migração será feita quando necessário (quando item não tem prices)
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Verificar se precisa migrar (se algum item não tem prices)
          const needsMigration = parsed.some((item: any) => !item.prices || !item.type);
          if (!needsMigration) {
            return parsed as CartItem[];
          }
          // Se precisa migrar, retornar vazio e migrar depois quando allProducts estiver disponível
          return [];
        }
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
    return [];
  });
  
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
  
  // Salvar priceType global no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_PRICE_TYPE_KEY, priceType);
    } catch (error) {
      console.error('Erro ao salvar priceType no localStorage:', error);
    }
  }, [priceType]);

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
   * 1. Produto UNITÁRIO (type === 'UNIT'):
   *    - Preço = prices[prazo] × quantity
   *    - prices contém preços unitários por prazo
   * 
   * 2. Produto KIT (type === 'KIT'):
   *    - Preço = prices[prazo] × quantidade_kit
   *    - prices contém valores TOTAIS do kit por prazo
   *    - NÃO multiplicar por quantidade interna
   * 
   * @param item - Item do carrinho (com prices por prazo)
   * @param priceType - Tipo de prazo selecionado (estado global)
   * @returns Preço calculado conforme regra de negócio
   */
  const calculateCartItemPrice = useCallback((
    item: CartItem,
    priceType: PriceType
  ): number => {
    // REGRA: Usar prices do item (já contém valores corretos por prazo)
    const price = item.prices[priceType] || 0;
    
    if (item.type === 'KIT') {
      // REGRA: Para kits, multiplicar pelo quantidade_kit (não quantity)
      const quantidade = item.quantidade_kit || item.quantity || 1;
      return price * quantidade;
    } else {
      // REGRA: Para produtos unitários, multiplicar pelo quantity
      return price * item.quantity;
    }
  }, []);
  
  /**
   * Função para obter preços por prazo de um produto
   * Usada ao adicionar item ao carrinho para salvar prices
   * 
   * @param product - Produto do backend
   * @param isKit - Se é kit
   * @returns Preços por prazo
   */
  const getProductPrices = useCallback((
    product: Product,
    isKit: boolean
  ): ItemPrices => {
    if (isKit) {
      // REGRA: Para kits, buscar valores totais do kit
      if (product.kits && product.codigo) {
        const kit = product.kits.find(k => k.codigo === product.codigo);
        if (kit) {
          return {
            avista: kit.valor_total_avista,
            dias30: kit.valor_total_30,
            dias90: kit.valor_total_60,
          };
        }
      }
      
      // Se produto foi convertido (ProductModal), valores totais já estão em avista/30_dias/60_dias
      if (product.cod_kit !== null) {
        return {
          avista: product.avista || 0,
          dias30: product['30_dias'] || 0,
          dias90: product['60_dias'] || 0,
        };
      }
      
      // Fallback: usar valor_total se disponível
      return {
        avista: product.avista || 0,
        dias30: product['30_dias'] || 0,
        dias90: product['60_dias'] || 0,
      };
    } else {
      // REGRA: Para produtos unitários, usar preços unitários
      return {
        avista: product.avista || product.valor_base || 0,
        dias30: product['30_dias'] || product.valor_base || 0,
        dias90: product['60_dias'] || product.valor_base || 0,
      };
    }
  }, []);
  
  /**
   * Função LEGACY para calcular preço (mantida para compatibilidade durante migração)
   * @deprecated Usar calculateCartItemPrice com prices do item
   */
  const calculateCartItemPriceLegacy = useCallback((
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
        // REGRA OBRIGATÓRIA: Obter preços por prazo (não preço final)
        const prices = getProductPrices(product, isKit);
        
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
          // REGRA OBRIGATÓRIA: Salvar prices por prazo (não preço final)
          prices,
          // REGRA OBRIGATÓRIA: type é obrigatório
          type: isKit ? 'KIT' : 'UNIT',
          // REGRA: quantity sempre representa quantidade de unidades (UNIT) ou quantidade de kits (KIT)
          quantity: isKit ? quantity : quantity,
        };

        // Adicionar campos específicos de kit
        if (isKit) {
          baseItem.codigo = product.codigo;
          baseItem.quantidade_kit = quantity; // Quantidade de kits adicionados
          baseItem.quantidade_itens_por_kit = product.quantidade || 1; // Quantidade de itens por kit (apenas informativo)
        }

        return [...prev, baseItem];
      }
    });
    setIsDrawerOpen(true);
  }, [getProductPrices]);

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
   * REGRA OBRIGATÓRIA: priceType é estado GLOBAL, não por item
   * Esta função apenas atualiza o estado global, não recalcula preços
   * (preços já estão salvos em prices por prazo)
   */
  const updateAllItemsPriceType = useCallback((newPriceType: PriceType, allProducts: Product[]) => {
    // REGRA: Apenas atualizar estado global
    setPriceType(newPriceType);
    
    // REGRA: Se algum item não tem prices (migração pendente), atualizar prices
    setItems(prev =>
      prev.map(item => {
        // Se item já tem prices, não precisa fazer nada
        if (item.prices && item.type) {
          return item;
        }
        
        // Migrar item que ainda não tem prices
        const product = allProducts.find(p => p.id_produto === item.productId);
        if (product) {
          const isKit = item.type === 'KIT';
          const prices = getProductPrices(product, isKit);
          return {
            ...item,
            prices,
            type: item.type || (isKit ? 'KIT' : 'UNIT'),
          };
        }
        return item;
      })
    );
  }, [getProductPrices]);

  /**
   * Função central de cálculo do total do carrinho
   * REGRA DE NEGÓCIO:
   * - KIT: prices[prazo] * quantidade_kit (não multiplicar pela quantidade de itens por kit)
   * - UNIT: prices[prazo] * quantity
   * - Sempre recalcula do zero quando items ou priceType mudam (reatividade garantida por useMemo)
   */
  const calculateCartTotal = useCallback((cartItems: CartItem[], currentPriceType: PriceType): number => {
    return cartItems.reduce((total, item) => {
      // REGRA: Usar calculateCartItemPrice que já considera type e quantidade correta
      return total + calculateCartItemPrice(item, currentPriceType);
    }, 0);
  }, [calculateCartItemPrice]);

  const getTotalPrice = useMemo(() => {
    return calculateCartTotal(items, priceType);
  }, [items, priceType, calculateCartTotal]);

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
      
      // REGRA: Usar prices do item com priceType do checkoutData
      const unitPrice = item.prices[checkoutData.paymentType] || 0;
      
      if (item.type === 'KIT') {
        message += `   Tipo: Kit\n`;
        message += `   Código do kit: ${item.codigo || 'N/A'}\n`;
        const quantidade = item.quantidade_kit || item.quantity || 1;
        message += `   Quantidade de kits: ${quantidade}\n`;
        message += `   Itens por kit: ${item.quantidade_itens_por_kit || 1}\n`;
        // Calcular total de unidades: quantidade_kit * quantidade_itens_por_kit
        const totalUnidades = quantidade * (item.quantidade_itens_por_kit || 1);
        message += `   Total de unidades: ${totalUnidades}\n`;
        message += `   Valor total do kit: R$ ${unitPrice.toFixed(2)}\n`;
        // REGRA: Subtotal = prices[prazo] * quantidade_kit
        const subtotal = unitPrice * quantidade;
        message += `   Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
      } else {
        message += `   Tipo: Produto unitário\n`;
        message += `   Tamanho: ${item.size}\n`;
        message += `   Quantidade: ${item.quantity}\n`;
        message += `   Preço unitário: R$ ${unitPrice.toFixed(2)}\n`;
        // REGRA: Subtotal = prices[prazo] * quantity
        message += `   Subtotal: R$ ${(unitPrice * item.quantity).toFixed(2)}\n\n`;
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
