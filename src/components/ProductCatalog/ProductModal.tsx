
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import { convertDriveUrlToImage } from '@/utils/imageUtils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ProductUnitaryPurchase } from './ProductUnitaryPurchase';
import { ProductKitList } from './ProductKitList';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType, quantity?: number) => void;
  onAddKitToCart?: (kit: Product, quantity: number, priceType: PriceType) => void;
}

export const ProductModal = ({ product, isOpen, onClose, priceType, onAddToCart, onAddKitToCart }: ProductModalProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Obter imagens do produto
  const productImages = product.imagens && product.imagens.length > 0 
    ? product.imagens.map(img => convertDriveUrlToImage(img))
    : ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"];

  // Configurar carrossel
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Resetar carrossel quando o modal abrir ou produto mudar
  useEffect(() => {
    if (isOpen && api && productImages.length > 1) {
      api.scrollTo(0);
      setCurrent(1);
    }
  }, [isOpen, product.id_produto, api, productImages.length]);

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
            {productImages.length > 1 ? (
              <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden border border-border/20">
                <Carousel 
                  setApi={setApi} 
                  className="w-full h-full"
                  opts={{
                    align: "start",
                    loop: false,
                    dragFree: false,
                  }}
                >
                  <CarouselContent className="h-full -ml-0">
                    {productImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-0 h-full basis-full">
                        <div className="w-full h-full relative flex items-center justify-center">
                          <img 
                            src={image}
                            alt={`${product.nome} - Imagem ${index + 1}`}
                            className="w-full h-full object-contain"
                            draggable={false}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {/* Navigation Arrows */}
                  {count > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white z-10 backdrop-blur-sm"
                        onClick={() => api?.scrollPrev()}
                        disabled={current === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white z-10 backdrop-blur-sm"
                        onClick={() => api?.scrollNext()}
                        disabled={current === count}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </Carousel>
                
                {/* Indicators (bolinhas) - estilo Instagram */}
                {count > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-2 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        className={`rounded-full transition-all duration-300 ${
                          index + 1 === current
                            ? 'w-2 h-2 bg-white'
                            : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/80'
                        }`}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Ir para imagem ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full aspect-square bg-white rounded-lg overflow-hidden border border-border/20">
                <img 
                  src={productImages[0]}
                  alt={product.nome}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            
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
            {onAddToCart && (
              <ProductUnitaryPurchase
                product={product}
                priceType={priceType}
                onAddToCart={onAddToCart}
              />
            )}

            {/* Kits Available */}
            {onAddKitToCart && product.kits && product.kits.length > 0 && (
              <ProductKitList
                kits={product.kits}
                priceType={priceType}
                onAddKitToCart={onAddKitToCart}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
