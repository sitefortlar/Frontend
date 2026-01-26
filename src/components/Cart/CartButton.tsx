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
        "fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg",
        "bg-primary hover:bg-primary/90 text-primary-foreground",
        "transition-all duration-200 hover:scale-105",
        className
      )}
      size="icon"
      aria-label={`Carrinho de compras com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <Badge 
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground"
          aria-label={`${itemCount} itens no carrinho`}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
});

CartButton.displayName = 'CartButton';
