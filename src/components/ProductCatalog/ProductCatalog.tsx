import { useState, useMemo, useCallback, useEffect } from 'react';
import { Product, Category, PriceType, SortOption } from '@/types/Product';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';
import { AdminSettingsButton } from './AdminSettingsButton';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/Cart/CartSheet';
import { CartButton } from '@/components/Cart/CartButton';
import { productService } from '@/services/products';
import { authService } from '@/services/auth/auth';
import { Loader2 } from 'lucide-react';
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
  products: initialProducts,
  categories,
  companyId,
}: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  
  // Hook do carrinho com todas as funções necessárias
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    lastAddedItem,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
    updateAllItemsPriceType,
    priceType,
    rebuildAllItemsPrices,
  } = useCart();

  // Atualizar produtos quando produtos iniciais mudarem (primeiro carregamento)
  useEffect(() => {
    // Só atualizar se não houver filtros selecionados
    if (selectedCategory === null && selectedSubcategory === null) {
      setProducts(initialProducts);
    }
  }, [initialProducts, selectedCategory, selectedSubcategory]);

  // Reconstruir prices quando produtos estiverem disponíveis
  useEffect(() => {
    if (products && products.length > 0) {
      rebuildAllItemsPrices(products);
    }
  }, [products, rebuildAllItemsPrices]);

  // Fazer chamada à API quando categoria ou subcategoria for selecionada
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      // Se nenhum filtro está selecionado, usar produtos iniciais
      if (selectedCategory === null && selectedSubcategory === null) {
        setProducts(initialProducts);
        return;
      }

      setLoading(true);
      try {
        // Obter user_estate do authService
        const userEstate = authService.getUserEstate();
        
        // Preparar filtros para a API
        const filters: {
          user_estate?: string | null;
          id_category?: number;
          id_subcategory?: number;
        } = {
          user_estate: userEstate,
        };

        // Adicionar filtro de categoria se selecionada
        if (selectedCategory !== null) {
          filters.id_category = Number(selectedCategory);
        }

        // Adicionar filtro de subcategoria se selecionada
        if (selectedSubcategory !== null) {
          filters.id_subcategory = Number(selectedSubcategory);
        }

        console.log('🔍 Buscando produtos com filtros:', filters);
        
        // Fazer chamada à API
        const filteredProducts = await productService.getProducts(filters);
        
        console.log('✅ Produtos recebidos:', filteredProducts.length);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('❌ Erro ao buscar produtos filtrados:', error);
        // Em caso de erro, manter produtos iniciais ou array vazio
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSubcategory]);

  // Sincronizar categoria pai quando subcategoria é selecionada
  // IMPORTANTE: Garantir que a categoria pai esteja selecionada quando uma subcategoria é selecionada
  useEffect(() => {
    if (selectedSubcategory !== null) {
      // Encontrar a categoria pai da subcategoria selecionada
      const parentCategory = categories.find(cat => 
        cat.subcategorias?.some(sub => Number(sub.id_subcategoria) === Number(selectedSubcategory))
      );
      
      // Se encontrou a categoria pai e ela não está selecionada, selecioná-la
      if (parentCategory) {
        const parentCategoryId = Number(parentCategory.id_categoria);
        const currentCategoryId = selectedCategory !== null ? Number(selectedCategory) : null;
        
        if (currentCategoryId !== parentCategoryId) {
          setSelectedCategory(parentCategoryId);
        }
      }
    }
  }, [selectedSubcategory, selectedCategory, categories]);

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
      // Usar comparação estrita com conversão para garantir que funciona mesmo se os tipos forem diferentes
      if (selectedCategory !== null) {
        const beforeFilter = filtered.length;
        filtered = filtered.filter(
          (product) => {
            if (!product) return false;
            // Converter ambos para Number para garantir comparação correta
            const productCategoryId = Number(product.id_categoria);
            const selectedCategoryId = Number(selectedCategory);
            const matches = productCategoryId === selectedCategoryId;
            return matches;
          }
        );
      }

      // IMPORTANTE: Filtrar por subcategoria DEPOIS (dentro da categoria selecionada)
      // Isso garante que apenas subcategorias da categoria selecionada sejam consideradas
      if (selectedSubcategory !== null) {
        filtered = filtered.filter(
          (product) => {
            if (!product) return false;
            // Converter ambos para Number para garantir comparação correta
            const productSubcategoryId = Number(product.id_subcategoria);
            const selectedSubcategoryId = Number(selectedSubcategory);
            const matches = productSubcategoryId === selectedSubcategoryId;
            return matches;
          }
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
   * Resetar subcategoria quando categoria é deselecionada ou quando uma nova categoria é selecionada.
   * Otimizado com useCallback.
   */
  const handleCategorySelect = useCallback((categoryId: number | null) => {
    setSelectedCategory(categoryId);
    // Sempre limpar subcategoria ao selecionar nova categoria
    setSelectedSubcategory(null);
  }, []);

  /**
   * Handler para seleção de subcategoria.
   * IMPORTANTE: O useEffect acima garante que a categoria pai seja selecionada automaticamente.
   * Otimizado com useCallback.
   */
  const handleSubcategorySelect = useCallback((subcategoryId: number | null) => {
    setSelectedSubcategory(subcategoryId !== null ? Number(subcategoryId) : null);
  }, []);

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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-muted-foreground">Carregando produtos...</span>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            priceType={priceType}
            onAddToCart={handleAddToCart}
          />
        )}
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
        lastAddedItem={lastAddedItem}
      />
      
      <AdminSettingsButton />
    </ProductCatalogContainer>
  );
};

export default ProductCatalog;
