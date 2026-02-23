import { Category } from '@/types/Product';
import { getCategoryIcon } from '@/utils/categoryIcons';
import {
  ProductCard as StyledCard,
  ProductImageContainer,
  ProductContent,
  ProductName,
} from './styles';

interface CategoryCardProps {
  category: Category;
  productCount: number;
  onClick: () => void;
}

export const CategoryCard = ({ category, productCount, onClick }: CategoryCardProps) => {
  const IconComponent = getCategoryIcon(category.nome);

  return (
    <StyledCard onClick={onClick} role="button" tabIndex={0} aria-label={`Ver produtos da categoria ${category.nome}, ${productCount} produtos`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}>
      <ProductImageContainer className="bg-muted/30 flex flex-col items-center justify-center">
        <IconComponent className="h-16 w-16 text-primary" aria-hidden />
      </ProductImageContainer>
      <ProductContent>
        <ProductName className="line-clamp-2 min-h-auto max-h-none">
          {category.nome}
        </ProductName>
        <p className="text-sm text-muted-foreground mt-1">
          {productCount} produto{productCount !== 1 ? 's' : ''}
        </p>
      </ProductContent>
    </StyledCard>
  );
};
