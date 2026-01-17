import { BaseService } from '../base/BaseService';
import {
  CreateCouponRequest,
  UpdateCouponRequest,
  CouponResponse,
  ValidateCouponResponse,
  ListCouponsFilters,
} from '@/types/Coupon';

/**
 * Serviço de cupons
 * Aplicando Single Responsibility Principle
 */
export class CouponService extends BaseService {
  constructor() {
    super('/coupons');
  }

  /**
   * Cria um novo cupom
   */
  async createCoupon(data: CreateCouponRequest): Promise<CouponResponse> {
    return this.post<CouponResponse>('', data);
  }

  /**
   * Lista cupons com filtros opcionais
   */
  async listCoupons(filters?: ListCouponsFilters): Promise<CouponResponse[]> {
    const queryString = this.buildQueryString(filters || {});
    const endpoint = queryString ? `?${queryString}` : '';
    
    return this.get<CouponResponse[]>(endpoint);
  }

  /**
   * Busca um cupom por ID
   */
  async getCouponById(couponId: number): Promise<CouponResponse> {
    return this.get<CouponResponse>(`/${couponId}`);
  }

  /**
   * Valida um cupom por código
   */
  async validateCoupon(codigo: string): Promise<ValidateCouponResponse> {
    return this.get<ValidateCouponResponse>(`/code/${codigo.toUpperCase()}`);
  }

  /**
   * Atualiza um cupom
   */
  async updateCoupon(couponId: number, data: UpdateCouponRequest): Promise<CouponResponse> {
    return this.put<CouponResponse>(`/${couponId}`, data);
  }

  /**
   * Deleta um cupom
   */
  async deleteCoupon(couponId: number): Promise<void> {
    await this.delete<void>(`/${couponId}`);
  }
}

/**
 * Instância singleton do serviço de cupons
 */
export const couponService = new CouponService();
