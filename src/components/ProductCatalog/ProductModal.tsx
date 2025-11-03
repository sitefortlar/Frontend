
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import { convertDriveUrlToImage } from '@/utils/imageUtils';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType, quantity?: number) => void;
}

export const ProductModal = ({ product, isOpen, onClose, priceType, onAddToCart }: ProductModalProps) => {
  const [unitQuantity, setUnitQuantity] = useState(1);
  // Estado para quantidades dos kits (usando id_produto como key)
  const [kitQuantities, setKitQuantities] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    product.kits?.forEach(kit => {
      initial[kit.id_produto] = 1;
    });
    return initial;
  });

  const handleAddKit = (kit: Product, quantity: number) => {
    onAddToCart?.(kit, '', priceType, quantity);
  };

  const updateKitQuantity = (kitId: number, delta: number) => {
    setKitQuantities(prev => ({
      ...prev,
      [kitId]: Math.max(1, (prev[kitId] || 1) + delta)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto glass border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            {product.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Image - Smaller column */}
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gradient-glass rounded-lg overflow-hidden border border-border/20">
              <img 
                src={product.imagens && product.imagens.length > 0 
                  ? convertDriveUrlToImage(product.imagens[0])
                  : "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"}
                alt={product.nome}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.kits && product.kits.length > 0 && (
              <Badge className="w-fit bg-primary text-primary-foreground">
                <Package className="h-4 w-4 mr-2" />
                {product.kits.length} Kit{product.kits.length > 1 ? 's' : ''} disponível{product.kits.length > 1 ? 'eis' : ''}
              </Badge>
            )}

            {/* Product info */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Informações do Produto</h4>
              {product.descricao && (
                <p className="text-sm text-muted-foreground">
                  {product.descricao}
                </p>
              )}
            </div>
          </div>

          {/* Product Details - Larger columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Prices */}
            {(product.avista !== undefined || product['30_dias'] !== undefined || product['60_dias'] !== undefined) && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Preços</h3>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.avista !== undefined && (
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600 font-medium">À vista</div>
                        <div className="text-2xl font-bold text-green-600">
                          R$ {product.avista.toFixed(2)}
                        </div>
                      </div>
                    )}
                    {product['30_dias'] !== undefined && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-sm text-muted-foreground">30 dias</div>
                        <div className="text-2xl font-semibold">
                          R$ {product['30_dias'].toFixed(2)}
                        </div>
                      </div>
                    )}
                    {product['60_dias'] !== undefined && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-sm text-muted-foreground">60 dias</div>
                        <div className="text-2xl font-semibold">
                          R$ {product['60_dias'].toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Unit Purchase */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Compra Unitária</h3>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setUnitQuantity(Math.max(1, unitQuantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center text-2xl font-medium">{unitQuantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setUnitQuantity(unitQuantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {onAddToCart && (
                  <Button 
                    onClick={() => onAddToCart(product, '', priceType, unitQuantity)}
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>
                )}
              </div>
            </div>

            {/* Kits Available */}
            {product.kits && product.kits.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">Kits Disponíveis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.kits.map((kit) => (
                    <div key={kit.id_produto} className="bg-muted/30 rounded-lg p-4 border border-border/20">
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-blue-600 text-white">
                            {kit.quantidade || 1} Unidades
                          </Badge>
                          {kit.codigo && (
                            <span className="text-xs text-muted-foreground">Cód: {kit.codigo}</span>
                          )}
                        </div>
                        
                        {kit.descricao && (
                          <p className="text-sm text-muted-foreground mb-3">{kit.descricao}</p>
                        )}

                        {/* Kit Prices */}
                        <div className="space-y-1 mb-3">
                          {kit.avista !== undefined && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-green-600 font-medium">À vista:</span>
                              <span className="text-lg font-bold text-green-600">
                                R$ {kit.avista.toFixed(2)}
                              </span>
                            </div>
                          )}
                          {kit['30_dias'] !== undefined && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">30 dias:</span>
                              <span className="font-semibold">R$ {kit['30_dias'].toFixed(2)}</span>
                            </div>
                          )}
                          {kit['60_dias'] !== undefined && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">60 dias:</span>
                              <span className="font-semibold">R$ {kit['60_dias'].toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateKitQuantity(kit.id_produto, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {kitQuantities[kit.id_produto] || 1}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateKitQuantity(kit.id_produto, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Add Kit Button */}
                      {onAddToCart && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                          onClick={() => handleAddKit(kit, kitQuantities[kit.id_produto] || 1)}
                        >
                          <ShoppingCart className="h-3 w-3" />
                          Adicionar Kit
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
