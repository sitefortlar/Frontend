/**
 * Button Component - Styled Components
 * Baseado no design atual do Fort-Lar
 */

import styled, { css } from 'styled-components'
import { Theme } from '../../../design-system/theme'

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'kitchen' | 'category' | 'filter'
  size: 'sm' | 'md' | 'lg' | 'icon'
  fullWidth?: boolean
  disabled?: boolean
}

const sizeStyles = {
  sm: css`
    height: 2.25rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  `,
  md: css`
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 0.875rem;
    gap: 0.5rem;
  `,
  lg: css`
    height: 2.75rem;
    padding: 0 2rem;
    font-size: 1rem;
    gap: 0.5rem;
  `,
  icon: css`
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
    gap: 0;
  `,
}

const variantStyles = {
  primary: css`
    background-color: ${props => props.theme.colors.primary[500]};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary[600]};
      transform: translateY(-1px);
      box-shadow: ${props => props.theme.shadows.medium};
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: ${props => props.theme.shadows.sm};
    }
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.muted};
    color: ${props => props.theme.colors.mutedForeground};
    border: 1px solid ${props => props.theme.colors.border};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.muted}cc;
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary[500]};
    border: 1px solid ${props => props.theme.colors.primary[500]};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary[50]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${props => props.theme.colors.foreground};
    border: none;
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.muted};
    }
  `,
  destructive: css`
    background-color: ${props => props.theme.colors.error};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.error}dd;
      transform: translateY(-1px);
      box-shadow: ${props => props.theme.shadows.medium};
    }
  `,
  // Variantes específicas do Fort-Lar
  kitchen: css`
    background: linear-gradient(to right, #f97316, #ea580c);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      transform: scale(1.05);
    }
  `,
  category: css`
    background-color: #fff7ed;
    color: #c2410c;
    border: 1px solid #fed7aa;
    
    &:hover:not(:disabled) {
      background-color: #ffedd5;
      color: #9a3412;
    }
  `,
  filter: css`
    background-color: ${props => props.theme.colors.muted};
    color: ${props => props.theme.colors.mutedForeground};
    border: 1px solid ${props => props.theme.colors.border};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.muted}cc;
    }
  `,
}

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transitions.smooth};
  position: relative;
  overflow: hidden;
  
  /* Focus styles */
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.ring};
    outline-offset: 2px;
  }
  
  /* Disabled styles */
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* SVG styles */
  svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
  
  /* Size styles */
  ${props => sizeStyles[props.size]}
  
  /* Variant styles */
  ${props => variantStyles[props.variant]}
  
  /* Full width */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Loading state */
  &.loading {
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
