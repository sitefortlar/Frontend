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
  X,
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

const ESTADO = 'SP';

const ACCEPT_IMAGES = 'image/jpeg,image/png,image/gif,image/webp';

interface ExistingImage {
  url: string;
  id: number | null;
}

interface NewImage {
  file: File;
  previewUrl: string;
}

export default function AdminProdutoEdit() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingData, setSavingData] = useState(false);
  const [savingPhotos, setSavingPhotos] = useState(false);

  // Form state (only fields we send on PUT)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [codKit, setCodKit] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [idSubcategoria, setIdSubcategoria] = useState<number | ''>('');
  // Mantido como texto para permitir edição decimal sem sobrescrever a digitação do usuário.
  const [valorBase, setValorBase] = useState('0');
  const [ativo, setAtivo] = useState(true);

  // Photos: existing images (loaded from API) and new images (local only, pending upload)
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [pendingRemovalIds, setPendingRemovalIds] = useState<number[]>([]);
  const newImagesRef = useRef<NewImage[]>([]);
  newImagesRef.current = newImages;

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
      .getProductById(id, ESTADO)
      .then((p) => {
        setProduct(p);
        setNome(p.nome);
        setDescricao(p.descricao ?? '');
        setQuantidade(p.quantidade ?? 1);
        setCodKit(p.cod_kit ?? '');
        setIdCategoria(p.id_categoria ?? '');
        setIdSubcategoria(p.id_subcategoria ?? '');
        setValorBase(String(p.valor_base ?? 0));
        setAtivo(p.ativo ?? true);
        setExistingImages(
          p.imagens_detalhe && p.imagens_detalhe.length > 0
            ? p.imagens_detalhe.map((img) => ({ url: img.url, id: img.id_imagem }))
            : (p.imagens ?? []).map((url) => ({ url, id: null }))
        );
        setNewImages([]);
        setPendingRemovalIds([]);
      })
      .catch((err: any) => {
        const msg = err.response?.data?.detail ?? err.message ?? 'Produto não encontrado';
        toast({ title: 'Erro', description: msg, variant: 'destructive' });
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id, isValidId]);

  // Revoke any pending object URLs when the page unmounts
  useEffect(() => {
    return () => {
      newImagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

  const subcategories = idCategoria
    ? (categories.find((c) => c.id_categoria === Number(idCategoria))?.subcategorias ?? [])
    : [];

  const handleSaveData = async () => {
    if (!product) return;
    const parsedValorBase = Number(valorBase.replace(',', '.'));
    if (!Number.isFinite(parsedValorBase) || parsedValorBase < 0) {
      toast({
        title: 'Valor base inválido',
        description: 'Informe um valor base maior ou igual a zero.',
        variant: 'destructive',
      });
      return;
    }

    const body: UpdateProductRequest = {};
    if (nome.trim() !== product.nome) body.nome = nome.trim();
    if (descricao !== (product.descricao ?? '')) body.descricao = descricao.trim() || null;
    if (quantidade !== (product.quantidade ?? 1)) body.quantidade = quantidade;
    if ((codKit || null) !== (product.cod_kit ?? null)) body.cod_kit = codKit.trim() || null;
    if (Number(idCategoria) !== product.id_categoria) body.id_categoria = Number(idCategoria);
    if (Number(idSubcategoria) !== (product.id_subcategoria ?? null)) {
      body.id_subcategoria = idSubcategoria === '' ? null : Number(idSubcategoria);
    }
    if (parsedValorBase !== (product.valor_base ?? 0)) body.valor_base = parsedValorBase;
    if (ativo !== product.ativo) body.ativo = ativo;

    if (Object.keys(body).length === 0) {
      toast({ title: 'Nada alterado', description: 'Altere algum campo antes de salvar.' });
      return;
    }

    setSavingData(true);
    try {
      const updated = await productService.updateProduct(product.id_produto, body, ESTADO);
      setProduct(updated);
      setValorBase(String(updated.valor_base ?? parsedValorBase));
      toast({ title: 'Salvo', description: 'Produto atualizado com sucesso.' });
    } catch (err: any) {
      toast({
        title: 'Erro ao salvar',
        description: err.message ?? 'Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setSavingData(false);
    }
  };

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length === 0) return;
    const mapped = files.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    setNewImages((prev) => [...prev, ...mapped]);
  };

  const handleRemoveNewImage = (previewUrl: string) => {
    setNewImages((prev) => {
      const found = prev.find((img) => img.previewUrl === previewUrl);
      if (found) URL.revokeObjectURL(found.previewUrl);
      return prev.filter((img) => img.previewUrl !== previewUrl);
    });
  };

  const handleMarkExistingForRemoval = (image: ExistingImage) => {
    if (image.id == null) return;
    setExistingImages((prev) => prev.filter((img) => img.url !== image.url));
    setPendingRemovalIds((prev) => [...prev, image.id as number]);
  };

  const handleSavePhotos = async () => {
    if (!product) return;
    if (newImages.length === 0 && pendingRemovalIds.length === 0) {
      toast({ title: 'Nada para salvar', description: 'Adicione ou remova alguma foto antes de salvar.' });
      return;
    }

    setSavingPhotos(true);
    const errors: string[] = [];

    if (pendingRemovalIds.length > 0) {
      const idsToRemove = [...pendingRemovalIds];
      try {
        const res = await productService.removeProductImage(product.id_produto, idsToRemove);
        setPendingRemovalIds((prev) => prev.filter((removedId) => !idsToRemove.includes(removedId)));
        if (res.nao_encontradas.length > 0) {
          errors.push(`${res.nao_encontradas.length} foto(s) já não existiam no servidor.`);
        }
      } catch (err: any) {
        errors.push(err.message ?? 'Erro ao remover fotos');
      }
    }

    if (newImages.length > 0) {
      const toUpload = [...newImages];
      try {
        const uploaded = await productService.addProductImage(
          product.id_produto,
          toUpload.map((img) => img.file)
        );
        setExistingImages((prev) => [...prev, ...uploaded.map((r) => ({ url: r.url, id: r.id_imagem }))]);
        toUpload.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        setNewImages((prev) => prev.filter((img) => !toUpload.some((sent) => sent.previewUrl === img.previewUrl)));
        if (uploaded.length < toUpload.length) {
          errors.push(`${toUpload.length - uploaded.length} foto(s) não puderam ser enviadas.`);
        }
      } catch (err: any) {
        errors.push(err.message ?? 'Erro ao enviar fotos');
      }
    }

    setSavingPhotos(false);

    if (errors.length > 0) {
      toast({
        title: 'Algumas fotos não foram salvas',
        description: errors.join(' '),
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Fotos salvas', description: 'As alterações de fotos foram aplicadas.' });
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

  return (
    <AdminRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(paths.catalog)}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-7 w-7" />
              Editar produto
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">{product.codigo}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveData} disabled={savingData}>
            {savingData ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Salvar Dados
          </Button>
        </div>

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
                  value={idSubcategoria === '' ? '__none__' : String(idSubcategoria)}
                  onValueChange={(v) => setIdSubcategoria(v === '__none__' ? '' : Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Opcional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Nenhuma</SelectItem>
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
                inputMode="decimal"
                value={valorBase}
                onChange={(e) => setValorBase(e.target.value)}
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
            <CardDescription>
              Selecione uma ou mais imagens e clique em "Salvar Fotos" para enviar. Fotos removidas só são
              excluídas ao salvar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {existingImages.map((img) => (
                <div
                  key={img.url}
                  className="relative group rounded-lg border overflow-hidden bg-muted aspect-square"
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  {img.id != null && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 opacity-90 group-hover:opacity-100"
                      onClick={() => handleMarkExistingForRemoval(img)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {newImages.map((img) => (
                <div
                  key={img.previewUrl}
                  className="relative group rounded-lg border overflow-hidden bg-muted aspect-square"
                >
                  <img src={img.previewUrl} alt="" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded bg-background/80 px-1.5 py-0.5 text-xs">
                    Nova
                  </span>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-90 group-hover:opacity-100"
                    onClick={() => handleRemoveNewImage(img.previewUrl)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <label className="flex aspect-square rounded-lg border border-dashed items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="file"
                  accept={ACCEPT_IMAGES}
                  multiple
                  className="hidden"
                  onChange={handleSelectImages}
                />
                <div className="text-center p-4">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Adicionar imagens</span>
                </div>
              </label>
            </div>
            {existingImages.length === 0 && newImages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <ImageOff className="h-12 w-12 mb-2" />
                <p className="text-sm">Nenhuma foto. Use “Adicionar imagens” para selecionar (JPG, PNG, GIF, WebP).</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleSavePhotos} disabled={savingPhotos}>
                {savingPhotos ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Salvar Fotos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preços calculados ({ESTADO})</CardTitle>
            <CardDescription>Valores exibidos conforme estado padrão</CardDescription>
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
