export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  REGISTRATION_SUCCESS: 'Cadastro realizado com sucesso!',
  CART_ITEM_ADDED: 'Item adicionado ao carrinho!',
  CART_ITEM_REMOVED: 'Item removido do carrinho!',
  CART_CLEARED: 'Carrinho esvaziado!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  PASSWORD_CHANGED: 'Senha alterada com sucesso!',
  ORDER_PLACED: 'Pedido realizado com sucesso!',
} as const;

export const ERROR_MESSAGES = {
  GENERIC_ERROR: 'Ocorreu um erro inesperado. Tente novamente.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  VALIDATION_ERROR: 'Por favor, verifique os dados informados.',
  AUTHENTICATION_ERROR: 'Erro de autenticação. Faça login novamente.',
  AUTHORIZATION_ERROR: 'Você não tem permissão para esta ação.',
  NOT_FOUND: 'Recurso não encontrado.',
  SERVER_ERROR: 'Erro interno do servidor.',
} as const;

export const LOADING_MESSAGES = {
  LOADING: 'Carregando...',
  SAVING: 'Salvando...',
  DELETING: 'Excluindo...',
  UPLOADING: 'Enviando...',
  PROCESSING: 'Processando...',
} as const;

export const CONFIRMATION_MESSAGES = {
  DELETE_ITEM: 'Tem certeza que deseja excluir este item?',
  CLEAR_CART: 'Tem certeza que deseja esvaziar o carrinho?',
  LOGOUT: 'Tem certeza que deseja sair?',
  CANCEL_ORDER: 'Tem certeza que deseja cancelar este pedido?',
} as const;
