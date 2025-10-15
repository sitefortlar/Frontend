# Migração para API Backend

## ✅ Mudanças Implementadas

### 🔧 **Configuração da API**
- ✅ Criado `src/services/api.ts` com configuração do axios
- ✅ Instalado dependência `axios`
- ✅ Configurado interceptors para autenticação automática
- ✅ Adicionado tratamento de erros global

### 🗑️ **Remoção do Supabase**
- ✅ Removido `@supabase/supabase-js` das dependências
- ✅ Removida pasta `src/integrations/supabase/`
- ✅ Atualizado `src/config/app.ts` (removida configuração Supabase)
- ✅ Atualizado `src/hooks/useAuth.ts` para usar API real

### 🔄 **Serviços Atualizados**

#### **AuthService** (`src/services/auth.ts`)
```typescript
// Antes: Mock local
// Depois: Endpoints reais
POST /auth/login
POST /auth/logout
```

#### **UserService** (`src/services/user.ts`)
```typescript
// Antes: Mock local
// Depois: Endpoints reais
GET /users/me
GET /users/:id
GET /clients
```

#### **ProductService** (`src/services/product.ts`)
```typescript
// Antes: Mock local
// Depois: Endpoints reais
GET /products
GET /products/:id
POST /products
```

#### **EsqueciSenha** (`src/pages/esqueci-senha/EsqueciSenha.tsx`)
```typescript
// Antes: Supabase
// Depois: API real
POST /auth/forgot-password
```

## 🌐 **Endpoints Esperados no Backend**

### **Autenticação**
- `POST /auth/login` - Login do usuário
- `POST /auth/logout` - Logout do usuário
- `POST /auth/forgot-password` - Recuperação de senha

### **Usuários**
- `GET /users/me` - Usuário atual
- `GET /users/:id` - Usuário por ID
- `GET /clients` - Clientes do usuário

### **Produtos**
- `GET /products` - Lista de produtos
- `GET /products/:id` - Produto por ID
- `POST /products` - Criar produto

## 🔧 **Configuração de Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_BASE_URL=http://localhost:3000
```

## 📋 **Headers Automáticos**

A API automaticamente adiciona os seguintes headers:

```typescript
{
  "Authorization": "Bearer <token>",
  "ClientId": "<client_id>",
  "SentBy": "system"
}
```

## 🚀 **Como Usar**

1. Configure seu backend com os endpoints listados
2. Defina a variável `VITE_API_URL` no `.env`
3. O projeto automaticamente usará a API real em vez dos mocks

## ✅ **Status**
- ✅ Build funcionando
- ✅ Sem erros de linting
- ✅ Estrutura organizada
- ✅ Pronto para integração com backend
