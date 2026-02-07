import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Loader2,
  Save,
  Upload,
  Trash2,
  ImageOff,
  Package,
} from 'lucide-react';
import { productService } from '@/services/products';
import { categoryService } from '@/services/categories';
import type { Product, UpdateProductRequest } from '@/types/Product';
import type { Category } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';
import { AdminRoute } from '@/components/AdminRoute';
import { formatCurrency } from '@/utils/format';
import { paths } from '@/routes/paths';

const ESTADOS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const ACCEPT_IMAGES = 'image/jpeg,image/png,image/gif,image/webp';

export default function AdminProdutoEdit() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [estado, setEstado] = useState('SP');

  // Form state (only fields we send on PUT)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [codKit, setCodKit] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [idSubcategoria, setIdSubcategoria] = useState<number | ''>('');
  const [valorBase, setValorBase] = useState(0);
  const [ativo, setAtivo] = useState(true);

  // Image ids we got from POST add image (url -> id_imagem) so we can call DELETE
  const [imageIdByUrl, setImageIdByUrl] = useState<Record<string, number>>({});

  const id = productId ? Number(productId) : NaN;
  const isValidId = Number.isInteger(id) && id > 0;

  useEffect(() => {
    categoryService.getCategories({ skip: 0, limit: 500 }).then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isValidId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    productService
      .getProductById(id, estado)
      .then((p) => {
        setProduct(p);
        setNome(p.nome);
        setDescricao(p.descricao ?? '');
        setQuantidade(p.quantidade ?? 1);
        setCodKit(p.cod_kit ?? '');
        setIdCategoria(p.id_categoria ?? '');
        setIdSubcategoria(p.id_subcategoria ?? '');
        setValorBase(p.valor_base ?? 0);
        setAtivo(p.ativo ?? true);
      })
      .catch((err: any) => {
        const msg = err.response?.data?.detail ?? err.message ?? 'Produto não encontrado';
        toast({ title: 'Erro', description: msg, variant: 'destructive' });
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id, estado, isValidId]);

  const subcategories = idCategoria
    ? (categories.find((c) => c.id_categoria === Number(idCategoria))?.subcategorias ?? [])
    : [];

  const handleSave = async () => {
    if (!product) return;
    const body: UpdateProductRequest = {};
    if (nome.trim() !== product.nome) body.nome = nome.trim();
    if (descricao !== (product.descricao ?? '')) body.descricao = descricao.trim() || null;
    if (quantidade !== (product.quantidade ?? 1)) body.quantidade = quantidade;
    if ((codKit || null) !== (product.cod_kit ?? null)) body.cod_kit = codKit.trim() || null;
    if (Number(idCategoria) !== product.id_categoria) body.id_categoria = Number(idCategoria);
    if (Number(idSubcategoria) !== (product.id_subcategoria ?? null)) {
      body.id_subcategoria = idSubcategoria === '' ? null : Number(idSubcategoria);
    }
    if (valorBase !== (product.valor_base ?? 0)) body.valor_base = valorBase;
    if (ativo !== product.ativo) body.ativo = ativo;

    if (Object.keys(body).length === 0) {
      toast({ title: 'Nada alterado', description: 'Altere algum campo antes de salvar.' });
      return;
    }

    setSaving(true);
    try {
      const updated = await productService.updateProduct(product.id_produto, body, estado);
      setProduct(updated);
      toast({ title: 'Salvo', description: 'Produto atualizado com sucesso.' });
    } catch (err: any) {
      toast({
        title: 'Erro ao salvar',
        description: err.message ?? 'Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !product) return;
    e.target.value = '';
    setUploadingImage(true);
    try {
      const res = await productService.addProductImage(product.id_produto, file);
      setProduct((prev) =>
        prev
          ? { ...prev, imagens: [...(prev.imagens || []), res.url] }
          : prev
      );
      setImageIdByUrl((prev) => ({ ...prev, [res.url]: res.id_imagem }));
      toast({ title: 'Foto adicionada', description: 'A imagem foi vinculada ao produto.' });
    } catch (err: any) {
      toast({
        title: 'Erro ao enviar foto',
        description: err.message ?? 'Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async (url: string) => {
    const imageId = imageIdByUrl[url];
    if (imageId == null || !product) return;
    try {
      await productService.removeProductImage(product.id_produto, imageId);
      setProduct((prev) =>
        prev
          ? { ...prev, imagens: (prev.imagens || []).filter((u) => u !== url) }
          : prev
      );
      setImageIdByUrl((prev) => {
        const next = { ...prev };
        delete next[url];
        return next;
      });
      toast({ title: 'Foto removida' });
    } catch (err: any) {
      toast({
        title: 'Erro ao remover foto',
        description: err.message ?? 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  if (!isValidId) {
    return (
      <AdminRoute>
        <div className="max-w-4xl mx-auto p-6">
          <p className="text-destructive">ID de produto inválido.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate(paths.admin.produtos)}>
            Voltar à listagem
          </Button>
        </div>
      </AdminRoute>
    );
  }

  if (loading && !product) {
    return (
      <AdminRoute>
        <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AdminRoute>
    );
  }

  if (!product) {
    return (
      <AdminRoute>
        <div className="max-w-4xl mx-auto p-6">
          <p className="text-muted-foreground">Produto não encontrado.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate(paths.admin.produtos)}>
            Voltar à listagem
          </Button>
        </div>
      </AdminRoute>
    );
  }

  const imagens = product.imagens ?? [];

  return (
    <AdminRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(paths.admin.produtos)}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Package className="h-7 w-7" />
                Editar produto
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {product.codigo} · Estado para preço: {estado}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger className="w-[100px]">
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
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Salvar
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dados do produto</CardTitle>
              <CardDescription>Textos, categoria e preço base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do produto"
                  maxLength={150}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição (opcional)"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    min={1}
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cod_kit">Código kit</Label>
                  <Input
                    id="cod_kit"
                    value={codKit}
                    onChange={(e) => setCodKit(e.target.value)}
                    placeholder="Opcional"
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={idCategoria === '' ? '' : String(idCategoria)}
                    onValueChange={(v) => {
                      setIdCategoria(v === '' ? '' : Number(v));
                      setIdSubcategoria('');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id_categoria} value={String(c.id_categoria)}>
                          {c.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subcategoria</Label>
                  <Select
                    value={idSubcategoria === '' ? '' : String(idSubcategoria)}
                    onValueChange={(v) => setIdSubcategoria(v === '' ? '' : Number(v))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Opcional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhuma</SelectItem>
                      {subcategories.map((s) => (
                        <SelectItem key={s.id_subcategoria} value={String(s.id_subcategoria)}>
                          {s.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor_base">Valor base (R$)</Label>
                <Input
                  id="valor_base"
                  type="number"
                  min={0}
                  step={0.01}
                  value={valorBase}
                  onChange={(e) => setValorBase(Number(e.target.value) || 0)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ativo">Produto ativo</Label>
                <Switch id="ativo" checked={ativo} onCheckedChange={setAtivo} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fotos</CardTitle>
              <CardDescription>Adicionar ou remover imagens (remover só para fotos adicionadas aqui)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {imagens.map((url) => (
                  <div
                    key={url}
                    className="relative group rounded-lg border overflow-hidden bg-muted aspect-square"
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {imageIdByUrl[url] != null && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 opacity-90 group-hover:opacity-100"
                        onClick={() => handleRemoveImage(url)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <label className="flex aspect-square rounded-lg border border-dashed items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPT_IMAGES}
                    className="hidden"
                    onChange={handleAddImage}
                    disabled={uploadingImage}
                  />
                  {uploadingImage ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Adicionar foto</span>
                    </div>
                  )}
                </label>
              </div>
              {imagens.length === 0 && !uploadingImage && (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <ImageOff className="h-12 w-12 mb-2" />
                  <p className="text-sm">Nenhuma foto. Use “Adicionar foto” para enviar imagens (JPG, PNG, GIF, WebP).</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Preços calculados ({estado})</CardTitle>
            <CardDescription>Valores exibidos conforme estado selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">À vista</p>
                <p className="font-medium">{product.avista != null ? formatCurrency(product.avista) : '-'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">30 dias</p>
                <p className="font-medium">
                  {(product.dias_30 ?? product['30_dias']) != null
                    ? formatCurrency((product.dias_30 ?? product['30_dias'])!)
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">60 dias</p>
                <p className="font-medium">
                  {(product.dias_60 ?? product['60_dias']) != null
                    ? formatCurrency((product.dias_60 ?? product['60_dias'])!)
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Valor base</p>
                <p className="font-medium">{formatCurrency(product.valor_base ?? 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminRoute>
  );
}
