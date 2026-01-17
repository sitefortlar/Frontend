// Tipos de cupom
export enum CouponType {
  PERCENTUAL = 'percentual',
  VALOR_FIXO = 'valor_fixo'
}

// Request para criar cupom
export interface CreateCouponRequest {
  codigo: string;
  tipo: CouponType;
  valor: number;
  validade_inicio?: string; // YYYY-MM-DD
  validade_fim?: string; // YYYY-MM-DD
  ativo?: boolean;
}

// Request para atualizar cupom
export interface UpdateCouponRequest {
  codigo?: string;
  tipo?: CouponType;
  valor?: number;
  validade_inicio?: string;
  validade_fim?: string;
  ativo?: boolean;
}

// Response do cupom
export interface CouponResponse {
  id_cupom: number;
  codigo: string;
  tipo: CouponType;
  valor: number;
  validade_inicio: string | null;
  validade_fim: string | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

// Response de validação
export interface ValidateCouponResponse {
  valid: boolean;
  coupon: CouponResponse | null;
  message: string;
}

// Filtros para listagem
export interface ListCouponsFilters {
  skip?: number;
  limit?: number;
  active_only?: boolean;
  search_codigo?: string;
}
