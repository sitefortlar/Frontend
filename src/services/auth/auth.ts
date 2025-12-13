import { jwtDecode } from 'jwt-decode';
import { api } from '@/services/api';

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Estrutura do seu backend: { access_token: "jwt_token_here", token_type: "bearer" }
      const { access_token: token } = response.data;
      
      if (!token) {
        throw new Error('Token não encontrado na resposta do servidor');
      }

      // Decodificar o JWT para extrair dados do usuário
      const decodedToken = jwtDecode<any>(token);

      // Extrair dados do usuário do token decodificado
      // O token agora tem: sub, email, role, iat, exp
      const user = {
        id: decodedToken.sub || decodedToken.id || decodedToken.userId,
        email: decodedToken.email || decodedToken.login || credentials.login,
        name: decodedToken.name || decodedToken.username || credentials.login.split('@')[0],
        role: decodedToken.role || null, // Extrair role do token
        perfil: decodedToken.role || null // Mapear role para perfil
      };

      // Save token and user data to localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('user_email', user.email);
      localStorage.setItem('user_name', user.name);
      if (user.role) {
        localStorage.setItem('user_role', user.role);
        localStorage.setItem('user_perfil', user.perfil);
      }
      localStorage.setItem('user_data', JSON.stringify(user));
      // user_estate será definido quando buscar a company (no loader)

      return { token, user };
    } catch (error: any) {
      // Preserve the original error with status information
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao fazer login';
      const newError = new Error(errorMessage);
      
      // Add status code to the error object
      if (error.response?.status) {
        (newError as any).status = error.response.status;
      }
      
      throw newError;
    }
  },

  async logout(): Promise<void> {
    // Clear all user data from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_perfil');
    localStorage.removeItem('user_estate');
    localStorage.removeItem('selected_client_id');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isTokenValid(token?: string): boolean {
    const tokenToCheck = token || this.getToken();
    if (!tokenToCheck) return false;

    try {
      const parts = tokenToCheck.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      // JWT exp is in seconds, Date.now() is in milliseconds
      const now = Math.floor(Date.now() / 1000);
      
      // Check if token is expired
      if (payload.exp && payload.exp < now) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },

  getCurrentUserId(): string | null {
    return localStorage.getItem('user_id');
  },

  async getCurrentUser(): Promise<any> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    
    // Retorna os dados do usuário do localStorage ou faz uma chamada para a API
    const userData = localStorage.getItem('user_data');
    if (userData) {
      return JSON.parse(userData);
    }
    
    // Se não tiver dados no localStorage, pode fazer uma chamada para a API
    // Por enquanto, vamos retornar dados básicos
    return {
      id: userId,
      email: localStorage.getItem('user_email') || '',
      name: localStorage.getItem('user_name') || ''
    };
  },

  getCurrentUserFromStorage(): any | null {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        return null;
      }
      
      // Retorna os dados do usuário do localStorage
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const parsed = JSON.parse(userData);
        // Garantir que role/perfil estejam presentes
        if (!parsed.role && !parsed.perfil) {
          const role = localStorage.getItem('user_role');
          const perfil = localStorage.getItem('user_perfil');
          if (role) {
            parsed.role = role;
            parsed.perfil = perfil || role;
          }
        }
        return parsed;
      }
      
      // Se não tiver dados completos, retorna dados básicos
      const role = localStorage.getItem('user_role');
      const perfil = localStorage.getItem('user_perfil');
      return {
        id: userId,
        email: localStorage.getItem('user_email') || '',
        name: localStorage.getItem('user_name') || '',
        role: role || null,
        perfil: perfil || role || null
      };
    } catch (error) {
      return null;
    }
  },

  // Método para decodificar o token e obter o role atual
  getRoleFromToken(): string | null {
    try {
      const token = this.getToken();
      if (!token) return null;
      
      const decodedToken = jwtDecode<any>(token);
      return decodedToken.role || null;
    } catch (error) {
      return null;
    }
  },

  getUserEstate(): string | null {
    return localStorage.getItem('user_estate');
  },

  setUserEstate(estate: string): void {
    if (estate) {
      localStorage.setItem('user_estate', estate);
    } else {
      localStorage.removeItem('user_estate');
    }
  }
};
