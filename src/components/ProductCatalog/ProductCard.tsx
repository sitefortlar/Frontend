
import { useState } from 'react';
import { Eye, Package } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import { ProductModal } from './ProductModal';
import {
  ProductCard as StyledProductCard,
  ProductImageContainer,
  ProductImage,
  ProductBadge,
  ProductContent,
  ProductCategory,
  ProductName,
  ProductPrices,
  ProductPriceLabel,
  ProductPriceGrid,
  ProductPriceItem,
  ProductPriceValue,
  ProductKits,
  ProductKitsLabel,
  ProductKitsGrid,
  ProductKitsInfo
} from './styles';

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
      <StyledProductCard onClick={() => setIsModalOpen(true)}>
        <ProductImageContainer>
          <ProductImage 
            src={getProductImage(product.id)}
            alt={product.name}
          />
          {product.isKit && (
            <ProductBadge>
              <Package className="h-3 w-3" />
              Kit
            </ProductBadge>
          )}
        </ProductImageContainer>

        <ProductContent>
          <div>
            <ProductCategory>
              {product.category.replace('-', ' ')}
            </ProductCategory>
            <ProductName>
              {product.name}
            </ProductName>
          </div>

          <ProductPrices>
            <ProductPriceLabel>Unidade:</ProductPriceLabel>
            <ProductPriceGrid>
              <ProductPriceItem>
                <ProductPriceLabel>À vista:</ProductPriceLabel>
                <ProductPriceValue isHighlight>
                  R$ {product.prices.avista.toFixed(2)}
                </ProductPriceValue>
              </ProductPriceItem>
              <ProductPriceItem>
                <ProductPriceLabel>30 dias:</ProductPriceLabel>
                <ProductPriceValue>
                  R$ {product.prices.dias30.toFixed(2)}
                </ProductPriceValue>
              </ProductPriceItem>
              <ProductPriceItem>
                <ProductPriceLabel>90 dias:</ProductPriceLabel>
                <ProductPriceValue>
                  R$ {product.prices.dias90.toFixed(2)}
                </ProductPriceValue>
              </ProductPriceItem>
            </ProductPriceGrid>
          </ProductPrices>

          {product.kits && product.kits.length > 0 && (
            <ProductKits>
              <ProductKitsLabel>Kit Popular (12 un):</ProductKitsLabel>
              <ProductKitsGrid>
                <ProductPriceItem>
                  <ProductPriceValue isHighlight>
                    R$ {product.kits.find(k => k.units === 12)?.prices.avista.toFixed(2) || 'N/A'}
                  </ProductPriceValue>
                </ProductPriceItem>
                <ProductPriceItem>
                  <ProductPriceValue>
                    R$ {product.kits.find(k => k.units === 12)?.prices.dias30.toFixed(2) || 'N/A'}
                  </ProductPriceValue>
                </ProductPriceItem>
                <ProductPriceItem>
                  <ProductPriceValue>
                    R$ {product.kits.find(k => k.units === 12)?.prices.dias90.toFixed(2) || 'N/A'}
                  </ProductPriceValue>
                </ProductPriceItem>
              </ProductKitsGrid>
              <ProductKitsInfo>
                {product.kits.length} opções de kit disponíveis
              </ProductKitsInfo>
            </ProductKits>
          )}
        </ProductContent>
      </StyledProductCard>

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
