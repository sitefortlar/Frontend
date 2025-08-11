
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
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto glass border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Image - Smaller column */}
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gradient-glass rounded-lg overflow-hidden border border-border/20">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"
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

            {/* Product info */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Informações do Produto</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Categoria: {product.category.replace('-', ' ')}
              </p>
              <p className="text-sm text-muted-foreground">
                Tamanhos disponíveis: {product.sizes.join(', ')}
              </p>
            </div>
          </div>

          {/* Product Details - Larger columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Unit Purchase */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Compra Unitária</h3>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600 font-medium">À vista</div>
                    <div className="text-xl font-bold text-green-600">
                      R$ {product.prices.vista.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-muted-foreground">30 dias</div>
                    <div className="text-xl font-semibold">
                      R$ {product.prices.dias30.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-muted-foreground">90 dias</div>
                    <div className="text-xl font-semibold">
                      R$ {product.prices.dias90.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Litragem:</label>
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

                  <div>
                    <label className="text-sm font-medium block mb-2">Quantidade:</label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setUnitQuantity(Math.max(1, unitQuantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{unitQuantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setUnitQuantity(unitQuantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleAddUnit}
                  className="w-full mt-4 gap-2 bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>

            {/* Kits Available */}
            {product.isKit && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Kits Disponíveis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Kit 6 Unidades */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <Badge variant="outline" className="mb-2">6 Unidades</Badge>
                      <div className="space-y-1">
                        <div className="text-sm text-green-600 font-medium">À vista</div>
                        <div className="text-lg font-bold text-green-600">
                          R$ {(product.prices.vista * 6 * 0.85).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          30d: R$ {(product.prices.dias30 * 6 * 0.85).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          90d: R$ {(product.prices.dias90 * 6 * 0.85).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
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

                    <Button 
                      onClick={() => handleAddKit(6, kit6Quantity)}
                      className="w-full gap-2 bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Adicionar
                    </Button>
                  </div>

                  {/* Kit 12 Unidades */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <Badge className="bg-blue-600 text-white mb-2">Mais Vendido - 12 Unidades</Badge>
                      <div className="space-y-1">
                        <div className="text-sm text-green-600 font-medium">À vista</div>
                        <div className="text-lg font-bold text-green-600">
                          R$ {(product.prices.vista * 12 * 0.85).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          30d: R$ {(product.prices.dias30 * 12 * 0.85).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          90d: R$ {(product.prices.dias90 * 12 * 0.85).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
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

                    <Button 
                      onClick={() => handleAddKit(12, kit12Quantity)}
                      className="w-full gap-2 bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Adicionar
                    </Button>
                  </div>

                  {/* Kit 20 Unidades */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <Badge variant="outline" className="mb-2">20 Unidades</Badge>
                      <div className="space-y-1">
                        <div className="text-sm text-green-600 font-medium">À vista</div>
                        <div className="text-lg font-bold text-green-600">
                          R$ {(product.prices.vista * 20 * 0.85).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          30d: R$ {(product.prices.dias30 * 20 * 0.85).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          90d: R$ {(product.prices.dias90 * 20 * 0.85).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
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

                    <Button 
                      onClick={() => handleAddKit(20, kit20Quantity)}
                      className="w-full gap-2 bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Adicionar
                    </Button>
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
