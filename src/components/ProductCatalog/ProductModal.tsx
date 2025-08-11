
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Package, ShoppingCart, Info } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';

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

  const priceLabels = {
    vista: 'À vista',
    dias30: '30 dias',
    dias90: '90 dias',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="w-full h-80 bg-gradient-glass rounded-lg overflow-hidden border border-border/20">
              <img 
                src={product.images[0] || `/api/placeholder/400/320`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.isKit && (
              <Badge className="w-fit bg-primary text-primary-foreground">
                <Package className="h-4 w-4 mr-2" />
                Kit Completo
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Payment Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Formas de Pagamento:</span>
              </div>
              <p className="text-sm text-blue-600">
                À vista, 30 dias, 90 dias. Selecione sua opção no carrinho.
              </p>
            </div>

            {/* Unit Purchase */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Comprar por Unidade</h3>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm font-medium mb-3">1 Unidade</div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-green-600 font-medium">À vista</div>
                    <div className="text-lg font-bold text-green-600">
                      R$ {product.prices.vista.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">30 dias</div>
                    <div className="text-lg font-semibold">
                      R$ {product.prices.dias30.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">90 dias</div>
                    <div className="text-lg font-semibold">
                      R$ {product.prices.dias90.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Litragem:</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
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

              <Button 
                onClick={() => onAddToCart?.(product, selectedSize, selectedPriceType)}
                className="w-full gap-2 bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Kits Available */}
            {product.isKit && (
              <div className="space-y-4">
                <Separator />
                <h3 className="text-lg font-semibold">Kits Disponíveis</h3>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">Kit Popular (12 un):</div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-green-600 font-medium">À vista</div>
                      <div className="text-lg font-bold text-green-600">
                        R$ {(product.prices.vista * 12 * 0.85).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">30 dias</div>
                      <div className="text-lg font-semibold">
                        R$ {(product.prices.dias30 * 12 * 0.85).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">90 dias</div>
                      <div className="text-lg font-semibold">
                        R$ {(product.prices.dias90 * 12 * 0.85).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    3 opções de kit disponíveis
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
