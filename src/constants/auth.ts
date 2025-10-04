export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Bem-vindo ao sistema Fort-Lar!',
  LOGIN_ERROR: 'E-mail ou senha incorretos.',
  LOGIN_GENERIC_ERROR: 'Ocorreu um erro ao fazer login. Tente novamente.',
  REGISTRATION_SUCCESS: 'Sua conta foi criada com sucesso. Redirecionando para o login...',
  REQUIRED_FIELDS: 'Por favor, preencha todos os campos obrigatórios.',
  INVALID_PASSWORD: 'A senha deve atender todos os critérios de segurança.',
  CNPJ_REQUIRED: 'Digite um CNPJ para buscar os dados da empresa.',
  SEARCHING_DATA: 'Funcionalidade em desenvolvimento.',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
  SESSION_EXPIRED: 'Sua sessão expirou. Faça login novamente.',
} as const;

export const PASSWORD_CRITERIA = {
  MIN_LENGTH: 8,
  UPPERCASE_REGEX: /[A-Z]/,
  NUMBER_REGEX: /\d/,
  SPECIAL_CHAR_REGEX: /[@$!%*?&]/,
} as const;

export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'E-mail inválido',
  CNPJ_INVALID: 'CNPJ inválido',
  PHONE_INVALID: 'Telefone inválido',
  WHATSAPP_INVALID: 'WhatsApp inválido',
  REQUIRED_FIELD: 'Este campo é obrigatório',
} as const;

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;
