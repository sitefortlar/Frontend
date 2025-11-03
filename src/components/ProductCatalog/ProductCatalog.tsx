import { Product, Category } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { useCart } from '@/hooks/useCart';
import { useProductFilters } from '@/hooks/useProductFilters';
import { ShoppingCart } from 'lucide-react';
import CartSheet from '@/components/Cart/CartSheet';
import {
  ProductCatalogContainer,
  ProductCatalogContent,
  ProductCatalogHeader,
  ProductGrid,
  CartButton,
  CartBadge
} from './styles';

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
}

interface ProductGridProps {
  products: Product[];
  priceType: 'avista' | 'dias30' | 'dias90';
  onAddToCart?: (product: Product, size: string, priceType: 'avista' | 'dias30' | 'dias90', quantity?: number) => void;
}

const ProductGridComponent = ({ products, priceType, onAddToCart }: ProductGridProps) => {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard
          key={product.id_produto}
          product={product}
          priceType={priceType}
          onAddToCart={onAddToCart}
        />
      ))}
    </ProductGrid>
  );
};

export const ProductCatalog = ({ products, categories }: ProductCatalogProps) => {
  const { 
    items, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    updatePriceType, 
    updateAllItemsPriceType,
    getTotalPrice,
    getItemCount,
    clearCart, 
    generateWhatsAppMessage, 
    isDrawerOpen, 
    setIsDrawerOpen 
  } = useCart();

  const {
    filters,
    filteredProducts,
    updateFilter,
  } = useProductFilters(products);

  return (
    <ProductCatalogContainer>
      <CategorySidebar
        categories={categories}
        selectedCategory={filters.selectedCategory}
        selectedSubcategory={filters.selectedSubcategory}
        onCategorySelect={(category) => updateFilter('selectedCategory', category)}
        onSubcategorySelect={(subcategory) => updateFilter('selectedSubcategory', subcategory)}
      />
      
      <ProductCatalogContent>
        <ProductCatalogHeader>
          <FilterBar
            sortBy={filters.sortBy}
            onSortChange={(sortBy) => updateFilter('sortBy', sortBy)}
            productCount={filteredProducts.length}
          />
        </ProductCatalogHeader>
        
        <ProductGridComponent
          products={filteredProducts}
          priceType={filters.priceType}
          onAddToCart={addToCart}
        />
      </ProductCatalogContent>

      {/* Cart Button */}
      <CartButton onClick={() => setIsDrawerOpen(true)}>
        <ShoppingCart className="h-6 w-6" />
        {getItemCount > 0 && (
          <CartBadge>
            {getItemCount}
          </CartBadge>
        )}
      </CartButton>

      <CartSheet
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={items}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onUpdatePriceType={updatePriceType}
        onUpdateAllItemsPriceType={updateAllItemsPriceType}
        allProducts={products}
        getTotalPrice={getTotalPrice}
        generateWhatsAppMessage={generateWhatsAppMessage}
        onClearCart={clearCart}
      />
    </ProductCatalogContainer>
  );
};

export default ProductCatalog;
