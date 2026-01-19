/**
 * Utilitários para validação e normalização de parâmetros de paginação
 */

/**
 * Valida e normaliza parâmetros de paginação
 * 
 * @param skip - Número de registros para pular
 * @param limit - Número máximo de registros (padrão: 100, máximo: 1000)
 * @param maxLimit - Limite máximo permitido (padrão: 1000, produtos podem usar 10000)
 * @returns Objeto com skip e limit validados
 * 
 * @example
 * const { skip, limit } = validatePaginationParams(0, 50);
 * // { skip: 0, limit: 50 }
 * 
 * const { skip, limit } = validatePaginationParams(-5, 2000, 1000);
 * // { skip: 0, limit: 1000 }
 */
export function validatePaginationParams(
  skip?: number,
  limit?: number,
  maxLimit: number = 1000
): { skip: number; limit: number } {
  // Validar skip: deve ser >= 0
  const validatedSkip = Math.max(0, skip || 0);
  
  // Validar limit: deve estar entre 1 e maxLimit
  let validatedLimit = limit || 100;
  validatedLimit = Math.max(1, validatedLimit);
  validatedLimit = Math.min(maxLimit, validatedLimit);
  
  return {
    skip: validatedSkip,
    limit: validatedLimit,
  };
}

/**
 * Valida parâmetros de paginação para produtos
 * Produtos têm limite máximo de 10000
 * 
 * @param skip - Número de registros para pular
 * @param limit - Número máximo de registros
 * @returns Objeto com skip e limit validados
 */
export function validateProductPaginationParams(
  skip?: number,
  limit?: number
): { skip: number; limit: number } {
  return validatePaginationParams(skip, limit, 10000);
}

/**
 * Calcula o número total de páginas baseado no total de itens e tamanho da página
 * 
 * @param totalItems - Total de itens
 * @param pageSize - Tamanho da página
 * @returns Número total de páginas
 * 
 * @example
 * const totalPages = calculateTotalPages(250, 50);
 * // 5
 */
export function calculateTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0 || pageSize <= 0) {
    return 0;
  }
  return Math.ceil(totalItems / pageSize);
}

/**
 * Calcula o índice do primeiro item da página atual
 * 
 * @param page - Página atual (baseada em 1)
 * @param pageSize - Tamanho da página
 * @returns Índice do primeiro item (baseado em 1)
 * 
 * @example
 * const startIndex = getPageStartIndex(3, 50);
 * // 101
 */
export function getPageStartIndex(page: number, pageSize: number): number {
  return (page - 1) * pageSize + 1;
}

/**
 * Calcula o índice do último item da página atual
 * 
 * @param page - Página atual (baseada em 1)
 * @param pageSize - Tamanho da página
 * @param totalItems - Total de itens (opcional, para limitar o resultado)
 * @returns Índice do último item (baseado em 1)
 * 
 * @example
 * const endIndex = getPageEndIndex(3, 50, 250);
 * // 150
 */
export function getPageEndIndex(
  page: number,
  pageSize: number,
  totalItems?: number
): number {
  const calculatedEnd = page * pageSize;
  if (totalItems !== undefined) {
    return Math.min(calculatedEnd, totalItems);
  }
  return calculatedEnd;
}
