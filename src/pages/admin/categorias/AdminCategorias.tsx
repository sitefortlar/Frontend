import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Trash2, Search, Loader2, FolderTree, ArrowLeft, X } from 'lucide-react';
import { categoryService } from '@/services/categories';
import { Category, Subcategory, CategoryRequest, SubcategoryRequest } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';
import { AdminRoute } from '@/components/AdminRoute';
import {
  AdminCategoriasContainer,
  LoadingContainer,
  LoadingContent,
  LoadingText,
  HeaderContainer,
  HeaderLeft,
  HeaderTitleContainer,
  HeaderTitle,
  HeaderDescription,
  SearchContainer,
  SearchInputWrapper,
  SearchIcon,
  LoadingSpinnerSmall,
  EmptyStateContainer,
  EmptyStateIcon,
  EmptyStateText,
  CategoriesGrid,
  CategoryCardHeader,
  CategoryHeaderLeft,
  CategoryTitle,
  CategoryActions,
  SubcategoriesContainer,
  SubcategoriesLabel,
  SubcategoriesList,
  SubcategoryItem,
  SubcategoryName,
  SubcategoryActions,
  SubcategoryForm,
  DialogFormContainer,
  DialogFormField,
  DialogFormSubcategoryList,
  DialogFormSubcategoryItem,
  DialogFormSubcategoryName,
  DialogFormSubcategoryInput,
  SpinnerButton,
} from './styles';

