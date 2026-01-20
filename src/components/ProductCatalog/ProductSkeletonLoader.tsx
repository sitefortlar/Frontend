import { ProductGrid } from './styles';

/**
 * Componente de Skeleton Loader para produtos
 * 
 * UX: Exibe cards de skeleton enquanto os produtos carregam,
 * mantendo o layout e evitando "saltos" visuais.
 * 
 * Performance: Componente leve, sem dependências externas.
 * Animação suave com delay escalonado para efeito visual agradável.
 */
export const ProductSkeletonLoader = () => {
  return (
    <ProductGrid>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
        >
          {/* Image Skeleton com animação suave */}
          <div className="w-full h-48 bg-white/5 animate-pulse" />
          
          {/* Content Skeleton */}
          <div className="p-5 space-y-3">
            {/* Category Badge */}
            <div 
              className="h-6 w-24 bg-white/10 rounded animate-pulse"
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: '1.5s',
              }}
            />
            
            {/* Product Name */}
            <div className="space-y-2">
              <div 
                className="h-5 w-full bg-white/10 rounded animate-pulse"
                style={{
                  animationDelay: `${index * 100 + 50}ms`,
                  animationDuration: '1.5s',
                }}
              />
              <div 
                className="h-5 w-3/4 bg-white/10 rounded animate-pulse"
                style={{
                  animationDelay: `${index * 100 + 100}ms`,
                  animationDuration: '1.5s',
                }}
              />
            </div>
            
            {/* Price Grid */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[0, 1, 2].map((priceIndex) => (
                <div
                  key={priceIndex}
                  className="h-8 bg-white/10 rounded animate-pulse"
                  style={{
                    animationDelay: `${index * 100 + priceIndex * 50}ms`,
                    animationDuration: '1.5s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </ProductGrid>
  );
};
