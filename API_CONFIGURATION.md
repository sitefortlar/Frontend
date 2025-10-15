# Configuração da API de CNPJ

## Visão Geral

Este documento explica como configurar a integração com APIs externas para busca de dados de empresa por CNPJ e endereço por CEP.

## APIs Utilizadas

### 1. API de CNPJ (Configurável)

**URL Padrão**: `https://api.example.com/cnpj`

**Variável de Ambiente**: `REACT_APP_CNPJ_API_URL`

#### Configuração

1. Crie um arquivo `.env` na raiz do projeto:
```bash
# .env
REACT_APP_CNPJ_API_URL=https://sua-api-cnpj.com/v1
REACT_APP_API_TOKEN=seu-token-de-autenticacao
```

2. Ou configure diretamente no código:
```typescript
const cnpjService = new CnpjService('https://sua-api-cnpj.com/v1');
```

#### Formato da Resposta Esperada

A API deve retornar um JSON com a seguinte estrutura:

```json
{
  "cnpj": "11222333000181",
  "razao_social": "Empresa Exemplo LTDA",
  "nome_fantasia": "Empresa Exemplo",
  "logradouro": "Rua das Flores, 123",
  "numero": "123",
  "complemento": "Sala 45",
  "bairro": "Centro",
  "municipio": "São Paulo",
  "uf": "SP",
  "cep": "01234567",
  "telefone": "(11) 3333-4444",
  "email": "contato@empresa.com"
}
```

#### Exemplo de Implementação com Fetch

```typescript
// Exemplo de chamada para API de CNPJ
const searchByCnpj = async (cnpj: string) => {
  const cleanCnpj = cnpj.replace(/\D/g, '');
  
  const response = await fetch(`${API_URL}/${cleanCnpj}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
};
```

### 2. API de CEP (ViaCEP)

**URL**: `https://viacep.com.br/ws`

**Status**: Gratuita, não requer autenticação

#### Formato da Resposta

```json
{
  "cep": "01234-567",
  "logradouro": "Rua das Flores",
  "complemento": "",
  "bairro": "Centro",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

## APIs Recomendadas para CNPJ

### 1. ReceitaWS (Gratuita)
- **URL**: `https://receitaws.com.br/v1/cnpj/{cnpj}`
- **Limite**: 3 consultas por minuto
- **Sem autenticação**

### 2. CNPJ.ws (Paga)
- **URL**: `https://cnpj.ws/cnpj/{cnpj}`
- **Plano**: A partir de R$ 29/mês
- **Com autenticação**

### 3. BrasilAPI (Gratuita)
- **URL**: `https://brasilapi.com.br/api/cnpj/v1/{cnpj}`
- **Limite**: 1000 consultas por mês
- **Sem autenticação**

## Configuração de Desenvolvimento

### 1. Instalar Dependências

```bash
npm install react-input-mask @types/react-input-mask
```

### 2. Configurar Variáveis de Ambiente

```bash
# .env.development
REACT_APP_CNPJ_API_URL=https://brasilapi.com.br/api/cnpj/v1
REACT_APP_CEP_API_URL=https://viacep.com.br/ws
```

### 3. Configurar Proxy (Opcional)

Para evitar problemas de CORS em desenvolvimento, adicione ao `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api/cnpj': {
        target: 'https://brasilapi.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cnpj/, '/api/cnpj/v1')
      }
    }
  }
});
```

## Tratamento de Erros

### Tipos de Erro

1. **INVALID_CNPJ**: CNPJ inválido (formato ou dígitos verificadores)
2. **API_ERROR**: Erro na API (4xx, 5xx)
3. **NOT_FOUND**: CNPJ não encontrado na base de dados
4. **NETWORK_ERROR**: Erro de conexão

### Exemplo de Tratamento

```typescript
try {
  const data = await cnpjService.searchByCnpj(cnpj);
  // Sucesso
} catch (error) {
  switch (error.type) {
    case 'INVALID_CNPJ':
      showError('CNPJ inválido');
      break;
    case 'NOT_FOUND':
      showError('CNPJ não encontrado');
      break;
    case 'NETWORK_ERROR':
      showError('Erro de conexão');
      break;
    default:
      showError('Erro desconhecido');
  }
}
```

## Testes

### Executar Testes

```bash
# Instalar Jest (se não estiver instalado)
npm install --save-dev jest @types/jest ts-jest

# Executar testes
npm test
```

### Exemplo de Teste

```typescript
import { validateCNPJ } from '../utils/validation';

describe('CNPJ Validation', () => {
  it('should validate correct CNPJ', () => {
    expect(validateCNPJ('11222333000181')).toBe(true);
  });
});
```

## Monitoramento e Logs

### Adicionar Logs

```typescript
// services/cnpjService.ts
const searchByCnpj = async (cnpj: string) => {
  console.log(`Buscando CNPJ: ${cnpj}`);
  
  try {
    const result = await fetch(/* ... */);
    console.log('CNPJ encontrado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao buscar CNPJ:', error);
    throw error;
  }
};
```

### Métricas de Uso

```typescript
// Adicionar contadores de uso
let cnpjSearchCount = 0;

const searchByCnpj = async (cnpj: string) => {
  cnpjSearchCount++;
  console.log(`Total de consultas CNPJ: ${cnpjSearchCount}`);
  // ... resto da implementação
};
```

## Segurança

### 1. Validação Local
- Sempre validar CNPJ localmente antes de fazer a chamada à API
- Implementar rate limiting para evitar spam

### 2. Tratamento de Dados Sensíveis
- Não logar dados sensíveis em produção
- Usar HTTPS para todas as chamadas de API

### 3. Cache
- Implementar cache para evitar consultas desnecessárias
- Definir TTL apropriado para os dados

## Troubleshooting

### Problemas Comuns

1. **CORS Error**
   - Solução: Configurar proxy ou usar API com CORS habilitado

2. **Rate Limit Exceeded**
   - Solução: Implementar retry com backoff exponencial

3. **Timeout**
   - Solução: Aumentar timeout e implementar retry

4. **Dados Inconsistentes**
   - Solução: Validar e sanitizar dados antes de usar

### Debug

```typescript
// Habilitar logs detalhados
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('API Response:', response);
  console.log('Mapped Data:', mappedData);
}
```
