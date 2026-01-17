import { createContext, useContext, ReactNode } from 'react';
import { useCoupon } from '@/hooks/useCoupon';
import { CouponResponse } from '@/types/Coupon';

interface CouponContextType {
  appliedCoupon: CouponResponse | null;
  loading: boolean;
  error: string | null;
  applyCoupon: (codigo: string) => Promise<{ success: boolean; coupon?: CouponResponse; message?: string }>;
  removeCoupon: () => void;
  calculateDiscount: (totalValue: number) => number;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const couponState = useCoupon();

  return (
    <CouponContext.Provider value={couponState}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error('useCouponContext must be used within a CouponProvider');
  }
  return context;
};
