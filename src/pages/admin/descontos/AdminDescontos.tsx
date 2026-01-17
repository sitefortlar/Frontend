import { Tag, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDescontos = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Tag className="h-8 w-8" />
            Descontos por Região
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure regras de desconto por UF, cidade ou região
          </p>
        </div>
        <Button>
          <MapPin className="h-4 w-4 mr-2" />
          Nova Regra de Desconto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regras de Desconto</CardTitle>
          <CardDescription>
            Crie e edite regras de desconto personalizadas por localização
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure descontos específicos para diferentes regiões, estados ou cidades.
              As regras podem ser aplicadas automaticamente com base na localização do cliente.
            </p>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Gerenciar Regras
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDescontos;

