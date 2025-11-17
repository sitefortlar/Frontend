import { api } from '@/services/api';

export interface VerifyAccountRequest {
  token: string;
}

export interface VerifyAccountResponse {
  message: string;
  success: boolean;
}

export const verificationService = {
  async verifyAccount(data: VerifyAccountRequest): Promise<VerifyAccountResponse> {
    try {
      const response = await api.post('/auth/verify-account', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao verificar conta';
      const newError = new Error(errorMessage);
      
      if (error.response?.status) {
        (newError as any).status = error.response.status;
      }
      
      throw newError;
    }
  },

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    try {
      const response = await api.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao reenviar e-mail de verificação';
      const newError = new Error(errorMessage);
      
      if (error.response?.status) {
        (newError as any).status = error.response.status;
      }
      
      throw newError;
    }
  },

  async resendVerificationByCompanyId(companyId: string): Promise<{ message: string }> {
    try {
      const response = await api.post('/auth/resend-verification', { companyId });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao reenviar e-mail de verificação';
      const newError = new Error(errorMessage);
      
      if (error.response?.status) {
        (newError as any).status = error.response.status;
      }
      
      throw newError;
    }
  }
};
