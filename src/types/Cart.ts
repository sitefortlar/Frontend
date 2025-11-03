export interface CartItem {
  id: string;
  productId: number; // id_produto do backend
  name: string;
  image: string;
  size: string;
  priceType: 'avista' | 'dias30' | 'dias90';
  price: number;
  quantity: number;
}

export interface CheckoutData {
  name: string;
  cnpj: string;
  whatsapp: string;
  email: string;
  paymentType: 'avista' | 'dias30' | 'dias90';
}