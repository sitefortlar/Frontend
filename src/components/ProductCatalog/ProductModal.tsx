import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Package, DollarSign, Ruler, ShoppingCart } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import * as LucideIcons from 'lucide-react';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType) => void;
}

export const ProductModal = ({ product, isOpen, onClose, priceType, onAddToCart }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);
  const [selectedPriceType, setSelectedPriceType] = useState<PriceType>(priceType);

  const IconComponent = (LucideIcons as any)[product.icon] || LucideIcons.Package;

  const priceLabels = {
    vista: 'À vista',
    dias30: '30 dias',
    dias90: '90 dias',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass border-0">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-glass rounded-full flex items-center justify-center shadow-soft flex-shrink-0 overflow-hidden border border-border/20">
              <img 
                src={product.images[0] || `/api/placeholder/80/80`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-left text-primary">
                {product.name}
              </DialogTitle>
              {product.isKit && (
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mt-2">
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
              <Ruler className="h-4 w-4 text-primary" />
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
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Preços</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(product.prices).map(([type, price]) => (
                <div
                  key={type}
                  className="p-4 rounded-lg border border-border bg-muted/50"
                >
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">
                      {priceLabels[type as PriceType]}
                    </div>
                    <div className="text-xl font-bold text-primary">
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

          {/* Cart Section */}
          <div className="space-y-4 bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Adicionar ao Carrinho</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Forma de Pagamento</label>
                <Select value={selectedPriceType} onValueChange={(value: PriceType) => setSelectedPriceType(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vista">À vista - R$ {product.prices.vista.toFixed(2)}</SelectItem>
                    <SelectItem value="dias30">30 dias - R$ {product.prices.dias30.toFixed(2)}</SelectItem>
                    <SelectItem value="dias90">90 dias - R$ {product.prices.dias90.toFixed(2)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={() => onAddToCart?.(product, selectedSize, selectedPriceType)}
                  className="w-full gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};