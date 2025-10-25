/**
 * Configuração de ambiente para o navegador
 * Gerencia variáveis de ambiente de forma segura
 */

interface EnvironmentConfig {
  REACT_APP_CNPJ_API_URL: string;
  REACT_APP_CEP_API_URL: string;
  REACT_APP_UTILS_CEP_API_URL: string;
  REACT_APP_UTILS_CNPJ_API_URL: string;
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
  REACT_APP_CNPJ_API_URL: getEnvVar('REACT_APP_CNPJ_API_URL', 'https://www.receitaws.com.br/v1/cnpj'),
  REACT_APP_CEP_API_URL: getEnvVar('REACT_APP_CEP_API_URL', 'https://viacep.com.br/ws'),
  REACT_APP_UTILS_CEP_API_URL: getEnvVar('REACT_APP_UTILS_CEP_API_URL', 'http://127.0.0.1:8088/api/utils/cep'),
  REACT_APP_UTILS_CNPJ_API_URL: getEnvVar('REACT_APP_UTILS_CNPJ_API_URL', 'http://127.0.0.1:8088/api/utils/cnpj'),
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
  CNPJ: config.REACT_APP_CNPJ_API_URL,
  CEP: config.REACT_APP_CEP_API_URL,
  UTILS_CEP: config.REACT_APP_UTILS_CEP_API_URL,
  UTILS_CNPJ: config.REACT_APP_UTILS_CNPJ_API_URL,
} as const;
