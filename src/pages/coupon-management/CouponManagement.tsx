import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Trash2, Search, Loader2, Tag, ArrowLeft } from 'lucide-react';
import { couponService } from '@/services/coupon/CouponService';
import { CouponResponse, CreateCouponRequest, UpdateCouponRequest, CouponType, ListCouponsFilters } from '@/types/Coupon';
import { useToast } from '@/hooks/use-toast';

export default function CouponManagement() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<CouponResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponResponse | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<CreateCouponRequest>({
    codigo: '',
    tipo: CouponType.PERCENTUAL,
    valor: 0,
    validade_inicio: '',
    validade_fim: '',
    ativo: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load coupons
  const loadCoupons = async () => {
    setLoading(true);
    try {
      const filters: ListCouponsFilters = {
        skip: 0,
        limit: 1000,
        active_only: activeOnly,
        search_codigo: searchCode || undefined,
      };
      const data = await couponService.listCoupons(filters);
      setCoupons(data);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar cupons',
        description: error.message || 'Não foi possível carregar os cupons.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setInitialLoading(true);
      await loadCoupons();
      setInitialLoading(false);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOnly, searchCode]);

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      errors.codigo = 'Código é obrigatório';
    } else if (formData.codigo.length > 50) {
      errors.codigo = 'Código deve ter no máximo 50 caracteres';
    }

    if (!formData.valor || formData.valor <= 0) {
      errors.valor = 'Valor deve ser maior que zero';
    }

    if (formData.tipo === CouponType.PERCENTUAL && formData.valor > 100) {
      errors.valor = 'Valor percentual não pode ser maior que 100';
    }

    if (formData.validade_inicio && formData.validade_fim) {
      const inicio = new Date(formData.validade_inicio);
      const fim = new Date(formData.validade_fim);
      if (inicio > fim) {
        errors.validade_fim = 'Data de fim deve ser maior que data de início';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Create coupon
  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newCoupon = await couponService.createCoupon({
        ...formData,
        codigo: formData.codigo.toUpperCase(),
      });
      toast({
        title: 'Cupom criado!',
        description: `Cupom ${newCoupon.codigo} criado com sucesso.`,
      });
      setIsCreateDialogOpen(false);
      resetForm();
      loadCoupons();
    } catch (error: any) {
      toast({
        title: 'Erro ao criar cupom',
        description: error.message || 'Não foi possível criar o cupom.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Edit coupon
  const handleEdit = (coupon: CouponResponse) => {
    setSelectedCoupon(coupon);
    setFormData({
      codigo: coupon.codigo,
      tipo: coupon.tipo,
      valor: coupon.valor,
      validade_inicio: coupon.validade_inicio || '',
      validade_fim: coupon.validade_fim || '',
      ativo: coupon.ativo,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!validateForm() || !selectedCoupon) return;

    setLoading(true);
    try {
      const updateData: UpdateCouponRequest = {
        codigo: formData.codigo.toUpperCase(),
        tipo: formData.tipo,
        valor: formData.valor,
        validade_inicio: formData.validade_inicio || undefined,
        validade_fim: formData.validade_fim || undefined,
        ativo: formData.ativo,
      };
      await couponService.updateCoupon(selectedCoupon.id_cupom, updateData);
      toast({
        title: 'Cupom atualizado!',
        description: `Cupom ${formData.codigo} atualizado com sucesso.`,
      });
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedCoupon(null);
      loadCoupons();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar cupom',
        description: error.message || 'Não foi possível atualizar o cupom.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete coupon
  const handleDelete = (coupon: CouponResponse) => {
    setSelectedCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCoupon) return;

    setLoading(true);
    try {
      await couponService.deleteCoupon(selectedCoupon.id_cupom);
      toast({
        title: 'Cupom deletado!',
        description: `Cupom ${selectedCoupon.codigo} deletado com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedCoupon(null);
      loadCoupons();
    } catch (error: any) {
      toast({
        title: 'Erro ao deletar cupom',
        description: error.message || 'Não foi possível deletar o cupom.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      codigo: '',
      tipo: CouponType.PERCENTUAL,
      valor: 0,
      validade_inicio: '',
      validade_fim: '',
      ativo: true,
    });
    setFormErrors({});
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatValue = (coupon: CouponResponse): string => {
    if (coupon.tipo === CouponType.PERCENTUAL) {
      return `${coupon.valor}%`;
    }
    return `R$ ${coupon.valor.toFixed(2)}`;
  };

  // Show initial loading state
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Carregando cupons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/catalog')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Catálogo
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Tag className="h-8 w-8" />
              Gestão de Cupons
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie cupons de desconto do sistema
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cupom
          </Button>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre os cupons por código ou status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar por código</Label>
              <div className="flex gap-2 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Digite o código do cupom"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active-only"
                  checked={activeOnly}
                  onCheckedChange={(checked) => setActiveOnly(checked === true)}
                />
                <Label htmlFor="active-only" className="cursor-pointer">
                  Apenas ativos
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Cupons</CardTitle>
          <CardDescription>
            {coupons.length} cupom{coupons.length !== 1 ? 's' : ''} encontrado{coupons.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum cupom encontrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Validade Início</TableHead>
                    <TableHead>Validade Fim</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id_cupom}>
                      <TableCell className="font-medium">{coupon.codigo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {coupon.tipo === CouponType.PERCENTUAL ? 'Percentual' : 'Valor Fixo'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatValue(coupon)}</TableCell>
                      <TableCell>{formatDate(coupon.validade_inicio)}</TableCell>
                      <TableCell>{formatDate(coupon.validade_fim)}</TableCell>
                      <TableCell>
                        <Badge variant={coupon.ativo ? 'default' : 'secondary'}>
                          {coupon.ativo ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(coupon)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(coupon)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Cupom</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo cupom de desconto
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código *</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                placeholder="Ex: DESCONTO10"
                maxLength={50}
                aria-invalid={!!formErrors.codigo}
                aria-describedby={formErrors.codigo ? 'codigo-error' : undefined}
              />
              {formErrors.codigo && (
                <p className="text-sm text-destructive" id="codigo-error" role="alert">
                  {formErrors.codigo}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo *</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value: CouponType) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CouponType.PERCENTUAL}>Percentual</SelectItem>
                    <SelectItem value={CouponType.VALOR_FIXO}>Valor Fixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor *</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  min="0"
                  max={formData.tipo === CouponType.PERCENTUAL ? 100 : undefined}
                  value={formData.valor || ''}
                  onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
                  placeholder={formData.tipo === CouponType.PERCENTUAL ? "0-100" : "0.00"}
                  aria-invalid={!!formErrors.valor}
                  aria-describedby={formErrors.valor ? 'valor-error' : undefined}
                />
                {formErrors.valor && (
                  <p className="text-sm text-destructive" id="valor-error" role="alert">
                    {formErrors.valor}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validade_inicio">Data Início</Label>
                <Input
                  id="validade_inicio"
                  type="date"
                  value={formData.validade_inicio}
                  onChange={(e) => setFormData({ ...formData, validade_inicio: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validade_fim">Data Fim</Label>
                <Input
                  id="validade_fim"
                  type="date"
                  value={formData.validade_fim}
                  onChange={(e) => setFormData({ ...formData, validade_fim: e.target.value })}
                  aria-invalid={!!formErrors.validade_fim}
                  aria-describedby={formErrors.validade_fim ? 'validade_fim-error' : undefined}
                />
                {formErrors.validade_fim && (
                  <p className="text-sm text-destructive" id="validade_fim-error" role="alert">
                    {formErrors.validade_fim}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ativo"
                checked={formData.ativo}
                onCheckedChange={(checked) => setFormData({ ...formData, ativo: checked === true })}
              />
              <Label htmlFor="ativo" className="cursor-pointer">
                Cupom ativo
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsCreateDialogOpen(false); resetForm(); }}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Cupom</DialogTitle>
            <DialogDescription>
              Atualize os dados do cupom
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-codigo">Código *</Label>
              <Input
                id="edit-codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                placeholder="Ex: DESCONTO10"
                maxLength={50}
                aria-invalid={!!formErrors.codigo}
                aria-describedby={formErrors.codigo ? 'edit-codigo-error' : undefined}
              />
              {formErrors.codigo && (
                <p className="text-sm text-destructive" id="edit-codigo-error" role="alert">
                  {formErrors.codigo}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-tipo">Tipo *</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value: CouponType) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CouponType.PERCENTUAL}>Percentual</SelectItem>
                    <SelectItem value={CouponType.VALOR_FIXO}>Valor Fixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-valor">Valor *</Label>
                <Input
                  id="edit-valor"
                  type="number"
                  step="0.01"
                  min="0"
                  max={formData.tipo === CouponType.PERCENTUAL ? 100 : undefined}
                  value={formData.valor || ''}
                  onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
                  placeholder={formData.tipo === CouponType.PERCENTUAL ? "0-100" : "0.00"}
                  aria-invalid={!!formErrors.valor}
                  aria-describedby={formErrors.valor ? 'edit-valor-error' : undefined}
                />
                {formErrors.valor && (
                  <p className="text-sm text-destructive" id="edit-valor-error" role="alert">
                    {formErrors.valor}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-validade_inicio">Data Início</Label>
                <Input
                  id="edit-validade_inicio"
                  type="date"
                  value={formData.validade_inicio}
                  onChange={(e) => setFormData({ ...formData, validade_inicio: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-validade_fim">Data Fim</Label>
                <Input
                  id="edit-validade_fim"
                  type="date"
                  value={formData.validade_fim}
                  onChange={(e) => setFormData({ ...formData, validade_fim: e.target.value })}
                  aria-invalid={!!formErrors.validade_fim}
                  aria-describedby={formErrors.validade_fim ? 'edit-validade_fim-error' : undefined}
                />
                {formErrors.validade_fim && (
                  <p className="text-sm text-destructive" id="edit-validade_fim-error" role="alert">
                    {formErrors.validade_fim}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-ativo"
                checked={formData.ativo}
                onCheckedChange={(checked) => setFormData({ ...formData, ativo: checked === true })}
              />
              <Label htmlFor="edit-ativo" className="cursor-pointer">
                Cupom ativo
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); setSelectedCoupon(null); }}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Atualizando...
                </>
              ) : (
                'Atualizar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar o cupom <strong>{selectedCoupon?.codigo}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedCoupon(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deletando...
                </>
              ) : (
                'Deletar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}
