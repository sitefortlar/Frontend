import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Loader2, Package, RefreshCw } from 'lucide-react';
import type { OrderResponse } from '@/services/order/OrderService';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderCardProps {
  order: OrderResponse;
  onViewDetails: () => void;
  onReorder: () => void;
  reordering: boolean;
}

function itemCountLabel(order: OrderResponse): string {
  if (typeof order.quantidade_itens === 'number') {
    return String(order.quantidade_itens);
  }
  if (order.itens && order.itens.length > 0) {
    return String(order.itens.length);
  }
  return '—';
}

export function OrderCard({ order, onViewDetails, onReorder, reordering }: OrderCardProps) {
  const dateRef = order.data_pedido || order.created_at;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="font-semibold text-lg">#{order.id}</span>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          {dateRef ? formatDateTime(dateRef) : 'Data não informada'}
        </p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Valor total</p>
            <p className="font-semibold tabular-nums">{formatCurrency(order.valor_total)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Itens</p>
            <p className="font-medium">{itemCountLabel(order)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t bg-muted/30 pt-3">
        <Button variant="secondary" size="sm" onClick={onViewDetails}>
          Ver detalhes
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReorder}
          disabled={reordering}
        >
          {reordering ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processando…
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Comprar novamente
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
