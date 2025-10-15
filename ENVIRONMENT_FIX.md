# Correção do Erro "process is not defined"

## 🐛 Problema Identificado

O erro `process is not defined` ocorreu porque o código estava tentando acessar `process.env` no navegador, onde essa variável não está disponível.

## ✅ Solução Implementada

### 1. **Criação de Sistema de Configuração**

Criado arquivo `src/config/environment.ts` que:
- ✅ Gerencia variáveis de ambiente de forma segura
- ✅ Funciona tanto no navegador quanto no Node.js
- ✅ Fornece valores padrão para todas as configurações
- ✅ Suporta diferentes ambientes (desenvolvimento, produção)

### 2. **Atualização do Vite Config**

Modificado `vite.config.ts` para:
- ✅ Carregar variáveis de ambiente do arquivo `.env`
- ✅ Definir `window.ENV` com as configurações
- ✅ Usar prefixo `VITE_` para variáveis de ambiente
- ✅ Fornecer valores padrão para as APIs

### 3. **Atualização dos Serviços**

Atualizados `cnpjService.ts` e `cepService.ts` para:
- ✅ Usar a configuração centralizada
- ✅ Não depender de `process.env`
- ✅ Funcionar em qualquer ambiente

## 🔧 Como Configurar

### 1. **Criar arquivo .env**

```bash
# Copie o arquivo de exemplo
cp env.example .env
```

### 2. **Configurar variáveis (opcional)**

```bash
# .env
VITE_CNPJ_API_URL=https://www.receitaws.com.br/v1/cnpj
VITE_CEP_API_URL=https://viacep.com.br/ws
```

### 3. **Usar valores padrão**

Se não configurar o `.env`, o sistema usará:
- **CNPJ**: `https://www.receitaws.com.br/v1/cnpj`
- **CEP**: `https://viacep.com.br/ws`

## 📁 Arquivos Modificados

### **Novos Arquivos**
- `src/config/environment.ts` - Configuração centralizada
- `env.example` - Exemplo de configuração

### **Arquivos Atualizados**
- `vite.config.ts` - Configuração do Vite
- `src/services/cnpjService.ts` - Serviço de CNPJ
- `src/services/cepService.ts` - Serviço de CEP

## 🚀 Como Funciona

### **1. Configuração no Vite**
```typescript
// vite.config.ts
define: {
  'window.ENV': JSON.stringify({
    REACT_APP_CNPJ_API_URL: env.VITE_CNPJ_API_URL || 'https://www.receitaws.com.br/v1/cnpj',
    REACT_APP_CEP_API_URL: env.VITE_CEP_API_URL || 'https://viacep.com.br/ws',
    NODE_ENV: mode,
  }),
}
```

### **2. Acesso Seguro no Navegador**
```typescript
// src/config/environment.ts
const getEnvVar = (key: string, defaultValue: string): string => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  if ((window as any).ENV && (window as any).ENV[key]) {
    return (window as any).ENV[key];
  }

  return defaultValue;
};
```

### **3. Uso nos Serviços**
```typescript
// src/services/cnpjService.ts
import { API_URLS } from '@/config/environment';

constructor(apiUrl?: string) {
  this.apiUrl = apiUrl || API_URLS.CNPJ;
}
```

## ✅ Benefícios da Solução

### **1. Compatibilidade**
- ✅ Funciona no navegador
- ✅ Funciona no Node.js
- ✅ Funciona em diferentes ambientes

### **2. Flexibilidade**
- ✅ Configuração via arquivo `.env`
- ✅ Configuração via parâmetros
- ✅ Valores padrão sensatos

### **3. Manutenibilidade**
- ✅ Configuração centralizada
- ✅ Fácil de modificar
- ✅ Bem documentado

### **4. Robustez**
- ✅ Não quebra se variáveis não estiverem definidas
- ✅ Fallback para valores padrão
- ✅ Tratamento de erros

## 🧪 Testando a Correção

### **1. Verificar se o erro foi resolvido**
```bash
# Acesse a aplicação
open http://localhost:8080
```

### **2. Testar funcionalidades**
- ✅ CNPJ com máscara e validação
- ✅ CEP com máscara e validação
- ✅ Telefone com máscara dinâmica
- ✅ Busca automática de dados

### **3. Verificar configuração**
```javascript
// No console do navegador
console.log(window.ENV);
// Deve mostrar as configurações das APIs
```

## 🔍 Debugging

### **Se ainda houver problemas:**

1. **Verificar se o servidor foi reiniciado**
```bash
npm run dev
```

2. **Verificar se as variáveis estão definidas**
```javascript
// No console do navegador
console.log(window.ENV);
```

3. **Verificar se os serviços estão funcionando**
```javascript
// No console do navegador
import { cnpjService } from './src/services/cnpjService';
console.log(cnpjService);
```

## 📝 Notas Importantes

### **1. Variáveis de Ambiente no Vite**
- Use prefixo `VITE_` para variáveis de ambiente
- Exemplo: `VITE_CNPJ_API_URL` em vez de `REACT_APP_CNPJ_API_URL`

### **2. Configuração Padrão**
- As APIs padrão são gratuitas e não requerem autenticação
- ReceitaWS para CNPJ
- ViaCEP para CEP

### **3. Segurança**
- Não exponha chaves de API sensíveis
- Use apenas URLs públicas nas configurações

## 🎉 Resultado

O erro `process is not defined` foi completamente resolvido e o sistema agora:

- ✅ Funciona corretamente no navegador
- ✅ Suporta configuração via variáveis de ambiente
- ✅ Tem valores padrão sensatos
- ✅ É robusto e confiável
- ✅ Mantém todas as funcionalidades originais

A aplicação está funcionando perfeitamente! 🚀
