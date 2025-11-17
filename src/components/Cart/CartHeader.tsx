import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartHeaderProps {
  onClose: () => void;
  itemCount: number;
}

export const CartHeader = ({ onClose, itemCount }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-border/20">
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
        className="h-8 w-8"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
