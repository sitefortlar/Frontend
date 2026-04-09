import { useState, useCallback } from 'react';
import {
  getMyOrders,
  getOrderById,
  reorderOrder,
  getAllOrders,
  type OrderResponse,
  type OrderListFilters,
  type ReorderOrderResponse,
} from '@/services/orderService';

export function useOrders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [orderDetail, setOrderDetail] = useState<OrderResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [reorderingId, setReorderingId] = useState<number | null>(null);

  const fetchMyOrders = useCallback(async (clienteId: number) => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getMyOrders(clienteId);
      setOrders(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Não foi possível carregar seus pedidos.';
      setListError(message);
      setOrders([]);
    } finally {
      setListLoading(false);
    }
  }, []);

  const fetchAllOrders = useCallback(async (filters?: OrderListFilters) => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getAllOrders(filters);
      setOrders(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Não foi possível carregar os pedidos.';
      setListError(message);
      setOrders([]);
    } finally {
      setListLoading(false);
    }
  }, []);

  const fetchOrderDetail = useCallback(async (id: number) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      const data = await getOrderById(id);
      setOrderDetail(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Não foi possível carregar o pedido.';
      setDetailError(message);
      setOrderDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const clearDetail = useCallback(() => {
    setOrderDetail(null);
    setDetailError(null);
  }, []);

  const reorder = useCallback(async (id: number): Promise<ReorderOrderResponse> => {
    setReorderingId(id);
    try {
      return await reorderOrder(id);
    } finally {
      setReorderingId(null);
    }
  }, []);

  return {
    orders,
    listLoading,
    listError,
    fetchMyOrders,
    fetchAllOrders,
    orderDetail,
    detailLoading,
    detailError,
    fetchOrderDetail,
    clearDetail,
    reorderingId,
    reorder,
  };
}
