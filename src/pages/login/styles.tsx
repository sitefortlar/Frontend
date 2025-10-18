import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const AuthFormContainer = styled.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${fadeInScale} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

export const LoginFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const LoginFooterText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

export const LoginFooterLink = styled(Link)`
  color: white;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: hsl(var(--primary-glow));
  }
`;

export const LoginFooterSecondaryLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  font-size: 0.875rem;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: white;
  }
`;
