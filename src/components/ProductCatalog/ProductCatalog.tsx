import { useState, useMemo } from 'react';
import { CategorySidebar } from './CategorySidebar';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';
import { categories, products } from '@/data/products';
import { FilterState, Product } from '@/types/Product';

export const ProductCatalog = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSize: null,
    showKitsOnly: false,
    sortBy: 'name',
    priceType: 'vista',
  });

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

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-high':
          return b.prices[filters.priceType] - a.prices[filters.priceType];
        case 'price-low':
          return a.prices[filters.priceType] - b.prices[filters.priceType];
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Sidebar */}
      <CategorySidebar
        categories={categories}
        selectedCategory={filters.selectedCategory}
        selectedSubcategory={filters.selectedSubcategory}
        onCategorySelect={(categoryId) =>
          setFilters((prev) => ({ ...prev, selectedCategory: categoryId, selectedSubcategory: null }))
        }
        onSubcategorySelect={(subcategoryId) =>
          setFilters((prev) => ({ ...prev, selectedSubcategory: subcategoryId }))
        }
      />

      {/* Main content */}
      <div className="lg:ml-80 min-h-screen">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-8 pt-16 lg:pt-0">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              {filters.selectedCategory
                ? categories.find((c) => c.id === filters.selectedCategory)?.name
                : 'Todos os Produtos'}
            </h1>
            {filters.selectedSubcategory && (
              <p className="text-lg text-muted-foreground">
                {categories
                  .find((c) => c.id === filters.selectedCategory)
                  ?.subcategories.find((s) => s.id === filters.selectedSubcategory)?.name}
              </p>
            )}
          </div>

          {/* Filters */}
          <div className="mb-8">
            <FilterBar
              selectedSize={filters.selectedSize}
              showKitsOnly={filters.showKitsOnly}
              sortBy={filters.sortBy}
              priceType={filters.priceType}
              availableSizes={availableSizes}
              onSizeChange={(size) => setFilters((prev) => ({ ...prev, selectedSize: size }))}
              onKitsToggle={() => setFilters((prev) => ({ ...prev, showKitsOnly: !prev.showKitsOnly }))}
              onSortChange={(sort) => setFilters((prev) => ({ ...prev, sortBy: sort }))}
              onPriceTypeChange={(priceType) => setFilters((prev) => ({ ...prev, priceType }))}
              productCount={filteredProducts.length}
            />
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} priceType={filters.priceType} />
        </div>
      </div>
    </div>
  );
};