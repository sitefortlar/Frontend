
import { useState, useMemo } from 'react';
import { ProductGrid } from './ProductGrid';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { CartDrawer } from '@/components/Cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { categories, products } from '@/data/products';
import { FilterState } from '@/types/Product';
import { useCart } from '@/hooks/useCart';

export const ProductCatalog = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSize: null,
    showKitsOnly: false,
    sortBy: 'name',
    priceType: 'vista',
  });

  const cart = useCart();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Category filter
      if (filters.selectedCategory && product.category !== filters.selectedCategory) {
        return false;
      }

      // Subcategory filter
      if (filters.selectedSubcategory && product.subcategory !== filters.selectedSubcategory) {
        return false;
      }

      // Size filter
      if (filters.selectedSize && !product.sizes.includes(filters.selectedSize)) {
        return false;
      }

      // Kits filter
      if (filters.showKitsOnly && !product.isKit) {
        return false;
      }

      return true;
    });

    if (filters.sortBy === 'price-high') {
      return filtered.sort((a, b) => b.prices.vista - a.prices.vista);
    }
    if (filters.sortBy === 'price-low') {
      return filtered.sort((a, b) => a.prices.vista - b.prices.vista);
    }
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [filters]);

  // Get available sizes from current filtered products (before size filter is applied)
  const availableSizes = useMemo(() => {
    let productsForSizes = products.filter((product) => {
      if (filters.selectedCategory && product.category !== filters.selectedCategory) {
        return false;
      }
      if (filters.selectedSubcategory && product.subcategory !== filters.selectedSubcategory) {
        return false;
      }
      if (filters.showKitsOnly && !product.isKit) {
        return false;
      }
      return true;
    });

    const sizes = new Set<string>();
    productsForSizes.forEach((product) => {
      product.sizes.forEach((size) => sizes.add(size));
    });

    return Array.from(sizes).sort();
  }, [filters.selectedCategory, filters.selectedSubcategory, filters.showKitsOnly]);

  return (
    <div className="min-h-screen bg-background">
      <CategorySidebar
        categories={categories}
        selectedCategory={filters.selectedCategory}
        selectedSubcategory={filters.selectedSubcategory}
        onCategorySelect={(categoryId) =>
          setFilters(prev => ({ ...prev, selectedCategory: categoryId }))
        }
        onSubcategorySelect={(subcategoryId) =>
          setFilters(prev => ({ ...prev, selectedSubcategory: subcategoryId }))
        }
      />

      {/* Cart Button - Moved to bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => cart.setIsDrawerOpen(true)}
          className="gap-2 shadow-warm h-14 w-14 rounded-full p-0 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <ShoppingCart className="h-6 w-6" />
          {cart.getItemCount() > 0 && (
            <Badge variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
              {cart.getItemCount()}
            </Badge>
          )}
        </Button>
      </div>

      <div className="lg:ml-80 min-h-screen">
        <div className="p-6 space-y-6">
          <FilterBar
            selectedSize={filters.selectedSize}
            showKitsOnly={filters.showKitsOnly}
            sortBy={filters.sortBy}
            availableSizes={availableSizes}
            onSizeChange={(size) =>
              setFilters(prev => ({ ...prev, selectedSize: size }))
            }
            onKitsToggle={() =>
              setFilters(prev => ({ ...prev, showKitsOnly: !prev.showKitsOnly }))
            }
            onSortChange={(sort) =>
              setFilters(prev => ({ ...prev, sortBy: sort }))
            }
            productCount={filteredProducts.length}
          />

          <ProductGrid
            products={filteredProducts}
            priceType={filters.priceType}
            onAddToCart={cart.addToCart}
          />
        </div>
      </div>

      <CartDrawer
        isOpen={cart.isDrawerOpen}
        onClose={() => cart.setIsDrawerOpen(false)}
        items={cart.items}
        onRemoveItem={cart.removeFromCart}
        onUpdateQuantity={cart.updateQuantity}
        onUpdatePriceType={cart.updatePriceType}
        getTotalPrice={cart.getTotalPrice}
        generateWhatsAppMessage={cart.generateWhatsAppMessage}
        onClearCart={cart.clearCart}
      />
    </div>
  );
};
