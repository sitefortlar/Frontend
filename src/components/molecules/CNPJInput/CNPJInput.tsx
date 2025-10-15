/**
 * CNPJInput Component - Atomic Design
 * Molécula especializada para input de CNPJ
 */

import React, { useState, useEffect } from 'react'
import { Search, CheckCircle, XCircle } from 'lucide-react'
import { onlyDigits, limitDigits, formatCNPJ } from '../../../utils/formatting'
import { validateCNPJ } from '../../../utils/validation'
import {
  CNPJInputContainer,
  StyledCNPJInput,
  IconContainer,
  SearchButton,
  StatusIcon,
  LoadingSpinner,
} from './CNPJInput.styles'

interface CNPJInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
  showSearchButton?: boolean
  isLoading?: boolean
  error?: string
  className?: string
}

export const CNPJInput: React.FC<CNPJInputProps> = ({
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
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isTouched, setIsTouched] = useState(false)

  // Validação em tempo real
  useEffect(() => {
    if (value && onlyDigits(value).length === 14) {
      setIsValid(validateCNPJ(value))
    } else {
      setIsValid(null)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cleanValue = onlyDigits(inputValue)
    
    // Limita a 14 dígitos
    const limitedValue = limitDigits(cleanValue, 14)
    
    // Aplica formatação
    const formattedValue = formatCNPJ(limitedValue)
    
    onChange(formattedValue)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true)
    onBlur?.(e)
  }

  const handleSearch = () => {
    if (onSearch && isValid && onlyDigits(value).length === 14) {
      onSearch()
    }
  }

  const getInputVariant = () => {
    if (error) return 'error'
    if (isTouched && isValid === false) return 'error'
    if (isTouched && isValid === true) return 'success'
    return 'default'
  }

  const inputVariant = getInputVariant()
  const canSearch = isValid && onlyDigits(value).length === 14 && !isLoading

  return (
    <CNPJInputContainer>
      <StyledCNPJInput
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="CNPJ *"
        variant={inputVariant}
        size="md"
        hasSearchButton={showSearchButton}
        className={className}
      />
      
      {/* Ícone de status */}
      {isTouched && isValid === true && !isLoading && (
        <StatusIcon variant="success">
          <CheckCircle />
        </StatusIcon>
      )}
      
      {isTouched && isValid === false && !isLoading && (
        <StatusIcon variant="error">
          <XCircle />
        </StatusIcon>
      )}
      
      {/* Loading spinner */}
      {isLoading && (
        <LoadingSpinner />
      )}
      
      {/* Botão de busca */}
      {showSearchButton && !isLoading && (
        <SearchButton
          type="button"
          onClick={handleSearch}
          disabled={!canSearch}
          title="Buscar dados da empresa pelo CNPJ"
        >
          <Search />
        </SearchButton>
      )}
    </CNPJInputContainer>
  )
}