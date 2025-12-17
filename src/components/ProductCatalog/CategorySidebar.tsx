import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthContext } from '@/contexts/AuthContext';
import { paths } from '@/routes/paths';
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
  Sparkles,
  Tag,
  Ticket,
  Shield
} from 'lucide-react';
import { Category } from '@/types/Product';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: number | null;
  selectedSubcategory: number | null;
  isLoadingCategories?: boolean;
  onCategorySelect: (categoryId: number | null) => void;
  onSubcategorySelect: (subcategoryId: number | null) => void;
}

export const CategorySidebar = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  isLoadingCategories = false,
  onCategorySelect,
  onSubcategorySelect,
}: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAdmin, isLoading: authLoading } = useAuthContext();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  // Não renderizar seção admin se ainda estiver carregando ou não for admin
  const shouldShowAdminSection = !authLoading && isAdmin;

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
    // Não permitir recolher a categoria ativa (ela deve manter subcategorias visíveis)
    if (newExpanded.has(categoryIdStr) && selectedCategory !== categoryId) {
      newExpanded.delete(categoryIdStr);
    } else {
      newExpanded.add(categoryIdStr);
    }
    setExpandedCategories(newExpanded);
  };

  // Garantir que a categoria ativa esteja sempre expandida
  useEffect(() => {
    if (selectedCategory == null) return;
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.add(String(selectedCategory));
      return next;
    });
  }, [selectedCategory]);

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
      <div className="p-6 border-b border-sidebar-border">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sidebar-primary mb-2">FORTLAR</h1>
          <p className="text-sidebar-foreground/80 text-sm">Utensílios de Qualidade</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {/* Estado de loading: manter layout e evitar tela vazia */}
          {isLoadingCategories && categories.length === 0 && (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="w-full rounded-lg p-3 bg-sidebar-accent/10">
                  <Skeleton className="h-4 w-3/4 bg-white/20" />
                </div>
              ))}
            </div>
          )}

          {!isLoadingCategories && categories.map((category) => (
            <div key={category.id_categoria} className="space-y-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent/20",
                  selectedCategory === category.id_categoria && "bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground"
                )}
                onClick={() => {
                  onCategorySelect(category.id_categoria);
                  onSubcategorySelect(null); // limpar subcategoria ao trocar de categoria
                  toggleCategory(category.id_categoria);
                  setIsMobileOpen(false);
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

        {/* Seção Administrativa - Apenas para admins */}
        {shouldShowAdminSection && (
          <>
            <div className="my-4 border-t border-sidebar-border"></div>
            <div className="px-2 py-2">
              <div className="flex items-center gap-2 mb-2 px-2">
                <Shield className="h-4 w-4 text-sidebar-primary" />
                <span className="text-sm font-semibold text-sidebar-foreground">Administração</span>
              </div>
              <div className="space-y-1">
                <Link to={paths.admin.produtos}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent/20",
                      isActive(paths.admin.produtos) && "bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    <span className="font-medium">Produtos</span>
                  </Button>
                </Link>
                <Link to={paths.admin.descontos}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent/20",
                      isActive(paths.admin.descontos) && "bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    <span className="font-medium">Descontos por Região</span>
                  </Button>
                </Link>
                <Link to={paths.admin.cupons}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left h-auto p-3 text-sidebar-foreground hover:bg-sidebar-accent/20",
                      isActive(paths.admin.cupons) && "bg-sidebar-primary hover:bg-sidebar-primary/80 text-sidebar-primary-foreground"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    <span className="font-medium">Cupons</span>
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
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
          className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg"
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
