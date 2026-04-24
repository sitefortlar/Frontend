/**
 * Imagens dos cards de categorias (em src/assets/categories).
 * Preferência: buscar por id_categoria usando assets no formato `<id>--<slug>.png`.
 * Fallback: heurística por nome (legado) e/ou ícone no componente.
 */
type ImageUrl = string;

const CATEGORY_IMAGE_BY_ID: Record<number, ImageUrl> = (() => {
  // Importa todos os assets `src/assets/categories/<id>--<slug>.png` e monta um mapa id -> url.
  const modules = import.meta.glob('@/assets/categories/*--*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, ImageUrl>;

  const map: Record<number, ImageUrl> = {};
  for (const [path, url] of Object.entries(modules)) {
    const m = path.match(/\/(\d+)--[^/]+\.png$/);
    if (!m) continue;
    const id = Number(m[1]);
    if (Number.isFinite(id)) map[id] = url;
  }
  return map;
})();

/**
 * Chaves mais específicas primeiro para que o primeiro match ganhe.
 */
const CATEGORY_IMAGE_MAP_BY_NAME: Record<string, string> = {
  /* Bacias e Baldes */
  // Mantido por compatibilidade: mapeamento por nome agora é opcional e deve ser substituído por id.
};

/**
 * Preferencial: retorna a URL da imagem da categoria por id_categoria.
 * Retorna null se não houver asset para o id.
 */
export function getCategoryImageUrlById(categoryId: number): string | null {
  if (!Number.isFinite(categoryId)) return null;
  return CATEGORY_IMAGE_BY_ID[categoryId] ?? null;
}

/**
 * Legado: tenta resolver imagem por nome (heurística). Use apenas como fallback.
 */
export function getCategoryImageUrl(categoryName: string): string | null {
  const name = categoryName.toLowerCase();
  for (const [key, path] of Object.entries(CATEGORY_IMAGE_MAP_BY_NAME)) {
    if (name.includes(key)) return path;
  }
  return null;
}
