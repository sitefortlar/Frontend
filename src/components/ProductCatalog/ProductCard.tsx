
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Package } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import { ProductModal } from './ProductModal';

interface ProductCardProps {
  product: Product;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType, quantity?: number) => void;
}

export const ProductCard = ({ product, priceType, onAddToCart }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use different images based on product category for variety
  const getProductImage = (productId: string) => {
    const images = [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1574263867128-a70d6c4d14c9?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1583416750470-965b2707b8f1?w=300&h=200&fit=crop"
    ];
    const index = productId.charCodeAt(0) % images.length;
    return images[index];
  };

  return (
    <>
      <Card className="group hover:shadow-glass transition-glass transform hover:-translate-y-1 glass-light border-0 cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <CardHeader className="p-0">
          <div className="relative w-full h-48 bg-gradient-glass rounded-t-lg overflow-hidden">
            <img 
              src={getProductImage(product.id)}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.isKit && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                <Package className="h-3 w-3 mr-1" />
                Kit
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <div>
            <Badge variant="outline" className="text-xs mb-2 capitalize">
              {product.category.replace('-', ' ')}
            </Badge>
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Unidade:</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xs text-green-600 font-medium">À vista:</div>
                <div className="text-sm font-bold text-green-600">
                  R$ {product.prices.avista.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">30 dias:</div>
                <div className="text-sm font-semibold">
                  R$ {product.prices.dias30.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">90 dias:</div>
                <div className="text-sm font-semibold">
                  R$ {product.prices.dias90.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {product.kits && product.kits.length > 0 && (
            <div className="border-t pt-2">
              <div className="text-xs text-muted-foreground">Kit Popular (12 un):</div>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="text-center">
                  <div className="text-xs font-bold text-green-600">
                    R$ {product.kits.find(k => k.units === 12)?.prices.avista.toFixed(2) || 'N/A'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold">
                    R$ {product.kits.find(k => k.units === 12)?.prices.dias30.toFixed(2) || 'N/A'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold">
                    R$ {product.kits.find(k => k.units === 12)?.prices.dias90.toFixed(2) || 'N/A'}
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center mt-1">
                {product.kits.length} opções de kit disponíveis
              </div>
            </div>
          )}
        </CardContent>
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
