import { api } from '@/services/api';

export interface VerifyAccountRequest {
  token: string;
  company_id: number;
}

export interface VerifyAccountResponse {
  message: string;
  success: boolean;
}

export const emailTokenService = {
  async verifyToken(data: VerifyAccountRequest): Promise<VerifyAccountResponse> {
    try {
      const response = await api.put('/emailtoken/validate', data);
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

  async resendEmailToken(companyId: number): Promise<{ message: string }> {
    try {
      const response = await api.patch('/emailtoken/resend', { company_id: companyId });
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
};
