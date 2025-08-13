import { useState, useEffect, useCallback } from 'react';
import { Product, Category, PriceType } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { CartSheet } from '@/components/Cart/CartSheet';

// Importar produtos dos dados reais
import { products as realProducts, categories as realCategories } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  priceType: PriceType;
  onAddToCart?: (product: Product, size: string, priceType: PriceType, quantity?: number) => void;
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
  const [products, setProducts] = useState<Product[]>(realProducts);
  const [categories, setCategories] = useState<Category[]>(realCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceType, setPriceType] = useState<PriceType>('vista');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showKitsOnly, setShowKitsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'price-high' | 'price-low' | 'name'>('name');
  const { items, addToCart, removeFromCart, updateQuantity, updatePriceType, updateAllItemsPriceType, getTotalPrice, getItemCount, clearCart, generateWhatsAppMessage, isDrawerOpen, setIsDrawerOpen } = useCart();

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    if (selectedSize) {
      filtered = filtered.filter(product => product.sizes.includes(selectedSize));
    }

    if (showKitsOnly) {
      filtered = filtered.filter(product => product.isKit);
    }

    return filtered;
  }, [products, selectedCategory, selectedSubcategory, selectedSize, showKitsOnly]);

  const sortProducts = useCallback((filteredProducts: Product[]) => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      
      const priceA = a.prices[priceType];
      const priceB = b.prices[priceType];

      if (sortBy === 'price-high') {
        return priceB - priceA;
      } else {
        return priceA - priceB;
      }
    });
    return sorted;
  }, [priceType, sortBy]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = filterProducts();
    const sorted = sortProducts(filtered);
    setFilteredProducts(sorted);
  }, [filterProducts, sortProducts]);

  // Get available sizes from filtered products
  const availableSizes = Array.from(
    new Set(filteredProducts.flatMap(product => product.sizes))
  ).sort();

  return (
    <div className="min-h-screen bg-background relative">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategorySelect={setSelectedCategory}
        onSubcategorySelect={setSelectedSubcategory}
      />
      
      <div className="lg:ml-80 min-h-screen">
        <div className="p-6">
          <FilterBar
            selectedSize={selectedSize}
            showKitsOnly={showKitsOnly}
            sortBy={sortBy}
            availableSizes={availableSizes}
            onSizeChange={setSelectedSize}
            onKitsToggle={() => setShowKitsOnly(!showKitsOnly)}
            onSortChange={setSortBy}
            productCount={filteredProducts.length}
          />
        </div>
        
        <ProductGrid
          products={filteredProducts}
          priceType={priceType}
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
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[1.5rem] h-6 rounded-full flex items-center justify-center text-xs">
              {getItemCount()}
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
