// Base cart item fields
interface BaseCartItem {
  id: string;
  name: string;
  image: string;
  priceType: 'avista' | 'dias30' | 'dias90';
  price: number;
  quantity: number;
}

// Unit product cart item
export interface UnitProductCartItem extends BaseCartItem {
  type: 'UNITARIO';
  productId: number; // id_produto do backend
  codigo_produto: string;
  size: string;
}

// Kit cart item
export interface KitCartItem extends BaseCartItem {
  type: 'KIT';
  id_kit: number; // id_produto do kit
  codigo_kit: string;
  quantidade_kit: number; // quantidade de unidades no kit
}

// Union type for cart items
export type CartItem = UnitProductCartItem | KitCartItem;

export interface CheckoutData {
  name: string;
  cnpj: string;
  whatsapp: string;
  email: string;
  paymentType: 'avista' | 'dias30' | 'dias90';
}