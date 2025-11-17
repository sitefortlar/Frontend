/**
 * Design System - Shadow Tokens
 * Baseado no sistema de sombras atual
 */

export const shadows = {
  // Sombras básicas
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  
  // Sombras específicas do Fort-Lar (do CSS atual)
  soft: '0 2px 8px -2px hsl(210 20% 20% / 0.08)',
  medium: '0 4px 16px -4px hsl(210 20% 20% / 0.12)',
  glass: '0 8px 32px -8px hsl(210 100% 10% / 0.3)',
  elevated: '0 16px 64px -12px hsl(210 20% 20% / 0.2)',
  
  // Sombras para componentes específicos
  button: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  buttonHover: '0 4px 8px -2px rgb(0 0 0 / 0.1)',
  card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  cardHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  tooltip: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  
  // Sombras coloridas
  primary: '0 4px 14px 0 rgb(59 130 246 / 0.15)',
  success: '0 4px 14px 0 rgb(16 185 129 / 0.15)',
  error: '0 4px 14px 0 rgb(239 68 68 / 0.15)',
  warning: '0 4px 14px 0 rgb(245 158 11 / 0.15)',
} as const

export type Shadows = typeof shadows
