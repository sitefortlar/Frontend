import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, User, LogOut } from 'lucide-react';
import { authService } from '@/services';

interface WelcomeLoaderData {
  user: {
    id: string;
    email: string;
    name: string;
  };
  clients: Array<{
    id: string;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    isActive: boolean;
  }>;
}

const Welcome = () => {
  const { user, clients } = useLoaderData() as WelcomeLoaderData;
  const navigate = useNavigate();

  const handleClientSelect = (clientId: string) => {
    localStorage.setItem('selected_client_id', clientId);
    navigate('/home');
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Selecione um cliente para continuar
          </p>
        </div>

        {/* Client Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {clients.map((client) => (
            <Card 
              key={client.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleClientSelect(client.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>CNPJ:</strong> {client.cnpj}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {client.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Telefone:</strong> {client.phone}
                </p>
                <div className="pt-4">
                  <Button className="w-full">
                    Selecionar Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Info & Logout */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
