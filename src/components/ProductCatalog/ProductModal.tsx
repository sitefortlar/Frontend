import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Package, DollarSign, Ruler } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import * as LucideIcons from 'lucide-react';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  priceType: PriceType;
}

export const ProductModal = ({ product, isOpen, onClose, priceType }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);

  const IconComponent = (LucideIcons as any)[product.icon] || LucideIcons.Package;

  const priceLabels = {
    vista: 'À vista',
    dias30: '30 dias',
    dias90: '90 dias',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center shadow-soft flex-shrink-0">
              <IconComponent className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-left">
                {product.name}
              </DialogTitle>
              {product.isKit && (
                <Badge variant="secondary" className="bg-kitchen-gold/20 text-kitchen-copper border-kitchen-gold/30 mt-2">
                  <Package className="h-3 w-3 mr-1" />
                  Kit Completo
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-kitchen-copper" />
              <h3 className="font-semibold">Tamanho</h3>
            </div>
            
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-kitchen-copper" />
              <h3 className="font-semibold">Preços</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(product.prices).map(([type, price]) => (
                <div
                  key={type}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    type === priceType
                      ? 'border-kitchen-warm bg-kitchen-warm-light'
                      : 'border-border bg-muted/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">
                      {priceLabels[type as PriceType]}
                    </div>
                    <div className={`text-xl font-bold ${
                      type === priceType ? 'text-kitchen-copper' : 'text-foreground'
                    }`}>
                      R$ {price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Product Details */}
          <div className="space-y-3">
            <h3 className="font-semibold">Detalhes do Produto</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Categoria:</span>
                <div className="font-medium capitalize">
                  {product.category.replace('-', ' ')}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Linha:</span>
                <div className="font-medium capitalize">
                  {product.subcategory.replace('-', ' ')}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <div className="font-medium">
                  {product.isKit ? 'Kit Completo' : 'Produto Individual'}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Tamanhos:</span>
                <div className="font-medium">
                  {product.sizes.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fechar
            </Button>
            <Button variant="kitchen" className="flex-1">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};