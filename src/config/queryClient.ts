import { QueryClient } from '@tanstack/react-query';
import { isDevelopment } from './environment';

/**
 * Configuração centralizada do React Query
 * Aplicando melhores práticas de cache, revalidação e error handling
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Tempo que os dados ficam "frescos" antes de serem considerados stale
        staleTime: 1000 * 60 * 5, // 5 minutos
        
        // Tempo que os dados ficam em cache antes de serem removidos
        gcTime: 1000 * 60 * 30, // 30 minutos (anteriormente cacheTime)
        
        // Número de tentativas em caso de erro
        retry: (failureCount, error: any) => {
          // Não tentar novamente para erros 4xx (client errors)
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          // Máximo 3 tentativas para outros erros
          return failureCount < 3;
        },
        
        // Intervalo entre tentativas (exponential backoff)
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        
        // Revalidar automaticamente quando a janela ganha foco
        refetchOnWindowFocus: true,
        
        // Revalidar automaticamente quando a conexão é restabelecida
        refetchOnReconnect: true,
        
        // Revalidar automaticamente quando o componente é montado
        refetchOnMount: true,
        
        // Não revalidar em background por padrão (pode ser sobrescrito por query)
        refetchInterval: false,
        
        // Configurações de suspense
        suspense: false,
        
        // Configurações de erro
        throwOnError: false,
      },
      mutations: {
        // Número de tentativas para mutations
        retry: (failureCount, error: any) => {
          // Não tentar novamente para erros 4xx
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          // Máximo 2 tentativas para mutations
          return failureCount < 2;
        },
        
        // Intervalo entre tentativas para mutations
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
        
        // Configurações de erro
        throwOnError: false,
      },
    },
    
    // Configurações globais
    logger: {
      log: (...args) => {
        if (isDevelopment) {
          console.log('[React Query]', ...args);
        }
      },
      warn: (...args) => {
        if (isDevelopment) {
          console.warn('[React Query]', ...args);
        }
      },
      error: (...args) => {
        console.error('[React Query]', ...args);
      },
    },
  });
};

/**
 * Query keys centralizadas para melhor organização e type safety
 */
export const queryKeys = {
  // Auth queries
  auth: {
    user: ['auth', 'user'] as const,
    profile: ['auth', 'profile'] as const,
  },
  
  // Product queries
  products: {
    all: ['products'] as const,
    list: (filters: Record<string, any>) => ['products', 'list', filters] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
    categories: ['products', 'categories'] as const,
    search: (query: string) => ['products', 'search', query] as const,
  },
  
  // Cart queries
  cart: {
    items: ['cart', 'items'] as const,
    count: ['cart', 'count'] as const,
    total: ['cart', 'total'] as const,
  },
  
  // Company queries
  company: {
    data: ['company', 'data'] as const,
    cnpj: (cnpj: string) => ['company', 'cnpj', cnpj] as const,
  },
  
  // Address queries
  address: {
    cep: (cep: string) => ['address', 'cep', cep] as const,
  },
} as const;

/**
 * Configurações específicas para diferentes tipos de queries
 */
export const queryConfigs = {
  // Queries que raramente mudam (categorias, configurações)
  static: {
    staleTime: 1000 * 60 * 60, // 1 hora
    gcTime: 1000 * 60 * 60 * 24, // 24 horas
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  
  // Queries que mudam frequentemente (produtos, carrinho)
  dynamic: {
    staleTime: 1000 * 60 * 2, // 2 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  },
  
  // Queries em tempo real (notificações, status)
  realtime: {
    staleTime: 0, // Sempre stale
    gcTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 30, // 30 segundos
  },
} as const;
