/**
 * Design System - Border Radius Tokens
 * Baseado no sistema de border radius atual
 */

export const radius = {
  // Valores básicos
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
  
  // Valores do sistema atual (baseados nas CSS variables)
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  
  // Valores específicos do Fort-Lar
  auth: '0.75rem',     // 12px - para inputs de auth
  card: '1rem',        // 16px - para cards
  button: '0.5rem',    // 8px - para botões
  input: '0.375rem',   // 6px - para inputs
  modal: '1.5rem',     // 24px - para modais
} as const

export type Radius = typeof radius
