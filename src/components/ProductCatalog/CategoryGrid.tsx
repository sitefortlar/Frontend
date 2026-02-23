import { memo } from 'react';
import { Category } from '@/types/Product';
import { CategoryCard } from './CategoryCard';
import { ProductGrid as StyledGrid } from './styles';

interface CategoryGridProps {
  categories: Category[];
  productCountByCategoryId: Record<number, number>;
  onSelectCategory: (categoryId: number) => void;
}

export const CategoryGrid = memo(({
  categories,
  productCountByCategoryId,
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
        const count = productCountByCategoryId[id] ?? 0;
        return (
          <CategoryCard
            key={category.id_categoria}
            category={category}
            productCount={count}
            onClick={() => onSelectCategory(id)}
          />
        );
      })}
    </StyledGrid>
  );
});

CategoryGrid.displayName = 'CategoryGrid';
