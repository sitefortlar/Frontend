import { useState } from 'react';
import { Product, Category } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { useCart } from '@/hooks/useCart';
import { useProductFilters } from '@/hooks/useProductFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { CartSheet } from '@/components/Cart/CartSheet';

// Importar produtos dos dados reais
import { products as realProducts, categories as realCategories } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  priceType: 'avista' | 'dias30' | 'dias90';
  onAddToCart?: (product: Product, size: string, priceType: 'avista' | 'dias30' | 'dias90', quantity?: number) => void;
}

const ProductGrid = ({ products, priceType, onAddToCart }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          priceType={priceType}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export const ProductCatalog = () => {
  const [products] = useState<Product[]>(realProducts);
  const [categories] = useState<Category[]>(realCategories);
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
    <div className="min-h-screen bg-background relative">
      <CategorySidebar
        categories={categories}
        selectedCategory={filters.selectedCategory}
        selectedSubcategory={filters.selectedSubcategory}
        onCategorySelect={(category) => updateFilter('selectedCategory', category)}
        onSubcategorySelect={(subcategory) => updateFilter('selectedSubcategory', subcategory)}
      />
      
      <div className="lg:ml-80 min-h-screen">
        <div className="p-6">
          <FilterBar
            sortBy={filters.sortBy}
            onSortChange={(sortBy) => updateFilter('sortBy', sortBy)}
            productCount={filteredProducts.length}
          />
        </div>
        
        <ProductGrid
          products={filteredProducts}
          priceType={filters.priceType}
          onAddToCart={addToCart}
        />
      </div>

      {/* Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {getItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[1.5rem] h-6 rounded-full flex items-center justify-center text-xs">
              {getItemCount}
            </Badge>
          )}
        </Button>
      </div>

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
    </div>
  );
};
