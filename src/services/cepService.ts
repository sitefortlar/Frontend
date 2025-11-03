import { validateCEP } from '@/utils/validation';
import { API_URLS } from '@/config/environment';

export interface CepApiResponse {
  cep: string;
  logradouro: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface CepServiceError {
  type: 'INVALID_CEP' | 'API_ERROR' | 'NOT_FOUND' | 'NETWORK_ERROR';
  message: string;
}

/**
 * Serviço para consulta de endereço por CEP
 * Usa a API do backend
 */
export class CepService {
  private readonly apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || API_URLS.CEP;
  }

  /**
   * Busca endereço por CEP
   * @param cep - CEP com ou sem formatação
   * @returns Promise com dados do endereço ou erro
   */
  async searchByCep(cep: string): Promise<CepApiResponse> {
    // Validação local primeiro
    if (!validateCEP(cep)) {
      throw this.createError('INVALID_CEP', 'CEP inválido');
    }

    const cleanCep = cep.replace(/\D/g, '');

    try {
      const response = await fetch(`${this.apiUrl}/${cleanCep}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw this.createError('NOT_FOUND', 'CEP não encontrado');
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
  private mapApiResponse(data: any): CepApiResponse {
    return {
      cep: data.cep || '',
      logradouro: data.logradouro || '',
      complemento: data.complemento,
      bairro: data.bairro || '',
      cidade: data.cidade || '',
      uf: data.uf || '',
    };
  }

  /**
   * Cria erro tipado para o serviço
   */
  private createError(type: CepServiceError['type'], message: string): CepServiceError {
    return { type, message };
  }
}

// Instância singleton do serviço
export const cepService = new CepService();

/**
 * Hook para usar o serviço de CEP
 */
export const useCepService = () => {
  const searchByCep = async (cep: string): Promise<CepApiResponse> => {
    return cepService.searchByCep(cep);
  };

  return { searchByCep };
};
