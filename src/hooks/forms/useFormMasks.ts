import { useCallback } from 'react';
import { onlyDigits, limitDigits, formatCNPJ, formatPhone, formatCEP } from '@/utils/formatting';

/**
 * Hook para gerenciar máscaras de formulário
 * Aplicando Single Responsibility Principle - apenas lógica de máscaras
 */
export const useFormMasks = () => {
  /**
   * Handler para CNPJ com máscara e limitação de dígitos
   */
  const handleCNPJChange = useCallback((value: string): string => {
    const cleanValue = onlyDigits(value);
    const limitedValue = limitDigits(cleanValue, 14);
    return formatCNPJ(limitedValue);
  }, []);

  /**
   * Handler para telefone com máscara dinâmica e limitação de dígitos
   */
  const handlePhoneChange = useCallback((value: string): string => {
    const cleanValue = onlyDigits(value);
    const limitedValue = limitDigits(cleanValue, 11);
    return formatPhone(limitedValue);
  }, []);

  /**
   * Handler para CEP com máscara e limitação de dígitos
   */
  const handleCEPChange = useCallback((value: string): string => {
    const cleanValue = onlyDigits(value);
    const limitedValue = limitDigits(cleanValue, 8);
    return formatCEP(limitedValue);
  }, []);

  /**
   * Handler genérico para limpar apenas dígitos
   */
  const cleanDigits = useCallback((value: string): string => {
    return onlyDigits(value);
  }, []);

  /**
   * Handler genérico para limitar dígitos
   */
  const limitDigitsTo = useCallback((value: string, maxLength: number): string => {
    return limitDigits(value, maxLength);
  }, []);

  return {
    handleCNPJChange,
    handlePhoneChange,
    handleCEPChange,
    cleanDigits,
    limitDigitsTo,
  };
};
