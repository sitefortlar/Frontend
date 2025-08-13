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

  const handleCategoryClick = (categoryId: string) => {
    // Apenas expandir/retrair categoria sem selecionar
    toggleCategory(categoryId);
  };

  const handleCategorySelect = (categoryId: string) => {
    // Selecionar categoria
    if (selectedCategory === categoryId) {
      onCategorySelect(null);
      onSubcategorySelect(null);
    } else {
      onCategorySelect(categoryId);
      onSubcategorySelect(null);
      // Expandir categoria quando selecionada
      const newExpanded = new Set(expandedCategories);
      newExpanded.add(categoryId);
      setExpandedCategories(newExpanded);
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
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="p-6 border-b border-sidebar-border">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sidebar-primary mb-2">FORTLAR</h1>
          <p className="text-sidebar-accent-foreground text-sm">Utensílios de Qualidade</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent",
              selectedCategory === null && "bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground"
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
                  "w-full justify-between text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent",
                  selectedCategory === category.id && "bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground"
                )}
                onClick={() => {
                  handleCategorySelect(category.id);
                  handleCategoryClick(category.id);
                }}
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
                        "w-full justify-start text-left h-auto p-2 pl-4 text-sidebar-accent-foreground hover:bg-sidebar-accent",
                        selectedSubcategory === subcategory.id && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80"
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
          className="bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground shadow-lg"
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
                className="text-sidebar-foreground hover:bg-sidebar-accent"
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
