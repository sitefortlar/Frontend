/**
 * Input Component - Styled Components
 * Baseado no design atual do Fort-Lar
 */

import styled, { css } from 'styled-components'
import { Theme } from '../../../design-system/theme'

interface InputProps {
  variant: 'default' | 'error' | 'success'
  size: 'sm' | 'md' | 'lg'
  hasLeftIcon?: boolean
  hasRightIcon?: boolean
}

const sizeStyles = {
  sm: css`
    height: 2.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  `,
  md: css`
    height: 2.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
  `,
  lg: css`
    height: 2.75rem;
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
  `,
}

const variantStyles = {
  default: css`
    border-color: ${props => props.theme.colors.border};
    
    &:focus-visible {
      border-color: ${props => props.theme.colors.ring};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.ring}20;
    }
    
    &:hover:not(:focus) {
      border-color: ${props => props.theme.colors.primary[300]};
    }
  `,
  error: css`
    border-color: ${props => props.theme.colors.error};
    
    &:focus-visible {
      border-color: ${props => props.theme.colors.error};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.error}20;
    }
  `,
  success: css`
    border-color: ${props => props.theme.colors.success};
    
    &:focus-visible {
      border-color: ${props => props.theme.colors.success};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.success}20;
    }
  `,
}

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const StyledInput = styled.input<InputProps>`
  display: flex;
  width: 100%;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
  transition: ${props => props.theme.transitions.smooth};
  
  &::placeholder {
    color: ${props => props.theme.colors.mutedForeground};
  }
  
  &:focus-visible {
    outline: none;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${props => props.theme.colors.muted};
  }
  
  /* File input styles */
  &[type="file"] {
    border: 0;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${props => props.theme.colors.foreground};
    padding: 0;
    height: auto;
  }
  
  /* Size styles */
  ${props => sizeStyles[props.size]}
  
  /* Variant styles */
  ${props => variantStyles[props.variant]}
  
  /* Icon padding */
  ${props => props.hasLeftIcon && css`
    padding-left: 2.5rem;
  `}
  
  ${props => props.hasRightIcon && css`
    padding-right: 2.5rem;
  `}
  
  /* Responsive font size */
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`

export const IconContainer = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.mutedForeground};
  pointer-events: none;
  
  ${props => props.position === 'left' && css`
    left: 0.75rem;
  `}
  
  ${props => props.position === 'right' && css`
    right: 0.75rem;
  `}
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`
