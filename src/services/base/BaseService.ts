import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { api } from '../api';

/**
 * Interface base para todos os serviços
 * Aplicando Dependency Inversion Principle
 */
export interface IBaseService {
  readonly baseUrl: string;
  readonly client: AxiosInstance;
}

/**
 * Classe base abstrata para todos os serviços
 * Aplicando Single Responsibility Principle e Open/Closed Principle
 */
export abstract class BaseService implements IBaseService {
  public readonly baseUrl: string;
  public readonly client: AxiosInstance;

  constructor(baseUrl: string, client: AxiosInstance = api) {
    this.baseUrl = baseUrl;
    this.client = client;
  }

  /**
   * Método genérico para fazer requisições GET
   */
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(`${this.baseUrl}${endpoint}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Método genérico para fazer requisições POST
   */
  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(`${this.baseUrl}${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Método genérico para fazer requisições PUT
   */
  protected async put<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(`${this.baseUrl}${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Método genérico para fazer requisições PATCH
   */
  protected async patch<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.patch(`${this.baseUrl}${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Método genérico para fazer requisições DELETE
   */
  protected async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(`${this.baseUrl}${endpoint}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Tratamento centralizado de erros
   * Aplicando Single Responsibility Principle
   */
  protected handleError(error: AxiosError): Error {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Erro desconhecido';
    
    // Log do erro para debugging (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${this.constructor.name}] Error:`, {
        status,
        message,
        url: error.config?.url,
        method: error.config?.method,
      });
    }

    // Criação de erros específicos baseados no status
    switch (status) {
      case 400:
        return new Error(`Dados inválidos: ${message}`);
      case 401:
        return new Error('Não autorizado. Faça login novamente.');
      case 403:
        return new Error('Acesso negado.');
      case 404:
        return new Error('Recurso não encontrado.');
      case 409:
        return new Error('Conflito: o recurso já existe.');
      case 422:
        return new Error(`Dados inválidos: ${message}`);
      case 429:
        return new Error('Muitas tentativas. Aguarde um momento.');
      case 500:
        return new Error('Erro interno do servidor. Tente novamente mais tarde.');
      case 502:
      case 503:
      case 504:
        return new Error('Serviço temporariamente indisponível. Tente novamente mais tarde.');
      default:
        return new Error(`Erro de conexão: ${message}`);
    }
  }

  /**
   * Método para construir query strings de forma segura
   */
  protected buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, String(item)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });
    
    return searchParams.toString();
  }
}
