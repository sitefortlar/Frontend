import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CouponProvider } from '@/contexts/CouponContext';
import RouteLoading from '@/components/RouteLoading';
import { LgpdConsent } from '@/components/LgpdConsent/LgpdConsent';
import { ADMIN_PRODUTOS_FILTERS_KEY } from '@/constants/adminFilters';

const Layout = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const wasAdmin = prevPath.startsWith('/admin');
    const isAdmin = location.pathname.startsWith('/admin');
    if (wasAdmin && !isAdmin) {
      sessionStorage.removeItem(ADMIN_PRODUTOS_FILTERS_KEY);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

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
