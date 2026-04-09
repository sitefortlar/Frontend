import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AdminRoute } from '@/components/AdminRoute';
import { OrderDetails } from '@/components/orders/OrderDetails';
import { OrderStatusBadge, ORDER_STATUS_VALUES } from '@/components/orders/OrderStatusBadge';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { paths } from '@/routes/paths';

const ALL_VALUE = '__all__';

export default function OrdersAdminPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    orders,
    listLoading,
    listError,
    fetchAllOrders,
    orderDetail,
    detailLoading,
    detailError,
    fetchOrderDetail,
    clearDetail,
    reorderingId,
    reorder,
  } = useOrders();

  const [statusFilter, setStatusFilter] = useState<string>(ALL_VALUE);
  const [clienteFilter, setClienteFilter] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);

  const load = async () => {
    await fetchAllOrders({
      skip: 0,
      limit: 500,
      status: statusFilter === ALL_VALUE ? undefined : statusFilter,
      cliente_id:
        clienteFilter.trim() !== '' && !Number.isNaN(Number(clienteFilter))
          ? Number(clienteFilter)
          : undefined,
    });
  };

  useEffect(() => {
    fetchAllOrders({ skip: 0, limit: 500 });
  }, [fetchAllOrders]);

  const handleOpenDetails = async (orderId: number) => {
    setDetailOpen(true);
    await fetchOrderDetail(orderId);
  };

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) clearDetail();
  };

  const handleReorder = async (orderId: number) => {
    try {
      await reorder(orderId);
      toast({
        title: 'Pedido replicado',
        description: 'O pedido foi duplicado com sucesso.',
      });
      await load();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Não foi possível repetir o pedido.';
      toast({
        title: 'Erro',
        description: message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminRoute>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0 mt-0.5">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <ClipboardList className="h-7 w-7" />
                Todos os pedidos
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Lista geral com filtros por status e cliente.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-full sm:w-52">
                <Label className="mb-1.5 block">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_VALUE}>Todos</SelectItem>
                    {ORDER_STATUS_VALUES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Label className="mb-1.5 block">ID do cliente</Label>
                <Input
                  inputMode="numeric"
                  placeholder="Opcional"
                  value={clienteFilter}
                  onChange={(e) => setClienteFilter(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <Button type="button" variant="secondary" onClick={load} disabled={listLoading}>
                {listLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Aplicar
              </Button>
            </div>
          </CardContent>
        </Card>

        {listError && (
          <Card className="border-destructive/40">
            <CardContent className="py-8 text-center">
              <p className="text-destructive font-medium">{listError}</p>
              <Button className="mt-4" variant="outline" onClick={load}>
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        )}

        {!listError && (
          <Card>
            <div className="overflow-x-auto p-2 md:p-4">
              {listLoading && orders.length === 0 ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : orders.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  Nenhum pedido encontrado com os filtros atuais.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right w-[200px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-medium">#{o.id}</TableCell>
                        <TableCell>{o.id_cliente}</TableCell>
                        <TableCell>
                          <OrderStatusBadge status={o.status} />
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(o.valor_total)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {formatDateTime(o.data_pedido || o.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-wrap justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenDetails(o.id)}
                            >
                              Ver detalhes
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              disabled={reorderingId === o.id}
                              onClick={() => handleReorder(o.id)}
                            >
                              {reorderingId === o.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Comprar novamente'
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Card>
        )}
      </div>

      <OrderDetails
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        order={orderDetail}
        loading={detailLoading}
        error={detailError}
      />
    </AdminRoute>
  );
}
