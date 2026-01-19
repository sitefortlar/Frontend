import { Product, Category } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { useCart } from '@/hooks/useCart';
import { useProductFilters } from '@/hooks/useProductFilters';
import { ShoppingCart, Loader2 } from 'lucide-react';
import CartSheet from '@/components/Cart/CartSheet';
import { AdminSettingsButton } from './AdminSettingsButton';
import { useAuthContext } from '@/contexts/AuthContext';
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
  companyId?: number;
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

export const ProductCatalog = ({ products, categories, companyId }: ProductCatalogProps) => {
  const { 
    items, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    updateAllItemsPriceType,
    getTotalPrice,
    getItemCount,
    clearCart, 
    isDrawerOpen, 
    setIsDrawerOpen 
  } = useCart();

  const {
    filters,
    filteredProducts,
    updateFilter,
  } = useProductFilters(products);

  const { isAdmin } = useAuthContext();

  // Show loading state when products are empty (initial load)
  if (!products || products.length === 0) {
    return (
      <ProductCatalogContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        </div>
      </ProductCatalogContainer>
    );
  }

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
        
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
              <p className="text-muted-foreground text-sm">Tente ajustar os filtros</p>
            </div>
          </div>
        ) : (
          <ProductGridComponent
            products={filteredProducts}
            priceType={filters.priceType}
            onAddToCart={addToCart}
          />
        )}
      </ProductCatalogContent>

      {/* Admin Settings Button - Only visible for admin users */}
      {isAdmin && <AdminSettingsButton />}

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
        onUpdateAllItemsPriceType={updateAllItemsPriceType}
        allProducts={products}
        getTotalPrice={getTotalPrice}
        companyId={companyId || 0}
        onClearCart={clearCart}
      />
    </ProductCatalogContainer>
  );
};

export default ProductCatalog;
