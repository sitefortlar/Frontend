import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderDetails } from '@/components/orders/OrderDetails';
import { paths } from '@/routes/paths';

/** Aceita id numérico ou string numérica vinda da API (ex.: id_empresa como string). */
function parseClienteId(value: unknown): number | null {
  if (value == null || value === '') return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const n = Number(value.trim());
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function ListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[1, 2, 3, 4].map((k) => (
        <Card key={k}>
          <CardContent className="pt-6 space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-16 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-40" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: guardLoading } = useAuthGuard();
  const { user, isLoading: authLoading, refreshUser } = useAuthContext();

  const {
    orders,
    listLoading,
    listError,
    fetchMyOrders,
    orderDetail,
    detailLoading,
    detailError,
    fetchOrderDetail,
    clearDetail,
    reorderingId,
    reorder,
  } = useOrders();

  const [detailOpen, setDetailOpen] = useState(false);

  const clienteId = useMemo(() => {
    const fromCompany = user?.company?.id_empresa;
    const fromCompanyParsed = parseClienteId(fromCompany);
    if (fromCompanyParsed != null) return fromCompanyParsed;
    return parseClienteId(user?.id);
  }, [user]);

  // Se o token existe mas a empresa ainda não veio, tenta recarregar uma vez (corrige 1º acesso).
  const [companyRefetchDone, setCompanyRefetchDone] = useState(false);
  useEffect(() => {
    if (authLoading || guardLoading || !user) return;
    if (user.company != null) return;
    if (companyRefetchDone) return;
    setCompanyRefetchDone(true);
    void refreshUser();
  }, [authLoading, guardLoading, user, companyRefetchDone, refreshUser]);

  useEffect(() => {
    if (!isAuthenticated || authLoading || guardLoading) return;
    if (!user) return;
    if (clienteId == null) return;
    fetchMyOrders(clienteId);
  }, [isAuthenticated, authLoading, guardLoading, user, clienteId, fetchMyOrders]);

  const handleOpenDetails = async (orderId: number) => {
    setDetailOpen(true);
    await fetchOrderDetail(orderId);
  };

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) {
      clearDetail();
    }
  };

  const handleReorder = async (orderId: number) => {
    if (clienteId == null) return;
    try {
      await reorder(orderId);
      toast({
        title: 'Pedido replicado',
        description: 'Seu novo pedido foi gerado com sucesso.',
      });
      await fetchMyOrders(clienteId);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Não foi possível repetir o pedido.';
      toast({
        title: 'Erro ao comprar novamente',
        description: message,
        variant: 'destructive',
      });
    }
  };

  if (guardLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(paths.catalog)} className="shrink-0 mt-0.5">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <ClipboardList className="h-7 w-7 md:h-8 md:w-8" />
                Meus pedidos
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Acompanhe seus pedidos e repita compras anteriores.
              </p>
            </div>
          </div>
        </div>

        {clienteId == null && (
          <Card className="border-destructive/40">
            <CardContent className="py-10 text-center text-muted-foreground">
              Não foi possível identificar sua empresa para listar os pedidos. Tente sair e entrar novamente.
            </CardContent>
          </Card>
        )}

        {clienteId != null && listError && (
          <Card className="border-destructive/40">
            <CardContent className="py-10 text-center">
              <p className="text-destructive font-medium">Algo deu errado</p>
              <p className="text-muted-foreground text-sm mt-2">{listError}</p>
              <Button className="mt-4" variant="outline" onClick={() => fetchMyOrders(clienteId)}>
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        )}

        {clienteId != null && listLoading && orders.length === 0 && !listError && <ListSkeleton />}

        {clienteId != null && !listLoading && !listError && orders.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <ClipboardList className="h-14 w-14 mx-auto text-muted-foreground mb-4 opacity-60" />
              <p className="text-lg font-medium">Você ainda não fez pedidos</p>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
                Quando você finalizar um pedido no catálogo, ele aparecerá aqui.
              </p>
              <Button className="mt-6" onClick={() => navigate(paths.catalog)}>
                Ir ao catálogo
              </Button>
            </CardContent>
          </Card>
        )}

        {clienteId != null && orders.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={() => handleOpenDetails(order.id)}
                onReorder={() => handleReorder(order.id)}
                reordering={reorderingId === order.id}
              />
            ))}
          </div>
        )}
      </div>

      <OrderDetails
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        order={orderDetail}
        loading={detailLoading}
        error={detailError}
      />
    </div>
  );
}
