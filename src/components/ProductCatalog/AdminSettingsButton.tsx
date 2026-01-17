import { Settings, Package, Upload, Ticket, FolderTree } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AdminSettingsButton as StyledAdminButton } from './styles';

export const AdminSettingsButton = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Inserir Produto',
      icon: Package,
      onClick: () => {
        // TODO: Criar rota /admin/produtos/novo quando necessário
        console.log('Navegar para inserir produto');
      },
    },
    {
      label: 'Importar Produtos',
      icon: Upload,
      onClick: () => navigate('/import-produtos'),
    },
    {
      label: 'Criar Cupom',
      icon: Ticket,
      onClick: () => navigate('/coupon-management'),
    },
    {
      label: 'Gerenciar Categorias',
      icon: FolderTree,
      onClick: () => {
        // TODO: Criar rota /admin/categorias quando necessário
        console.log('Navegar para gerenciar categorias');
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <StyledAdminButton
          aria-label="Configurações administrativas"
          title="Configurações administrativas"
        >
          <Settings className="h-6 w-6" />
        </StyledAdminButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={8}
        className="min-w-[200px]"
      >
        <DropdownMenuLabel>Administração</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={item.label}
              onClick={item.onClick}
              className="cursor-pointer"
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
