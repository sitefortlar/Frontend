import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CouponProvider } from '@/contexts/CouponContext';
import RouteLoading from '@/components/RouteLoading';

const Layout = () => {
  return (
    <CouponProvider>
      <div className="min-h-screen">
        <Suspense fallback={<RouteLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </CouponProvider>
  );
};

export default Layout;
