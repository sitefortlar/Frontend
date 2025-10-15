/**
 * Design System - Transition Tokens
 * Baseado no sistema de transições atual
 */

export const transitions = {
  // Durações
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  
  // Funções de timing
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    glass: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Transições pré-definidas
  all: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Transições específicas do Fort-Lar
  smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  glass: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Transições para componentes específicos
  button: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  card: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  input: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  modal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  dropdown: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  tooltip: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export type Transitions = typeof transitions
