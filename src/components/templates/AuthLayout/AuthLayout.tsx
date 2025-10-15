/**
 * AuthLayout Component - Atomic Design
 * Template para páginas de autenticação
 */

import React from 'react'
import { Building2 } from 'lucide-react'
import {
  AuthContainer,
  AuthContent,
  AuthHeader,
  AuthLogo,
  AuthTitle,
  AuthSubtitle,
  AuthFooter,
} from './AuthLayout.styles'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showLogo?: boolean
  footer?: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = 'Fort-Lar',
  subtitle = 'Sistema de Gestão Empresarial',
  showLogo = true,
  footer,
}) => {
  return (
    <AuthContainer>
      <AuthContent>
        <AuthHeader>
          {showLogo && (
            <AuthLogo>
              <Building2 />
            </AuthLogo>
          )}
          
          <AuthTitle>{title}</AuthTitle>
          <AuthSubtitle>{subtitle}</AuthSubtitle>
        </AuthHeader>
        
        {children}
        
        {footer && (
          <AuthFooter>
            {footer}
          </AuthFooter>
        )}
      </AuthContent>
    </AuthContainer>
  )
}
