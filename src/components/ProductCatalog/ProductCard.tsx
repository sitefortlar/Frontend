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
}

export const ProductCard = ({ product, priceType }: ProductCardProps) => {
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
      <Card className="group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1 bg-gradient-subtle border-kitchen-warm/20">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center shadow-soft">
            <IconComponent className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-kitchen-copper transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-kitchen-copper">
                R$ {price.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {priceLabels[priceType]}
              </div>
            </div>
            
            {product.isKit && (
              <Badge variant="secondary" className="bg-kitchen-gold/20 text-kitchen-copper border-kitchen-gold/30">
                <Package className="h-3 w-3 mr-1" />
                Kit
              </Badge>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Tamanho padrão:</span> {product.defaultSize}
          </div>
          
          {product.sizes.length > 1 && (
            <div className="text-xs text-muted-foreground">
              +{product.sizes.length - 1} tamanho{product.sizes.length > 2 ? 's' : ''} disponível{product.sizes.length > 2 ? 'is' : ''}
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            variant="kitchen"
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
      />
    </>
  );
};