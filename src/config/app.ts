export const APP_CONFIG = {
  name: 'Fort-Lar',
  version: '1.0.0',
  description: 'Sistema de catálogo de produtos Fort-Lar',
  
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  
  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  
  // Cart Configuration
  cart: {
    maxItems: 100,
    autoSave: true,
  },
  
  // Form Validation
  validation: {
    password: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
    cnpj: {
      length: 14,
    },
    phone: {
      minLength: 10,
      maxLength: 11,
    },
  },
  
  // UI Configuration
  ui: {
    animationDuration: 300,
    toastDuration: 5000,
    debounceDelay: 300,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
