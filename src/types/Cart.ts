export interface CartItem {
  id: string;
  productId: number; // id_produto do backend
  name: string;
  image: string;
  size: string;
  priceType: 'avista' | 'dias30' | 'dias90';
  price: number;
  quantity: number;
  // Campos específicos para kits
  type?: 'UNIT' | 'KIT';
  codigo?: string; // Código do kit (quando type === 'KIT')
  quantidade_kit?: number; // Quantidade de kits (não unidades)
  quantidade_itens_por_kit?: number; // Quantidade de itens por kit
  valor_total?: number; // Valor total do kit (já calculado pela API)
}

export interface CheckoutData {
  name: string;
  cnpj: string;
  whatsapp: string;
  email: string;
  paymentType: 'avista' | 'dias30' | 'dias90';
}