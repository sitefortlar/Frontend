import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Package } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import { ProductModal } from './ProductModal';
import * as LucideIcons from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType) => void;
}

export const ProductCard = ({ product, priceType, onAddToCart }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const price = product.prices[priceType];
  const IconComponent = (LucideIcons as any)[product.icon] || LucideIcons.Package;

  const priceLabels = {
    vista: 'À vista',
    dias30: '30 dias',
    dias90: '90 dias',
  };

  return (
    <>
      <Card className="group hover:shadow-glass transition-glass transform hover:-translate-y-1 glass-light border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-glass rounded-full flex items-center justify-center shadow-soft overflow-hidden border border-border/20">
            <img 
              src={product.images[0] || `/api/placeholder/64/64`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-glass">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-3">
            {product.isKit && (
              <div className="flex justify-center">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  <Package className="h-3 w-3 mr-1" />
                  Kit
                </Badge>
              </div>
            )}

            {/* Preços */}
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground">À vista</div>
                  <div className="text-sm font-bold text-primary">
                    R$ {product.prices.vista.toFixed(2)}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground">30 dias</div>
                  <div className="text-sm font-bold text-primary">
                    R$ {product.prices.dias30.toFixed(2)}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground">90 dias</div>
                  <div className="text-sm font-bold text-primary">
                    R$ {product.prices.dias90.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              <span className="font-medium">Tamanho padrão:</span> {product.defaultSize}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="default"
            className="w-full gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Eye className="h-4 w-4" />
            Ver Detalhes
          </Button>
        </CardFooter>
      </Card>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        priceType={priceType}
        onAddToCart={onAddToCart}
      />
    </>
  );
};