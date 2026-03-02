import { useState, useMemo, useCallback, useEffect } from 'react';
import { Product, Category, PriceType, SortOption } from '@/types/Product';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';
import { AdminSettingsButton } from './AdminSettingsButton';
import { Pagination } from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/Cart/CartSheet';
import { CartButton } from '@/components/Cart/CartButton';
import { productService } from '@/services/products';
import { authService } from '@/services/auth/auth';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/routes/paths';
import {
  ProductCatalogContainer,
  ProductCatalogContent,
  ProductCatalogHeader,
} from './styles';

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  companyId?: number;
  /** Quando definido, a listagem abre já com esta categoria selecionada (página de categoria). */
  initialCategoryId?: number;
  /** Chamado quando o usuário escolhe "Todos os Produtos" na sidebar; usado para voltar à tela de categorias. */
  onBackToCategories?: () => void;
  /** Chamado quando o usuário escolhe "Todos os Produtos" na sidebar; usado para navegar para /catalog/all. */
  onGoToAllProducts?: () => void;
}

export const ProductCatalog = ({
  products: initialProducts,
  categories,
  companyId,
  initialCategoryId,
  onBackToCategories,
  onGoToAllProducts,
}: ProductCatalogProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    initialCategoryId != null ? initialCategoryId : null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  const {
    page,
    pageSize,
    skip,
    limit,
    setPage,
    resetPagination,
  } = usePagination(1, 20);
  
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

  // Sincronizar categoria quando initialCategoryId mudar (ex.: navegação por URL)
  useEffect(() => {
    if (initialCategoryId != null) {
      setSelectedCategory(initialCategoryId);
      setSelectedSubcategory(null);
    } else if (onGoToAllProducts) {
      // /catalog/all: limpar filtros
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  }, [initialCategoryId]);

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

  // Resetar paginação quando filtros/ordenação mudarem
  useEffect(() => {
    resetPagination();
  }, [selectedCategory, selectedSubcategory, sortBy, resetPagination]);

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

      const getProductPrice = (p: Product): number => {
        if (priceType === 'avista') return (p?.avista ?? p?.valor_base ?? 0) as number;
        if (priceType === 'dias30') return (p?.['30_dias'] ?? p?.valor_base ?? 0) as number;
        return (p?.['60_dias'] ?? p?.valor_base ?? 0) as number;
      };

      // Ordenar produtos
      const sorted = [...filtered];
      sorted.sort((a, b) => {
        try {
          if (sortBy === 'name-asc' || sortBy === 'name-desc') {
            const nameA = (a?.nome ?? '').toString();
            const nameB = (b?.nome ?? '').toString();
            const cmp = nameA.localeCompare(nameB, 'pt-BR', { sensitivity: 'base' });
            return sortBy === 'name-asc' ? cmp : -cmp;
          }

          const priceA = getProductPrice(a);
          const priceB = getProductPrice(b);

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
   */
  const handleCategorySelect = useCallback((categoryId: number) => {
    navigate(`${paths.catalog}?category=${categoryId}`);
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  }, [navigate]);

  const handleAllProductsSelect = useCallback(() => {
    onGoToAllProducts?.();
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    resetPagination();
  }, [onGoToAllProducts, resetPagination]);

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

  const shouldPaginate = selectedCategory === null && selectedSubcategory === null;
  const totalItems = filteredProducts.length;
  const totalPages = shouldPaginate ? Math.max(1, Math.ceil(totalItems / pageSize)) : undefined;
  const paginatedProducts = shouldPaginate
    ? filteredProducts.slice(skip, skip + limit)
    : filteredProducts;

  return (
    <ProductCatalogContainer>
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onAllProductsSelect={handleAllProductsSelect}
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
      />
      <ProductCatalogContent>
        <ProductCatalogHeader>
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            productCount={filteredProducts.length}
            onBackToCategories={onBackToCategories}
          />
        </ProductCatalogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-12 px-4 sm:px-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-muted-foreground">Carregando produtos...</span>
          </div>
        ) : (
          <>
            <ProductGrid
              products={paginatedProducts}
              priceType={priceType}
              onAddToCart={handleAddToCart}
            />
            {shouldPaginate && totalItems > pageSize && (
              <div className="px-4 sm:px-6 pb-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  totalItems={totalItems}
                />
              </div>
            )}
          </>
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
