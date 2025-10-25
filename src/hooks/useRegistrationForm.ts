import { useState, useCallback } from 'react';
import { useFormValidation } from './useFormValidation';
import { onlyDigits } from '@/utils/formatting';
import { CEPService } from "@/services/utils/CEP";
import { CNPJService } from "@/services/utils/CNPJ";
import { companyService, CompanyRequest } from "@/services/company";

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
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const searchCep = useCallback(async (cep: string) => {
    const cleanCep = onlyDigits(cep);
    if (cleanCep.length !== 8) {
      return;
    }

    setIsLoadingCep(true);
    try {
      const cepService = new CEPService();
      const cepData = await cepService.searchByCEP(cleanCep);
      
      setFormData(prev => ({
        ...prev,
        endereco: cepData.logradouro,
        bairro: cepData.bairro,
        cidade: cepData.cidade,
        uf: cepData.uf,
        complemento: cepData.complemento || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      // Aqui você pode adicionar um toast de erro se necessário
    } finally {
      setIsLoadingCep(false);
    }
  }, []);

  const searchCnpj = useCallback(async (cnpj: string) => {
    const cleanCnpj = onlyDigits(cnpj);
    if (cleanCnpj.length !== 14) {
      return;
    }

    setIsLoadingCnpj(true);
    try {
      const cnpjData = await CNPJService.searchByCNPJ(cleanCnpj);
      
      // Atualiza os campos da empresa com os dados retornados
      setFormData(prev => ({
        ...prev,
        razaoSocial: cnpjData.razao_social,
        fantasia: cnpjData.fantasia,
        cep: cnpjData.cep,
        endereco: cnpjData.logradouro,
        numero: cnpjData.numero,
        complemento: cnpjData.complemento,
        bairro: cnpjData.bairro,
        cidade: cnpjData.municipio,
        uf: cnpjData.uf,
        telefone: cnpjData.telefone || '',
        email: cnpjData.email || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar CNPJ:', error);
      // Aqui você pode adicionar um toast de erro se necessário
    } finally {
      setIsLoadingCnpj(false);
    }
  }, []);

  const postCompany = useCallback(async (): Promise<any> => {
    setIsSubmitting(true);
    try {
      const companyData: CompanyRequest = {
        cnpj: formData.cnpj,
        razao_social: formData.razaoSocial,
        nome_fantasia: formData.fantasia,
        senha: formData.senha,
        endereco: {
          cep: formData.cep,
          numero: formData.numero,
          complemento: formData.complemento || undefined,
          bairro: formData.bairro,
          cidade: formData.cidade,
          uf: formData.uf,
          ibge: '', // You might need to add this field to the form
        },
        contato: {
          nome: formData.nomeContato,
          telefone: formData.telefone,
          celular: formData.whatsapp,
          email: formData.email,
        },
      };

      const response = await companyService.postCompany(companyData);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const isFormValid = Object.values(formData).every(value => value.trim().length > 0) && 
                     Object.keys(errors).length === 0;

  return {
    formData,
    errors,
    isLoadingCep,
    isLoadingCnpj,
    isSubmitting,
    updateField,
    validateRegistration,
    resetForm,
    searchCep,
    searchCnpj,
    postCompany,
    isFormValid,
  };
};
