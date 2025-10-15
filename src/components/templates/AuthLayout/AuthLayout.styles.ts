/**
 * AuthLayout Component - Styled Components
 * Template para páginas de autenticação
 */

import styled from 'styled-components'
import { Theme } from '../../../design-system/theme'

export const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    ${props => props.theme.colors.auth.bgStart} 0%,
    ${props => props.theme.colors.auth.bgEnd} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  
  /* Background pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`

export const AuthContent = styled.div`
  width: 100%;
  max-width: 28rem;
  position: relative;
  z-index: 1;
`

export const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

export const AuthLogo = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  svg {
    width: 2rem;
    height: 2rem;
    color: white;
  }
`

export const AuthTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

export const AuthSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`

export const AuthFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  
  a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: underline;
    
    &:hover {
      color: white;
    }
  }
`
