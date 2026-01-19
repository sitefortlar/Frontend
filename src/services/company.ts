import { api } from './api';
import type { ListCompaniesParams, ListContactsParams, ListAddressesParams } from '@/types/pagination';

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
  },

  /**
   * Lista empresas com paginação
   */
  async listCompanies(params?: ListCompaniesParams): Promise<Company[]> {
    try {
      const queryParams: Record<string, any> = {};
      
      if (params?.active_only !== undefined) {
        queryParams.active_only = params.active_only;
      }
      if (params?.vendedor_id) {
        queryParams.vendedor_id = params.vendedor_id;
      }
      if (params?.search_name) {
        queryParams.search_name = params.search_name;
      }
      
      // Paginação (valores padrão se não fornecidos)
      queryParams.skip = params?.skip ?? 0;
      queryParams.limit = params?.limit ?? 100;
      
      const response = await api.get('/companies', { params: queryParams });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao listar empresas');
    }
  },

  /**
   * Lista contatos com paginação
   */
  async listContacts(params?: ListContactsParams): Promise<Contact[]> {
    try {
      const queryParams: Record<string, any> = {};
      
      if (params?.empresa_id) {
        queryParams.empresa_id = params.empresa_id;
      }
      if (params?.search_name) {
        queryParams.search_name = params.search_name;
      }
      if (params?.email) {
        queryParams.email = params.email;
      }
      if (params?.phone) {
        queryParams.phone = params.phone;
      }
      
      // Paginação
      queryParams.skip = params?.skip ?? 0;
      queryParams.limit = params?.limit ?? 100;
      
      const response = await api.get('/contatos', { params: queryParams });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao listar contatos');
    }
  },

  /**
   * Lista endereços com paginação
   */
  async listAddresses(params?: ListAddressesParams): Promise<Address[]> {
    try {
      const queryParams: Record<string, any> = {};
      
      if (params?.empresa_id) {
        queryParams.empresa_id = params.empresa_id;
      }
      if (params?.cep) {
        queryParams.cep = params.cep;
      }
      if (params?.cidade) {
        queryParams.cidade = params.cidade;
      }
      if (params?.uf) {
        queryParams.uf = params.uf;
      }
      if (params?.ibge) {
        queryParams.ibge = params.ibge;
      }
      if (params?.search_address) {
        queryParams.search_address = params.search_address;
      }
      
      // Paginação
      queryParams.skip = params?.skip ?? 0;
      queryParams.limit = params?.limit ?? 100;
      
      const response = await api.get('/enderecos', { params: queryParams });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao listar endereços');
    }
  }
};
