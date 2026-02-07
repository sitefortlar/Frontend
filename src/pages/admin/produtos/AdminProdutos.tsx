import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Package, Search, Loader2, ArrowLeft, Edit, ImageOff } from 'lucide-react';
import { productService } from '@/services/products';
import { categoryService } from '@/services/categories';
import type { Product } from '@/types/Product';
import type { Category } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';
import { AdminRoute } from '@/components/AdminRoute';
import { formatCurrency } from '@/utils/format';
import { paths } from '@/routes/paths';

const ESTADOS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

export default function AdminProdutos() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [estado, setEstado] = useState('SP');
  const [searchName, setSearchName] = useState('');
  const [idCategory, setIdCategory] = useState<string>('');
  const [idSubcategory, setIdSubcategory] = useState<string>('');
  const [orderPrice, setOrderPrice] = useState<'ASC' | 'DESC'>('ASC');
  const [activeOnly, setActiveOnly] = useState(true);
  const [includeKits, setIncludeKits] = useState(true);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories({ skip: 0, limit: 500 });
      setCategories(data);
    } catch {
      // ignore
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({
        estado,
        search_name: searchName || undefined,
        id_category: idCategory ? Number(idCategory) : undefined,
        id_subcategory: idSubcategory ? Number(idSubcategory) : undefined,
        order_price: orderPrice,
        active_only: activeOnly,
        include_kits: includeKits,
        skip: 0,
        limit: 200,
      });
      setProducts(data);
    } catch (err: any) {
      const msg = err.response?.data?.detail ?? err.message ?? 'Erro ao carregar produtos';
      toast({
        title: 'Erro',
        description: msg,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setInitialLoading(true);
    productService
      .getProducts({
        estado,
        search_name: searchName || undefined,
        id_category: idCategory ? Number(idCategory) : undefined,
        id_subcategory: idSubcategory ? Number(idSubcategory) : undefined,
        order_price: orderPrice,
        active_only: activeOnly,
        include_kits: includeKits,
        skip: 0,
        limit: 200,
      })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err: any) => {
        if (!cancelled) {
          const msg = err.response?.data?.detail ?? err.message ?? 'Erro ao carregar produtos';
          toast({ title: 'Erro', description: msg, variant: 'destructive' });
        }
      })
      .finally(() => {
        if (!cancelled) setInitialLoading(false);
      });
    return () => { cancelled = true; };
  }, [estado, idCategory, idSubcategory, orderPrice, activeOnly, includeKits, toast]);

  const handleSearch = () => {
    setInitialLoading(true);
    loadProducts().finally(() => setInitialLoading(false));
  };

  const subcategories = idCategory
    ? (categories.find((c) => c.id_categoria === Number(idCategory))?.subcategorias ?? [])
    : [];

  const goToEdit = (id: number) => {
    navigate(paths.admin.produtoEdit(id));
  };

  if (initialLoading && products.length === 0) {
    return (
      <AdminRoute>
        <div className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Package className="h-7 w-7" />
                Gestão de Produtos
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Listar e editar produtos. Use o estado para calcular preços.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-1 block">Estado (preço)</label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-1 block">Buscar por nome</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nome do produto..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="w-[140px]">
                <label className="text-sm font-medium mb-1 block">Categoria</label>
                <Select value={idCategory} onValueChange={(v) => { setIdCategory(v); setIdSubcategory(''); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c.id_categoria} value={String(c.id_categoria)}>
                        {c.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[140px]">
                <label className="text-sm font-medium mb-1 block">Subcategoria</label>
                <Select value={idSubcategory} onValueChange={setIdSubcategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {subcategories.map((s) => (
                      <SelectItem key={s.id_subcategoria} value={String(s.id_subcategoria)}>
                        {s.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[120px]">
                <label className="text-sm font-medium mb-1 block">Preço</label>
                <Select value={orderPrice} onValueChange={(v: 'ASC' | 'DESC') => setOrderPrice(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASC">Menor primeiro</SelectItem>
                    <SelectItem value="DESC">Maior primeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={activeOnly}
                    onChange={(e) => setActiveOnly(e.target.checked)}
                    className="rounded border-input"
                  />
                  Só ativos
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={includeKits}
                    onChange={(e) => setIncludeKits(e.target.checked)}
                    className="rounded border-input"
                  />
                  Incluir kits
                </label>
              </div>
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading && products.length > 0 ? (
          <div className="flex justify-center py-8 px-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 w-16">Foto</th>
                    <th className="text-left p-3">Nome</th>
                    <th className="text-left p-3">Código</th>
                    <th className="text-left p-3">Categoria</th>
                    <th className="text-right p-3">Preço (à vista)</th>
                    <th className="text-center p-3">Ativo</th>
                    <th className="text-right p-3 w-24">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id_produto} className="border-b hover:bg-muted/30">
                      <td className="p-3">
                        <div className="w-12 h-12 rounded border bg-muted flex items-center justify-center overflow-hidden">
                          {p.imagens?.[0] ? (
                            <img
                              src={p.imagens[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageOff className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 font-medium">{p.nome}</td>
                      <td className="p-3 text-muted-foreground">{p.codigo}</td>
                      <td className="p-3 text-sm">{p.categoria ?? '-'}</td>
                      <td className="p-3 text-right">
                        {p.avista != null ? formatCurrency(p.avista) : formatCurrency(p.valor_base ?? 0)}
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant={p.ativo ? 'default' : 'secondary'}>
                          {p.ativo ? 'Sim' : 'Não'}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="outline" size="sm" onClick={() => goToEdit(p.id_produto)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </AdminRoute>
  );
}
