/**
 * Label Component - Styled Components
 * Baseado no design atual do Fort-Lar
 */

import styled, { css } from 'styled-components'
import { Theme } from '../../../design-system/theme'

interface LabelProps {
  variant: 'default' | 'error' | 'success' | 'muted'
  size: 'sm' | 'md' | 'lg'
  required?: boolean
}

const sizeStyles = {
  sm: css`
    font-size: 0.75rem;
    line-height: 1.3;
  `,
  md: css`
    font-size: 0.875rem;
    line-height: 1.4;
  `,
  lg: css`
    font-size: 1rem;
    line-height: 1.5;
  `,
}

const variantStyles = {
  default: css`
    color: ${props => props.theme.colors.foreground};
  `,
  error: css`
    color: ${props => props.theme.colors.error};
  `,
  success: css`
    color: ${props => props.theme.colors.success};
  `,
  muted: css`
    color: ${props => props.theme.colors.mutedForeground};
  `,
}

export const StyledLabel = styled.label<LabelProps>`
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
  display: block;
  margin-bottom: 0.5rem;
  
  /* Required indicator */
  ${props => props.required && css`
    &::after {
      content: ' *';
      color: ${props => props.theme.colors.error};
      margin-left: 0.125rem;
    }
  `}
  
  /* Disabled state */
  &:has(+ input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Size styles */
  ${props => sizeStyles[props.size]}
  
  /* Variant styles */
  ${props => variantStyles[props.variant]}
`
