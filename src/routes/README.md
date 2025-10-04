# Sistema de Rotas - Fort-Lar

## 📁 Estrutura

```
src/routes/
├── index.tsx          # Configuração principal do router
├── paths.ts           # Centralização de todas as rotas
├── routeConfig.ts     # Configuração avançada de rotas
└── README.md          # Esta documentação
```

## 🛣️ Rotas Disponíveis

### Rotas Públicas
- `/` - Página inicial (catálogo de produtos)
- `/login` - Página de login
- `/cadastro` - Página de cadastro
- `/esqueci-senha` - Página de recuperação de senha

### Rotas Protegidas (futuras)
- `/dashboard` - Dashboard do usuário
- `/profile` - Perfil do usuário
- `/settings` - Configurações

### Rotas de Erro
- `/404` - Página não encontrada
- `*` - Redireciona para home

## 🔧 Hooks Disponíveis

### `useNavigation`
```tsx
import { useNavigation } from '@/hooks/routing';

const { goTo, goBack, goForward, replace, isCurrentPath, getCurrentPath, paths } = useNavigation();

// Navegar para uma rota
goTo(paths.login);

// Verificar se está na rota atual
if (isCurrentPath(paths.home)) {
  // Lógica específica da home
}
```

### `useRoutes`
```tsx
import { useRoutes } from '@/hooks/routing';

const { routes, isPublicRoute, isProtectedRoute, isErrorRoute } = useRoutes();

// Verificar tipo de rota
if (isPublicRoute(location.pathname)) {
  // Lógica para rotas públicas
}
```

### `usePageTitle`
```tsx
import { usePageTitle } from '@/hooks/routing';

// Usar título padrão da rota
usePageTitle();

// Usar título customizado
usePageTitle('Meu Título Customizado');
```

## 🚀 Boas Práticas

### 1. Centralização de Rotas
Todas as rotas estão centralizadas em `paths.ts` para evitar hardcode:

```tsx
// ❌ Evitar
navigate('/login');

// ✅ Usar
navigate(paths.login);
```

### 2. Lazy Loading
Todas as páginas usam lazy loading para melhor performance:

```tsx
{
  path: paths.login,
  lazy: () => import('@/pages/Login'),
}
```

### 3. Layout Wrapper
Rotas protegidas são envolvidas pelo componente `Layout`:

```tsx
{
  element: <Layout />,
  children: [
    { path: paths.home, lazy: () => import('@/pages/Index') },
  ],
}
```

### 4. Tratamento de Erros
Rota catch-all redireciona para home:

```tsx
{
  path: '*',
  element: <Navigate to={paths.home} replace />,
}
```

## 🔒 Rotas Protegidas

Para adicionar uma rota protegida:

1. Adicione o path em `paths.ts`
2. Adicione a rota no `index.tsx` dentro do `Layout`
3. Use o componente `ProtectedRoute` se necessário

```tsx
{
  path: paths.dashboard,
  element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  lazy: () => import('@/pages/Dashboard'),
}
```

## 📱 Navegação Programática

```tsx
import { useNavigation } from '@/hooks/routing';

const MyComponent = () => {
  const { goTo, replace, paths } = useNavigation();

  const handleLogin = () => {
    goTo(paths.login);
  };

  const handleRedirect = () => {
    replace(paths.home);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRedirect}>Home</button>
    </div>
  );
};
```

## 🎯 Configuração do Base URL

O `baseUrl` é configurado automaticamente usando `import.meta.env.BASE_URL` para suporte a diferentes ambientes (desenvolvimento, produção, etc.).

## 🔄 Adicionando Novas Rotas

1. **Adicione o path em `paths.ts`:**
```tsx
export const paths = {
  // ... existing paths
  novaRota: '/nova-rota',
} as const;
```

2. **Adicione a rota em `index.tsx`:**
```tsx
{
  path: paths.novaRota,
  lazy: () => import('@/pages/NovaRota'),
}
```

3. **Crie a página em `src/pages/NovaRota.tsx`:**
```tsx
const NovaRota = () => {
  return <div>Nova Rota</div>;
};

export default NovaRota;
```

4. **Adicione o título em `usePageTitle.ts`:**
```tsx
const pageTitles: Record<string, string> = {
  // ... existing titles
  [paths.novaRota]: 'Nova Rota - Fort-Lar',
};
```
