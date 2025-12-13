import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/MainSidebar';
import { Separator } from '@/components/ui/separator';
import { paths } from '@/routes/paths';

const Layout = () => {
  const location = useLocation();
  const isCatalogPage = location.pathname === paths.catalog;
  
  // Para o catálogo, não usar o layout com sidebar (ele tem seu próprio)
  if (isCatalogPage) {
    return <Outlet />;
  }

  // Para outras páginas (incluindo admin), usar layout com sidebar
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
