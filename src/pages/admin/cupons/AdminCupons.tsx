import { Ticket, Plus, List, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminCupons = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Ticket className="h-8 w-8" />
            Cupons
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie cupons de desconto
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Criar Cupom
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Criar Cupons</CardTitle>
            <CardDescription>
              Gere novos cupons de desconto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Novo Cupom
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listar Cupons</CardTitle>
            <CardDescription>
              Visualize todos os cupons cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <List className="h-4 w-4 mr-2" />
              Ver Cupons
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ativar / Desativar</CardTitle>
            <CardDescription>
              Controle o status dos cupons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Power className="h-4 w-4 mr-2" />
              Gerenciar Status
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCupons;

