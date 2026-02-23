import {
  Cloud,
  CookingPot,
  Coffee,
  Soup,
  Container,
  Filter,
  ShoppingBag,
  Archive,
  Sparkles,
  Milk,
  Wheat,
  Droplets,
  UtensilsCrossed,
  ChefHat,
  Refrigerator,
  GlassWater,
  CakeSlice,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Retorna o ícone representativo para uma categoria pelo nome.
 * Reutilizado no sidebar e nos cards de categorias.
 */
export function getCategoryIcon(categoryName: string): LucideIcon {
  const name = categoryName.toLowerCase();

  if (name.includes('pressão') || name.includes('pressao')) return Cloud;
  if (name.includes('caldeirão') || name.includes('caldeirao') || name.includes('caldeiroes')) return Soup;
  if (name.includes('jarra')) return Coffee;
  if (name.includes('marmita')) return Container;
  if (name.includes('concha')) return Soup;
  if (name.includes('filtra') || name.includes('óleo') || name.includes('oleo')) return Filter;
  if (name.includes('feirinha') || name.includes('kit')) return ShoppingBag;
  if (name.includes('bacia') || name.includes('balde')) return Container;
  if (name.includes('depósito') || name.includes('deposito') || name.includes('alimento')) return Archive;
  if (name.includes('pipoqueira')) return Sparkles;
  if (name.includes('latão') || name.includes('latao') || name.includes('leite')) return Milk;
  if (name.includes('espagueteira') || name.includes('macarrão') || name.includes('macarrao')) return Wheat;
  if (name.includes('moringa')) return Droplets;
  if (name.includes('wok')) return UtensilsCrossed;
  if (name.includes('cuscuzeira')) return ChefHat;
  if (name.includes('blue')) return Refrigerator;
  if (name.includes('copo')) return GlassWater;
  if (name.includes('panela') || name.includes('caçarola') || name.includes('cacarola')) return CookingPot;
  if (name.includes('frigideira')) return UtensilsCrossed;
  if (name.includes('forma') || name.includes('assadeira')) return CakeSlice;
  if (name.includes('canecão') || name.includes('canecao') || name.includes('fervedor')) return Coffee;

  return CookingPot;
}
