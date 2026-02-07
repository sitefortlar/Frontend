import { memo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
  className?: string;
}

/**
 * Componente de botão flutuante do carrinho com badge de quantidade.
 * Otimizado com React.memo para evitar re-renderizações desnecessárias.
 */
export const CartButton = memo(({ itemCount, onClick, className }: CartButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-5 right-5 z-50 h-16 w-16 rounded-full shadow-xl border-2 border-primary-foreground/20",
        "bg-primary hover:bg-primary/90 text-primary-foreground",
        "transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      size="icon"
      aria-label={`Carrinho de compras com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
    >
      <ShoppingCart className="h-8 w-8" strokeWidth={2.5} />
      {itemCount > 0 && (
        <Badge
          className="absolute -top-1 -right-1 min-w-[28px] h-7 px-1.5 rounded-full flex items-center justify-center text-sm font-bold bg-destructive text-destructive-foreground border-2 border-background shadow-md"
          aria-label={`${itemCount} itens no carrinho`}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
});

CartButton.displayName = 'CartButton';
