/**
 * Imagens dos cards de categorias (em src/assets/categories).
 * Mapeia nome da categoria para a URL da imagem; fallback: ícone no componente.
 */
import panelaPressaoUrl from '@/assets/categories/panela-pressao.png';
import panelasCacarolasUrl from '@/assets/categories/panelas-cacarolas.png';
import caldeiroesUrl from '@/assets/categories/caldeiroes.png';
import canecoesFevedoresUrl from '@/assets/categories/canecoes-fevedores.png';
import frigideirasUrl from '@/assets/categories/frigideiras.png';
import formasAssadeirasUrl from '@/assets/categories/formas-assadeiras.png';
import jarrasUrl from '@/assets/categories/jarras.png';
import marmitasJogosMarmitaUrl from '@/assets/categories/marmitas-jogos-marmita.png';
import conchaEspumadeiraUrl from '@/assets/categories/concha-espumadeira.png';
import tampasAvulsasUrl from '@/assets/categories/tampas-avulsas.png';
import jogosPanelasUrl from '@/assets/categories/jogos-panelas.png';
import kitFeirinhaUrl from '@/assets/categories/kit-feirinha.png';
import filtraOleoUrl from '@/assets/categories/filtra-oleo.png';
import depositoManutencaoUrl from '@/assets/categories/deposito-mantimentoss.png';
import lataoLeiteUrl from '@/assets/categories/latao-leite.png';
import lavarrozEscorredoresUrl from '@/assets/categories/lavarroz-escorredores.png';
import panelaBanhoMariaUrl from '@/assets/categories/panela-banho-maria.png';
import baciasBaldesUrl from '@/assets/categories/bacias-baldes.png';
import coposCanecasUrl from '@/assets/categories/copos-canecas.png';
import espagueteirasUrl from '@/assets/categories/espagueteiras.png';
import moringaUrl from '@/assets/categories/moringa.png';
import cuscuzeirosUrl from '@/assets/categories/cuscuzeiros.png';
import pipoqueirasUrl from '@/assets/categories/pipoqueiras.png';

/**
 * Chaves mais específicas primeiro para que o primeiro match ganhe.
 */
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  /* Bacias e Baldes */
  bacia: baciasBaldesUrl,
  bacias: baciasBaldesUrl,
  balde: baciasBaldesUrl,
  baldes: baciasBaldesUrl,
  /* Cuscuzeiros */
  cuscuzeiro: cuscuzeirosUrl,
  cuscuzeiros: cuscuzeirosUrl,
  /* Pipoqueiras */
  pipoqueira: pipoqueirasUrl,
  pipoqueiras: pipoqueirasUrl,
  /* Espagueteiras */
  espagueteira: espagueteirasUrl,
  espagueteiras: espagueteirasUrl,
  /* Moringa */
  moringa: moringaUrl,
  /* Linha Panela de Pressão */
  pressão: panelaPressaoUrl,
  pressao: panelaPressaoUrl,
  /* Panelas e Caçarolas */
  caçarola: panelasCacarolasUrl,
  cacarola: panelasCacarolasUrl,
  panela: panelasCacarolasUrl,
  panelas: panelasCacarolasUrl,
  /* Caldeirões */
  caldeirão: caldeiroesUrl,
  caldeirao: caldeiroesUrl,
  caldeiroes: caldeiroesUrl,
  /* Canecões e Fervedores (antes de copos/canecas para match correto) */
  canecão: canecoesFevedoresUrl,
  canecao: canecoesFevedoresUrl,
  fervedor: canecoesFevedoresUrl,
  canecoes: canecoesFevedoresUrl,
  /* Copos e Canecas */
  copo: coposCanecasUrl,
  copos: coposCanecasUrl,
  caneca: coposCanecasUrl,
  canecas: coposCanecasUrl,
  /* Frigideiras */
  frigideira: frigideirasUrl,
  frigideiras: frigideirasUrl,
  /* Formas e Assadeiras */
  forma: formasAssadeirasUrl,
  formas: formasAssadeirasUrl,
  assadeira: formasAssadeirasUrl,
  assadeiras: formasAssadeirasUrl,
  /* Jarras */
  jarra: jarrasUrl,
  jarras: jarrasUrl,
  /* Marmitas e Jogos de Marmita */
  marmita: marmitasJogosMarmitaUrl,
  marmitas: marmitasJogosMarmitaUrl,
  /* Concha - Espumadeira */
  concha: conchaEspumadeiraUrl,
  espumadeira: conchaEspumadeiraUrl,
  /* Tampas Avulsas */
  tampa: tampasAvulsasUrl,
  tampas: tampasAvulsasUrl,
  avulsas: tampasAvulsasUrl,
  /* Jogos de Panelas */
  jogo: jogosPanelasUrl,
  jogos: jogosPanelasUrl,
  /* Kit Feirinha */
  feirinha: kitFeirinhaUrl,
  kit: kitFeirinhaUrl,
  /* Filtro de Óleo */
  filtra: filtraOleoUrl,
  filtro: filtraOleoUrl,
  óleo: filtraOleoUrl,
  oleo: filtraOleoUrl,
  /* Depósito de Manutenção */
  depósito: depositoManutencaoUrl,
  deposito: depositoManutencaoUrl,
  manutenção: depositoManutencaoUrl,
  manutencao: depositoManutencaoUrl,
  /* Latão Leite */
  latão: lataoLeiteUrl,
  latao: lataoLeiteUrl,
  leite: lataoLeiteUrl,
  /* Lavarroz e Escorredores */
  lavarroz: lavarrozEscorredoresUrl,
  escorredor: lavarrozEscorredoresUrl,
  escorredores: lavarrozEscorredoresUrl,
  /* Panela Banho Maria */
  banho: panelaBanhoMariaUrl,
  maria: panelaBanhoMariaUrl,
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
