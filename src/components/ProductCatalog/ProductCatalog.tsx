import { useEffect, useMemo, useRef, useState } from 'react';
import { Product, Category, PriceType, SortOption } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import CartSheet from '@/components/Cart/CartSheet';
import { productService } from '@/services/products';
import { authService } from '@/services/auth/auth';
import { categoryService } from '@/services/categories';
import { Skeleton } from '@/components/ui/skeleton';
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
  products?: Product[];
  categories?: Category[];
  companyId?: number;
}

interface ProductGridProps {
  products: Product[];
  priceType: 'avista' | 'dias30' | 'dias90';
  onAddToCart?: (product: Product, size: string, priceType: 'avista' | 'dias30' | 'dias90', quantity?: number) => void;
  onAddKitToCart?: (kit: Product, quantity: number, priceType: 'avista' | 'dias30' | 'dias90') => void;
}

const ProductGridComponent = ({ products, priceType, onAddToCart, onAddKitToCart }: ProductGridProps) => {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard
          key={product.id_produto}
          product={product}
          priceType={priceType}
          onAddToCart={onAddToCart}
          onAddKitToCart={onAddKitToCart}
        />
      ))}
    </ProductGrid>
  );
};

export const ProductCatalog = ({ products, categories, companyId }: ProductCatalogProps) => {
  const { 
    items, 
    addToCart,
    addKitToCart,
    removeFromCart, 
    updateQuantity, 
    paymentType,
    setPaymentType,
    isPricingLoading,
    pricingError,
    getTotalPrice,
    getItemCount,
    clearCart, 
    isDrawerOpen, 
    setIsDrawerOpen 
  } = useCart();
  
  const { user } = useAuthContext();

  const [catalogCategories, setCatalogCategories] = useState<Category[]>(categories ?? []);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // Para não sobrescrever a escolha do usuário (ex.: "Todos os Produtos")
  const hasUserInteractedRef = useRef(false);
  const hasLoadedOnceRef = useRef(false);

  const [filters, setFilters] = useState<{
    categoriaId: number | null;
    subcategoriaId: number | null;
    sortBy: SortOption;
    priceType: PriceType;
  }>(() => ({
    categoriaId: categories?.[0]?.id_categoria ?? null,
    subcategoriaId: null,
    sortBy: 'price-low',
    priceType: 'avista',
  }));

  const [displayProducts, setDisplayProducts] = useState<Product[]>(products ?? []);
  // Requisito: começa true e só vira false após categorias + produtos carregados
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Cache de produtos já vistos (evita quebrar carrinho ao trocar de categoria)
  const [productCache, setProductCache] = useState<Map<number, Product>>(() => {
    const map = new Map<number, Product>();
    (products ?? []).forEach((p) => map.set(p.id_produto, p));
    return map;
  });

  // Se receber categories via props, sincronizar
  useEffect(() => {
    if (categories?.length) {
      setCatalogCategories(categories);
      setIsLoadingCategories(false);
      setCategoriesError(null);
      // Só define default (primeira categoria) se o usuário ainda não interagiu
      if (!hasUserInteractedRef.current) {
        setFilters((prev) => ({
          ...prev,
          categoriaId: categories[0].id_categoria,
          subcategoriaId: null,
        }));
      }
    }
  }, [categories]);

  // Buscar categorias no mount (quando não vierem via props)
  const categoriesAbortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    if (categories?.length) return;
    categoriesAbortRef.current?.abort();
    const controller = new AbortController();
    categoriesAbortRef.current = controller;

    setIsLoadingCategories(true);
    setCategoriesError(null);
    setIsLoadingProducts(true); // mantém loader até fechar ciclo completo

    categoryService
      .getCategories(undefined, { signal: controller.signal })
      .then((cats) => {
        setCatalogCategories(cats);
        if (cats?.length) {
          // Default: primeira categoria (não iniciar em "Todos"), se usuário não interagiu
          if (!hasUserInteractedRef.current) {
            setFilters((prev) => ({
              ...prev,
              categoriaId: cats[0].id_categoria,
              subcategoriaId: null,
            }));
          }
        } else {
          setCategoriesError('Nenhuma categoria disponível no momento.');
          setIsLoadingProducts(false);
        }
      })
      .catch((err: any) => {
        if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
        setCategoriesError(err?.message || 'Não foi possível carregar as categorias.');
        setIsLoadingProducts(false);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoadingCategories(false);
      });

    return () => controller.abort();
  }, [categories]);

  // Buscar produtos sempre que categoria/subcategoria mudar (com cancelamento)
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    const isAllProducts = filters.categoriaId === null;
    // Não iniciar em "Todos": se ainda não houve interação do usuário e categoria é null, não buscar
    if (!hasUserInteractedRef.current && isAllProducts) return;

    // Obter estado do usuário: primeiro do localStorage, depois da company do contexto
    let userEstate = authService.getUserEstate();
    if (!userEstate && user?.company?.enderecos && user.company.enderecos.length > 0) {
      userEstate = user.company.enderecos[0].uf;
      // Salvar no localStorage para próximas requisições
      if (userEstate) {
        authService.setUserEstate(userEstate);
      }
    }
    
    // Se ainda não tiver estado, não fazer requisição (backend exige estado)
    if (!userEstate) {
      console.warn('Estado do usuário não encontrado. Aguardando carregamento...');
      return;
    }

    // cancelar requisição anterior se usuário clicar rápido
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoadingProducts(true);
    setProductsError(null);

    productService
      .getProducts(
        isAllProducts
          ? { user_estate: userEstate } // "Todos os Produtos": apenas estado
          : {
              user_estate: userEstate,
              categoria: filters.categoriaId ?? undefined,
              ...(filters.subcategoriaId !== null && filters.subcategoriaId !== undefined 
                ? { subcategoria: filters.subcategoriaId } 
                : {}),
            },
        { signal: controller.signal }
      )
      .then((next) => {
        hasLoadedOnceRef.current = true;
        setDisplayProducts(next);
        setProductCache((prev) => {
          const copy = new Map(prev);
          next.forEach((p) => copy.set(p.id_produto, p));
          return copy;
        });
      })
      .catch((err: any) => {
        // Abort não deve ser tratado como erro para o usuário
        if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
        setProductsError(err?.message || 'Não foi possível carregar os produtos agora.');
        // Só "zera" a lista se estivermos no loader completo (primeiro load ou "Todos os Produtos")
        if (!hasLoadedOnceRef.current || isAllProducts) {
          setDisplayProducts([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoadingProducts(false);
      });

    return () => {
      controller.abort();
    };
  }, [filters.categoriaId, filters.subcategoriaId, user]);

  const sortedProducts = useMemo(() => {
    const list = (displayProducts ?? []).filter((p) => p != null);
    const getPrice = (product: Product) => {
      if (filters.priceType === 'avista') return product.avista ?? product.valor_base ?? 0;
      if (filters.priceType === 'dias30') return product['30_dias'] ?? product.valor_base ?? 0;
      return product['60_dias'] ?? product.valor_base ?? 0;
    };
    return [...list].sort((a, b) => {
      const priceA = getPrice(a);
      const priceB = getPrice(b);
      return filters.sortBy === 'price-high' ? priceB - priceA : priceA - priceB;
    });
  }, [displayProducts, filters.priceType, filters.sortBy]);

  return (
    <ProductCatalogContainer>
      <CategorySidebar
        categories={catalogCategories}
        selectedCategory={filters.categoriaId}
        selectedSubcategory={filters.subcategoriaId}
        isLoadingCategories={isLoadingCategories}
        onCategorySelect={(categoriaId) => {
          hasUserInteractedRef.current = true;
          setFilters((prev) => ({
            ...prev,
            categoriaId,
            subcategoriaId: null, // limpar subcategoria ao trocar de categoria
          }));
        }}
        onSubcategorySelect={(subcategoriaId) => {
          hasUserInteractedRef.current = true;
          setFilters((prev) => ({
            ...prev,
            subcategoriaId,
          }));
        }}
      />
      
      <ProductCatalogContent>
        <ProductCatalogHeader>
          <FilterBar
            sortBy={filters.sortBy}
            onSortChange={(sortBy) => setFilters((prev) => ({ ...prev, sortBy }))}
            productCount={sortedProducts.length}
            isUpdating={
              // Loader completo apenas no primeiro carregamento ou em "Todos os Produtos"
              isLoadingProducts && hasLoadedOnceRef.current && filters.categoriaId !== null
            }
          />
        </ProductCatalogHeader>

        {categoriesError && (
          <div className="py-10 text-center text-muted-foreground">
            {categoriesError}
          </div>
        )}

        {/* Loader completo apenas no primeiro carregamento OU na categoria "Todos os Produtos" */}
        {!categoriesError && isLoadingProducts && (!hasLoadedOnceRef.current || filters.categoriaId === null) && (
          <>
            <div className="py-10 text-center">
              <div className="mx-auto w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <div className="mt-6 text-lg font-semibold text-foreground">
                Estamos preparando os produtos para você
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Aguarde um instante enquanto carregamos a melhor experiência para sua navegação.
              </div>
            </div>

            <ProductGrid>
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border bg-background/40">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </ProductGrid>
          </>
        )}

        {!categoriesError && !isLoadingProducts && productsError && (
          <div className="py-10 text-center text-muted-foreground">
            {productsError}
          </div>
        )}

        {!categoriesError && !isLoadingProducts && !productsError && sortedProducts.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            Nenhum produto encontrado para esta categoria.
          </div>
        )}

        {/* Para categorias normais: mantém a lista visível mesmo durante refresh (sem loader completo) */}
        {!categoriesError &&
          (!isLoadingProducts || (hasLoadedOnceRef.current && filters.categoriaId !== null)) &&
          !productsError && (
          <ProductGridComponent
            products={sortedProducts}
            priceType={filters.priceType}
            onAddToCart={addToCart}
            onAddKitToCart={addKitToCart}
          />
        )}
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
        paymentType={paymentType}
        onPaymentTypeChange={setPaymentType}
        isPricingLoading={isPricingLoading}
        pricingError={pricingError}
        allProducts={Array.from(productCache.values())}
        getTotalPrice={getTotalPrice}
        companyId={companyId || 0}
        onClearCart={clearCart}
      />
    </ProductCatalogContainer>
  );
};

export default ProductCatalog;
