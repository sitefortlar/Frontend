import { useState, useCallback } from 'react';
import { validateCNPJ, validatePhone, validateCEP } from '@/utils/validation';

export interface MaskedInputState {
  value: string;
  error: string;
  isValid: boolean;
}

export interface UseMaskedInputsReturn {
  // CNPJ
  cnpj: MaskedInputState;
  setCnpj: (value: string) => void;
  clearCnpjError: () => void;
  
  // Phone
  phone: MaskedInputState;
  setPhone: (value: string) => void;
  clearPhoneError: () => void;
  
  // CEP
  cep: MaskedInputState;
  setCep: (value: string) => void;
  clearCepError: () => void;
  
  // Validation
  validateAll: () => boolean;
  clearAllErrors: () => void;
}

/**
 * Hook para gerenciar inputs mascarados com validação
 * Centraliza a lógica de estado e validação para CNPJ, telefone e CEP
 */
export const useMaskedInputs = (): UseMaskedInputsReturn => {
  const [cnpj, setCnpjState] = useState<MaskedInputState>({
    value: '',
    error: '',
    isValid: false,
  });

  const [phone, setPhoneState] = useState<MaskedInputState>({
    value: '',
    error: '',
    isValid: false,
  });

  const [cep, setCepState] = useState<MaskedInputState>({
    value: '',
    error: '',
    isValid: false,
  });

  // CNPJ handlers
  const setCnpj = useCallback((value: string) => {
    const isValid = validateCNPJ(value);
    setCnpjState({
      value,
      error: value && !isValid ? 'CNPJ inválido' : '',
      isValid,
    });
  }, []);

  const clearCnpjError = useCallback(() => {
    setCnpjState(prev => ({ ...prev, error: '' }));
  }, []);

  // Phone handlers
  const setPhone = useCallback((value: string) => {
    const isValid = validatePhone(value);
    setPhoneState({
      value,
      error: value && !isValid ? 'Telefone inválido' : '',
      isValid,
    });
  }, []);

  const clearPhoneError = useCallback(() => {
    setPhoneState(prev => ({ ...prev, error: '' }));
  }, []);

  // CEP handlers
  const setCep = useCallback((value: string) => {
    const isValid = validateCEP(value);
    setCepState({
      value,
      error: value && !isValid ? 'CEP inválido' : '',
      isValid,
    });
  }, []);

  const clearCepError = useCallback(() => {
    setCepState(prev => ({ ...prev, error: '' }));
  }, []);

  // Validation
  const validateAll = useCallback((): boolean => {
    const cnpjValid = validateCNPJ(cnpj.value);
    const phoneValid = validatePhone(phone.value);
    const cepValid = validateCEP(cep.value);

    // Update states with validation results
    setCnpjState(prev => ({
      ...prev,
      error: cnpj.value && !cnpjValid ? 'CNPJ inválido' : '',
      isValid: cnpjValid,
    }));

    setPhoneState(prev => ({
      ...prev,
      error: phone.value && !phoneValid ? 'Telefone inválido' : '',
      isValid: phoneValid,
    }));

    setCepState(prev => ({
      ...prev,
      error: cep.value && !cepValid ? 'CEP inválido' : '',
      isValid: cepValid,
    }));

    return cnpjValid && phoneValid && cepValid;
  }, [cnpj.value, phone.value, cep.value]);

  const clearAllErrors = useCallback(() => {
    setCnpjState(prev => ({ ...prev, error: '' }));
    setPhoneState(prev => ({ ...prev, error: '' }));
    setCepState(prev => ({ ...prev, error: '' }));
  }, []);

  return {
    cnpj,
    setCnpj,
    clearCnpjError,
    phone,
    setPhone,
    clearPhoneError,
    cep,
    setCep,
    clearCepError,
    validateAll,
    clearAllErrors,
  };
};
