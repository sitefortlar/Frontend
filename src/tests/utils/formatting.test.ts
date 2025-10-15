import { describe, it, expect } from 'vitest';
import { onlyDigits, limitDigits, formatCNPJ, formatPhone, formatCEP } from '@/utils/formatting';

describe('formatting utilities', () => {
  describe('onlyDigits', () => {
    it('should remove all non-digit characters', () => {
      expect(onlyDigits('abc123def456')).toBe('123456');
      expect(onlyDigits('12.345.678/0001-99')).toBe('12345678000199');
      expect(onlyDigits('(11) 99999-9999')).toBe('11999999999');
      expect(onlyDigits('01234-567')).toBe('01234567');
      expect(onlyDigits('')).toBe('');
      expect(onlyDigits('abc')).toBe('');
    });
  });

  describe('limitDigits', () => {
    it('should limit digits to maximum length', () => {
      expect(limitDigits('123456789', 5)).toBe('12345');
      expect(limitDigits('123', 5)).toBe('123');
      expect(limitDigits('', 5)).toBe('');
      expect(limitDigits('123456789', 0)).toBe('');
    });
  });

  describe('formatCNPJ', () => {
    it('should format CNPJ progressively', () => {
      expect(formatCNPJ('1')).toBe('1');
      expect(formatCNPJ('12')).toBe('12');
      expect(formatCNPJ('123')).toBe('12.3');
      expect(formatCNPJ('1234')).toBe('12.34');
      expect(formatCNPJ('12345')).toBe('12.345');
      expect(formatCNPJ('123456')).toBe('12.345.6');
      expect(formatCNPJ('1234567')).toBe('12.345.67');
      expect(formatCNPJ('12345678')).toBe('12.345.678');
      expect(formatCNPJ('123456789')).toBe('12.345.678/9');
      expect(formatCNPJ('1234567890')).toBe('12.345.678/90');
      expect(formatCNPJ('12345678901')).toBe('12.345.678/901');
      expect(formatCNPJ('123456789012')).toBe('12.345.678/9012');
      expect(formatCNPJ('1234567890123')).toBe('12.345.678/9012-3');
      expect(formatCNPJ('12345678901234')).toBe('12.345.678/9012-34');
    });

    it('should handle empty string', () => {
      expect(formatCNPJ('')).toBe('');
    });

    it('should handle already formatted CNPJ', () => {
      expect(formatCNPJ('12.345.678/0001-99')).toBe('12.345.678/0001-99');
    });
  });

  describe('formatPhone', () => {
    it('should format phone progressively', () => {
      expect(formatPhone('1')).toBe('(1');
      expect(formatPhone('12')).toBe('(12');
      expect(formatPhone('123')).toBe('(12) 3');
      expect(formatPhone('1234')).toBe('(12) 34');
      expect(formatPhone('12345')).toBe('(12) 345');
      expect(formatPhone('123456')).toBe('(12) 3456');
      expect(formatPhone('1234567')).toBe('(12) 3456-7');
      expect(formatPhone('12345678')).toBe('(12) 3456-78');
      expect(formatPhone('123456789')).toBe('(12) 3456-789');
      expect(formatPhone('1234567890')).toBe('(12) 3456-7890');
      expect(formatPhone('12345678901')).toBe('(12) 34567-8901');
    });

    it('should handle empty string', () => {
      expect(formatPhone('')).toBe('');
    });

    it('should handle already formatted phone', () => {
      expect(formatPhone('(11) 99999-9999')).toBe('(11) 99999-9999');
    });
  });

  describe('formatCEP', () => {
    it('should format CEP progressively', () => {
      expect(formatCEP('1')).toBe('1');
      expect(formatCEP('12')).toBe('12');
      expect(formatCEP('123')).toBe('123');
      expect(formatCEP('1234')).toBe('1234');
      expect(formatCEP('12345')).toBe('12345');
      expect(formatCEP('123456')).toBe('12345-6');
      expect(formatCEP('1234567')).toBe('12345-67');
      expect(formatCEP('12345678')).toBe('12345-678');
    });

    it('should handle empty string', () => {
      expect(formatCEP('')).toBe('');
    });

    it('should handle already formatted CEP', () => {
      expect(formatCEP('01234-567')).toBe('01234-567');
    });
  });
});
