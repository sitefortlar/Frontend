/**
 * PhoneInput Component - Atomic Design
 * Molécula especializada para input de telefone
 */

import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { onlyDigits, limitDigits, formatPhone } from '../../../utils/formatting'
import { validatePhone } from '../../../utils/validation'
import {
  PhoneInputContainer,
  StyledPhoneInput,
  StatusIcon,
} from './PhoneInput.styles'

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  className,
  onBlur,
  ...props
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isTouched, setIsTouched] = useState(false)

  // Validação em tempo real
  useEffect(() => {
    if (value) {
      const cleanValue = onlyDigits(value)
      if (cleanValue.length >= 10) {
        setIsValid(validatePhone(value))
      } else {
        setIsValid(null)
      }
    } else {
      setIsValid(null)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cleanValue = onlyDigits(inputValue)
    
    // Limita a 11 dígitos (máximo para celular)
    const limitedValue = limitDigits(cleanValue, 11)
    
    // Aplica formatação
    const formattedValue = formatPhone(limitedValue)
    
    onChange(formattedValue)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true)
    onBlur?.(e)
  }

  const getInputVariant = () => {
    if (error) return 'error'
    if (isTouched && isValid === false) return 'error'
    if (isTouched && isValid === true) return 'success'
    return 'default'
  }

  const inputVariant = getInputVariant()

  return (
    <PhoneInputContainer>
      <StyledPhoneInput
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Telefone *"
        variant={inputVariant}
        size="md"
        className={className}
      />
      
      {/* Ícone de status */}
      {isTouched && isValid === true && (
        <StatusIcon variant="success">
          <CheckCircle />
        </StatusIcon>
      )}
      
      {isTouched && isValid === false && (
        <StatusIcon variant="error">
          <XCircle />
        </StatusIcon>
      )}
    </PhoneInputContainer>
  )
}