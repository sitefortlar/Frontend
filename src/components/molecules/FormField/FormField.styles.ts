/**
 * FormField Component - Styled Components
 * Molécula que combina Label + Input + Feedback
 */

import styled, { css } from 'styled-components'
import { Theme } from '../../../design-system/theme'

interface FormFieldProps {
  error?: boolean
  success?: boolean
}

export const FormFieldContainer = styled.div<FormFieldProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

export const FormFieldLabel = styled.label<FormFieldProps>`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
  display: block;
  
  color: ${props => {
    if (props.error) return props.theme.colors.error
    if (props.success) return props.theme.colors.success
    return props.theme.colors.foreground
  }};
  
  /* Required indicator */
  &.required::after {
    content: ' *';
    color: ${props => props.theme.colors.error};
    margin-left: 0.125rem;
  }
  
  /* Disabled state */
  &:has(+ * input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const FormFieldContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const FormFieldMessage = styled.div<FormFieldProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.3;
  margin-top: 0.25rem;
  
  color: ${props => {
    if (props.error) return props.theme.colors.error
    if (props.success) return props.theme.colors.success
    return props.theme.colors.mutedForeground
  }};
  
  svg {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  }
`

export const FormFieldHint = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.3;
  margin-top: 0.25rem;
`
