/**
 * EmpresaForm Component - Styled Components
 * Organismo para formulário de cadastro de empresa
 */

import styled, { css } from 'styled-components'
import { Theme } from '../../../design-system/theme'

export const FormContainer = styled.div`
  background: ${props => props.theme.colors.auth.formBg};
  backdrop-filter: blur(2xl);
  -webkit-backdrop-filter: blur(2xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows['2xl']};
  max-width: 32rem;
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  text-align: center;
  line-height: 1.3;
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`

export const FormDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
  font-size: 0.875rem;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

export const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const SubmitButton = styled.button`
  background: ${props => props.theme.colors.auth.button};
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: ${props => props.theme.transitions.smooth};
  transform: scale(1);
  box-shadow: ${props => props.theme.shadows.medium};
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.auth.buttonHover};
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (min-width: 768px) {
    width: auto;
    min-width: 12rem;
  }
`

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`

export const LoadingSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`

export const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #86efac;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`
