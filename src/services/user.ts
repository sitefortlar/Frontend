import { api } from './api';

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  clients: Client[];
}


export const userService = {
  async getUser(id: string): Promise<User> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário atual');
    }
  },

  async getClients(): Promise<Client[]> {
    try {
      const response = await api.get('/clients');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar clientes');
    }
  }
};
