/**
 * Mapeia nome da categoria (normalizado) para caminho da imagem no public.
 * Imagens geradas para os cards de categorias (fallback: ícone no componente).
 */
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  pressão: '/categories/pressure-cooker.png',
  pressao: '/categories/pressure-cooker.png',
  panela: '/categories/pots.png',
  caçarola: '/categories/pots.png',
  cacarola: '/categories/pots.png',
  caldeirão: '/categories/kettles.png',
  caldeirao: '/categories/kettles.png',
  caldeiroes: '/categories/kettles.png',
  canecão: '/categories/kettles.png',
  canecao: '/categories/kettles.png',
  fervedor: '/categories/kettles.png',
  frigideira: '/categories/frying-pans.png',
  forma: '/categories/baking.png',
  assadeira: '/categories/baking.png',
  jarra: '/categories/jars.png',
  marmita: '/categories/lunchboxes.png',
  concha: '/categories/ladles.png',
  espumadeira: '/categories/ladles.png',
  tampa: '/categories/pots.png',
  jogo: '/categories/cookware-set.png',
  jogos: '/categories/cookware-set.png',
  feirinha: '/categories/fair-kit.png',
  kit: '/categories/fair-kit.png',
  filtro: '/categories/oil-filter.png',
  óleo: '/categories/oil-filter.png',
  oleo: '/categories/oil-filter.png',
  depósito: '/categories/archive.png',
  deposito: '/categories/archive.png',
};

/**
 * Retorna a URL da imagem da categoria, ou null se não houver imagem mapeada.
 */
export function getCategoryImageUrl(categoryName: string): string | null {
  const name = categoryName.toLowerCase();
  for (const [key, path] of Object.entries(CATEGORY_IMAGE_MAP)) {
    if (name.includes(key)) return path;
  }
  return null;
}