export default function AdminCategorias() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSubDialogOpen, setIsDeleteSubDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<{ categoryId: number; subcategory: Subcategory } | null>(null);
  const [searchName, setSearchName] = useState('');
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<CategoryRequest>({
    name: '',
    subcategory: [],
  });

  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [editingSubcategoryName, setEditingSubcategoryName] = useState('');

  // Load categories
  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getCategories({
        skip: 0,
        limit: 1000,
        search_name: searchName || undefined,
      });
      setCategories(data);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar categorias',
        description: error.message || 'Não foi possível carregar as categorias.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setInitialLoading(true);
      await loadCategories();
      setInitialLoading(false);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  // Validation
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'Nome da categoria é obrigatório',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      subcategory: [],
    });
    setNewSubcategoryName('');
    setEditingCategoryName('');
    setEditingSubcategoryName('');
  };

  // Create category
  const handleCreateCategory = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const categoryData: CategoryRequest = {
        name: formData.name.trim(),
        ...(formData.subcategory && formData.subcategory.length > 0 && {
          subcategory: formData.subcategory,
        }),
      };

      const newCategory = await categoryService.createCategory(categoryData);
      setCategories([...categories, newCategory]);
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: 'Sucesso',
        description: 'Categoria criada com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao criar categoria',
        description: error.response?.data?.detail || error.message || 'Não foi possível criar a categoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const handleUpdateCategory = async () => {
    if (!selectedCategory || !editingCategoryName.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'Nome da categoria é obrigatório',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const updated = await categoryService.updateCategory(selectedCategory.id_categoria, {
        name: editingCategoryName.trim(),
      });
      setCategories(categories.map(cat =>
        cat.id_categoria === selectedCategory.id_categoria ? updated : cat
      ));
      setIsEditDialogOpen(false);
      setSelectedCategory(null);
      setEditingCategoryName('');
      toast({
        title: 'Sucesso',
        description: 'Categoria atualizada com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar categoria',
        description: error.response?.data?.detail || error.message || 'Não foi possível atualizar a categoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    setLoading(true);
    try {
      await categoryService.deleteCategory(selectedCategory.id_categoria);
      setCategories(categories.filter(cat => cat.id_categoria !== selectedCategory.id_categoria));
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
      toast({
        title: 'Sucesso',
        description: 'Categoria deletada com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao deletar categoria',
        description: error.response?.data?.detail || error.message || 'Não foi possível deletar a categoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add subcategory to form
  const handleAddSubcategoryToForm = () => {
    if (!newSubcategoryName.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'Nome da subcategoria é obrigatório',
        variant: 'destructive',
      });
      return;
    }

    setFormData({
      ...formData,
      subcategory: [...(formData.subcategory || []), { name: newSubcategoryName.trim() }],
    });
    setNewSubcategoryName('');
  };

  // Remove subcategory from form
  const handleRemoveSubcategoryFromForm = (index: number) => {
    setFormData({
      ...formData,
      subcategory: formData.subcategory?.filter((_, i) => i !== index) || [],
    });
  };

  // Create subcategory
  const handleCreateSubcategory = async (categoryId: number) => {
    if (!newSubcategoryName.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'Nome da subcategoria é obrigatório',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const newSub = await categoryService.createSubcategory(categoryId, {
        name: newSubcategoryName.trim(),
      });
      setCategories(categories.map(cat =>
        cat.id_categoria === categoryId
          ? { ...cat, subcategorias: [...cat.subcategorias, newSub] }
          : cat
      ));
      setNewSubcategoryName('');
      toast({
        title: 'Sucesso',
        description: 'Subcategoria criada com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao criar subcategoria',
        description: error.response?.data?.detail || error.message || 'Não foi possível criar a subcategoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Update subcategory
  const handleUpdateSubcategory = async () => {
    if (!selectedSubcategory || !editingSubcategoryName.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'Nome da subcategoria é obrigatório',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const updated = await categoryService.updateSubcategory(
        selectedSubcategory.categoryId,
        selectedSubcategory.subcategory.id_subcategoria,
        { name: editingSubcategoryName.trim() }
      );
      setCategories(categories.map(cat =>
        cat.id_categoria === selectedSubcategory.categoryId
          ? {
              ...cat,
              subcategorias: cat.subcategorias.map(sub =>
                sub.id_subcategoria === selectedSubcategory.subcategory.id_subcategoria ? updated : sub
              ),
            }
          : cat
      ));
      setIsEditDialogOpen(false);
      setSelectedSubcategory(null);
      setEditingSubcategoryName('');
      toast({
        title: 'Sucesso',
        description: 'Subcategoria atualizada com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar subcategoria',
        description: error.response?.data?.detail || error.message || 'Não foi possível atualizar a subcategoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete subcategory
  const handleDeleteSubcategory = async () => {
    if (!selectedSubcategory) return;

    setLoading(true);
    try {
      await categoryService.deleteSubcategory(
        selectedSubcategory.categoryId,
        selectedSubcategory.subcategory.id_subcategoria
      );
      setCategories(categories.map(cat =>
        cat.id_categoria === selectedSubcategory.categoryId
          ? {
              ...cat,
              subcategorias: cat.subcategorias.filter(
                sub => sub.id_subcategoria !== selectedSubcategory.subcategory.id_subcategoria
              ),
            }
          : cat
      ));
      setIsDeleteSubDialogOpen(false);
      setSelectedSubcategory(null);
      toast({
        title: 'Sucesso',
        description: 'Subcategoria deletada com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao deletar subcategoria',
        description: error.response?.data?.detail || error.message || 'Não foi possível deletar a subcategoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog for category
  const openEditCategoryDialog = (category: Category) => {
    setSelectedCategory(category);
    setEditingCategoryName(category.nome);
    setIsEditDialogOpen(true);
  };

  // Open edit dialog for subcategory
  const openEditSubcategoryDialog = (categoryId: number, subcategory: Subcategory) => {
    setSelectedSubcategory({ categoryId, subcategory });
    setEditingSubcategoryName(subcategory.nome);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog for category
  const openDeleteCategoryDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  // Open delete dialog for subcategory
  const openDeleteSubcategoryDialog = (categoryId: number, subcategory: Subcategory) => {
    setSelectedSubcategory({ categoryId, subcategory });
    setIsDeleteSubDialogOpen(true);
  };

  if (initialLoading) {
    return (
      <LoadingContainer>
        <LoadingContent>
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <LoadingText>Carregando categorias...</LoadingText>
        </LoadingContent>
      </LoadingContainer>
    );
  }

  return (
    <AdminRoute>
      <AdminCategoriasContainer>
        {/* Header */}
        <HeaderContainer>
          <HeaderLeft>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <HeaderTitleContainer>
              <HeaderTitle>
                <FolderTree className="h-8 w-8" />
                Gerenciar Categorias
              </HeaderTitle>
              <HeaderDescription>
                Gerencie categorias e subcategorias de produtos
              </HeaderDescription>
            </HeaderTitleContainer>
          </HeaderLeft>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </HeaderContainer>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <SearchContainer>
              <SearchInputWrapper>
                <SearchIcon>
                  <Search className="h-4 w-4" />
                </SearchIcon>
                <Input
                  placeholder="Buscar categoria por nome..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="pl-10"
                />
              </SearchInputWrapper>
            </SearchContainer>
          </CardContent>
        </Card>

        {/* Categories List */}
        {loading && !initialLoading ? (
          <LoadingContainer>
            <LoadingSpinnerSmall>
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </LoadingSpinnerSmall>
          </LoadingContainer>
        ) : categories.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <EmptyStateContainer>
                <EmptyStateIcon>
                  <FolderTree className="h-12 w-12 mx-auto mb-4" />
                </EmptyStateIcon>
                <EmptyStateText>
                  {searchName ? 'Nenhuma categoria encontrada' : 'Nenhuma categoria cadastrada'}
                </EmptyStateText>
              </EmptyStateContainer>
            </CardContent>
          </Card>
        ) : (
          <CategoriesGrid>
            {categories.map((category) => (
              <Card key={category.id_categoria}>
                <CardHeader>
                  <CategoryCardHeader>
                    <CategoryHeaderLeft>
                      <CategoryTitle>{category.nome}</CategoryTitle>
                      <Badge variant="secondary">
                        {category.subcategorias.length} subcategoria{category.subcategorias.length !== 1 ? 's' : ''}
                      </Badge>
                    </CategoryHeaderLeft>
                    <CategoryActions>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditCategoryDialog(category)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteCategoryDialog(category)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Deletar
                      </Button>
                    </CategoryActions>
                  </CategoryCardHeader>
                </CardHeader>
                <CardContent>
                  <SubcategoriesContainer>
                    <div>
                      <SubcategoriesLabel>Subcategorias:</SubcategoriesLabel>
                      {category.subcategorias.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Nenhuma subcategoria cadastrada</p>
                      ) : (
                        <SubcategoriesList>
                          {category.subcategorias.map((sub) => (
                            <SubcategoryItem key={sub.id_subcategoria}>
                              <SubcategoryName>{sub.nome}</SubcategoryName>
                              <SubcategoryActions>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditSubcategoryDialog(category.id_categoria, sub)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openDeleteSubcategoryDialog(category.id_categoria, sub)}
                                >
                                  <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                              </SubcategoryActions>
                            </SubcategoryItem>
                          ))}
                        </SubcategoriesList>
                      )}
                    </div>
                    <Separator />
                    <SubcategoryForm>
                      <Input
                        placeholder="Nome da nova subcategoria"
                        value={newSubcategoryName}
                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCreateSubcategory(category.id_categoria);
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleCreateSubcategory(category.id_categoria)}
                        disabled={loading || !newSubcategoryName.trim()}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </SubcategoryForm>
                  </SubcategoriesContainer>
                </CardContent>
              </Card>
            ))}
          </CategoriesGrid>
        )}

        {/* Create Category Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Categoria</DialogTitle>
              <DialogDescription>
                Preencha os dados da categoria e suas subcategorias (opcional)
              </DialogDescription>
            </DialogHeader>
            <DialogFormContainer>
              <DialogFormField>
                <Label htmlFor="category-name">Nome da Categoria *</Label>
                <Input
                  id="category-name"
                  placeholder="Ex: Eletrônicos"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </DialogFormField>
              <Separator />
              <DialogFormField>
                <Label>Subcategorias (opcional)</Label>
                <DialogFormSubcategoryInput>
                  <Input
                    placeholder="Nome da subcategoria"
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubcategoryToForm();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddSubcategoryToForm}
                    disabled={!newSubcategoryName.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogFormSubcategoryInput>
                {formData.subcategory && formData.subcategory.length > 0 && (
                  <DialogFormSubcategoryList>
                    {formData.subcategory.map((sub, index) => (
                      <DialogFormSubcategoryItem key={index}>
                        <DialogFormSubcategoryName>{sub.name}</DialogFormSubcategoryName>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSubcategoryFromForm(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </DialogFormSubcategoryItem>
                    ))}
                  </DialogFormSubcategoryList>
                )}
              </DialogFormField>
            </DialogFormContainer>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsCreateDialogOpen(false);
                resetForm();
              }}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCategory} disabled={loading}>
                {loading ? (
                  <>
                    <SpinnerButton>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </SpinnerButton>
                    Criando...
                  </>
                ) : (
                  'Criar'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog (Category or Subcategory) */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCategory ? 'Editar Categoria' : 'Editar Subcategoria'}
              </DialogTitle>
              <DialogDescription>
                {selectedCategory
                  ? 'Altere o nome da categoria'
                  : 'Altere o nome da subcategoria'}
              </DialogDescription>
            </DialogHeader>
            <DialogFormContainer>
              <DialogFormField>
                <Label>
                  {selectedCategory ? 'Nome da Categoria' : 'Nome da Subcategoria'} *
                </Label>
                <Input
                  value={selectedCategory ? editingCategoryName : editingSubcategoryName}
                  onChange={(e) => {
                    if (selectedCategory) {
                      setEditingCategoryName(e.target.value);
                    } else {
                      setEditingSubcategoryName(e.target.value);
                    }
                  }}
                  placeholder={
                    selectedCategory ? 'Nome da categoria' : 'Nome da subcategoria'
                  }
                />
              </DialogFormField>
            </DialogFormContainer>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setEditingCategoryName('');
                setEditingSubcategoryName('');
              }}>
                Cancelar
              </Button>
              <Button
                onClick={selectedCategory ? handleUpdateCategory : handleUpdateSubcategory}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <SpinnerButton>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </SpinnerButton>
                    Atualizando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Category Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja deletar a categoria &quot;{selectedCategory?.nome}&quot;?
                <br />
                <strong className="text-destructive">
                  Todas as subcategorias serão deletadas automaticamente.
                </strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteCategory}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <SpinnerButton>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </SpinnerButton>
                    Deletando...
                  </>
                ) : (
                  'Deletar'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Subcategory Dialog */}
        <AlertDialog open={isDeleteSubDialogOpen} onOpenChange={setIsDeleteSubDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja deletar a subcategoria &quot;{selectedSubcategory?.subcategory.nome}&quot;?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSubcategory}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <SpinnerButton>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </SpinnerButton>
                    Deletando...
                  </>
                ) : (
                  'Deletar'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminCategoriasContainer>
    </AdminRoute>
  );
}
