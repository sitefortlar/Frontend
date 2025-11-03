/**
 * Input Component - Atomic Design
 * Componente básico para inputs
 */

import React from 'react'
import { StyledInput, InputContainer, IconContainer } from './Input.styles'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  success?: boolean
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  error,
  success,
  className,
  ...props
}) => {
  const inputVariant = error ? 'error' : success ? 'success' : variant
  
  return (
    <InputContainer>
      {leftIcon && (
        <IconContainer position="left">
          {leftIcon}
        </IconContainer>
      )}
      
      <StyledInput
        variant={inputVariant}
        size={size}
        hasLeftIcon={!!leftIcon}
        hasRightIcon={!!rightIcon}
        className={className}
        {...props}
      />
      
      {rightIcon && (
        <IconContainer position="right">
          {rightIcon}
        </IconContainer>
      )}
    </InputContainer>
  )
}