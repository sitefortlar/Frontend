import { api } from '@/services/api';

export interface CEPApiResponse {
  cep: string;
  logradouro: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  uf: string;
}


export class CEPService {
  async searchByCEP(cep: string): Promise<CEPApiResponse> {
    try {
      const response = await api.get(`/utils/cep/${cep}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Erro ao fazer login');
    }
  }
}
