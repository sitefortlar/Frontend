import { useState, useMemo } from 'react';
import { Product, Category } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { Pagination } from '@/components/Pagination';
import { ShoppingCart, Loader2 } from 'lucide-react';
import CartSheet from '@/components/Cart/CartSheet';
import { AdminSettingsButton } from './AdminSettingsButton';
import { useAuthContext } from '@/contexts/AuthContext';
import { authService } from '@/services/auth/auth';
import { ProductSkeletonLoader } from './ProductSkeletonLoader';
import {
  ProductCatalogContainer,
  ProductCatalogContent,
  ProductCatalogHeader,
  ProductGrid,
  CartButton,
  CartBadge
} from './styles';

interface ProductCatalogProps {
  products?: Product[]; // Opcional para compatibilidade com loader
  categories: Category[];
  companyId?: number;
  usePagination?: boolean; // Flag para habilitar paginação (padrão: true)
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

export const ProductCatalog = ({ 
  products: initialProducts, 
  categories, 
  companyId,
  usePagination: enablePagination = true 
}: ProductCatalogProps) => {
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

  const { isAdmin } = useAuthContext();
  
  // Estado para filtros locais
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'price-high' | 'price-low'>('price-low');
  const [priceType, setPriceType] = useState<'avista' | 'dias30' | 'dias90'>('avista');

  // Obter user_estate do localStorage
  const userEstate = authService.getUserEstate() || '';

  // Usar hook de paginação se:
  // 1. Paginação está habilitada E
  // 2. (Não há produtos iniciais OU produtos iniciais estão vazios OU uma categoria/subcategoria está selecionada)
  // Isso garante que quando o usuário seleciona uma categoria, os produtos são carregados da API
  // Mas se não houver filtro selecionado e houver produtos iniciais, usa os produtos iniciais
  const hasInitialProducts = initialProducts && initialProducts.length > 0;
  const hasFilterSelected = selectedCategory !== null || selectedSubcategory !== null;
  const shouldUsePagination = enablePagination && (
    !hasInitialProducts || 
    hasFilterSelected
  );
  
  // Hook de paginação - só faz requisições quando shouldUsePagination for true
  const paginationResult = useProducts({
    estado: userEstate,
    id_category: selectedCategory || undefined,
    id_subcategory: selectedSubcategory || undefined,
    order_price: sortBy === 'price-high' ? 'DESC' : 'ASC',
    active_only: true,
    initialPageSize: 100,
    enabled: shouldUsePagination, // Só fazer requisições quando necessário
  });

  // Usar produtos paginados ou produtos iniciais
  const products = shouldUsePagination 
    ? paginationResult.products 
    : (initialProducts || []);
  
  /**
   * ESTADO DE LOADING LOCAL (não global):
   * 
   * productsLoading: Controla apenas o loading da área de produtos.
   * Este estado NÃO afeta o menu lateral, que permanece sempre visível e interativo.
   * 
   * Separado de estados globais como:
   * - Carregamento inicial da aplicação (CatalogPage)
   * - Autenticação (useAuthGuard)
   * - Ações críticas (checkout, etc)
   */
  const productsLoading = shouldUsePagination ? paginationResult.loading : false;
  const productsError = shouldUsePagination ? paginationResult.error : null;
  const page = shouldUsePagination ? paginationResult.page : 1;
  const pageSize = shouldUsePagination ? paginationResult.pageSize : 100;
  const setPage = shouldUsePagination ? paginationResult.setPage : () => {};
  const setPageSize = shouldUsePagination ? paginationResult.setPageSize : () => {};
  const totalItems = shouldUsePagination ? paginationResult.totalItems : undefined;

  // Aplicar filtros locais (para ordenação por preço que não está no backend)
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => product != null);

    // Se não estiver usando paginação, aplicar filtros de categoria localmente
    if (!shouldUsePagination) {
      if (selectedCategory) {
        filtered = filtered.filter(product => 
          product.id_categoria === selectedCategory
        );
      }

      if (selectedSubcategory) {
        filtered = filtered.filter(product => 
          product.id_subcategoria === selectedSubcategory
        );
      }
    }

