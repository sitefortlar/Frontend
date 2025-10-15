import { CnpjService } from '../services/cnpjService';

// Mock do fetch global
global.fetch = jest.fn();

describe('CnpjService', () => {
  let cnpjService: CnpjService;

  beforeEach(() => {
    cnpjService = new CnpjService('https://api.test.com');
    jest.clearAllMocks();
  });

  describe('searchByCnpj', () => {
    it('should throw error for invalid CNPJ', async () => {
      const invalidCnpj = '123456789';
      
      await expect(cnpjService.searchByCnpj(invalidCnpj)).rejects.toMatchObject({
        type: 'INVALID_CNPJ',
        message: 'CNPJ inválido'
      });
    });

    it('should throw error for CNPJ with same digits', async () => {
      const sameDigitsCnpj = '11111111111111';
      
      await expect(cnpjService.searchByCnpj(sameDigitsCnpj)).rejects.toMatchObject({
        type: 'INVALID_CNPJ',
        message: 'CNPJ inválido'
      });
    });

    it('should make API call for valid CNPJ', async () => {
      const validCnpj = '11222333000181';
      const mockResponse = {
        cnpj: '11222333000181',
        nome: 'Empresa Teste LTDA',
        fantasia: 'Empresa Teste',
        logradouro: 'Rua Teste',
        numero: '123',
        bairro: 'Centro',
        municipio: 'São Paulo',
        uf: 'SP',
        cep: '01234567'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await cnpjService.searchByCnpj(validCnpj);

      expect(fetch).toHaveBeenCalledWith(
        `https://api.test.com/${validCnpj}`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );

      expect(result).toMatchObject({
        cnpj: '11222333000181',
        razaoSocial: 'Empresa Teste LTDA',
        nomeFantasia: 'Empresa Teste',
        logradouro: 'Rua Teste',
        numero: '123',
        bairro: 'Centro',
        municipio: 'São Paulo',
        uf: 'SP',
        cep: '01234567'
      });
    });

    it('should handle ReceitaWS error response', async () => {
      const validCnpj = '11222333000181';
      const mockErrorResponse = {
        status: 'ERROR',
        message: 'CNPJ não encontrado'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockErrorResponse
      });

      await expect(cnpjService.searchByCnpj(validCnpj)).rejects.toMatchObject({
        type: 'NOT_FOUND',
        message: 'CNPJ não encontrado'
      });
    });

    it('should handle 404 error', async () => {
      const validCnpj = '11222333000181';

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(cnpjService.searchByCnpj(validCnpj)).rejects.toMatchObject({
        type: 'NOT_FOUND',
        message: 'CNPJ não encontrado na base de dados'
      });
    });

    it('should handle rate limit error', async () => {
      const validCnpj = '11222333000181';

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests'
      });

      await expect(cnpjService.searchByCnpj(validCnpj)).rejects.toMatchObject({
        type: 'RATE_LIMIT',
        message: 'Muitas consultas. Aguarde um momento e tente novamente.'
      });
    });

    it('should handle API error', async () => {
      const validCnpj = '11222333000181';

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(cnpjService.searchByCnpj(validCnpj)).rejects.toMatchObject({
        type: 'API_ERROR',
        message: 'Erro na API: 500 Internal Server Error'
      });
    });

    it('should handle network error', async () => {
      const validCnpj = '11222333000181';

      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(cnpjService.searchByCnpj(validCnpj)).rejects.toMatchObject({
        type: 'NETWORK_ERROR',
        message: 'Erro de conexão. Verifique sua internet.'
      });
    });
  });
});
