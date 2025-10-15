import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { companyRegistrationSchema, CompanyRegistrationFormData } from '@/schemas';
import { useCNPJLookup } from './useCNPJLookup';
import { useFormMasks } from './useFormMasks';

/**
 * Hook para gerenciar formulário de empresa
 * Aplicando Single Responsibility Principle - apenas lógica do formulário de empresa
 */
export const useEmpresaForm = () => {
  const { handleCNPJChange, handlePhoneChange, handleCEPChange } = useFormMasks();
  const {
    cnpjData,
    isLookingUp,
    isLookupEnabled,
    lookupError,
    enableLookup,
    setCnpjForLookup,
    isValidForLookup,
  } = useCNPJLookup();

  // Form setup com validação Zod
  const form = useForm<CompanyRegistrationFormData>({
    resolver: zodResolver(companyRegistrationSchema),
    defaultValues: {
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      email: '',
      telefone: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { watch, setValue, trigger } = form;

  // Watch CNPJ field
  const cnpjValue = watch('cnpj');

  // Ativa lookup quando CNPJ é válido
  useEffect(() => {
    if (isValidForLookup(cnpjValue)) {
      enableLookup();
      setCnpjForLookup(cnpjValue);
    }
  }, [cnpjValue, isValidForLookup, enableLookup, setCnpjForLookup]);

  // Preenche campos automaticamente quando dados do CNPJ são obtidos
  useEffect(() => {
    if (cnpjData) {
      setValue('razaoSocial', cnpjData.razaoSocial);
      setValue('nomeFantasia', cnpjData.nomeFantasia);
      setValue('logradouro', cnpjData.logradouro);
      setValue('numero', cnpjData.numero);
      setValue('complemento', cnpjData.complemento || '');
      setValue('bairro', cnpjData.bairro);
      setValue('cidade', cnpjData.municipio);
      setValue('uf', cnpjData.uf);
      setValue('cep', cnpjData.cep);
      
      if (cnpjData.telefone) {
        setValue('telefone', cnpjData.telefone);
      }
      
      if (cnpjData.email) {
        setValue('email', cnpjData.email);
      }

      // Trigger validation for updated fields
      trigger(['razaoSocial', 'nomeFantasia', 'logradouro', 'numero', 'bairro', 'cidade', 'uf', 'cep']);
    }
  }, [cnpjData, setValue, trigger]);

  /**
   * Handler para mudança de CNPJ com máscara
   */
  const handleCnpjChange = useCallback((value: string) => {
    const maskedValue = handleCNPJChange(value);
    setValue('cnpj', maskedValue);
    trigger('cnpj');
  }, [handleCNPJChange, setValue, trigger]);

  /**
   * Handler para mudança de telefone com máscara
   */
  const handleTelefoneChange = useCallback((value: string) => {
    const maskedValue = handlePhoneChange(value);
    setValue('telefone', maskedValue);
    trigger('telefone');
  }, [handlePhoneChange, setValue, trigger]);

  /**
   * Handler para mudança de CEP com máscara
   */
  const handleCepChange = useCallback((value: string) => {
    const maskedValue = handleCEPChange(value);
    setValue('cep', maskedValue);
    trigger('cep');
  }, [handleCEPChange, setValue, trigger]);

  /**
   * Handler para blur do CNPJ (busca automática)
   */
  const handleCnpjBlur = useCallback(() => {
    if (isValidForLookup(cnpjValue)) {
      setCnpjForLookup(cnpjValue);
    }
  }, [cnpjValue, isValidForLookup, setCnpjForLookup]);

  /**
   * Reseta o formulário
   */
  const resetForm = useCallback(() => {
    form.reset();
  }, [form]);

  /**
   * Valida o formulário
   */
  const validateForm = useCallback(async () => {
    return await form.trigger();
  }, [form]);

  return {
    // Form methods
    form,
    
    // Handlers específicos
    handleCnpjChange,
    handleTelefoneChange,
    handleCepChange,
    handleCnpjBlur,
    
    // Estados de lookup
    isLookingUp,
    lookupError,
    cnpjData,
    
    // Funções utilitárias
    resetForm,
    validateForm,
  };
};
