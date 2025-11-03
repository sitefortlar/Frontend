/**
 * Button Component - Atomic Design
 * Componente básico para botões
 */

import React from 'react'
import { StyledButton } from './Button.styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'kitchen' | 'category' | 'filter'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      className={`${loading ? 'loading' : ''} ${className || ''}`}
      {...props}
    >
      {!loading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span>{rightIcon}</span>}
    </StyledButton>
  )
}