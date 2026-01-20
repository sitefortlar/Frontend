/**
 * Estrutura de preços por prazo
 * REGRA: Todo item deve ter preços para todos os prazos disponíveis
 */
export interface ItemPrices {
  avista: number;
  dias30: number;
  dias90: number;
}

/**
 * Item do carrinho - Estrutura autossuficiente
 * 
 * REGRAS OBRIGATÓRIAS:
 * 1. NÃO salva price final (sempre calculado dinamicamente)
 * 2. Salva prices por prazo (avista, dias30, dias90)
 * 3. type é obrigatório: "UNIT" | "KIT"
 * 4. quantity sempre representa quantidade de unidades (para UNIT) ou quantidade de kits (para KIT)
 */
export interface CartItem {
  id: string;
  productId: number; // id_produto do backend
  name: string;
  image: string;
  size: string;
  quantity: number;
  
  // REGRA OBRIGATÓRIA: Preços por prazo (não preço final)
  prices: ItemPrices;
  
  // REGRA OBRIGATÓRIA: Tipo do item (obrigatório)
  type: 'UNIT' | 'KIT';
  
  // Campos específicos para kits
  codigo?: string; // Código do kit (quando type === 'KIT')
  quantidade_kit?: number; // Quantidade de kits (apenas para KIT, quando quantity representa unidades)
  quantidade_itens_por_kit?: number; // Quantidade de itens por kit (apenas informativo)
  
  // DEPRECATED: Campos mantidos apenas para compatibilidade com migração
  // Não devem ser usados em nova lógica
  priceType?: 'avista' | 'dias30' | 'dias90'; // DEPRECATED - usar priceType global do carrinho
  price?: number; // DEPRECATED - usar prices[priceType] calculado dinamicamente
  valor_total?: number; // DEPRECATED - usar prices para kits
}

export interface CheckoutData {
  name: string;
  cnpj: string;
  whatsapp: string;
  email: string;
  paymentType: 'avista' | 'dias30' | 'dias90';
}