import { useLoaderData, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import { CategoryGrid } from '@/components/ProductCatalog/CategoryGrid';
import { CategorySidebar } from '@/components/ProductCatalog/CategorySidebar';
import { ProductCatalogContainer, ProductCatalogContent, ProductCatalogHeader } from '@/components/ProductCatalog/styles';
import CartSheet from '@/components/Cart/CartSheet';
import { CartButton } from '@/components/Cart/CartButton';
import { AdminSettingsButton } from '@/components/ProductCatalog/AdminSettingsButton';
import { useCart } from '@/hooks/useCart';
import { paths } from '@/routes/paths';
import type { CatalogLoaderData } from './loader';
import {
  CatalogContainer,
  FloatingElement,
  CatalogLoadingContainer,
  CatalogLoadingContent,
  CatalogLoadingSpinner,
  CatalogLoadingText,
  CatalogContent
} from './styles';

interface CategoryHomeViewProps {
  loaderData: CatalogLoaderData;
  onSelectCategory: (id: number) => void;
  onAllCategoriesSelect: () => void;
  onAllProductsSelect: () => void;
}

const CategoryHomeView = ({
  loaderData,
  onSelectCategory,
  onAllCategoriesSelect,
  onAllProductsSelect,
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
        isCategoryHome={true}
        onAllCategoriesSelect={onAllCategoriesSelect}
        onAllProductsSelect={onAllProductsSelect}
        onCategorySelect={onSelectCategory}
        onSubcategorySelect={() => {}}
      />
      <ProductCatalogContent>
        <ProductCatalogHeader>
          <h2 className="text-2xl font-bold text-white">Nossos produtos</h2>
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
  const loaderData = useLoaderData() as CatalogLoaderData | undefined;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryIdParam = searchParams.get('category');
  const selectedCategoryId = categoryIdParam ? parseInt(categoryIdParam, 10) : null;
  const isCategoryView = selectedCategoryId !== null && !isNaN(selectedCategoryId);
  const isAllProductsView = location.pathname === paths.catalogAll;

  // Show loading state
  if (!loaderData) {
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

  return (
    <CatalogContainer>
      <FloatingElement top="5%" right="5%" width="4rem" height="4rem" />
      <FloatingElement bottom="10%" left="5%" width="6rem" height="6rem" delay="3s" />

      <CatalogContent>
        {loaderData && (
          (isAllProductsView || isCategoryView) ? (
            <ProductCatalog
              products={loaderData.products}
              categories={loaderData.categories}
              companyId={loaderData.user?.company?.id_empresa}
              initialCategoryId={isCategoryView ? (selectedCategoryId ?? undefined) : undefined}
              onBackToCategories={() => navigate(paths.catalog)}
              onGoToAllProducts={() => navigate(paths.catalogAll)}
            />
          ) : (
            <CategoryHomeView
              loaderData={loaderData}
              onSelectCategory={(id) => navigate(`/catalog?category=${id}`)}
              onAllCategoriesSelect={() => navigate(paths.catalog)}
              onAllProductsSelect={() => navigate(paths.catalogAll)}
            />
          )
        )}
      </CatalogContent>
    </CatalogContainer>
  );
};

export default CatalogPage;
