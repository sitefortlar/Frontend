import { BaseService } from '../base/BaseService';

/**
 * Interface para item de order no request de envio por email
 */
export interface OrderItemRequest {
  id_produto: number;
  codigo: string;
  nome: string;
  quantidade_pedida: number;
  valor_unitario: number;
  valor_total: number;
  categoria?: string;
  subcategoria?: string;
}

/**
 * Interface para request de envio de order por email
 */
export interface SendOrderEmailRequest {
  company_id: number;
  forma_pagamento: "avista" | "30_dias" | "60_dias";
  itens: OrderItemRequest[];
}

/**
 * Interface para response de envio de order por email
 */
export interface SendOrderEmailResponse {
  message: string;
  email_enviado: string;
  valor_total: number;
  quantidade_itens: number;
  empresa: string;
  forma_pagamento: string;
}

/**
 * Interface para item de order na response
 */
export interface OrderItemResponse {
  id: number;
  id_produto: number;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

/**
 * Interface para response de order
 */
export interface OrderResponse {
  id: number;
  id_cliente: number;
  id_cupom?: number;
  data_pedido: string;
  status: string;
  valor_total: number;
  created_at: string;
  updated_at: string;
  itens?: OrderItemResponse[];
}

/**
 * Serviço de orders
 * Aplicando Single Responsibility Principle
 */
export class OrderService extends BaseService {
  constructor() {
    super('/orders');
  }

  /**
   * Lista orders com filtros opcionais
   */
  async listOrders(filters?: {
    skip?: number;
    limit?: number;
    cliente_id?: number;
    status?: string;
    cupom_id?: number;
    start_date?: string;
    end_date?: string;
    min_value?: number;
    max_value?: number;
  }): Promise<OrderResponse[]> {
    const queryString = this.buildQueryString(filters || {});
    const endpoint = queryString ? `?${queryString}` : '';
    
    return this.get<OrderResponse[]>(endpoint);
  }

  /**
   * Busca uma order por ID
   */
  async getOrder(orderId: number, includeItems: boolean = false): Promise<OrderResponse> {
    const queryString = this.buildQueryString({ include_items: includeItems });
    const endpoint = queryString ? `?${queryString}` : '';
    
    return this.get<OrderResponse>(`/${orderId}${endpoint}`);
  }

  /**
   * Lista orders de um cliente específico
   */
  async getOrdersByCliente(clienteId: number): Promise<OrderResponse[]> {
    return this.get<OrderResponse[]>(`/cliente/${clienteId}`);
  }

  /**
   * Lista orders por status
   */
  async getOrdersByStatus(status: string): Promise<OrderResponse[]> {
    return this.get<OrderResponse[]>(`/status/${status}`);
  }

  /**
   * Lista orders recentes
   */
  async getRecentOrders(days: number = 7): Promise<OrderResponse[]> {
    const queryString = this.buildQueryString({ days });
    
    return this.get<OrderResponse[]>(`/recentes?${queryString}`);
  }

  /**
   * Envia order por email
   */
  async sendOrderEmail(request: SendOrderEmailRequest): Promise<SendOrderEmailResponse> {
    return this.post<SendOrderEmailResponse>('/send-email', request);
  }
}

/**
 * Instância singleton do serviço de orders
 */
export const orderService = new OrderService();

