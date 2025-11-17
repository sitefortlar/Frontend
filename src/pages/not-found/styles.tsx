import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

export const NotFoundContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    hsl(var(--auth-bg-start)) 0%,
    hsl(var(--auth-bg-end)) 100%
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
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
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
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
`;

export const NotFoundContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 10;
  max-width: 32rem;
  width: 100%;
`;

export const NotFoundCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 3rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${fadeInScale} 0.8s ease-out;
`;

export const NotFoundNumber = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: white;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInScale} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

export const NotFoundTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

export const NotFoundDescription = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 1.5rem 0 2rem;
  line-height: 1.6;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

export const NotFoundButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: hsl(var(--auth-button));
  color: white;
  text-decoration: none;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: 0.8s;
  animation-fill-mode: both;

  &:hover {
    background: hsl(var(--primary-glow));
    transform: scale(1.05);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const NotFoundIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
