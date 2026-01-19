import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Cloud,
  CookingPot,
  ChefHat,
  Coffee,
  Flame,
  CakeSlice,
  UtensilsCrossed,
  Soup,
  Package,
  Container,
  Filter,
  ShoppingBag,
  Archive,
  Milk,
  Wheat,
  Droplets,
  GlassWater,
  Refrigerator,
  Beer,
  Sparkles
} from 'lucide-react';
import { Category } from '@/types/Product';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: number | null;
  selectedSubcategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
  onSubcategorySelect: (subcategoryId: number | null) => void;
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

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    
    // Mapeamento específico baseado no nome da categoria
    if (name.includes('pressão') || name.includes('pressao')) {
      return Cloud; // Fumaça/vapor para panela de pressão
    } else if (name.includes('caldeirão') || name.includes('caldeirao') || name.includes('caldeiroes')) {
      return Soup;
    } else if (name.includes('jarra')) {
      return Coffee;
    } else if (name.includes('marmita')) {
      return Container;
    } else if (name.includes('concha')) {
      return Soup;
    } else if (name.includes('filtra') || name.includes('óleo') || name.includes('oleo')) {
      return Filter;
    } else if (name.includes('feirinha') || name.includes('kit')) {
      return ShoppingBag;
    } else if (name.includes('bacia') || name.includes('balde')) {
      return Container;
    } else if (name.includes('depósito') || name.includes('deposito') || name.includes('alimento')) {
      return Archive;
    } else if (name.includes('pipoqueira')) {
      return Sparkles; // Pipoca estourando/faiscando
    } else if (name.includes('latão') || name.includes('latao') || name.includes('leite')) {
      return Milk;
    } else if (name.includes('espagueteira') || name.includes('macarrão') || name.includes('macarrao')) {
      return Wheat;
    } else if (name.includes('moringa')) {
      return Droplets;
    } else if (name.includes('wok')) {
      return UtensilsCrossed;
    } else if (name.includes('cuscuzeira')) {
      return ChefHat;
    } else if (name.includes('blue')) {
      return Refrigerator;
    } else if (name.includes('copo')) {
      return GlassWater;
    } else if (name.includes('panela') || name.includes('caçarola') || name.includes('cacarola')) {
      return CookingPot;
    } else if (name.includes('frigideira')) {
      return UtensilsCrossed;
    } else if (name.includes('forma') || name.includes('assadeira')) {
      return CakeSlice;
    } else if (name.includes('canecão') || name.includes('canecao') || name.includes('fervedor')) {
      return Coffee;
    }
    
    return CookingPot; // Ícone padrão
  };

  const toggleCategory = (categoryId: number) => {
    const categoryIdStr = String(categoryId);
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryIdStr)) {
      newExpanded.delete(categoryIdStr);
    } else {
      newExpanded.add(categoryIdStr);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (categoryId: number) => {
    // Apenas expandir/retrair categoria sem selecionar
    toggleCategory(categoryId);
  };

  const handleCategorySelect = (categoryId: number) => {
    // Selecionar categoria
    if (selectedCategory === categoryId) {
      onCategorySelect(null);
      onSubcategorySelect(null);
    } else {
      onCategorySelect(categoryId);
      onSubcategorySelect(null);
      // Expandir categoria quando selecionada
      const newExpanded = new Set(expandedCategories);
      newExpanded.add(String(categoryId));
      setExpandedCategories(newExpanded);
    }
  };

  const handleSubcategorySelect = (subcategoryId: number) => {
    if (selectedSubcategory === subcategoryId) {
      onSubcategorySelect(null);
    } else {
      onSubcategorySelect(subcategoryId);
    }
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col" style={{ background: 'var(--gradient-sidebar)' }}>
      <div className="p-6 border-b border-sidebar-border flex-shrink-0">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sidebar-primary mb-2">FORTLAR</h1>
          <p className="text-sidebar-foreground/80 text-sm">Utensílios de Qualidade</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent/20",
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
            <div key={category.id_categoria} className="space-y-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent/20",
                  selectedCategory === category.id_categoria && "bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground"
                )}
                onClick={() => {
                  handleCategorySelect(category.id_categoria);
                  handleCategoryClick(category.id_categoria);
                }}
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = getCategoryIcon(category.nome);
                    return <IconComponent className="h-4 w-4" />;
                  })()}
                  <span className="font-medium">{category.nome}</span>
                </div>
                {expandedCategories.has(String(category.id_categoria)) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {expandedCategories.has(String(category.id_categoria)) && (
                <div className="ml-4 space-y-1 animate-fade-in">
                  {category.subcategorias.map((subcategory) => (
                    <Button
                      key={subcategory.id_subcategoria}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-left h-auto p-2 pl-4 text-sidebar-foreground/70 hover:bg-sidebar-accent/20",
                        selectedSubcategory === subcategory.id_subcategoria && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80"
                      )}
                      onClick={() => handleSubcategorySelect(subcategory.id_subcategoria)}
                    >
                      {subcategory.nome}
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
      {/* Mobile: Botão para abrir menu */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop: Sidebar integrado ao layout flex */}
      <div className="hidden lg:block w-80 flex-shrink-0 h-screen relative z-40 shadow-xl">
        {sidebarContent}
      </div>

      {/* Mobile: Overlay com sidebar */}
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
                className="text-sidebar-foreground hover:bg-sidebar-accent/20"
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
