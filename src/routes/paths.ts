export const baseUrl = import.meta.env.BASE_URL;

export const paths = {
  // Public routes
  login: '/login',
  cadastro: '/cadastro',
  esqueciSenha: '/esqueci-senha',
  
  // Protected routes
  welcome: '/welcome',
  home: '/home',
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
  
  // Error routes
  notFound: '/404',
} as const;

// Type for path values
export type Path = typeof paths[keyof typeof paths];
