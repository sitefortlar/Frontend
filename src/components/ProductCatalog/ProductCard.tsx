
import { useState } from 'react';
import { Eye, Package } from 'lucide-react';
import { Product, PriceType } from '@/types/Product';
import { ProductModal } from './ProductModal';
import { convertDriveUrlToImage } from '@/utils/imageUtils';
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

  // Get product image from imagens array or fallback
  const getProductImage = () => {
    if (product.imagens && product.imagens.length > 0) {
      // Converte link do Google Drive para link direto de imagem
      return convertDriveUrlToImage(product.imagens[0]);
    }
    // Fallback image if no images available
    return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop";
  };

  return (
    <>
      <StyledProductCard onClick={() => setIsModalOpen(true)}>
        <ProductImageContainer>
          <ProductImage 
            src={getProductImage()}
            alt={product.nome}
          />
          {product.kits && product.kits.length > 0 && (
            <ProductBadge>
              <Package className="h-3 w-3" />
              Kit
            </ProductBadge>
          )}
        </ProductImageContainer>

        <ProductContent>
          <div>
            {product.categoria && (
              <ProductCategory>
                {product.categoria}
              </ProductCategory>
            )}
            <ProductName>
              {product.nome || 'Produto sem nome'}
            </ProductName>
          </div>

          {(product.avista !== undefined || product['30_dias'] !== undefined || product['60_dias'] !== undefined) && (
            <ProductPrices>
              <ProductPriceLabel>Preços:</ProductPriceLabel>
              <ProductPriceGrid>
                {product.avista !== undefined && (
                  <ProductPriceItem>
                    <ProductPriceLabel>À vista:</ProductPriceLabel>
                    <ProductPriceValue isHighlight>
                      R$ {product.avista.toFixed(2)}
                    </ProductPriceValue>
                  </ProductPriceItem>
                )}
                {product['30_dias'] !== undefined && (
                  <ProductPriceItem>
                    <ProductPriceLabel>30 dias:</ProductPriceLabel>
                    <ProductPriceValue>
                      R$ {product['30_dias'].toFixed(2)}
                    </ProductPriceValue>
                  </ProductPriceItem>
                )}
                {product['60_dias'] !== undefined && (
                  <ProductPriceItem>
                    <ProductPriceLabel>60 dias:</ProductPriceLabel>
                    <ProductPriceValue>
                      R$ {product['60_dias'].toFixed(2)}
                    </ProductPriceValue>
                  </ProductPriceItem>
                )}
              </ProductPriceGrid>
            </ProductPrices>
          )}

          {product.kits && product.kits.length > 0 && (() => {
            // Mostra o primeiro kit disponível (geralmente o kit mais popular)
            const firstKit = product.kits[0];
            return (
              <ProductKits>
                <ProductKitsLabel>Kit ({firstKit.quantidade || 1} un):</ProductKitsLabel>
                <ProductKitsGrid>
                  {firstKit.avista !== undefined && (
                    <ProductPriceItem>
                      <ProductPriceValue isHighlight>
                        R$ {firstKit.avista.toFixed(2)}
                      </ProductPriceValue>
                    </ProductPriceItem>
                  )}
                  {firstKit['30_dias'] !== undefined && (
                    <ProductPriceItem>
                      <ProductPriceValue>
                        R$ {firstKit['30_dias'].toFixed(2)}
                      </ProductPriceValue>
                    </ProductPriceItem>
                  )}
                  {firstKit['60_dias'] !== undefined && (
                    <ProductPriceItem>
                      <ProductPriceValue>
                        R$ {firstKit['60_dias'].toFixed(2)}
                      </ProductPriceValue>
                    </ProductPriceItem>
                  )}
                </ProductKitsGrid>
                <ProductKitsInfo>
                  {product.kits.length} opções de kit disponíveis
                </ProductKitsInfo>
              </ProductKits>
            );
          })()}
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
