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

export const AuthFormCard = styled.div<{ delay?: string }>`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${fadeInScale} 0.6s ease-out;
  animation-delay: ${({ delay }) => delay || '0s'};
  animation-fill-mode: both;
`;

export const AuthFormHeader = styled.div`
  padding: 1.5rem 1.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const AuthFormTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

export const AuthFormIcon = styled.div`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthFormContent = styled.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AuthFormFullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const AuthInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const AuthInput = styled.input`
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  background: hsl(var(--auth-input-bg));
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
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

export const AuthInputWithIcon = styled(AuthInput)`
  padding-right: 3rem;
`;

export const AuthInputIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${AuthInputGroup}:focus-within & {
    color: white;
  }
`;

export const AuthInputButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
`;

export const AuthSelect = styled.select`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  background: hsl(var(--auth-input-bg));
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.3);
  }

  option {
    background: hsl(var(--auth-bg-start));
    color: white;
  }
`;

export const AuthError = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
  animation: ${slideIn} 0.3s ease-out;
`;

export const AuthPasswordValidation = styled.div`
  margin-top: 1rem;
`;

export const AuthPasswordTitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
`;

export const AuthPasswordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AuthPasswordItem = styled.div<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  color: ${({ isValid }) => isValid ? '#4ade80' : 'rgba(255, 255, 255, 0.6)'};
`;

export const AuthPasswordIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;

// Login Form specific styles
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LoginFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const LoginInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const LoginInput = styled.input`
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

export const LoginInputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${LoginInputGroup}:focus-within & {
    color: white;
  }
`;

export const LoginInputButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    color: white;
  }
`;

export const LoginError = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
  animation: ${slideIn} 0.3s ease-out;
`;

export const LoginButton = styled.button<{ disabled?: boolean }>`
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

export const LoginButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const LoadingSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Confirmar Cadastro specific styles
export const ConfirmarCadastroForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ConfirmarCadastroFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ConfirmarCadastroInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ConfirmarCadastroInput = styled.input`
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

  &:read-only {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
`;

export const ConfirmarCadastroInputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${ConfirmarCadastroInputGroup}:focus-within & {
    color: white;
  }
`;

export const ConfirmarCadastroButton = styled.button<{ disabled?: boolean }>`
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

export const ConfirmarCadastroButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const ConfirmarCadastroError = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
  animation: ${slideIn} 0.3s ease-out;
`;

export const ConfirmarCadastroDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
`;

export const ConfirmarCadastroResendButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 3rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Redefinir Senha specific styles
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