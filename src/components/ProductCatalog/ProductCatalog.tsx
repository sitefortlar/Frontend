import { useState, useMemo, useCallback, useEffect } from 'react';
import { Product, Category, PriceType, SortOption } from '@/types/Product';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';
import { AdminSettingsButton } from './AdminSettingsButton';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/Cart/CartSheet';
import { CartButton } from '@/components/Cart/CartButton';
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
  
  // Hook do carrinho com todas as funções necessárias
  const { 
    items, 
    isDrawerOpen, 
    setIsDrawerOpen, 
    addToCart,
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    clearCart, 
    updateAllItemsPriceType,
    priceType,
    rebuildAllItemsPrices
  } = useCart();

  // Reconstruir prices quando produtos estiverem disponíveis
  useEffect(() => {
    if (products && products.length > 0) {
      rebuildAllItemsPrices(products);
    }
  }, [products, rebuildAllItemsPrices]);

  /**
   * Filtra produtos por categoria e subcategoria.
   * IMPORTANTE: Filtrar por categoria primeiro, depois por subcategoria.
   * Isso garante que subcategorias sejam filtradas apenas dentro da categoria selecionada.
   */
  const filteredProducts = useMemo(() => {
    try {
      // Validar entrada
      if (!Array.isArray(products) || products.length === 0) {
        return [];
      }

      let filtered = [...products];

      // IMPORTANTE: Filtrar por categoria primeiro
      if (selectedCategory !== null) {
        filtered = filtered.filter(
          (product) => product?.id_categoria === selectedCategory
        );
      }

      // IMPORTANTE: Filtrar por subcategoria DEPOIS (dentro da categoria selecionada)
      // Isso garante que apenas subcategorias da categoria selecionada sejam consideradas
      if (selectedSubcategory !== null) {
        filtered = filtered.filter(
          (product) => product?.id_subcategoria === selectedSubcategory
        );
      }

      // Ordenar produtos por preço
      const sorted = [...filtered];
      sorted.sort((a, b) => {
        try {
          const priceA = priceType === 'avista' 
            ? (a?.avista ?? a?.valor_base ?? 0)
            : priceType === 'dias30'
            ? (a?.['30_dias'] ?? a?.valor_base ?? 0)
            : (a?.['60_dias'] ?? a?.valor_base ?? 0);
          
          const priceB = priceType === 'avista'
            ? (b?.avista ?? b?.valor_base ?? 0)
            : priceType === 'dias30'
            ? (b?.['30_dias'] ?? b?.valor_base ?? 0)
            : (b?.['60_dias'] ?? b?.valor_base ?? 0);

          return sortBy === 'price-low' ? priceA - priceB : priceB - priceA;
        } catch (error) {
          console.error('Erro ao ordenar produtos:', error);
          return 0;
        }
      });

      return sorted;
    } catch (error) {
      console.error('Erro ao filtrar produtos:', error);
      return [];
    }
  }, [products, selectedCategory, selectedSubcategory, sortBy, priceType]);

  /**
   * Handler para adicionar produto ao carrinho.
   * Otimizado com useCallback para evitar re-renderizações.
   */
  const handleAddToCart = useCallback((
    product: Product,
    size: string,
    productPriceType: PriceType,
    quantity: number = 1
  ) => {
    try {
      if (!product || !product.id_produto) {
        console.error('Produto inválido para adicionar ao carrinho');
        return;
      }
      addToCart(product, size, productPriceType, quantity);
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    }
  }, [addToCart]);

  /**
   * Handler para seleção de categoria.
   * Resetar subcategoria quando categoria é deselecionada.
   * Otimizado com useCallback.
   */
  const handleCategorySelect = useCallback((categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId === null) {
      setSelectedSubcategory(null);
    }
  }, []);

  /**
   * Handler para seleção de subcategoria.
   * IMPORTANTE: Garantir que a categoria pai esteja selecionada quando uma subcategoria é selecionada.
   * Otimizado com useCallback.
   */
  const handleSubcategorySelect = useCallback((subcategoryId: number | null) => {
    if (subcategoryId !== null) {
      // Encontrar a categoria pai da subcategoria selecionada
      const parentCategory = categories.find(cat => 
        cat.subcategorias?.some(sub => sub.id_subcategoria === subcategoryId)
      );
      
      // Se encontrou a categoria pai e ela não está selecionada, selecioná-la
      if (parentCategory && selectedCategory !== parentCategory.id_categoria) {
        setSelectedCategory(parentCategory.id_categoria);
      }
    }
    setSelectedSubcategory(subcategoryId);
  }, [categories, selectedCategory]);

  /**
   * Handler para abrir o carrinho.
   * Otimizado com useCallback.
   */
  const handleOpenCart = useCallback(() => {
    setIsDrawerOpen(true);
  }, [setIsDrawerOpen]);

  /**
   * Handler para fechar o carrinho.
   * Otimizado com useCallback.
   */
  const handleCloseCart = useCallback(() => {
    setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);

  return (
    <ProductCatalogContainer>
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
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
      
      {/* Botão flutuante do carrinho */}
      <CartButton
        itemCount={items.length}
        onClick={handleOpenCart}
      />
      
      {/* Sheet do carrinho */}
      <CartSheet
        isOpen={isDrawerOpen}
        onClose={handleCloseCart}
        items={items}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
        companyId={companyId || 0}
        onClearCart={clearCart}
        onUpdateAllItemsPriceType={updateAllItemsPriceType}
        allProducts={products}
        priceType={priceType}
      />
      
      <AdminSettingsButton />
    </ProductCatalogContainer>
  );
};

export default ProductCatalog;
