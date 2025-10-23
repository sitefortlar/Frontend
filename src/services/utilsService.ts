import { CepService, CepApiResponse, CepServiceError } from './cepService';
import { CnpjService, CnpjApiResponse, CnpjServiceError } from './cnpjService';

/**
 * Serviço centralizado para utilitários (CEP e CNPJ)
 * Combina funcionalidades dos serviços específicos
 */
export class UtilsService {
  private readonly cepService: CepService;
  private readonly cnpjService: CnpjService;

  constructor() {
    this.cepService = new CepService();
    this.cnpjService = new CnpjService();
  }

  /**
   * Busca endereço por CEP
   * @param cep - CEP com ou sem formatação (máximo 8 caracteres numéricos)
   * @returns Promise com dados do endereço ou erro
   */
  async searchCep(cep: string): Promise<CepApiResponse> {
    return this.cepService.searchByCep(cep);
  }

  /**
   * Busca dados da empresa por CNPJ
   * @param cnpj - CNPJ com ou sem formatação (máximo 14 caracteres numéricos)
   * @returns Promise com dados da empresa ou erro
   */
  async searchCnpj(cnpj: string): Promise<CnpjApiResponse> {
    return this.cnpjService.searchByCnpj(cnpj);
  }

  /**
   * Valida e limita CEP para 8 caracteres numéricos
   * @param cep - CEP a ser validado
   * @returns CEP limpo e limitado
   */
  validateAndLimitCep(cep: string): string {
    const cleanCep = cep.replace(/\D/g, '');
    return cleanCep.slice(0, 8);
  }

  /**
   * Valida e limita CNPJ para 14 caracteres numéricos
   * @param cnpj - CNPJ a ser validado
   * @returns CNPJ limpo e limitado
   */
  validateAndLimitCnpj(cnpj: string): string {
    const cleanCnpj = cnpj.replace(/\D/g, '');
    return cleanCnpj.slice(0, 14);
  }

  /**
   * Verifica se CEP está completo (8 dígitos)
   * @param cep - CEP a ser verificado
   * @returns true se CEP está completo
   */
  isCepComplete(cep: string): boolean {
    const cleanCep = cep.replace(/\D/g, '');
    return cleanCep.length === 8;
  }

  /**
   * Verifica se CNPJ está completo (14 dígitos)
   * @param cnpj - CNPJ a ser verificado
   * @returns true se CNPJ está completo
   */
  isCnpjComplete(cnpj: string): boolean {
    const cleanCnpj = cnpj.replace(/\D/g, '');
    return cleanCnpj.length === 14;
  }
}

// Instância singleton do serviço
export const utilsService = new UtilsService();

/**
 * Hook para usar o serviço de utilitários
 */
export const useUtilsService = () => {
  const searchCep = async (cep: string): Promise<CepApiResponse> => {
    return utilsService.searchCep(cep);
  };

  const searchCnpj = async (cnpj: string): Promise<CnpjApiResponse> => {
    return utilsService.searchCnpj(cnpj);
  };

  const validateAndLimitCep = (cep: string): string => {
    return utilsService.validateAndLimitCep(cep);
  };

  const validateAndLimitCnpj = (cnpj: string): string => {
    return utilsService.validateAndLimitCnpj(cnpj);
  };

  const isCepComplete = (cep: string): boolean => {
    return utilsService.isCepComplete(cep);
  };

  const isCnpjComplete = (cnpj: string): boolean => {
    return utilsService.isCnpjComplete(cnpj);
  };

  return {
    searchCep,
    searchCnpj,
    validateAndLimitCep,
    validateAndLimitCnpj,
    isCepComplete,
    isCnpjComplete,
  };
};

// Re-exportações dos tipos
export type { CepApiResponse, CepServiceError, CnpjApiResponse, CnpjServiceError };
