import { useState, useCallback } from 'react';
import { useFormValidation } from './useFormValidation';
import { AUTH_MESSAGES } from '@/constants/auth';

export interface RegistrationFormData {
  // Dados da empresa
  razaoSocial: string;
  fantasia: string;
  cnpj: string;
  
  // Endereço
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  
  // Contatos
  nomeContato: string;
  telefone: string;
  email: string;
  whatsapp: string;
  senha: string;
}

const initialFormData: RegistrationFormData = {
  razaoSocial: '',
  fantasia: '',
  cnpj: '',
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
  nomeContato: '',
  telefone: '',
  email: '',
  whatsapp: '',
  senha: '',
};

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const { validateForm, errors, clearErrors } = useFormValidation();

  const updateField = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateRegistration = useCallback((): boolean => {
    const requiredFields = [
      'razaoSocial', 'fantasia', 'cep', 'endereco', 'numero', 'complemento', 
      'bairro', 'cidade', 'uf', 'cnpj', 'nomeContato', 'telefone', 'email', 
      'whatsapp', 'senha'
    ];

    const fieldsToValidate = requiredFields.reduce((acc, field) => {
      acc[field] = formData[field as keyof RegistrationFormData];
      return acc;
    }, {} as Record<string, string>);

    return validateForm(fieldsToValidate);
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    clearErrors();
  }, [clearErrors]);

  const isFormValid = Object.values(formData).every(value => value.trim().length > 0) && 
                     Object.keys(errors).length === 0;

  return {
    formData,
    errors,
    updateField,
    validateRegistration,
    resetForm,
    isFormValid,
  };
};
