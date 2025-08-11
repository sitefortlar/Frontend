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

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Panela de Pressão Inox 6L',
    category: 'panelas-pressao',
    sizes: ['6L', '8L'],
    defaultSize: '6L',
    prices: { vista: 199.90, dias30: 219.90, dias90: 239.90 },
    isKit: false,
  },
  {
    id: '2',
    name: 'Jogo de Panelas Antiaderente 5 Peças',
    category: 'panelas-cacarolas',
    sizes: ['P', 'M', 'G'],
    defaultSize: 'M',
    prices: { vista: 299.00, dias30: 329.00, dias90: 359.00 },
    isKit: true,
  },
  {
    id: '3',
    name: 'Caldeirão de Ferro Fundido 10L',
    category: 'caldeiroes',
    sizes: ['10L', '12L'],
    defaultSize: '10L',
    prices: { vista: 349.50, dias30: 379.50, dias90: 409.50 },
    isKit: false,
  },
  {
    id: '4',
    name: 'Canecão Esmaltado 1.5L',
    category: 'canecoes-fervedores',
    sizes: ['1.5L', '2L'],
    defaultSize: '1.5L',
    prices: { vista: 49.99, dias30: 54.99, dias90: 59.99 },
    isKit: false,
  },
  {
    id: '5',
    name: 'Frigideira Antiaderente 24cm',
    category: 'frigideiras',
    sizes: ['24cm', '28cm'],
    defaultSize: '24cm',
    prices: { vista: 79.90, dias30: 87.90, dias90: 95.90 },
    isKit: false,
  },
  {
    id: '6',
    name: 'Forma de Bolo Redonda 26cm',
    category: 'formas-assadeiras',
    sizes: ['26cm', '28cm'],
    defaultSize: '26cm',
    prices: { vista: 59.00, dias30: 64.90, dias90: 69.90 },
    isKit: false,
  },
  {
    id: '7',
    name: 'Panela de Pressão Inox 4,5L',
    category: 'panelas-pressao',
    sizes: ['4.5L'],
    defaultSize: '4.5L',
    prices: { vista: 179.90, dias30: 197.90, dias90: 215.90 },
    isKit: false,
  },
  {
    id: '8',
    name: 'Jogo de Panelas Inox 3 Peças',
    category: 'panelas-cacarolas',
    sizes: ['P', 'M'],
    defaultSize: 'P',
    prices: { vista: 349.00, dias30: 384.00, dias90: 419.00 },
    isKit: true,
  },
  {
    id: '9',
    name: 'Caldeirão Esmaltado 7L',
    category: 'caldeiroes',
    sizes: ['7L'],
    defaultSize: '7L',
    prices: { vista: 299.50, dias30: 329.50, dias90: 359.50 },
    isKit: false,
  },
  {
    id: '10',
    name: 'Canecão de Alumínio 1L',
    category: 'canecoes-fervedores',
    sizes: ['1L'],
    defaultSize: '1L',
    prices: { vista: 29.99, dias30: 32.99, dias90: 35.99 },
    isKit: false,
  },
  {
    id: '11',
    name: 'Frigideira Wok Antiaderente 32cm',
    category: 'frigideiras',
    sizes: ['32cm'],
    defaultSize: '32cm',
    prices: { vista: 99.90, dias30: 109.90, dias90: 119.90 },
    isKit: false,
  },
  {
    id: '12',
    name: 'Assadeira Retangular 30cm',
    category: 'formas-assadeiras',
    sizes: ['30cm'],
    defaultSize: '30cm',
    prices: { vista: 69.00, dias30: 75.90, dias90: 82.90 },
    isKit: false,
  },
];

const mockCategories: Category[] = [
  {
    id: 'panelas-pressao',
    name: 'Panelas de Pressão',
    subcategories: [{ id: 'inox', name: 'Inox' }, { id: 'aluminio', name: 'Alumínio' }],
  },
  {
    id: 'panelas-cacarolas',
    name: 'Panelas e Caçarolas',
    subcategories: [{ id: 'antiaderente', name: 'Antiaderente' }, { id: 'inox', name: 'Inox' }],
  },
  {
    id: 'caldeiroes',
    name: 'Caldeirões',
    subcategories: [{ id: 'ferro-fundido', name: 'Ferro Fundido' }, { id: 'esmaltado', name: 'Esmaltado' }],
  },
  {
    id: 'canecoes-fervedores',
    name: 'Canecões e Fervedores',
    subcategories: [{ id: 'aluminio', name: 'Alumínio' }, { id: 'esmaltado', name: 'Esmaltado' }],
  },
  {
    id: 'frigideiras',
    name: 'Frigideiras',
    subcategories: [{ id: 'antiaderente', name: 'Antiaderente' }, { id: 'wok', name: 'Wok' }],
  },
  {
    id: 'formas-assadeiras',
    name: 'Formas e Assadeiras',
    subcategories: [{ id: 'redonda', name: 'Redonda' }, { id: 'retangular', name: 'Retangular' }],
  },
];

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
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceType, setPriceType] = useState<PriceType>('vista');
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [kitFilter, setKitFilter] = useState<boolean | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { items, addToCart, removeFromCart, updateQuantity, updatePriceType, getTotalPrice, getItemCount, clearCart, generateWhatsAppMessage, isDrawerOpen, setIsDrawerOpen } = useCart();

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(product => {
        const category = categories.find(cat => cat.id === product.category);
        if (category) {
          return category.subcategories.some(sub => sub.id === selectedSubcategory);
        }
        return false;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sizeFilter.length > 0) {
      filtered = filtered.filter(product => sizeFilter.includes(product.defaultSize));
    }

    if (kitFilter !== null) {
      filtered = filtered.filter(product => product.isKit === kitFilter);
    }

    return filtered;
  }, [products, selectedCategory, selectedSubcategory, searchTerm, sizeFilter, kitFilter, categories]);

  const sortProducts = useCallback((filteredProducts: Product[]) => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      const priceA = a.prices[priceType];
      const priceB = b.prices[priceType];

      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    return sorted;
  }, [priceType, sortOrder]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = filterProducts();
    const sorted = sortProducts(filtered);
    setFilteredProducts(sorted);
  }, [filterProducts, sortProducts]);

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
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          priceType={priceType}
          onPriceTypeChange={setPriceType}
          sizeFilter={sizeFilter}
          onSizeFilterChange={setSizeFilter}
          kitFilter={kitFilter}
          onKitFilterChange={setKitFilter}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
        
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
        getTotalPrice={getTotalPrice}
        generateWhatsAppMessage={generateWhatsAppMessage}
        onClearCart={clearCart}
      />
    </div>
  );
};
