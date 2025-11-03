import { api } from './api';

export interface Address {
  id_endereco: number;
  cep: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  ibge: string;
}

export interface Contact {
  id_contato: number;
  nome: string;
  telefone: string;
  celular: string;
  email: string;
}

export interface Company {
  id_empresa: number;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  perfil: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
  enderecos: Address[];
  contatos: Contact[];
}

// Request interfaces
export interface CompanyAddressRequest {
  cep: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  ibge: string;
}

export interface CompanyContactRequest {
  nome: string;
  telefone: string;
  celular: string;
  email: string;
}

export interface CompanyRequest {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  senha: string;
  endereco: CompanyAddressRequest;
  contato: CompanyContactRequest;
}

export const companyService = {
  async getCompanyById(id: string | number): Promise<Company> {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error: any) {
      // Preservar o erro original para permitir verificação de status HTTP no loader
      if (error.response) {
        const axiosError = error;
        throw axiosError;
      }
      throw new Error(error.response?.data?.message || 'Erro ao buscar empresa');
    }
  },

  async postCompany(companyData: CompanyRequest): Promise<Company> {
    try {
      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar empresa');
    }
  }
};
