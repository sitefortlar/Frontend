import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Package,
  Tag,
  Ticket,
  LayoutDashboard,
  Shield,
  LogOut,
} from 'lucide-react';
import { paths } from '@/routes/paths';
import { LogoutButton } from './LogoutButton';

export const MainSidebar = () => {
  const { isAdmin, isLoading } = useAuthContext();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Não renderizar se ainda estiver carregando
  if (isLoading) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent>
        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(paths.catalog)}
                >
                  <Link to={paths.catalog}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Catálogo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Seção Administrativa - Apenas para admins */}
        {isAdmin && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Administração
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* Produtos */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(paths.admin.produtos)}
                    >
                      <Link to={paths.admin.produtos}>
                        <Package className="h-4 w-4" />
                        <span>Produtos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Descontos por Região */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(paths.admin.descontos)}
                    >
                      <Link to={paths.admin.descontos}>
                        <Tag className="h-4 w-4" />
                        <span>Descontos por Região</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Cupons */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(paths.admin.cupons)}
                    >
                      <Link to={paths.admin.cupons}>
                        <Ticket className="h-4 w-4" />
                        <span>Cupons</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Seção de Logout */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <LogoutButton variant="ghost" showIcon={true} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

