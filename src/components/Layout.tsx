import { Outlet } from 'react-router-dom';
import { CouponProvider } from '@/contexts/CouponContext';

const Layout = () => {
  return (
    <CouponProvider>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </CouponProvider>
  );
};

export default Layout;
