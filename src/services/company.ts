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

export const companyService = {
  async getCompanyById(id: string | number): Promise<Company> {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar empresa');
    }
  }
};
