
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight, Menu, X, Package, Utensils, ChefHat, Coffee, Soup } from 'lucide-react';
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

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'panelas-pressao': return ChefHat;
      case 'panelas-cacarolas': return Soup;
      case 'caldeiroes': return Package;
      case 'canecoes-fervedores': return Coffee;
      case 'frigideiras': return Utensils;
      case 'formas-assadeiras': return Package;
      default: return Package;
    }
  };

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
    <div className="h-full flex flex-col bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-400 mb-2">FORTLAR</h1>
          <p className="text-slate-300 text-sm">Utensílios de Qualidade</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left h-auto p-3 text-white hover:bg-slate-700",
              selectedCategory === null && "bg-orange-500 hover:bg-orange-600"
            )}
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
                variant="ghost"
                className={cn(
                  "w-full justify-between text-left h-auto p-3 text-white hover:bg-slate-700",
                  selectedCategory === category.id && "bg-orange-500 hover:bg-orange-600"
                )}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = getCategoryIcon(category.id);
                    return <IconComponent className="h-4 w-4" />;
                  })()}
                  <span className="font-medium">{category.name}</span>
                </div>
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
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-left h-auto p-2 pl-4 text-slate-300 hover:bg-slate-700",
                        selectedSubcategory === subcategory.id && "bg-orange-400 text-white hover:bg-orange-500"
                      )}
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
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="hidden lg:block fixed left-0 top-0 h-full w-80 shadow-xl z-40">
        {sidebarContent}
      </div>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] shadow-xl animate-slide-in">
            <div className="absolute right-4 top-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
                className="text-white hover:bg-slate-700"
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
