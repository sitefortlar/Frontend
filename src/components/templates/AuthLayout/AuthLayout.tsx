import React from 'react'
import {
  AuthContainer,
  AuthContent,
  AuthHeader,
  AuthLogo,
  AuthFooter,
} from './AuthLayout.styles'
import fortLarLogo from "@/assets/fort-lar-logo.png"

interface AuthLayoutProps {
  children: React.ReactNode
  showLogo?: boolean
  footer?: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  footer,
}) => {
  return (
    <AuthContainer>
      <AuthHeader>
          <AuthLogo width="40rem" height="100%">
            <img src={fortLarLogo} alt="Fort-Lar Logo" />
          </AuthLogo>
      </AuthHeader>
      <AuthContent>
        
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
