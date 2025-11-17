/**
 * Design System - Global Styles
 * Estilos globais baseados no design atual do Fort-Lar
 */

import { createGlobalStyle } from 'styled-components'
import { Theme } from './theme'

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
    font-size: 16px;
    line-height: 1.5;
  }
  
  body {
    font-family: ${props => props.theme.typography.fontFamily.inter.join(', ')};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.foreground};
    font-feature-settings: "rlig" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    line-height: ${props => props.theme.typography.lineHeight.tight};
    color: ${props => props.theme.colors.foreground};
  }
  
  h1 {
    font-size: ${props => props.theme.typography.textStyles.h1.fontSize};
    font-weight: ${props => props.theme.typography.textStyles.h1.fontWeight};
    line-height: ${props => props.theme.typography.textStyles.h1.lineHeight};
    letter-spacing: ${props => props.theme.typography.textStyles.h1.letterSpacing};
  }
  
  h2 {
    font-size: ${props => props.theme.typography.textStyles.h2.fontSize};
    font-weight: ${props => props.theme.typography.textStyles.h2.fontWeight};
    line-height: ${props => props.theme.typography.textStyles.h2.lineHeight};
    letter-spacing: ${props => props.theme.typography.textStyles.h2.letterSpacing};
  }
  
  h3 {
    font-size: ${props => props.theme.typography.textStyles.h3.fontSize};
    font-weight: ${props => props.theme.typography.textStyles.h3.fontWeight};
    line-height: ${props => props.theme.typography.textStyles.h3.lineHeight};
    letter-spacing: ${props => props.theme.typography.textStyles.h3.letterSpacing};
  }
  
  /* Links */
  a {
    color: ${props => props.theme.colors.primary[500]};
    text-decoration: none;
    transition: ${props => props.theme.transitions.colors};
  }
  
  a:hover {
    color: ${props => props.theme.colors.primary[600]};
    text-decoration: underline;
  }
  
  /* Buttons */
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* Lists */
  ul, ol {
    list-style: none;
  }
  
  /* Tables */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.muted};
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary[500]};
    border-radius: 3px;
    transition: ${props => props.theme.transitions.colors};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primary[600]};
  }
  
  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${props => props.theme.colors.ring};
    outline-offset: 2px;
  }
  
  /* Selection */
  ::selection {
    background-color: ${props => props.theme.colors.primary[100]};
    color: ${props => props.theme.colors.primary[900]};
  }
  
  /* Glass morphism utility classes */
  .glass {
    background: ${props => props.theme.colors.glass.bg};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid ${props => props.theme.colors.glass.border};
    box-shadow: ${props => props.theme.colors.glass.shadow};
  }
  
  .glass-light {
    background: ${props => props.theme.colors.glass.bg};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid ${props => props.theme.colors.glass.border};
    box-shadow: ${props => props.theme.shadows.soft};
  }
  
  /* Auth specific styles */
  .auth-input {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.75rem;
    color: white;
    transition: ${props => props.theme.transitions.smooth};
  }
  
  .auth-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .auth-input:focus {
    color: white;
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .auth-input:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  .auth-button {
    background: ${props => props.theme.colors.auth.button};
    color: white;
    font-weight: 600;
    border-radius: 0.75rem;
    transition: ${props => props.theme.transitions.smooth};
    transform: scale(1);
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  .auth-button:hover {
    background: ${props => props.theme.colors.auth.buttonHover};
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  .auth-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .auth-form-bg {
    background: ${props => props.theme.colors.auth.formBg};
    backdrop-filter: blur(2xl);
    -webkit-backdrop-filter: blur(2xl);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1.5rem;
    box-shadow: ${props => props.theme.shadows['2xl']};
  }
  
  /* Loading states */
  .loading-spinner {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-overlay {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
  }
  
  /* Form elements */
  .form-error {
    color: ${props => props.theme.colors.error};
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .form-group {
    position: relative;
  }
  
  .form-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    transition: ${props => props.theme.transitions.colors};
  }
  
  /* Animations */
  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  
  .fade-in-scale {
    animation: fadeInScale 0.5s ease-out;
  }
  
  .slide-up {
    animation: slideUp 0.5s ease-out;
  }
  
  .float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`
