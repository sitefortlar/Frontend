import { Package } from 'lucide-react';
import { ProductUploadForm } from '@/components/admin/ProductUploadForm';

const AdminProdutos = () => {
  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Package className="h-8 w-8" />
          Gerenciamento de Produtos
        </h1>
        <p className="text-muted-foreground mt-2">
          Envie um arquivo CSV ou Excel para cadastrar ou atualizar os produtos.
          <br />
          O envio substituirá todos os produtos existentes.
        </p>
      </div>

      <ProductUploadForm />
    </div>
  );
};

export default AdminProdutos;

