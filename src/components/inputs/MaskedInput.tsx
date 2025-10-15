import React from 'react';
import InputMask from 'react-input-mask';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask: string;
  maskChar?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
}

/**
 * Componente base para inputs com máscara
 * Suporta colar valores formatados e não formatados
 * Remove caracteres não numéricos automaticamente
 */
export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, maskChar = '_', value, onChange, className, error, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      // Remove caracteres não numéricos para processamento
      const cleanValue = inputValue.replace(/\D/g, '');
      onChange(cleanValue);
    };

    return (
      <div className="relative">
        <InputMask
          mask={mask}
          maskChar={maskChar}
          value={value}
          onChange={handleChange}
          {...props}
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              ref={ref}
              className={cn(
                'h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30',
                error && 'border-red-400 focus:border-red-400',
                className
              )}
            />
          )}
        </InputMask>
        {error && (
          <p className="text-red-400 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

MaskedInput.displayName = 'MaskedInput';
