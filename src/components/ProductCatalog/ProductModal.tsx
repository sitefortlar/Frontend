
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Package, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType, quantity?: number) => void;
}

export const ProductModal = ({ product, isOpen, onClose, priceType, onAddToCart }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);
  const [unitQuantity, setUnitQuantity] = useState(1);
  const [kit6Quantity, setKit6Quantity] = useState(1);
  const [kit12Quantity, setKit12Quantity] = useState(1);
  const [kit20Quantity, setKit20Quantity] = useState(1);

  const handleAddUnit = () => {
    onAddToCart?.(product, selectedSize, 'vista', unitQuantity);
  };

  const handleAddKit = (kitSize: number, quantity: number) => {
    // Create a kit version of the product
    const kitProduct = {
      ...product,
      name: `${product.name} - Kit ${kitSize} Unidades`,
      prices: {
        vista: product.prices.vista * kitSize * 0.85,
        dias30: product.prices.dias30 * kitSize * 0.85,
        dias90: product.prices.dias90 * kitSize * 0.85,
      }
    };
    onAddToCart?.(kitProduct, selectedSize, 'vista', quantity);
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
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=320&fit=crop"
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
            {/* Unit Purchase */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1 Unidade</h3>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
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

                {/* Size Selection */}
                <div className="space-y-2 mb-4">
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

                {/* Quantity Controls for Unit */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setUnitQuantity(Math.max(1, unitQuantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{unitQuantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setUnitQuantity(unitQuantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleAddUnit}
                  className="w-full gap-2 bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>

            {/* Kits Available */}
            {product.isKit && (
              <div className="space-y-4">
                <Separator />
                <h3 className="text-lg font-semibold">Kits Disponíveis</h3>
                
                {/* Kit 6 Unidades */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">6 Unidades</div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-green-600 font-medium">À vista</div>
                      <div className="text-lg font-bold text-green-600">
                        R$ {(product.prices.vista * 6 * 0.85).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">30 dias</div>
                      <div className="text-lg font-semibold">
                        R$ {(product.prices.dias30 * 6 * 0.85).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">90 dias</div>
                      <div className="text-lg font-semibold">
                        R$ {(product.prices.dias90 * 6 * 0.85).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setKit6Quantity(Math.max(1, kit6Quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{kit6Quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setKit6Quantity(kit6Quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleAddKit(6, kit6Quantity)}
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>
                </div>

                {/* Kit 12 Unidades */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-600 text-white">Mais Vendido</Badge>
                    <div className="text-sm font-medium">12 Unidades</div>
                  </div>
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
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setKit12Quantity(Math.max(1, kit12Quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{kit12Quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setKit12Quantity(kit12Quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleAddKit(12, kit12Quantity)}
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>
                </div>

                {/* Kit 20 Unidades */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">20 Unidades</div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-green-600 font-medium">À vista</div>
                      <div className="text-lg font-bold text-green-600">
                        R$ {(product.prices.vista * 20 * 0.85).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">30 dias</div>
                      <div className="text-lg font-semibold">
                        R$ {(product.prices.dias30 * 20 * 0.85).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">90 dias</div>
                      <div className="text-lg font-semibold">
                        R$ {(product.prices.dias90 * 20 * 0.85).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setKit20Quantity(Math.max(1, kit20Quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{kit20Quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setKit20Quantity(kit20Quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleAddKit(20, kit20Quantity)}
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
