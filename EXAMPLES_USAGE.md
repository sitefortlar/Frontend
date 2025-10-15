# 🚀 **Exemplos de Uso - Design System + Styled Components + Atomic Design**

## 📋 **Visão Geral**

Este arquivo demonstra como usar a nova arquitetura implementada no Fort-Lar.

---

## 🎯 **1. Usando Átomos (Componentes Básicos)**

### **Button Component**

```tsx
import { Button } from '@/components'

// Botão primário
<Button variant="primary" size="md">
  Salvar
</Button>

// Botão com ícones
<Button 
  variant="secondary" 
  size="lg"
  leftIcon={<Save />}
  rightIcon={<ArrowRight />}
>
  Salvar e Continuar
</Button>

// Botão de loading
<Button 
  variant="primary" 
  loading={true}
  disabled
>
  Salvando...
</Button>

// Botão específico do Fort-Lar
<Button variant="kitchen" size="md">
  Cozinha
</Button>
```

### **Input Component**

```tsx
import { Input } from '@/components'
import { Search, Lock } from 'lucide-react'

// Input básico
<Input 
  placeholder="Digite seu nome"
  size="md"
/>

// Input com ícones
<Input 
  placeholder="Buscar produtos"
  leftIcon={<Search />}
  rightIcon={<Filter />}
/>

// Input com validação
<Input 
  placeholder="Senha"
  type="password"
  leftIcon={<Lock />}
  error="Senha deve ter no mínimo 6 caracteres"
  variant="error"
/>

// Input de sucesso
<Input 
  placeholder="E-mail"
  type="email"
  success={true}
  variant="success"
/>
```

### **Label Component**

```tsx
import { Label } from '@/components'

// Label básico
<Label>Nome completo</Label>

// Label obrigatório
<Label required>E-mail</Label>

// Label com validação
<Label error>Senha</Label>
<Label success>E-mail confirmado</Label>

// Label com tamanhos
<Label size="sm">Pequeno</Label>
<Label size="md">Médio</Label>
<Label size="lg">Grande</Label>
```

---

## 🧬 **2. Usando Moléculas (Combinações)**

### **FormField Component**

```tsx
import { FormField, Input } from '@/components'
import { AlertCircle } from 'lucide-react'

// Campo de formulário completo
<FormField
  label="Nome completo"
  required
  error="Nome é obrigatório"
  hint="Digite seu nome completo"
>
  <Input 
    placeholder="Seu nome"
    error={!!errors.name}
  />
</FormField>

// Campo com sucesso
<FormField
  label="E-mail"
  success="E-mail válido"
>
  <Input 
    type="email"
    placeholder="seu@email.com"
    success={true}
  />
</FormField>
```

### **CNPJInput Component**

```tsx
import { CNPJInput } from '@/components'

// Input de CNPJ básico
<CNPJInput
  value={cnpj}
  onChange={setCnpj}
  placeholder="CNPJ"
/>

// Input com busca automática
<CNPJInput
  value={cnpj}
  onChange={setCnpj}
  onSearch={handleCNPJSearch}
  showSearchButton
  isLoading={isLoading}
  error={errors.cnpj?.message}
/>

// Input com validação em tempo real
<CNPJInput
  value={cnpj}
  onChange={(value) => {
    setCnpj(value)
    // Validação automática acontece internamente
  }}
  onBlur={() => setIsTouched(true)}
/>
```

### **PhoneInput Component**

```tsx
import { PhoneInput } from '@/components'

// Input de telefone básico
<PhoneInput
  value={phone}
  onChange={setPhone}
  placeholder="Telefone"
/>

// Input com validação
<PhoneInput
  value={phone}
  onChange={setPhone}
  error={errors.phone?.message}
  onBlur={() => validatePhone()}
/>
```

### **CEPInput Component**

```tsx
import { CEPInput } from '@/components'

// Input de CEP com busca
<CEPInput
  value={cep}
  onChange={setCep}
  onSearch={handleCEPSearch}
  showSearchButton
  isLoading={isLoading}
  error={errors.cep?.message}
/>
```

