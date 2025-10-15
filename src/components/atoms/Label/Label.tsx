/**
 * Label Component - Atomic Design
 * Componente básico para labels
 */

import React from 'react'
import { StyledLabel } from './Label.styles'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'default' | 'error' | 'success' | 'muted'
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  children: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({
  variant = 'default',
  size = 'md',
  required = false,
  children,
  ...props
}) => {
  return (
    <StyledLabel
      variant={variant}
      size={size}
      required={required}
      {...props}
    >
      {children}
    </StyledLabel>
  )
}