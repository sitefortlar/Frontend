/**
 * Design System - Theme
 * Tema principal do Fort-Lar
 */

import { colors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
import { typography } from '../tokens/typography'
import { radius } from '../tokens/radius'
import { shadows } from '../tokens/shadows'
import { transitions } from '../tokens/transitions'
import { breakpoints, media } from '../tokens/breakpoints'

export const theme = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  transitions,
  breakpoints,
  media,
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Opacity scale
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1',
  },
  
  // Blur scale
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
} as const

export type Theme = typeof theme

// Tipos para styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
