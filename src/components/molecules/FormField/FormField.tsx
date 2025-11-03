/**
 * FormField Component - Atomic Design
 * Molécula que combina Label + Input + Feedback
 */

import React from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import {
  FormFieldContainer,
  FormFieldLabel,
  FormFieldContent,
  FormFieldMessage,
  FormFieldHint,
} from './FormField.styles'

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  success?: string
  hint?: string
  children: React.ReactNode
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  success,
  hint,
  children,
  className,
}) => {
  const hasError = !!error
  const isSuccess = !!success && !hasError

  return (
    <FormFieldContainer
      error={hasError}
      success={isSuccess}
      className={className}
    >
      <FormFieldLabel
        error={hasError}
        success={isSuccess}
        className={required ? 'required' : ''}
      >
        {label}
      </FormFieldLabel>
      
      <FormFieldContent>
        {children}
        
        {/* Error Message */}
        {hasError && (
          <FormFieldMessage error={true}>
            <AlertCircle />
            <span>{error}</span>
          </FormFieldMessage>
        )}
        
        {/* Success Message */}
        {isSuccess && (
          <FormFieldMessage success={true}>
            <CheckCircle />
            <span>{success}</span>
          </FormFieldMessage>
        )}
        
        {/* Hint Message */}
        {hint && !hasError && !isSuccess && (
          <FormFieldHint>
            <Info />
            <span>{hint}</span>
          </FormFieldHint>
        )}
      </FormFieldContent>
    </FormFieldContainer>
  )
}