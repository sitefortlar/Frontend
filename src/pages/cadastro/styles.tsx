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

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const CadastroContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    hsl(var(--auth-bg-start)) 0%,
    hsl(var(--auth-bg-end)) 100%
  );
  display: flex;
  flex-direction: column;
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

  /* Floating elements */
  &::after {
    content: '';
    position: absolute;
    top: 8rem;
    right: 4rem;
    width: 7rem;
    height: 7rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    filter: blur(2rem);
    animation: ${float} 6s ease-in-out infinite;
  }
`;

export const CadastroContent = styled.div`
  width: 100%;
  max-width: 64rem;
  position: relative;
  z-index: 1;
`;

export const CadastroHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeInScale} 0.6s ease-out;
`;

export const CadastroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const CadastroSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.125rem;
  line-height: 1.6;
`;

export const CadastroFormContainer = styled.div`
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

export const CadastroForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CadastroFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  animation: ${slideUp} 0.6s ease-out;
  animation-fill-mode: both;
`;

export const CadastroBackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  transition: all 0.3s ease;
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const CadastroButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  animation: ${slideUp} 0.6s ease-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;
`;

export const CadastroButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0 1.5rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 0.875rem;

  ${({ variant = 'primary' }) => 
    variant === 'primary' 
      ? `
        background: hsl(var(--auth-button));
        color: white;
        box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
        
        &:hover {
          background: hsl(var(--primary-glow));
          transform: scale(1.02);
          box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
        }
      `
      : `
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(0.5rem);
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
