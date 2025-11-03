# Formulário de Cadastro Refatorado

## Visão Geral

Este projeto implementa um formulário de cadastro de empresa com máscaras de entrada, validação local e integração com APIs externas, seguindo princípios SOLID e Clean Code.

## 🚀 Funcionalidades

### ✅ Máscaras de Entrada
- **CNPJ**: `99.999.999/9999-99` com validação de dígitos verificadores
- **Telefone**: `(99) 9999-9999` ou `(99) 99999-9999` (detecção automática)
- **CEP**: `99999-999` com busca automática de endereço

### ✅ Validação Robusta
- Validação local de CNPJ com algoritmo de dígitos verificadores
- Validação de telefone (8 ou 9 dígitos)
- Validação de CEP (8 dígitos)
- Suporte a colar valores formatados e não formatados

### ✅ Integração com APIs
- Busca automática de dados da empresa por CNPJ
- Busca automática de endereço por CEP
- Tratamento de erros (CNPJ inválido, API indisponível, etc.)
- Estados de loading e feedback visual

### ✅ Arquitetura Limpa
- Componentização clara e reutilizável
- Separação de responsabilidades
- Hooks customizados
- Serviços independentes
- Testes unitários

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   └── inputs/
│       ├── MaskedInput.tsx      # Componente base para máscaras
│       ├── CnpjInput.tsx        # Input especializado para CNPJ
│       ├── PhoneInput.tsx       # Input especializado para telefone
│       ├── CepInput.tsx         # Input especializado para CEP
│       └── index.ts             # Exports centralizados
├── hooks/
│   └── useMaskedInputs.ts       # Hook para gerenciar inputs mascarados
├── services/
│   ├── cnpjService.ts           # Serviço para busca de CNPJ
│   └── cepService.ts            # Serviço para busca de CEP
├── utils/
│   └── validation.ts            # Funções de validação
├── pages/
│   └── RegistrationForm.tsx     # Página principal de cadastro
└── tests/
    ├── validation.spec.ts       # Testes de validação
    └── cnpjService.spec.ts      # Testes do serviço CNPJ
```

## 🛠️ Instalação

### 1. Dependências

```bash
npm install react-input-mask @types/react-input-mask
```

### 2. Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# .env
REACT_APP_CNPJ_API_URL=https://brasilapi.com.br/api/cnpj/v1
REACT_APP_CEP_API_URL=https://viacep.com.br/ws
```

### 3. Executar o Projeto

```bash
npm run dev
```

## 📖 Como Usar

### 1. Componentes de Input

```tsx
import { CnpjInput, PhoneInput, CepInput } from '@/components/inputs';

// CNPJ com busca automática
<CnpjInput
  value={cnpj}
  onChange={setCnpj}
  onSearch={handleCnpjSearch}
  showSearchButton={true}
  isLoading={isLoadingCnpj}
  error={cnpjError}
/>

// Telefone com máscara dinâmica
<PhoneInput
  value={phone}
  onChange={setPhone}
  error={phoneError}
/>

// CEP com busca automática
<CepInput
  value={cep}
  onChange={setCep}
  onSearch={handleCepSearch}
  showSearchButton={true}
  isLoading={isLoadingCep}
  error={cepError}
/>
```

### 2. Hook useMaskedInputs

```tsx
import { useMaskedInputs } from '@/hooks/useMaskedInputs';

const {
  cnpj,
  setCnpj,
  phone,
  setPhone,
  cep,
  setCep,
  validateAll,
  clearAllErrors,
} = useMaskedInputs();
```

### 3. Serviços

```tsx
import { useCnpjService, useCepService } from '@/services';

const { searchByCnpj } = useCnpjService();
const { searchByCep } = useCepService();

// Buscar dados da empresa
const handleCnpjSearch = async () => {
  try {
    const data = await searchByCnpj(cnpj);
    // Preencher formulário automaticamente
  } catch (error) {
    // Tratar erro
  }
};
```

## 🧪 Testes

### Executar Testes

```bash
npm test
```

### Exemplos de Teste

```typescript
// Validação de CNPJ
expect(validateCNPJ('11222333000181')).toBe(true);
expect(validateCNPJ('11111111111111')).toBe(false);

// Validação de telefone
expect(validatePhone('11933334444')).toBe(true);
expect(validatePhone('1133334444')).toBe(true);

// Validação de CEP
expect(validateCEP('01234567')).toBe(true);
```

## 🔧 Configuração da API

### APIs Suportadas

1. **CNPJ**:
   - BrasilAPI (gratuita): `https://brasilapi.com.br/api/cnpj/v1`
   - ReceitaWS (gratuita): `https://receitaws.com.br/v1/cnpj`
   - CNPJ.ws (paga): `https://cnpj.ws/cnpj`

2. **CEP**:
   - ViaCEP (gratuita): `https://viacep.com.br/ws`

### Exemplo de Configuração

```typescript
// services/cnpjService.ts
const cnpjService = new CnpjService('https://brasilapi.com.br/api/cnpj/v1');
```

## 🎨 Personalização

### Estilos

Os componentes usam classes CSS customizáveis:

```tsx
<CnpjInput
  className="custom-cnpj-input"
  // ... outras props
/>
```

### Máscaras Customizadas

```tsx
<MaskedInput
  mask="99.999.999/9999-99"
  maskChar=""
  // ... outras props
/>
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Solução: Configurar proxy no `vite.config.ts`

2. **Máscara não aplicada**
   - Verificar se `react-input-mask` está instalado
   - Verificar se o valor está sendo passado corretamente

3. **Validação não funciona**
   - Verificar se a função de validação está sendo chamada
   - Verificar se o valor está no formato correto

### Debug

```typescript
// Habilitar logs de debug
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('CNPJ value:', cnpj);
  console.log('Validation result:', validateCNPJ(cnpj));
}
```

## 📝 Exemplos de Uso

### Formulário Completo

```tsx
import React, { useState } from 'react';
import { CnpjInput, PhoneInput, CepInput } from '@/components/inputs';
import { useMaskedInputs } from '@/hooks/useMaskedInputs';
import { useCnpjService, useCepService } from '@/services';

const MyForm = () => {
  const { cnpj, setCnpj, phone, setPhone, cep, setCep } = useMaskedInputs();
  const { searchByCnpj } = useCnpjService();
  const { searchByCep } = useCepService();

  const handleCnpjSearch = async () => {
    try {
      const data = await searchByCnpj(cnpj.value);
      // Preencher campos automaticamente
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <form>
      <CnpjInput
        value={cnpj.value}
        onChange={setCnpj}
        onSearch={handleCnpjSearch}
        showSearchButton={true}
        error={cnpj.error}
      />
      
      <PhoneInput
        value={phone.value}
        onChange={setPhone}
        error={phone.error}
      />
      
      <CepInput
        value={cep.value}
        onChange={setCep}
        onSearch={() => searchByCep(cep.value)}
        showSearchButton={true}
        error={cep.error}
      />
    </form>
  );
};
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato com a equipe de desenvolvimento.
