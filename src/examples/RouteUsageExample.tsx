// Exemplo de como usar as rotas e hooks de navegação

import { useNavigation, usePageTitle } from '@/hooks/routing';
import { Button } from '@/components/ui/button';

const RouteUsageExample = () => {
  const { goTo, paths, isCurrentPath } = useNavigation();
  
  // Define o título da página
  usePageTitle('Exemplo de Uso de Rotas');

  const handleNavigation = () => {
    // Navegar para login
    goTo(paths.login);
  };

  const handleReplace = () => {
    // Substituir a rota atual (não adiciona ao histórico)
    goTo(paths.cadastro);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Exemplo de Uso de Rotas</h1>
      
      <div className="space-y-2">
        <p>Rota atual: {isCurrentPath(paths.home) ? 'Home' : 'Outra rota'}</p>
        
        <div className="flex gap-2">
          <Button onClick={handleNavigation}>
            Ir para Login
          </Button>
          
          <Button onClick={handleReplace} variant="outline">
            Ir para Cadastro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteUsageExample;
