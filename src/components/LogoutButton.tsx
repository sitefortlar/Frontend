import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { paths } from '@/routes/paths';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
  showIcon?: boolean;
}

/**
 * Componente de botão de logout.
 * Limpa os dados do usuário, carrinho e redireciona para a página de login.
 */
export const LogoutButton = ({ 
  variant = 'ghost', 
  className,
  showIcon = true 
}: LogoutButtonProps) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      // Limpar carrinho do localStorage
      try {
        localStorage.removeItem('fortlar_cart_items');
        localStorage.removeItem('fortlar_cart_drawer_open');
        localStorage.removeItem('fortlar_cart_price_type');
      } catch (error) {
        console.warn('Erro ao limpar carrinho:', error);
      }

      // Fazer logout
      await logout();
      
      // Redirecionar para login
      navigate(paths.login, { replace: true });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo em caso de erro, redirecionar para login
      navigate(paths.login, { replace: true });
    }
  }, [logout, navigate]);

  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      className={cn(
        "w-full justify-start text-left h-auto p-3",
        "text-sidebar-foreground transition-all duration-200",
        "hover:bg-destructive/10 hover:text-destructive",
        className
      )}
      aria-label="Sair da conta"
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      <span>Sair</span>
    </Button>
  );
};
