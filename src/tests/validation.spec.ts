import { validateCNPJ, validatePhone, validateCEP } from '../utils/validation';
import { onlyDigits, limitDigits, formatCNPJ, formatPhone, formatCEP } from '../utils/formatting';

describe('Validation Utils', () => {
  describe('validateCNPJ', () => {
    it('should validate correct CNPJ with verification digits', () => {
      // CNPJ válido: 11.222.333/0001-81
      const validCnpj = '11222333000181';
      expect(validateCNPJ(validCnpj)).toBe(true);
    });

    it('should validate CNPJ with formatting', () => {
      // CNPJ válido com formatação
      const validCnpjFormatted = '11.222.333/0001-81';
      expect(validateCNPJ(validCnpjFormatted)).toBe(true);
    });

    it('should reject CNPJ with wrong verification digits', () => {
      // CNPJ com dígitos verificadores incorretos
      const invalidCnpj = '11222333000182';
      expect(validateCNPJ(invalidCnpj)).toBe(false);
    });

    it('should reject CNPJ with all same digits', () => {
      // CNPJ com todos os dígitos iguais
      const sameDigitsCnpj = '11111111111111';
      expect(validateCNPJ(sameDigitsCnpj)).toBe(false);
    });

    it('should reject CNPJ with wrong length', () => {
      // CNPJ com tamanho incorreto
      const shortCnpj = '123456789';
      const longCnpj = '123456789012345';
      expect(validateCNPJ(shortCnpj)).toBe(false);
      expect(validateCNPJ(longCnpj)).toBe(false);
    });

    it('should reject empty or invalid input', () => {
      expect(validateCNPJ('')).toBe(false);
      expect(validateCNPJ('abc')).toBe(false);
      expect(validateCNPJ('123')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate 10-digit phone number', () => {
      const phone10 = '1133334444';
      expect(validatePhone(phone10)).toBe(true);
    });

    it('should validate 11-digit phone number', () => {
      const phone11 = '11933334444';
      expect(validatePhone(phone11)).toBe(true);
    });

    it('should validate phone with formatting', () => {
      const phoneFormatted = '(11) 93333-4444';
      expect(validatePhone(phoneFormatted)).toBe(true);
    });

    it('should reject phone with wrong length', () => {
      const shortPhone = '123456789';
      const longPhone = '123456789012';
      expect(validatePhone(shortPhone)).toBe(false);
      expect(validatePhone(longPhone)).toBe(false);
    });

    it('should reject empty or invalid input', () => {
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
    });
  });

  describe('validateCEP', () => {
    it('should validate 8-digit CEP', () => {
      const cep = '01234567';
      expect(validateCEP(cep)).toBe(true);
    });

    it('should validate CEP with formatting', () => {
      const cepFormatted = '01234-567';
      expect(validateCEP(cepFormatted)).toBe(true);
    });

    it('should reject CEP with wrong length', () => {
      const shortCep = '1234567';
      const longCep = '123456789';
      expect(validateCEP(shortCep)).toBe(false);
      expect(validateCEP(longCep)).toBe(false);
    });

    it('should reject empty or invalid input', () => {
      expect(validateCEP('')).toBe(false);
      expect(validateCEP('abc')).toBe(false);
    });
  });
});

describe('Formatting Utils', () => {
  describe('onlyDigits', () => {
    it('should remove all non-digit characters', () => {
      expect(onlyDigits('abc123def456')).toBe('123456');
      expect(onlyDigits('11.222.333/0001-81')).toBe('11222333000181');
      expect(onlyDigits('(11) 99999-9999')).toBe('11999999999');
    });

    it('should return empty string for non-digit input', () => {
      expect(onlyDigits('abc')).toBe('');
      expect(onlyDigits('')).toBe('');
    });
  });

  describe('limitDigits', () => {
    it('should limit digits to maximum length', () => {
      expect(limitDigits('123456789012345', 14)).toBe('12345678901234');
      expect(limitDigits('123456789012345', 10)).toBe('1234567890');
      expect(limitDigits('123', 5)).toBe('123');
    });

    it('should handle empty input', () => {
      expect(limitDigits('', 10)).toBe('');
    });
  });

  describe('formatCNPJ', () => {
    it('should format CNPJ progressively', () => {
      expect(formatCNPJ('1')).toBe('1');
      expect(formatCNPJ('11')).toBe('11');
      expect(formatCNPJ('112')).toBe('11.2');
      expect(formatCNPJ('11222')).toBe('11.222');
      expect(formatCNPJ('11222333')).toBe('11.222.333');
      expect(formatCNPJ('112223330001')).toBe('11.222.333/0001');
      expect(formatCNPJ('11222333000181')).toBe('11.222.333/0001-81');
    });

    it('should handle empty input', () => {
      expect(formatCNPJ('')).toBe('');
    });
  });

  describe('formatPhone', () => {
    it('should format phone progressively', () => {
      expect(formatPhone('1')).toBe('(1');
      expect(formatPhone('11')).toBe('(11');
      expect(formatPhone('119')).toBe('(11) 9');
      expect(formatPhone('1199999')).toBe('(11) 9999');
      expect(formatPhone('1199999999')).toBe('(11) 9999-9999');
      expect(formatPhone('11999999999')).toBe('(11) 99999-9999');
    });

    it('should handle empty input', () => {
      expect(formatPhone('')).toBe('');
    });
  });

  describe('formatCEP', () => {
    it('should format CEP progressively', () => {
      expect(formatCEP('1')).toBe('1');
      expect(formatCEP('12345')).toBe('12345');
      expect(formatCEP('123456')).toBe('12345-6');
      expect(formatCEP('12345678')).toBe('12345-678');
    });

    it('should handle empty input', () => {
      expect(formatCEP('')).toBe('');
    });
  });
});
