import { useState } from 'react';
import { couponService } from '@/services/coupon/CouponService';
import { CouponResponse, ValidateCouponResponse } from '@/types/Coupon';

export const useCoupon = () => {
  const [appliedCoupon, setAppliedCoupon] = useState<CouponResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyCoupon = async (codigo: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: ValidateCouponResponse = await couponService.validateCoupon(codigo);
      
      if (response.valid && response.coupon) {
        setAppliedCoupon(response.coupon);
        return { success: true, coupon: response.coupon };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Erro ao validar cupom';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setError(null);
  };

  const calculateDiscount = (totalValue: number): number => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.tipo === 'percentual') {
      return (totalValue * Number(appliedCoupon.valor)) / 100;
    } else {
      // valor_fixo
      const discount = Number(appliedCoupon.valor);
      return discount > totalValue ? totalValue : discount;
    }
  };

  return {
    appliedCoupon,
    loading,
    error,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
  };
};
