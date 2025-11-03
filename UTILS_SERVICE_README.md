# 🚀 UtilsService - Serviços de CEP e CNPJ

## ✅ Implementação Completa

Este documento explica como usar os novos serviços e componentes para CEP e CNPJ com limitação de caracteres e integração com o backend.

## 📁 Estrutura Implementada

### Services
```
src/services/
├── cepService.ts          # Serviço específico para CEP
├── cnpjService.ts         # Serviço específico para CNPJ
├── utilsService.ts        # Serviço centralizado
└── index.ts               # Exportações centralizadas
```

### Components
```
src/components/inputs/
├── CepInput.tsx           # Input especializado para CEP
├── CnpjInput.tsx          # Input especializado para CNPJ
└── index.ts               # Exportações centralizadas
```

## 🔧 Configuração

### URLs dos Endpoints
Os serviços estão configurados para usar os endpoints do backend:

```typescript
// src/config/environment.ts
export const config: EnvironmentConfig = {
  REACT_APP_CNPJ_API_URL: 'http://127.0.0.1:8088/api/utils/cnpj',
  REACT_APP_CEP_API_URL: 'http://127.0.0.1:8088/api/utils/cep',
  NODE_ENV: 'development',
};
```

### Variáveis de Ambiente (Opcional)
Crie um arquivo `.env` na raiz do projeto para personalizar as URLs:

```env
REACT_APP_CNPJ_API_URL=http://127.0.0.1:8088/api/utils/cnpj
REACT_APP_CEP_API_URL=http://127.0.0.1:8088/api/utils/cep
```

## 🚀 Como Usar

### 1. **UtilsService Centralizado**

```typescript
import { utilsService, useUtilsService } from '@/services/utilsService';

// Uso direto do serviço
const cepData = await utilsService.searchCep('14810455');
const cnpjData = await utilsService.searchCnpj('05495693000154');

// Uso com hook
const { searchCep, searchCnpj, validateAndLimitCep, validateAndLimitCnpj } = useUtilsService();
```

### 2. **Componentes de Input**

#### CepInput
```typescript
import { CepInput } from '@/components/inputs';

<CepInput
  value={cep}
  onChange={setCep}
  onCepFound={(data) => console.log('CEP encontrado:', data)}
  onError={(error) => console.error('Erro:', error)}
  error={errors.cep}
/>
```

#### CnpjInput
```typescript
import { CnpjInput } from '@/components/inputs';

<CnpjInput
  value={cnpj}
  onChange={setCnpj}
  onCnpjFound={(data) => console.log('CNPJ encontrado:', data)}
  onError={(error) => console.error('Erro:', error)}
  error={errors.cnpj}
/>
```

## 📋 Características dos Inputs

### **Limitação de Caracteres**
- **CEP**: Máximo 8 caracteres numéricos
- **CNPJ**: Máximo 14 caracteres numéricos
- Remoção automática de caracteres não numéricos
- Validação em tempo real

### **Busca Automática**
- Busca automática quando o campo está completo
- Loading visual durante a busca
- Feedback de sucesso/erro
- Tratamento de erros da API

### **Validação**
- Validação local antes da busca
- Verificação de completude dos campos
- Mensagens de erro específicas
- Estados visuais (loading, sucesso, erro)

## 🔄 Fluxo de Funcionamento

### CEP (8 dígitos)
1. Usuário digita no input
2. Sistema limita a 8 caracteres numéricos
3. Quando completo, busca automática no backend
4. Exibe dados do endereço ou erro

### CNPJ (14 dígitos)
1. Usuário digita no input
2. Sistema limita a 14 caracteres numéricos
3. Quando completo, busca automática no backend
4. Exibe dados da empresa ou erro

## 📊 Formatos de Resposta

### CEP Response
```json
{
  "cep": "14810455",
  "logradouro": "Avenida Antonio Orlando",
  "complemento": null,
  "bairro": "Jardim Brasília (Vila Xavier)",
  "cidade": "Araraquara",
  "uf": "SP"
}
```

