import { useState, useEffect, useCallback, memo } from 'react';
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

/**
 * Componente de menu lateral de categorias com subcategorias.
 * 
 * Comportamento implementado:
 * - Categorias com subcategorias exibem chevron (▸ quando fechado, ▾ quando aberto)
 * - Ao clicar em categoria principal: submenu abre e permanece aberto
 * - Ao clicar em subcategoria: submenu NÃO fecha, subcategoria recebe estado ativo
 * - Submenu fecha APENAS quando outra categoria principal é selecionada
 * - Estados visuais distintos para categoria ativa e subcategoria ativa
 * - Estado controlado por React state, sincronizado com props
 */
export const CategorySidebar = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect,
}: CategorySidebarProps) => {
  // Estado de expansão: controla quais categorias têm submenu aberto
  // Usa Set para performance e facilidade de manipulação
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /**
   * Sincroniza o estado de expansão com a categoria selecionada.
   * 
   * Regra: Se uma categoria tem subcategorias e está selecionada,
   * seu submenu deve estar aberto automaticamente.
   * 
   * Quando outra categoria é selecionada, apenas ela deve estar expandida.
   */
  useEffect(() => {
    if (selectedCategory === null) {
      // Se nenhuma categoria está selecionada, fechar todos os submenus
      setExpandedCategories(new Set());
      return;
    }

    // Encontrar a categoria selecionada (usar conversão para Number para garantir comparação correta)
    const selectedCategoryId = Number(selectedCategory);
    const category = categories.find(cat => Number(cat.id_categoria) === selectedCategoryId);
    
    if (category && category.subcategorias && category.subcategorias.length > 0) {
      // Se a categoria tem subcategorias, garantir que está expandida
      // e fechar todas as outras
      setExpandedCategories(new Set([selectedCategoryId]));
    } else {
      // Se não tem subcategorias, fechar todos os submenus
      setExpandedCategories(new Set());
    }
  }, [selectedCategory, categories]);

  /**
   * Verifica se uma categoria possui subcategorias.
   * Usado para determinar se deve exibir o chevron.
   */
  const hasSubcategories = (category: Category): boolean => {
    return !!(category.subcategorias && category.subcategorias.length > 0);
  };

  /**
   * Verifica se uma categoria está expandida (submenu aberto).
   */
  const isExpanded = (categoryId: number): boolean => {
    return expandedCategories.has(categoryId);
  };

  /**
   * Retorna o ícone apropriado para cada categoria baseado no nome.
   * Mantém a lógica existente de mapeamento de ícones.
   */
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

  /**
   * Handler para seleção de categoria principal.
   * 
   * Comportamento:
   * - Seleciona a categoria
   * - Limpa a subcategoria selecionada (se houver)
   * - O estado de expansão é gerenciado pelo useEffect baseado na categoria selecionada
   * - Se a categoria tem subcategorias, o submenu será aberto automaticamente
   * Otimizado com useCallback para evitar re-renderizações.
   */
  const handleCategorySelect = useCallback((categoryId: number) => {
    try {
      onCategorySelect(categoryId);
      onSubcategorySelect(null); // Limpar subcategoria ao selecionar nova categoria
      // Nota: O estado de expansão é gerenciado pelo useEffect acima
    } catch (error) {
      console.error('Erro ao selecionar categoria:', error);
    }
  }, [onCategorySelect, onSubcategorySelect]);

  /**
   * Handler para seleção de subcategoria.
   * 
   * Comportamento:
   * - Seleciona a subcategoria
   * - NÃO fecha o submenu (mantém o estado de expansão)
   * - Permite deselecionar clicando novamente (toggle)
   * - Fecha o menu mobile após seleção
   * Otimizado com useCallback para evitar re-renderizações.
   */
  const handleSubcategorySelect = useCallback((subcategoryId: number) => {
    try {
      // Converter para Number para garantir comparação correta
      const subcategoryIdNum = Number(subcategoryId);
      const currentSubcategoryId = selectedSubcategory !== null ? Number(selectedSubcategory) : null;
      
      // Toggle: se já está selecionada, deseleciona
      if (currentSubcategoryId === subcategoryIdNum) {
        onSubcategorySelect(null);
      } else {
        onSubcategorySelect(subcategoryIdNum);
      }
      // Fechar menu mobile após seleção (melhor UX em mobile)
      setIsMobileOpen(false);
    } catch (error) {
      console.error('Erro ao selecionar subcategoria:', error);
    }
  }, [selectedSubcategory, onSubcategorySelect]);

  const sidebarContent = (
    <div className="h-full w-full flex flex-col" style={{ background: 'var(--gradient-sidebar)' }}>
      <div className="p-6 border-b border-sidebar-border flex-shrink-0">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sidebar-primary mb-2">FORTLAR</h1>
          <p className="text-sidebar-foreground/80 text-sm">Utensílios de Qualidade</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
        <div className="space-y-2">
          {categories.map((category) => {
            const hasSubcats = hasSubcategories(category);
            // Usar conversão para Number para garantir comparação correta
            const categoryId = Number(category.id_categoria);
            const selectedCategoryId = selectedCategory !== null ? Number(selectedCategory) : null;
            const isCategoryActive = selectedCategoryId === categoryId;
            const isCategoryExpanded = isExpanded(categoryId);

            return (
              <div key={category.id_categoria} className="space-y-1">
                <Button
                  variant="ghost"
                  className={cn(
                    // Estilos base
                    "w-full justify-between text-left h-auto p-3",
                    "text-sidebar-foreground transition-all duration-200",
                    // Hover state
                    "hover:bg-sidebar-accent/30 hover:text-sidebar-foreground",
                    // Estado ativo da categoria principal (background mais forte)
                    isCategoryActive && "bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground font-semibold",
                    // Melhoria de acessibilidade: foco visível
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary focus-visible:ring-offset-2"
                  )}
                  onClick={() => handleCategorySelect(categoryId)}
                  aria-expanded={hasSubcats ? isCategoryExpanded : undefined}
                  aria-haspopup={hasSubcats ? "true" : undefined}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {(() => {
                      const IconComponent = getCategoryIcon(category.nome);
                      return <IconComponent className="h-4 w-4 flex-shrink-0" />;
                    })()}
                    <span className="font-medium truncate">{category.nome}</span>
                  </div>
                  {/* 
                    REGRA: Categorias com subcategorias DEVEM exibir chevron.
                    ChevronDown (▾) quando expandido, ChevronRight (▸) quando fechado.
                  */}
                  {hasSubcats && (
                    <div className="ml-2 flex-shrink-0">
                      {isCategoryExpanded ? (
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition-transform duration-200" aria-hidden="true" />
                      )}
                    </div>
                  )}
                </Button>

                {/* 
                  REGRA: Submenu permanece aberto quando subcategoria é selecionada.
                  O estado de expansão é controlado pelo useEffect baseado na categoria selecionada.
                */}
                {isCategoryExpanded && hasSubcats && (
                  <div 
                    className="ml-4 space-y-1 animate-fade-in"
                    role="menu"
                    aria-label={`Subcategorias de ${category.nome}`}
                  >
                    {category.subcategorias.map((subcategory) => {
                      // Usar conversão para Number para garantir comparação correta
                      const subcategoryId = Number(subcategory.id_subcategoria);
                      const selectedSubcategoryId = selectedSubcategory !== null ? Number(selectedSubcategory) : null;
                      const isSubcategoryActive = selectedSubcategoryId === subcategoryId;
                      
                      return (
                        <Button
                          key={subcategory.id_subcategoria}
                          variant="ghost"
                          size="sm"
                          role="menuitem"
                          className={cn(
                            // Estilos base para subcategoria
                            "w-full justify-start text-left h-auto p-2 pl-4",
                            "text-sidebar-foreground/80 transition-all duration-200",
                            // Hover state
                            "hover:bg-sidebar-accent/25 hover:text-sidebar-foreground",
                            // Estado ativo da subcategoria (background interno diferente + borda lateral)
                            isSubcategoryActive && [
                              "bg-sidebar-accent/40 text-sidebar-foreground",
                              "border-l-2 border-sidebar-primary",
                              "font-medium hover:bg-sidebar-accent/50"
                            ],
                            // Melhoria de acessibilidade
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary focus-visible:ring-offset-1"
                          )}
                          onClick={() => handleSubcategorySelect(subcategoryId)}
                          aria-current={isSubcategoryActive ? "page" : undefined}
                        >
                          {subcategory.nome}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* "Todos os Produtos" - opção para limpar filtros */}
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className={cn(
              // Estilos base
              "w-full justify-start text-left h-auto p-3",
              "text-sidebar-foreground transition-all duration-200",
              // Hover state
              "hover:bg-sidebar-accent/30 hover:text-sidebar-foreground",
              // Estado ativo
              selectedCategory === null && [
                "bg-sidebar-primary hover:bg-sidebar-primary/90",
                "text-sidebar-primary-foreground font-semibold"
              ],
              // Melhoria de acessibilidade
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary focus-visible:ring-offset-2"
            )}
            onClick={() => {
              onCategorySelect(null);
              onSubcategorySelect(null);
              setIsMobileOpen(false);
            }}
          >
            Todos os Produtos
          </Button>
        </div>
        </ScrollArea>
      </div>
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
      <div className="hidden lg:block w-72 h-screen fixed left-0 top-0 z-40 shadow-xl">
        {sidebarContent}
      </div>

      {/* Mobile: Overlay com sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] shadow-xl animate-slide-in">
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