    // Ordenação local por preço (pode ser sobrescrita pelo backend se order_price for usado)
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const getPrice = (product: Product) => {
        if (priceType === 'avista') {
          return product.avista || product.valor_base || 0;
        } else if (priceType === 'dias30') {
          return product['30_dias'] || product.valor_base || 0;
        } else if (priceType === 'dias90') {
          return product['60_dias'] || product.valor_base || 0;
        }
        return product.avista || product.valor_base || 0;
      };

      const priceA = getPrice(a);
      const priceB = getPrice(b);

      if (sortBy === 'price-high') {
        return priceB - priceA;
      } else {
        return priceA - priceB;
      }
    });

    return sorted;
  }, [products, selectedCategory, selectedSubcategory, sortBy, priceType, shouldUsePagination]);

  // Calcular total de páginas se tivermos totalItems
  // Se totalItems for 0, ainda temos 1 página (vazia)
  const totalPages = totalItems !== undefined 
    ? Math.max(1, Math.ceil(totalItems / pageSize))
    : undefined;

  /**
   * SEPARAÇÃO DE RESPONSABILIDADES DE LOADING:
   * 
   * - isProductsLoading: Estado local que controla apenas o loading da área de produtos.
   *   NÃO afeta o menu lateral, que permanece visível e interativo.
   * 
   * - Loader global (fullscreen) foi removido para melhorar UX:
   *   - Menu lateral permanece visível durante carregamento
   *   - Usuário mantém contexto visual
   *   - Transições mais fluidas
   * 
   * - Loader local é exibido apenas na área de produtos (ProductCatalogContent)
   *   quando há mudança de categoria, subcategoria, ordenação ou paginação.
   */

  return (
    <ProductCatalogContainer>
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          // Sempre resetar para primeira página ao mudar categoria
          // (setPage é uma função vazia se não estiver usando paginação)
          setPage(1);
        }}
        onSubcategorySelect={(subcategory) => {
          setSelectedSubcategory(subcategory);
          // Sempre resetar para primeira página ao mudar subcategoria
          // (setPage é uma função vazia se não estiver usando paginação)
          setPage(1);
        }}
      />
      
      <ProductCatalogContent>
        <ProductCatalogHeader>
          <FilterBar
            sortBy={sortBy}
            onSortChange={(newSortBy) => setSortBy(newSortBy)}
            productCount={filteredProducts.length}
          />
        </ProductCatalogHeader>
        
        {/* LOADER LOCAL: Exibido apenas na área de produtos, não bloqueia menu lateral */}
        {shouldUsePagination && productsLoading ? (
          <ProductSkeletonLoader />
        ) : shouldUsePagination && productsError ? (
          /* ERRO LOCAL: Exibido apenas na área de produtos */
          <div className="flex-1 flex items-center justify-center min-h-[60vh] w-full py-12">
            <div className="flex flex-col items-center space-y-4 text-center px-4 max-w-md">
              <p className="text-red-400 text-lg font-semibold">Erro ao carregar produtos</p>
              <p className="text-white/70 text-sm">{productsError}</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex-1 flex items-center justify-center min-h-[60vh] w-full py-12">
            <div className="flex flex-col items-center space-y-4 text-center px-4">
              <p className="text-white text-lg font-medium">Nenhum produto encontrado</p>
              <p className="text-white/70 text-sm">Tente ajustar os filtros ou selecione outra categoria</p>
            </div>
          </div>
        ) : (
          <ProductGridComponent
            products={filteredProducts}
            priceType={priceType}
            onAddToCart={addToCart}
          />
        )}
        
        {/* Paginação sempre visível quando estiver usando paginação e não estiver em loading */}
        {shouldUsePagination && !productsLoading && (
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              totalItems={totalItems}
              showPageSizeSelector={true}
              pageSizeOptions={[25, 50, 100, 200]}
            />
          </div>
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
