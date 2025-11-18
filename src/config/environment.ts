/**
 * Configuração de ambiente para o navegador
 * Gerencia variáveis de ambiente de forma segura
 */

interface EnvironmentConfig {
  API_BASE_URL: string;
  NODE_ENV: string;
}

/**
 * Obtém variável de ambiente de forma segura
 * @param key - Chave da variável de ambiente
 * @param defaultValue - Valor padrão caso não encontre
 * @returns Valor da variável de ambiente ou valor padrão
 */
const getEnvVar = (key: string, defaultValue: string): string => {
  // Verifica se está no navegador
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  // Tenta obter do objeto window.ENV (configurado pelo Vite)
  if ((window as any).ENV && (window as any).ENV[key]) {
    return (window as any).ENV[key];
  }

  // Fallback para import.meta.env (Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }

  return defaultValue;
};

/**
 * Configuração do ambiente
 */
export const config: EnvironmentConfig = {
  API_BASE_URL: getEnvVar('API_BASE_URL', 'https://backend-zuzf.onrender.com'),
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
};

/**
 * Verifica se está em modo de desenvolvimento
 */
export const isDevelopment = config.NODE_ENV === 'development';

/**
 * Verifica se está em modo de produção
 */
export const isProduction = config.NODE_ENV === 'production';

/**
 * URLs das APIs
 */
export const API_URLS = {
  CNPJ: `${config.API_BASE_URL}/api/utils/cnpj`,
  CEP: `${config.API_BASE_URL}/api/utils/cep`,
} as const;
