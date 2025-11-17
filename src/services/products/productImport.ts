import { api } from '../api';

export interface ProductImportResponse {
  message: string;
  total_imported?: number;
  errors?: string[];
}

export class ProductImportService {
  static async uploadSpreadsheet(file: File): Promise<ProductImportResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ProductImportResponse>(
      '/import/upload-planilha-base',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }
}