---

## 🏢 **3. Usando Organismos (Blocos Complexos)**

### **EmpresaForm Component**

```tsx
import { EmpresaForm } from '@/components'

// Formulário completo de empresa
function CadastroPage() {
  return (
    <div>
      <h1>Cadastro de Empresa</h1>
      <EmpresaForm />
    </div>
  )
}

// O EmpresaForm inclui:
// - Validação completa com Zod
// - Busca automática de CNPJ
// - Busca automática de CEP
// - Estados de loading
// - Tratamento de erros
// - Feedback visual
```

---

## 🎨 **4. Usando Templates (Layouts)**

### **AuthLayout Component**

```tsx
import { AuthLayout, EmpresaForm } from '@/components'

// Layout de autenticação
function CadastroPage() {
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

// Layout personalizado
<AuthLayout
  title="Login"
  subtitle="Entre na sua conta"
  showLogo={false}
>
  <LoginForm />
</AuthLayout>
```

---

## 🎯 **5. Exemplo Completo - Página de Cadastro**

```tsx
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  AuthLayout, 
  EmpresaForm,
  Button,
  Input,
  FormField 
} from '@/components'
import { companyRegistrationSchema } from '@/schemas'

export const CadastroPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm({
    resolver: zodResolver(companyRegistrationSchema),
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // Lógica de cadastro
      console.log('Dados:', data)
    } finally {
      setIsLoading(false)
    }
  }

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
```

---

## 🎨 **6. Customização de Tema**

### **Usando Tokens do Design System**

```tsx
import styled from 'styled-components'
import { theme } from '@/design-system/theme'

const CustomComponent = styled.div`
  background: ${props => props.theme.colors.primary[500]};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.smooth};
  
  &:hover {
    background: ${props => props.theme.colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`
```

### **Criando Novos Componentes**

```tsx
// src/components/atoms/Card/Card.styles.ts
import styled from 'styled-components'

export const CardContainer = styled.div`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: ${props => props.theme.transitions.smooth};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`

// src/components/atoms/Card/Card.tsx
import React from 'react'
import { CardContainer } from './Card.styles'

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>
}
```

---

## 🔧 **7. Integração com React Hook Form**

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField, Input, Button } from '@/components'
import { loginSchema } from '@/schemas'

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: any) => {
    console.log('Dados:', data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        label="E-mail"
        required
        error={form.formState.errors.email?.message}
      >
        <Input
          {...form.register('email')}
          type="email"
          placeholder="seu@email.com"
        />
      </FormField>
      
      <FormField
        label="Senha"
        required
        error={form.formState.errors.password?.message}
      >
        <Input
          {...form.register('password')}
          type="password"
          placeholder="Sua senha"
        />
      </FormField>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={form.formState.isSubmitting}
      >
        Entrar
      </Button>
    </form>
  )
}
```

---

## 🎯 **8. Integração com React Query**

```tsx
import { useQuery, useMutation } from '@tanstack/react-query'
import { Button, FormField, Input } from '@/components'
import { useAuth } from '@/hooks/auth/useAuth'

function LoginForm() {
  const { login } = useAuth()
  
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Redirecionar para dashboard
    },
    onError: (error) => {
      // Mostrar erro
    }
  })

  const handleSubmit = (data: any) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="E-mail" required>
        <Input type="email" />
      </FormField>
      
      <FormField label="Senha" required>
        <Input type="password" />
      </FormField>
      
      <Button
        type="submit"
        loading={loginMutation.isPending}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
```

---

## 🎉 **Conclusão**

Esta arquitetura oferece:

- **Componentes reutilizáveis** e bem organizados
- **TypeScript** com tipagem completa
- **Design System** consistente
- **Styled Components** com tema dinâmico
- **Atomic Design** para organização
- **SOLID Principles** para código limpo
- **Performance otimizada**
- **Fácil manutenção** e evolução

**Resultado**: Código limpo, escalável e maintível! 🚀
