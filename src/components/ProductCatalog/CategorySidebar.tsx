import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Category } from '@/types/Product';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onSubcategorySelect: (subcategoryId: string | null) => void;
}

export const CategorySidebar = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect,
}: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategorySelect(null);
      onSubcategorySelect(null);
    } else {
      onCategorySelect(categoryId);
      onSubcategorySelect(null);
      if (!expandedCategories.has(categoryId)) {
        toggleCategory(categoryId);
      }
    }
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    if (selectedSubcategory === subcategoryId) {
      onSubcategorySelect(null);
    } else {
      onSubcategorySelect(subcategoryId);
    }
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
          Catálogo de Produtos
        </h2>
        <p className="text-muted-foreground mt-1">Utensílios de Cozinha</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {/* All Products Option */}
          <Button
            variant={selectedCategory === null ? "category" : "ghost"}
            className="w-full justify-start text-left h-auto p-3"
            onClick={() => {
              onCategorySelect(null);
              onSubcategorySelect(null);
              setIsMobileOpen(false);
            }}
          >
            Todos os Produtos
          </Button>

          {categories.map((category) => (
            <div key={category.id} className="space-y-1">
              <Button
                variant={selectedCategory === category.id ? "category" : "ghost"}
                className="w-full justify-between text-left h-auto p-3"
                onClick={() => handleCategorySelect(category.id)}
              >
                <span className="font-medium">{category.name}</span>
                {expandedCategories.has(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {expandedCategories.has(category.id) && (
                <div className="ml-4 space-y-1 animate-fade-in">
                  {category.subcategories.map((subcategory) => (
                    <Button
                      key={subcategory.id}
                      variant={selectedSubcategory === subcategory.id ? "kitchen" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2 pl-4"
                      onClick={() => handleSubcategorySelect(subcategory.id)}
                    >
                      {subcategory.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="kitchen"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="shadow-warm"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-80 bg-card border-r border-border shadow-medium z-40">
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-card shadow-warm animate-slide-in">
            <div className="absolute right-4 top-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};