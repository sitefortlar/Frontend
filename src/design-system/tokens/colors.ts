/**
 * Design System - Color Tokens
 * Baseado no design atual do Fort-Lar
 */

export const colors = {
  // Cores principais (mantendo o visual atual)
  primary: {
    50: 'hsl(210, 100%, 95%)',
    100: 'hsl(210, 100%, 90%)',
    200: 'hsl(210, 100%, 80%)',
    300: 'hsl(210, 100%, 70%)',
    400: 'hsl(210, 100%, 60%)',
    500: 'hsl(210, 100%, 50%)',
    600: 'hsl(210, 100%, 45%)',
    700: 'hsl(210, 100%, 35%)',
    800: 'hsl(210, 100%, 25%)',
    900: 'hsl(210, 100%, 10%)',
  },
  
  // Cores do sistema
  background: 'hsl(40, 20%, 97%)',
  foreground: 'hsl(210, 100%, 10%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(210, 100%, 10%)',
  
  // Cores de estado
  success: 'hsl(120, 100%, 40%)',
  successForeground: 'hsl(0, 0%, 100%)',
  error: 'hsl(0, 84%, 60%)',
  errorForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(38, 92%, 50%)',
  warningForeground: 'hsl(0, 0%, 100%)',
  info: 'hsl(210, 100%, 50%)',
  infoForeground: 'hsl(0, 0%, 100%)',
  
  // Cores de interface
  border: 'hsl(210, 20%, 85%)',
  input: 'hsl(210, 20%, 90%)',
  ring: 'hsl(210, 100%, 50%)',
  muted: 'hsl(210, 20%, 95%)',
  mutedForeground: 'hsl(210, 20%, 40%)',
  accent: 'hsl(210, 100%, 45%)',
  accentForeground: 'hsl(0, 0%, 100%)',
  
  // Cores específicas do Fort-Lar (Auth)
  auth: {
    bgStart: 'hsl(200, 100%, 15%)',
    bgEnd: 'hsl(210, 100%, 40%)',
    formBg: 'hsla(205, 70%, 20%, 0.4)',
    inputBg: 'hsla(210, 50%, 25%, 0.3)',
    button: 'hsl(210, 100%, 50%)',
    buttonHover: 'hsl(210, 100%, 65%)',
  },
  
  // Glass morphism
  glass: {
    bg: 'hsla(205, 70%, 20%, 0.15)',
    border: 'hsla(210, 100%, 80%, 0.2)',
    shadow: '0 8px 32px -8px hsl(210 100% 10% / 0.3)',
  },
  
  // Cores específicas do projeto
  institutional: {
    primary: 'hsl(197, 72%, 20%)',
    accent: 'hsl(207, 46%, 80%)',
    light: 'hsl(207, 46%, 80%)',
    neutral: 'hsl(206, 29%, 9%)',
    dark: 'hsl(206, 29%, 9%)',
  },
} as const

export type Colors = typeof colors
