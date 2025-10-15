import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { onlyDigits, limitDigits, formatCEP } from '@/utils/formatting';
import { validateCEP } from '@/utils/validation';

export interface CepInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  showSearchButton?: boolean;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

/**
 * Componente especializado para input de CEP
 * - Máscara: 99999-999
 * - Limite: 8 dígitos máximo
 * - Validação em tempo real
 * - Suporta busca automática de endereço
 */
export const CepInput: React.FC<CepInputProps> = ({
  value,
  onChange,
  onSearch,
  showSearchButton = false,
  isLoading = false,
  error,
  className,
  onBlur,
  ...props
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  // Validação em tempo real
  useEffect(() => {
    if (value && onlyDigits(value).length === 8) {
      setIsValid(validateCEP(value));
    } else {
      setIsValid(null);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = onlyDigits(inputValue);
    
    // Limita a 8 dígitos
    const limitedValue = limitDigits(cleanValue, 8);
    
    // Aplica formatação
    const formattedValue = formatCEP(limitedValue);
    
    onChange(formattedValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    onBlur?.(e);
  };

  const handleSearch = () => {
    if (onSearch && isValid && onlyDigits(value).length === 8) {
      onSearch();
    }
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
        placeholder="CEP *"
        className={cn(
          'h-12 pr-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30',
          inputState === 'error' && 'border-red-400 focus:border-red-400',
          inputState === 'success' && 'border-green-400 focus:border-green-400',
          showSearchButton && 'pr-20',
          className
        )}
      />
      
      {/* Ícone de status */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {isTouched && isValid === true && (
          <CheckCircle className="h-5 w-5 text-green-400" />
        )}
        {isTouched && isValid === false && (
          <XCircle className="h-5 w-5 text-red-400" />
        )}
        
        {showSearchButton && (
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading || !isValid || onlyDigits(value).length !== 8}
            className="text-white/70 hover:text-white hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Buscar endereço pelo CEP"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      
      {/* Mensagem de validação */}
      {isTouched && isValid === false && !error && (
        <p className="text-red-400 text-sm mt-1">CEP inválido</p>
      )}
      
      {/* Mensagem de loading */}
      {isLoading && (
        <p className="text-blue-400 text-sm mt-1">Consultando CEP...</p>
      )}
    </div>
  );
};

// Helper function para cn (className utility)
function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
