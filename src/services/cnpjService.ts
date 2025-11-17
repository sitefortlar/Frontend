import { validateCNPJ } from '@/utils/validation';
import { onlyDigits } from '@/utils/formatting';
import { API_URLS } from '@/config/environment';

export interface CnpjApiResponse {
  cnpj: string;
  razao_social: string;
  fantasia: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone: string | null;
  email: string | null;
  atividade_principal: string | null;
}

export interface CnpjServiceError {
  type: 'INVALID_CNPJ' | 'API_ERROR' | 'NOT_FOUND' | 'NETWORK_ERROR' | 'RATE_LIMIT';
  message: string;
}

/**
 * Serviço para consulta de dados de empresa por CNPJ
 * Usa a API do backend
 */
export class CnpjService {
  private readonly apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || API_URLS.CNPJ;
  }

  /**
   * Busca dados da empresa por CNPJ
   * @param cnpj - CNPJ com ou sem formatação
   * @returns Promise com dados da empresa ou erro
   */
  async searchByCnpj(cnpj: string): Promise<CnpjApiResponse> {
    // Validação local primeiro
    if (!validateCNPJ(cnpj)) {
      throw this.createError('INVALID_CNPJ', 'CNPJ inválido');
    }

    const cleanCnpj = onlyDigits(cnpj);

    try {
      const response = await fetch(`${this.apiUrl}/${cleanCnpj}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw this.createError('NOT_FOUND', 'CNPJ não encontrado na base de dados');
        }
        if (response.status === 429) {
          throw this.createError('RATE_LIMIT', 'Muitas consultas. Aguarde um momento e tente novamente.');
        }
        throw this.createError('API_ERROR', `Erro na API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.mapApiResponse(data);

    } catch (error) {
      if (error instanceof Error && error.message.includes('fetch')) {
        throw this.createError('NETWORK_ERROR', 'Erro de conexão. Verifique sua internet.');
      }
      throw error;
    }
  }

  /**
   * Mapeia a resposta da API para o formato interno
   */
  private mapApiResponse(data: any): CnpjApiResponse {
    return {
      cnpj: data.cnpj || '',
      razao_social: data.razao_social || '',
      fantasia: data.fantasia || '',
      logradouro: data.logradouro || '',
      numero: data.numero || '',
      complemento: data.complemento || '',
      bairro: data.bairro || '',
      municipio: data.municipio || '',
      uf: data.uf || '',
      cep: data.cep || '',
      telefone: data.telefone,
      email: data.email,
      atividade_principal: data.atividade_principal,
    };
  }

  /**
   * Cria erro tipado para o serviço
   */
  private createError(type: CnpjServiceError['type'], message: string): CnpjServiceError {
    return { type, message };
  }
}

// Instância singleton do serviço
export const cnpjService = new CnpjService();

/**
 * Hook para usar o serviço de CNPJ
 * Facilita o uso em componentes React
 */
export const useCnpjService = () => {
  const searchByCnpj = async (cnpj: string): Promise<CnpjApiResponse> => {
    return cnpjService.searchByCnpj(cnpj);
  };

  return { searchByCnpj };
};
