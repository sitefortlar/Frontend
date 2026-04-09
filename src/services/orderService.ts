import { orderService as orderServiceInstance } from '@/services/order/OrderService';
import type { OrderResponse, ReorderOrderResponse } from '@/services/order/OrderService';

export type OrderListFilters = NonNullable<Parameters<typeof orderServiceInstance.listOrders>[0]>;

export async function getMyOrders(clienteId: number): Promise<OrderResponse[]> {
  return orderServiceInstance.getOrdersByCliente(clienteId);
}

export async function getOrderById(id: number): Promise<OrderResponse> {
  return orderServiceInstance.getOrder(id, true);
}

export async function reorderOrder(id: number): Promise<ReorderOrderResponse> {
  return orderServiceInstance.reorderOrder(id);
}

export async function getAllOrders(filters?: OrderListFilters): Promise<OrderResponse[]> {
  return orderServiceInstance.listOrders(filters);
}
