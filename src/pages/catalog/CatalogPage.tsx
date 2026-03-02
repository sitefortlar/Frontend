import { useLoaderData, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import { CategoryGrid } from '@/components/ProductCatalog/CategoryGrid';
import { CategorySidebar } from '@/components/ProductCatalog/CategorySidebar';
import { ProductCatalogContainer, ProductCatalogContent, ProductCatalogHeader } from '@/components/ProductCatalog/styles';
import CartSheet from '@/components/Cart/CartSheet';
import { CartButton } from '@/components/Cart/CartButton';
import { AdminSettingsButton } from '@/components/ProductCatalog/AdminSettingsButton';
import { useCart } from '@/hooks/useCart';
import type { CatalogLoaderData } from './loader';
import {
  CatalogContainer,
  FloatingElement,
  CatalogLoadingContainer,
  CatalogLoadingContent,
  CatalogLoadingSpinner,
  CatalogLoadingText,
  CatalogErrorContainer,
  CatalogErrorContent,
  CatalogErrorCard,
  CatalogErrorTitle,
  CatalogErrorDescription,
  CatalogErrorButton,
  CatalogContent
} from './styles';

interface CategoryHomeViewProps {
  loaderData: CatalogLoaderData;
  onSelectCategory: (id: number) => void;
  onCategorySidebarSelect: (id: number | null) => void;
}

const CategoryHomeView = ({
  loaderData,
  onSelectCategory,
  onCategorySidebarSelect,
}: CategoryHomeViewProps) => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    lastAddedItem,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
    updateAllItemsPriceType,
    priceType,
  } = useCart();

  return (
    <ProductCatalogContainer>
      <CategorySidebar
        categories={loaderData.categories}
        selectedCategory={null}
        selectedSubcategory={null}
        onCategorySelect={onCategorySidebarSelect}
        onSubcategorySelect={() => {}}
      />
      <ProductCatalogContent>
        <ProductCatalogHeader>
          <h2 className="text-2xl font-bold text-foreground">Explorar categorias</h2>
        </ProductCatalogHeader>
        <CategoryGrid
          categories={loaderData.categories}
          onSelectCategory={onSelectCategory}
        />
      </ProductCatalogContent>
      <CartButton itemCount={items.length} onClick={() => setIsDrawerOpen(true)} />
      <CartSheet
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={items}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
        companyId={loaderData.user?.company?.id_empresa ?? 0}
        onClearCart={clearCart}
        onUpdateAllItemsPriceType={updateAllItemsPriceType}
        allProducts={loaderData.products}
        priceType={priceType}
        lastAddedItem={lastAddedItem}
      />
      <AdminSettingsButton />
    </ProductCatalogContainer>
  );
};

const CatalogPage = () => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const loaderData = useLoaderData() as CatalogLoaderData | undefined;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryIdParam = searchParams.get('category');
  const selectedCategoryId = categoryIdParam ? parseInt(categoryIdParam, 10) : null;
  const isCategoryView = selectedCategoryId !== null && !isNaN(selectedCategoryId);
  const isProductsView = searchParams.get('view') === 'products';

  // Show loading state
  if (isLoading || !loaderData) {
    return (
      <CatalogContainer>
        <FloatingElement top="10%" right="10%" width="8rem" height="8rem" />
        <FloatingElement bottom="20%" left="15%" width="12rem" height="12rem" delay="2s" />
        
        <CatalogLoadingContainer>
          <CatalogLoadingContent>
            <CatalogLoadingSpinner />
            <CatalogLoadingText>Carregando catálogo...</CatalogLoadingText>
          </CatalogLoadingContent>
        </CatalogLoadingContainer>
      </CatalogContainer>
    );
  }

  // Show error state
  if (!isAuthenticated) {
    return (
      <CatalogContainer>
        <FloatingElement top="15%" right="20%" width="6rem" height="6rem" />
        <FloatingElement bottom="25%" left="10%" width="10rem" height="10rem" delay="1.5s" />
        
        <CatalogErrorContainer>
          <CatalogErrorContent>
            <CatalogErrorCard>
              <CatalogErrorTitle>Acesso não autorizado</CatalogErrorTitle>
              <CatalogErrorDescription>
                Você precisa estar logado para acessar o catálogo.
                Faça login para continuar.
              </CatalogErrorDescription>
              <CatalogErrorButton onClick={() => window.location.href = '/login'}>
                Ir para Login
              </CatalogErrorButton>
            </CatalogErrorCard>
          </CatalogErrorContent>
        </CatalogErrorContainer>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      <FloatingElement top="5%" right="5%" width="4rem" height="4rem" />
      <FloatingElement bottom="10%" left="5%" width="6rem" height="6rem" delay="3s" />

      <CatalogContent>
        {loaderData && (
          (isProductsView || isCategoryView) ? (
            <ProductCatalog
              products={loaderData.products}
              categories={loaderData.categories}
              companyId={loaderData.user?.company?.id_empresa}
              initialCategoryId={isCategoryView ? (selectedCategoryId ?? undefined) : undefined}
              onBackToCategories={() => navigate('/catalog')}
            />
          ) : (
            <CategoryHomeView
              loaderData={loaderData}
              onSelectCategory={(id) => navigate(`/catalog?category=${id}`)}
              onCategorySidebarSelect={(id) => navigate(id !== null ? `/catalog?category=${id}` : '/catalog?view=products')}
            />
          )
        )}
      </CatalogContent>
    </CatalogContainer>
  );
};

export default CatalogPage;
