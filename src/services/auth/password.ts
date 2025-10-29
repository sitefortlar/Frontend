import { api } from '@/services/api';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordRequest {
  token: string;
  company_id: number;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export const passwordService = {
  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      const response = await api.post('/password/forgot-password', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao solicitar redefinição de senha';
      const newError = new Error(errorMessage);
      
      if (error.response?.status) {
        (newError as any).status = error.response.status;
      }
      
      throw newError;
    }
  },

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const response = await api.post('/password/reset-password', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao redefinir senha';
      const newError = new Error(errorMessage);
      
      if (error.response?.status) {
        (newError as any).status = error.response.status;
      }
      
      throw newError;
    }
  }
};
