export const baseUrl = import.meta.env.BASE_URL;

export const paths = {
  // Public routes
  login: '/login',
  cadastro: '/cadastro',
  esqueciSenha: '/esqueci-senha',
  redefinirSenha: '/redefinir-senha',
  confirmarCadastro: '/confirmar-cadastro',
  
  // Protected routes
  catalog: '/catalog',
  catalogAll: '/catalog/all',
  orders: '/pedidos',
  importProdutos: '/import-produtos',
  couponManagement: '/coupon-management',
  adminCategorias: '/admin/categorias',
  
  // Admin nested routes (sidebar + detail)
  admin: {
    produtos: '/admin/produtos',
    produtoEdit: (id: number) => `/admin/produtos/${id}`,
    descontos: '/admin/descontos',
    cupons: '/admin/cupons',
    orders: '/admin/pedidos',
  },
  
  // Error routes
  notFound: '/404',
} as const;

// Type for path values
export type Path = typeof paths[keyof typeof paths];
