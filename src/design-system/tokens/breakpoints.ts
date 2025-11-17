/**
 * Design System - Breakpoint Tokens
 * Baseado no sistema de breakpoints do Tailwind
 */

export const breakpoints = {
  // Breakpoints básicos
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  
  // Breakpoints específicos do Fort-Lar
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  ultra: '1536px',
  
  // Breakpoints para containers
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },
} as const

export type Breakpoints = typeof breakpoints

// Media queries helpers
export const media = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  
  // Mobile first
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
  ultra: `@media (min-width: ${breakpoints.ultra})`,
  
  // Max width queries
  maxSm: `@media (max-width: ${breakpoints.sm})`,
  maxMd: `@media (max-width: ${breakpoints.md})`,
  maxLg: `@media (max-width: ${breakpoints.lg})`,
  maxXl: `@media (max-width: ${breakpoints.xl})`,
  max2Xl: `@media (max-width: ${breakpoints['2xl']})`,
} as const

export type Media = typeof media
