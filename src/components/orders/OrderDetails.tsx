import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { OrderResponse } from '@/services/order/OrderService';
import { formatCurrency } from '@/utils/format';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderResponse | null;
  loading: boolean;
  error: string | null;
}

export function OrderDetails({ open, onOpenChange, order, loading, error }: OrderDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2">
            {order ? (
              <>
                Pedido #{order.id}
                <OrderStatusBadge status={order.status} />
              </>
            ) : (
              'Detalhes do pedido'
            )}
          </DialogTitle>
          <DialogDescription>
            Itens e valores conforme registrado no sistema.
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="space-y-3 py-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {!loading && error && (
          <p className="text-sm text-destructive py-4">{error}</p>
        )}

        {!loading && !error && order && (
          <div className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead className="text-right w-20">Qtd</TableHead>
                    <TableHead className="text-right">Unit.</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(order.itens?.length ?? 0) === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhum item retornado para este pedido.
                      </TableCell>
                    </TableRow>
                  ) : (
                    order.itens!.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.nome ?? `Produto #${item.id_produto}`}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {item.codigo ?? item.id_produto}
                        </TableCell>
                        <TableCell className="text-right">{item.quantidade}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(item.preco_unitario)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-medium">
                          {formatCurrency(item.subtotal)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-base">
              <span className="text-muted-foreground">Valor total</span>
              <span className="text-lg font-semibold tabular-nums">
                {formatCurrency(order.valor_total)}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
