import { api } from '../api';

/** Resposta do POST /api/product (upload da planilha) – processamento assíncrono */
export interface ProductUploadJobResponse {
  job_id: string;
  message?: string;
}

/** Status do job de importação (GET /api/product/job/{job_id}) */
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ProductImportJobStatusResponse {
  job_id: string;
  status: JobStatus;
  message?: string;
  total_imported?: number;
  errors?: string[];
}

/** Resposta legada para compatibilidade quando o job já concluiu (ex.: exibição na UI) */
export interface ProductImportResult {
  message: string;
  total_imported?: number;
  errors?: string[];
}

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 120; // ~4 min

export class ProductImportService {
  /**
   * Envia a planilha para POST /api/product (multipart/form-data).
   * O backend processa de forma assíncrona e retorna job_id.
   */
  static async uploadSpreadsheet(file: File): Promise<ProductUploadJobResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ProductUploadJobResponse>('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  /**
   * Consulta o status do job: GET /api/product/job/{job_id}.
   */
  static async getJobStatus(jobId: string): Promise<ProductImportJobStatusResponse> {
    const response = await api.get<ProductImportJobStatusResponse>(`/product/job/${jobId}`);
    return response.data;
  }

  /**
   * Envia a planilha e opcionalmente faz polling até o job concluir (completed ou failed).
   * Retorna o resultado final ou lança em caso de erro de rede/4xx/5xx.
   */
  static async uploadSpreadsheetAndWait(
    file: File,
    onProgress?: (status: ProductImportJobStatusResponse) => void
  ): Promise<ProductImportJobStatusResponse> {
    const { job_id } = await this.uploadSpreadsheet(file);

    let attempts = 0;
    while (attempts < MAX_POLL_ATTEMPTS) {
      const status = await this.getJobStatus(job_id);
      onProgress?.(status);

      if (status.status === 'completed' || status.status === 'failed') {
        return status;
      }

      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
      attempts++;
    }

    throw new Error('Tempo esgotado aguardando o processamento da planilha. Tente verificar o status mais tarde.');
  }
}
