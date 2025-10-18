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

export const EsqueciSenhaContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    hsl(var(--auth-bg-start)) 0%,
    hsl(var(--auth-bg-end)) 100%
  );
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

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
`;

export const FloatingElement = styled.div<{ 
  top?: string; 
  right?: string; 
  left?: string; 
  bottom?: string; 
  width: string; 
  height: string; 
  delay?: string;
}>`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  right: ${({ right }) => right || 'auto'};
  left: ${({ left }) => left || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(2rem);
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
`;

export const EsqueciSenhaContent = styled.div`
  width: 100%;
  max-width: 28rem;
  position: relative;
  z-index: 10;
`;

export const EsqueciSenhaHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeInScale} 0.6s ease-out;
`;

export const EsqueciSenhaBackLink = styled(Link)`
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
  margin-bottom: 1.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const EsqueciSenhaInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const EsqueciSenhaTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const EsqueciSenhaDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.6;
`;

export const EsqueciSenhaFormContainer = styled.div`
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

export const EsqueciSenhaForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EsqueciSenhaInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const EsqueciSenhaInput = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0 3rem;
  background: hsl(var(--auth-input-bg));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

export const EsqueciSenhaIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${EsqueciSenhaInputGroup}:focus-within & {
    color: white;
  }
`;

export const EsqueciSenhaButton = styled.button<{ isLoading?: boolean }>`
  width: 100%;
  height: 3.5rem;
  background: hsl(var(--auth-button));
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: hsl(var(--primary-glow));
    transform: scale(1.02);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const EsqueciSenhaFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  animation: ${slideUp} 0.6s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

export const EsqueciSenhaFooterText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

export const EsqueciSenhaFooterLink = styled(Link)`
  color: white;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: hsl(var(--primary-glow));
  }
`;

export const LoadingSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
