export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  priceType: 'avista' | '2x' | '4x' | '10x';
  price: number;
  quantity: number;
}

export interface CheckoutData {
  name: string;
  cnpj: string;
  whatsapp: string;
  email: string;
  paymentType: 'avista' | '2x' | '4x' | '10x';
}