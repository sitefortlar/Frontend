import { Category } from '@/types/Product';
import { getCategoryIcon } from '@/utils/categoryIcons';
import { getCategoryImageUrlById, getCategoryImageUrl } from '@/utils/categoryImages';
import {
  CategoryCardWrapper,
  CategoryCardImageArea,
  CategoryCardImage,
  CategoryCardContent,
  CategoryCardTitle,
} from './styles';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const IconComponent = getCategoryIcon(category.nome);
  const categoryId = Number(category.id_categoria);
  const imageUrl = getCategoryImageUrlById(categoryId) ?? getCategoryImageUrl(category.nome);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <CategoryCardWrapper
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver produtos da categoria ${category.nome}`}
      onKeyDown={handleKeyDown}
    >
      <CategoryCardImageArea>
        {imageUrl ? (
          <CategoryCardImage
            src={imageUrl}
            alt=""
            loading="lazy"
          />
        ) : (
          <IconComponent
            className="h-16 w-16 sm:h-20 sm:w-20 text-primary/90"
            aria-hidden
          />
        )}
      </CategoryCardImageArea>
      <CategoryCardContent>
        <CategoryCardTitle>{category.nome}</CategoryCardTitle>
      </CategoryCardContent>
    </CategoryCardWrapper>
  );
};
