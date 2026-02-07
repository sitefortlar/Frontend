import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartHeaderProps {
  onClose: () => void;
  itemCount: number;
}

export const CartHeader = ({ onClose, itemCount }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Carrinho</h2>
        <p className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'itens'}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-10 w-10 rounded-full border border-border hover:bg-muted shrink-0"
        aria-label="Fechar carrinho"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};
