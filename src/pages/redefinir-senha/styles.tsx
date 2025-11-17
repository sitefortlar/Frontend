import styled, { keyframes } from 'styled-components';

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

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const RedefinirSenhaContainer = styled.div`
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
`;

export const FloatingElement = styled.div<{
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width: string;
  height: string;
  delay?: string;
}>`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  right: ${({ right }) => right || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(2rem);
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
`;

export const RedefinirSenhaContent = styled.div`
  width: 100%;
  max-width: 30rem;
  position: relative;
  z-index: 1;
`;

export const RedefinirSenhaHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const RedefinirSenhaBackLink = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const RedefinirSenhaBackButton = styled.div`
  display: inline-flex;
  align-items: center;
  color: white;
  transition: all 0.3s ease;
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transform: scale(1);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }
`;

export const RedefinirSenhaTitleCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const RedefinirSenhaTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const RedefinirSenhaSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
`;

export const RedefinirSenhaFormContainer = styled.div`
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

export const RedefinirSenhaFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

export const RedefinirSenhaFooterLink = styled.div`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: underline;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

// Form specific styles
export const RedefinirSenhaForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RedefinirSenhaFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RedefinirSenhaInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const RedefinirSenhaInput = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0 3rem;
  background: hsl(var(--auth-input-bg));
  backdrop-filter: blur(0.5rem);
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

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const RedefinirSenhaInputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${RedefinirSenhaInputGroup}:focus-within & {
    color: white;
  }
`;

export const RedefinirSenhaButton = styled.button<{ disabled?: boolean }>`
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

export const RedefinirSenhaButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const RedefinirSenhaError = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
  animation: ${slideIn} 0.3s ease-out;
`;

// Password validation styles
export const RedefinirSenhaPasswordValidation = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 0.5rem;
`;

export const RedefinirSenhaPasswordTitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
`;

export const RedefinirSenhaPasswordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;

export const RedefinirSenhaPasswordItem = styled.div<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  color: ${({ isValid }) => isValid ? '#4ade80' : 'rgba(255, 255, 255, 0.6)'};
`;

export const RedefinirSenhaPasswordIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;

export const LoadingSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
