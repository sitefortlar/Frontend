import styled, { keyframes } from 'styled-components';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
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

export const CatalogContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    135deg,
    hsl(var(--auth-bg-start)) 0%,
    hsl(var(--auth-bg-end)) 100%
  );
  position: relative;
  overflow-x: hidden; /* Apenas overflow horizontal, não vertical */

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

export const CatalogLoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

export const CatalogLoadingContent = styled.div`
  text-align: center;
  animation: ${fadeInScale} 0.6s ease-out;
`;

export const CatalogLoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 1rem;
`;

export const CatalogLoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.125rem;
  font-weight: 500;
`;

export const CatalogErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

export const CatalogErrorContent = styled.div`
  text-align: center;
  max-width: 32rem;
  padding: 2rem;
  animation: ${fadeInScale} 0.6s ease-out;
`;

export const CatalogErrorCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const CatalogErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const CatalogErrorDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const CatalogErrorButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: hsl(var(--auth-button));
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background: hsl(var(--primary-glow));
    transform: scale(1.05);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const CatalogContent = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 10;
  animation: ${fadeInScale} 0.6s ease-out;
  overflow-x: hidden;
`;
