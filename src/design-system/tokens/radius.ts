/**
 * Design System - Border Radius Tokens
 * Baseado no sistema de border radius atual
 */

export const radius = {
  // Valores básicos
  none: '0',
  xs: '0.125rem',    // 2px
  sm: '0.25rem',     // 4px
  base: '0.375rem',  // 6px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
  '3xl': '2rem',     // 32px
  full: '9999px',
  
  // Valores específicos do Fort-Lar
  auth: '0.75rem',     // 12px - para inputs de auth
  card: '1rem',        // 16px - para cards
  button: '0.5rem',    // 8px - para botões
  input: '0.375rem',   // 6px - para inputs
  modal: '1.5rem',     // 24px - para modais
} as const

export type Radius = typeof radius
