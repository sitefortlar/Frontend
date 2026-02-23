import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CouponProvider } from '@/contexts/CouponContext';
import RouteLoading from '@/components/RouteLoading';
import { LgpdConsent } from '@/components/LgpdConsent/LgpdConsent';

const Layout = () => {
  return (
    <CouponProvider>
      <div className="min-h-screen">
        <Suspense fallback={<RouteLoading />}>
          <Outlet />
        </Suspense>
        <LgpdConsent />
      </div>
    </CouponProvider>
  );
};

export default Layout;
