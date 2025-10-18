import styled, { css } from 'styled-components'

export const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    ${props => props.theme.colors.auth.bgStart} 0%,
    ${props => props.theme.colors.auth.bgEnd} 100%
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
`

export const AuthContent = styled.div`
  width: 100%;
  max-width: 30rem;
  position: relative;
  z-index: 1;
`

export const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

export const AuthLogo = styled.div<{width: string; height: string}>`
  ${({width, height}) => css`
    width: ${width};
    height: ${height};
    margin: 0 0 1rem 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: 100%;
      color: white;
    }
  `}
`;


export const AuthFormContainer = styled.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: fadeInScale 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
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
