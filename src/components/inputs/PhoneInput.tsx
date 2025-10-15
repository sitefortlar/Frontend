import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle } from 'lucide-react';
import { onlyDigits, limitDigits, formatPhone } from '@/utils/formatting';
import { validatePhone } from '@/utils/validation';

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

/**
 * Componente especializado para input de telefone
 * - Máscara dinâmica: (99) 9999-9999 ou (99) 99999-9999
 * - Limite: 10 ou 11 dígitos máximo
 * - Detecta automaticamente se é celular (11 dígitos) ou fixo (10 dígitos)
 * - Validação em tempo real
 */
export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  className,
  onBlur,
  ...props
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  // Validação em tempo real
  useEffect(() => {
    if (value) {
      const cleanValue = onlyDigits(value);
      if (cleanValue.length >= 10) {
        setIsValid(validatePhone(value));
      } else {
        setIsValid(null);
      }
    } else {
      setIsValid(null);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = onlyDigits(inputValue);
    
    // Limita a 11 dígitos (máximo para celular)
    const limitedValue = limitDigits(cleanValue, 11);
    
    // Aplica formatação
    const formattedValue = formatPhone(limitedValue);
    
    onChange(formattedValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    onBlur?.(e);
  };

  const getInputState = () => {
    if (error) return 'error';
    if (isTouched && isValid === false) return 'error';
    if (isTouched && isValid === true) return 'success';
    return 'default';
  };

  const inputState = getInputState();

  return (
    <div className="relative group">
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Telefone *"
        className={cn(
          'h-12 pr-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30',
          inputState === 'error' && 'border-red-400 focus:border-red-400',
          inputState === 'success' && 'border-green-400 focus:border-green-400',
          className
        )}
      />
      
      {/* Ícone de status */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        {isTouched && isValid === true && (
          <CheckCircle className="h-5 w-5 text-green-400" />
        )}
        {isTouched && isValid === false && (
          <XCircle className="h-5 w-5 text-red-400" />
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      
      {/* Mensagem de validação */}
      {isTouched && isValid === false && !error && (
        <p className="text-red-400 text-sm mt-1">Telefone inválido</p>
      )}
    </div>
  );
};

// Helper function para cn (className utility)
function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
