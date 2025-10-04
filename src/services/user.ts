import { authService } from './auth';

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

// Mock users data
const mockUsers: Record<string, User> = {
  'user_1': {
    id: 'user_1',
    email: 'admin@fortlar.com',
    name: 'Administrador',
    clients: [
      {
        id: 'client_1',
        name: 'Empresa ABC Ltda',
        cnpj: '12.345.678/0001-90',
        email: 'contato@empresaabc.com',
        phone: '(11) 99999-9999',
        isActive: true,
      },
      {
        id: 'client_2',
        name: 'Comércio XYZ S.A.',
        cnpj: '98.765.432/0001-10',
        email: 'vendas@comercioxyz.com',
        phone: '(11) 88888-8888',
        isActive: true,
      }
    ]
  },
  'user_2': {
    id: 'user_2',
    email: 'vendedor@fortlar.com',
    name: 'Vendedor',
    clients: [
      {
        id: 'client_3',
        name: 'Indústria DEF Ltda',
        cnpj: '11.222.333/0001-44',
        email: 'compras@industriadef.com',
        phone: '(11) 77777-7777',
        isActive: true,
      }
    ]
  }
};

export const userService = {
  async getUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check authentication
        if (!authService.isTokenValid()) {
          reject(new Error('Token inválido ou expirado'));
          return;
        }

        const user = mockUsers[id];
        if (!user) {
          reject(new Error('Usuário não encontrado'));
          return;
        }

        resolve(user);
      }, 800); // Simulate network delay
    });
  },

  async getCurrentUser(): Promise<User> {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    return this.getUser(userId);
  },

  async getClients(): Promise<Client[]> {
    const user = await this.getCurrentUser();
    return user.clients.filter(client => client.isActive);
  }
};
