/**
 * CadastroPage - Página de cadastro usando a nova arquitetura
 * Demonstra o uso completo do Design System + Styled Components + Atomic Design
 */

import React from 'react'
import { AuthLayout, EmpresaForm } from '@/components'

export const CadastroPage: React.FC = () => {
  return (
    <AuthLayout
      title="Cadastro de Empresa"
      subtitle="Crie sua conta e comece a usar o Fort-Lar"
      showLogo={true}
      footer={
        <div>
          Já tem uma conta?{' '}
          <a href="/login">Faça login aqui</a>
        </div>
      }
    >
      <EmpresaForm />
    </AuthLayout>
  )
}
