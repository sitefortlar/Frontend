import { VALIDATION_MESSAGES } from '@/constants/auth';
import { onlyDigits } from './formatting';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida CNPJ com verificação de dígitos verificadores
 * @param cnpj - CNPJ com ou sem formatação
 * @returns true se o CNPJ for válido
 */
export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = onlyDigits(cnpj);
  
  // Verifica se tem exatamente 14 dígitos
  if (cleanCNPJ.length !== 14) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1+$/.test(cleanCNPJ)) {
    return false;
  }
  
  // Calcula o primeiro dígito verificador
  let sum = 0;
  let weight = 5;
  
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  if (parseInt(cleanCNPJ[12]) !== firstDigit) {
    return false;
  }
  
  // Calcula o segundo dígito verificador
  sum = 0;
  weight = 6;
  
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  return parseInt(cleanCNPJ[13]) === secondDigit;
};

/**
 * Valida telefone brasileiro (10 ou 11 dígitos)
 * @param phone - Telefone com ou sem formatação
 * @returns true se o telefone for válido
 */
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = onlyDigits(phone);
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

/**
 * Valida CEP brasileiro (8 dígitos)
 * @param cep - CEP com ou sem formatação
 * @returns true se o CEP for válido
 */
export const validateCEP = (cep: string): boolean => {
  const cleanCEP = onlyDigits(cep);
  return cleanCEP.length === 8;
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Uma letra maiúscula');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Um número');
  }
  
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Um caractere especial (@$!%*?&)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const formatCNPJ = (cnpj: string): string => {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  return cleanCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  return phone;
};

export const formatCEP = (cep: string): string => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};
