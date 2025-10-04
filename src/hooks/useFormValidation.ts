import { useState, useMemo } from 'react';
import { validateEmail, validateCNPJ, validatePhone, validatePassword } from '@/utils/validation';
import { VALIDATION_MESSAGES } from '@/constants';

export interface PasswordValidation {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export const usePasswordValidation = (password: string): PasswordValidation => {
  return useMemo(() => {
    const validation = validatePassword(password);
    return {
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
    };
  }, [password]);
};

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateForm = (fields: Record<string, string>): boolean => {
    const newErrors: Record<string, string> = {};

    Object.entries(fields).forEach(([key, value]) => {
      if (!validateRequired(value)) {
        newErrors[key] = VALIDATION_MESSAGES.REQUIRED_FIELD;
      }
    });

    if (fields.email && !validateEmail(fields.email)) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL_INVALID;
    }

    if (fields.cnpj && !validateCNPJ(fields.cnpj)) {
      newErrors.cnpj = VALIDATION_MESSAGES.CNPJ_INVALID;
    }

    if (fields.telefone && !validatePhone(fields.telefone)) {
      newErrors.telefone = VALIDATION_MESSAGES.PHONE_INVALID;
    }

    if (fields.whatsapp && !validatePhone(fields.whatsapp)) {
      newErrors.whatsapp = VALIDATION_MESSAGES.WHATSAPP_INVALID;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateEmail,
    validateCNPJ,
    validatePhone,
    validateRequired,
    validateForm,
    clearErrors,
  };
};
