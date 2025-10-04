export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  companyData: CompanyData;
  address: AddressData;
  contact: ContactData;
}

export interface CompanyData {
  cnpj: string;
  razaoSocial: string;
  fantasia: string;
  origem?: string;
  pais?: string;
  regimeTributario?: string;
  regiao?: string;
  ramoAtividade?: string;
  vendedor?: string;
}

export interface AddressData {
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  ibge?: string;
}

export interface ContactData {
  nomeContato: string;
  telefone: string;
  email: string;
  whatsapp: string;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}
