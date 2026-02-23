import { memo } from 'react';
import { Category } from '@/types/Product';
import { CategoryCard } from './CategoryCard';
import { ProductGrid as StyledGrid } from './styles';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: number) => void;
}

export const CategoryGrid = memo(({
  categories,
  onSelectCategory,
}: CategoryGridProps) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Nenhuma categoria encontrada.
        </p>
      </div>
    );
  }

  return (
    <StyledGrid as="div">
      {categories.map((category) => {
        const id = Number(category.id_categoria);
        return (
          <CategoryCard
            key={category.id_categoria}
            category={category}
            onClick={() => onSelectCategory(id)}
          />
        );
      })}
    </StyledGrid>
  );
});

CategoryGrid.displayName = 'CategoryGrid';
