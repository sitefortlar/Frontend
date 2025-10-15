import { BaseService } from '../base/BaseService';
import { LoginFormData, CompanyRegistrationFormData } from '@/schemas';
import { User } from '@/types/Auth';

/**
 * Interface para dados de resposta de login
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * Interface para dados de resposta de registro
 */
export interface RegistrationResponse {
  user: User;
  token: string;
  message: string;
}

/**
 * Interface para dados de resposta de esqueci senha
 */
export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

/**
 * Interface para dados de resposta de redefinir senha
 */
export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

/**
 * Serviço de autenticação
 * Aplicando Single Responsibility Principle
 */
export class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  /**
   * Realiza login do usuário
   */
  async login(credentials: LoginFormData): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>('/login', credentials);
    
    // Armazena o token no localStorage
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * Registra uma nova empresa
   */
  async register(companyData: CompanyRegistrationFormData): Promise<RegistrationResponse> {
    const response = await this.post<RegistrationResponse>('/register', companyData);
    
    // Armazena o token no localStorage
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
    
    return response;
  }

  /**
   * Solicita redefinição de senha
   */
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return this.post<ForgotPasswordResponse>('/forgot-password', { email });
  }

  /**
   * Redefine a senha do usuário
   */
  async resetPassword(token: string, password: string): Promise<ResetPasswordResponse> {
    return this.post<ResetPasswordResponse>('/reset-password', { token, password });
  }

  /**
   * Atualiza o perfil do usuário
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    return this.put<User>('/profile', userData);
  }

  /**
   * Altera a senha do usuário
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return this.post<{ message: string }>('/change-password', {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<void> {
    try {
      // Tenta invalidar o token no servidor
      await this.post('/logout');
    } catch (error) {
      // Ignora erros de logout (token pode já estar expirado)
      console.warn('Erro ao fazer logout no servidor:', error);
    } finally {
      // Sempre limpa os dados locais
      this.clearLocalStorage();
    }
  }

  /**
   * Verifica se o token é válido
   */
  isTokenValid(token: string): boolean {
    if (!token) return false;
    
    try {
      // Decodifica o JWT para verificar a expiração
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtém o token atual
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Obtém os dados do usuário atual do localStorage
   */
  getCurrentUserFromStorage(): User | null {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? this.isTokenValid(token) : false;
  }

  /**
   * Limpa os dados do localStorage
   */
  private clearLocalStorage(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('selected_client_id');
  }

  /**
   * Renova o token de acesso
   */
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }
    
    const response = await this.post<LoginResponse>('/refresh', { refreshToken });
    
    // Atualiza o token no localStorage
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
    
    return response;
  }
}

/**
 * Instância singleton do serviço de autenticação
 * Aplicando Singleton Pattern para evitar múltiplas instâncias
 */
export const authService = new AuthService();
