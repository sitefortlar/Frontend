/**
 * Utilitários de formatação e limpeza de dados
 * Funções puras para manipulação de strings numéricas
 */

/**
 * Remove todos os caracteres não numéricos de uma string
 * @param value - String a ser limpa
 * @returns String contendo apenas dígitos
 */
export const onlyDigits = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Limita o número de dígitos em uma string
 * @param value - String a ser limitada
 * @param maxLength - Número máximo de dígitos permitidos
 * @returns String limitada ao número máximo de dígitos
 */
export const limitDigits = (value: string, maxLength: number): string => {
  const cleanValue = onlyDigits(value);
  return cleanValue.slice(0, maxLength);
};

/**
 * Formata CNPJ com máscara 99.999.999/9999-99
 * @param value - String com dígitos do CNPJ
 * @returns String formatada ou vazia se inválida
 */
export const formatCNPJ = (value: string): string => {
  const cleanValue = onlyDigits(value);
  
  if (cleanValue.length === 0) return '';
  
  // Aplica a máscara progressivamente
  if (cleanValue.length <= 2) {
    return cleanValue;
  } else if (cleanValue.length <= 5) {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2)}`;
  } else if (cleanValue.length <= 8) {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5)}`;
  } else if (cleanValue.length <= 12) {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8)}`;
  } else {
    return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8, 12)}-${cleanValue.slice(12, 14)}`;
  }
};

/**
 * Formata CEP com máscara 99999-999
 * @param value - String com dígitos do CEP
 * @returns String formatada ou vazia se inválida
 */
export const formatCEP = (value: string): string => {
  const cleanValue = onlyDigits(value);
  
  if (cleanValue.length === 0) return '';
  
  if (cleanValue.length <= 5) {
    return cleanValue;
  } else {
    return `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`;
  }
};

/**
 * Formata telefone com máscara dinâmica
 * @param value - String com dígitos do telefone
 * @returns String formatada com máscara apropriada
 */
export const formatPhone = (value: string): string => {
  const cleanValue = onlyDigits(value);
  
  if (cleanValue.length === 0) return '';
  
  // Telefone fixo: (99) 9999-9999 (10 dígitos)
  if (cleanValue.length <= 10) {
    if (cleanValue.length <= 2) {
      return `(${cleanValue}`;
    } else if (cleanValue.length <= 6) {
      return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
    } else {
      return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`;
    }
  }
  // Celular: (99) 99999-9999 (11 dígitos)
  else {
    if (cleanValue.length <= 2) {
      return `(${cleanValue}`;
    } else if (cleanValue.length <= 7) {
      return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
    } else {
      return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7)}`;
    }
  }
};

/**
 * Valida se uma string contém apenas dígitos
 * @param value - String a ser validada
 * @returns true se contém apenas dígitos
 */
export const isOnlyDigits = (value: string): boolean => {
  return /^\d+$/.test(value);
};

/**
 * Valida se uma string está vazia ou contém apenas espaços
 * @param value - String a ser validada
 * @returns true se está vazia
 */
export const isEmpty = (value: string): boolean => {
  return value.trim().length === 0;
};

/**
 * Normaliza uma string removendo espaços e caracteres especiais
 * @param value - String a ser normalizada
 * @returns String normalizada
 */
export const normalizeString = (value: string): string => {
  return value.trim().replace(/\s+/g, ' ');
};