### CNPJ Response
```json
{
  "cnpj": "05495693000154",
  "razao_social": "SUPERAUTO MECANICA, FUNILARIA, E PINTURA LTDA",
  "fantasia": "",
  "cep": "14811200",
  "logradouro": "FRANCISCO VAZ FILHO",
  "numero": "3658",
  "complemento": "",
  "bairro": "JARDIM PINHEIROS",
  "municipio": "ARARAQUARA",
  "uf": "SP",
  "telefone": null,
  "email": null,
  "atividade_principal": null
}
```

## 🎯 Exemplo Completo

```typescript
import React, { useState } from 'react';
import { CepInput, CnpjInput } from '@/components/inputs';
import { CepApiResponse, CnpjApiResponse } from '@/services/utilsService';

const MyForm: React.FC = () => {
  const [cep, setCep] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cepData, setCepData] = useState<CepApiResponse | null>(null);
  const [cnpjData, setCnpjData] = useState<CnpjApiResponse | null>(null);

  return (
    <div className="space-y-4">
      <CepInput
        value={cep}
        onChange={setCep}
        onCepFound={setCepData}
        onError={(error) => console.error('CEP Error:', error)}
      />
      
      <CnpjInput
        value={cnpj}
        onChange={setCnpj}
        onCnpjFound={setCnpjData}
        onError={(error) => console.error('CNPJ Error:', error)}
      />
      
      {cepData && (
        <div>
          <h3>Endereço encontrado:</h3>
          <p>{cepData.logradouro}, {cepData.bairro}</p>
          <p>{cepData.cidade} - {cepData.uf}</p>
        </div>
      )}
      
      {cnpjData && (
        <div>
          <h3>Empresa encontrada:</h3>
          <p>{cnpjData.razao_social}</p>
          <p>{cnpjData.fantasia}</p>
        </div>
      )}
    </div>
  );
};
```

## 🛠️ Utilitários Disponíveis

### Validação e Limitação
```typescript
// Limitar CEP a 8 dígitos
const limitedCep = utilsService.validateAndLimitCep('123456789'); // '12345678'

// Limitar CNPJ a 14 dígitos
const limitedCnpj = utilsService.validateAndLimitCnpj('123456789012345'); // '12345678901234'

// Verificar se está completo
const isCepComplete = utilsService.isCepComplete('12345678'); // true
const isCnpjComplete = utilsService.isCnpjComplete('12345678901234'); // true
```

## 🔧 Tratamento de Erros

### Tipos de Erro
- `INVALID_CEP` / `INVALID_CNPJ`: Dados inválidos
- `API_ERROR`: Erro na API
- `NOT_FOUND`: CEP/CNPJ não encontrado
- `NETWORK_ERROR`: Erro de conexão
- `RATE_LIMIT`: Muitas consultas (apenas CNPJ)

### Exemplo de Tratamento
```typescript
try {
  const data = await utilsService.searchCep(cep);
  console.log('Sucesso:', data);
} catch (error) {
  if (error.type === 'NOT_FOUND') {
    console.log('CEP não encontrado');
  } else if (error.type === 'NETWORK_ERROR') {
    console.log('Erro de conexão');
  } else {
    console.log('Erro:', error.message);
  }
}
```

## ✅ Benefícios

1. **Limitação Automática**: Inputs limitados automaticamente
2. **Busca Automática**: Busca quando campo está completo
3. **Feedback Visual**: Loading, sucesso e erro
4. **Validação Robusta**: Validação local e remota
5. **Tratamento de Erros**: Erros específicos e informativos
6. **Integração Backend**: Endpoints configurados corretamente
7. **TypeScript**: Tipagem completa e segura
8. **Reutilização**: Componentes reutilizáveis
9. **Performance**: Singleton services
10. **UX**: Experiência de usuário otimizada
