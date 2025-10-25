import { api } from '../api';

export interface CNPJApiResponse {
  cnpj: string;
  razao_social: string;
  fantasia: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  telefone: string | null;
  email: string | null;
  atividade_principal: string | null;
}


export class CNPJService {
    async searchByCNPJ(cnpj: string): Promise<CNPJApiResponse> {
      try {
        const response = await api.get(`/utils/cnpj/${cnpj}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Erro ao fazer login');
      }
    }   
}
