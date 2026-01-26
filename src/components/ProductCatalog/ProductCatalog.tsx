import { useState, useMemo } from 'react';
import { Product, Category, PriceType, SortOption } from '@/types/Product';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';
import { AdminSettingsButton } from './AdminSettingsButton';
import { useCart } from '@/hooks/useCart';
import {
  ProductCatalogContainer,
  ProductCatalogContent,
  ProductCatalogHeader,
} from './styles';

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  companyId?: number;
}

export const ProductCatalog = ({
  products,
  categories,
  companyId,
}: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const { addToCart, priceType } = useCart();

  // Filtrar produtos por categoria e subcategoria
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtrar por categoria
    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (product) => product.id_categoria === selectedCategory
      );
    }

    // Filtrar por subcategoria
    if (selectedSubcategory !== null) {
      filtered = filtered.filter(
        (product) => product.id_subcategoria === selectedSubcategory
      );
    }

    // Ordenar produtos
    filtered.sort((a, b) => {
      const priceA = priceType === 'avista' 
        ? (a.avista ?? a.valor_base ?? 0)
        : priceType === 'dias30'
        ? (a['30_dias'] ?? a.valor_base ?? 0)
        : (a['60_dias'] ?? a.valor_base ?? 0);
      
      const priceB = priceType === 'avista'
        ? (b.avista ?? b.valor_base ?? 0)
        : priceType === 'dias30'
        ? (b['30_dias'] ?? b.valor_base ?? 0)
        : (b['60_dias'] ?? b.valor_base ?? 0);

      return sortBy === 'price-low' ? priceA - priceB : priceB - priceA;
    });

    return filtered;
  }, [products, selectedCategory, selectedSubcategory, sortBy, priceType]);

  // Handler para adicionar ao carrinho
  const handleAddToCart = (
    product: Product,
    size: string,
    productPriceType: PriceType,
    quantity: number = 1
  ) => {
    addToCart(product, size, productPriceType, quantity);
  };

  // Resetar filtros quando categoria é deselecionada
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId === null) {
      setSelectedSubcategory(null);
    }
  };

  return (
    <ProductCatalogContainer>
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={setSelectedSubcategory}
      />
      <ProductCatalogContent>
        <ProductCatalogHeader>
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            productCount={filteredProducts.length}
          />
        </ProductCatalogHeader>
        <ProductGrid
          products={filteredProducts}
          priceType={priceType}
          onAddToCart={handleAddToCart}
        />
      </ProductCatalogContent>
      <AdminSettingsButton />
    </ProductCatalogContainer>
  );
};

export default ProductCatalog;
