import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const ORDER_STATUS_VALUES = [
  'pendente',
  'confirmado',
  'em_preparacao',
  'enviado',
  'concluido',
  'cancelado',
] as const;

export type OrderStatusValue = (typeof ORDER_STATUS_VALUES)[number];

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  pendente: {
    label: 'Pendente',
    className: 'border-amber-500/30 bg-amber-500/15 text-amber-900 dark:text-amber-100',
  },
  confirmado: {
    label: 'Confirmado',
    className: 'border-blue-500/30 bg-blue-500/15 text-blue-900 dark:text-blue-100',
  },
  em_preparacao: {
    label: 'Em preparação',
    className: 'border-violet-500/30 bg-violet-500/15 text-violet-900 dark:text-violet-100',
  },
  enviado: {
    label: 'Enviado',
    className: 'border-orange-500/30 bg-orange-500/15 text-orange-900 dark:text-orange-100',
  },
  concluido: {
    label: 'Concluído',
    className: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-900 dark:text-emerald-100',
  },
  cancelado: {
    label: 'Cancelado',
    className: 'border-red-500/30 bg-red-500/15 text-red-900 dark:text-red-100',
  },
};

interface OrderStatusBadgeProps {
  status: string;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const key = (status || '').toLowerCase().trim();
  const config = STATUS_STYLES[key] ?? {
    label: status || '—',
    className: 'border-muted bg-muted/50 text-muted-foreground',
  };

  return (
    <Badge variant="outline" className={cn('font-medium', config.className, className)}>
      {config.label}
    </Badge>
  );
}
