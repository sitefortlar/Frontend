import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProductImportService } from '@/services/products/productImport';
import { useToast } from '@/hooks/use-toast';

export default function ImportProdutos() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
    total?: number;
    errors?: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const isExcel = selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls');
      if (!isExcel) {
        toast({
          title: 'Arquivo inválido',
          description: 'Por favor, selecione um arquivo Excel (.xlsx ou .xls)',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadResult(null);

    try {
      const response = await ProductImportService.uploadSpreadsheet(file);
      setUploadResult({
        success: true,
        message: response.message,
        total: response.total_imported,
        errors: response.errors,
      });
      toast({
        title: 'Upload realizado com sucesso',
        description: `${response.total_imported || 0} produtos importados`,
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Erro ao fazer upload da planilha';
      setUploadResult({
        success: false,
        message: errorMessage,
      });
      toast({
        title: 'Erro no upload',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setUploadResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/catalog')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Catálogo
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-6 w-6" />
              Importar Produtos
            </CardTitle>
            <CardDescription>
              Faça upload de uma planilha Excel para cadastrar múltiplos produtos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {file ? file.name : 'Clique para selecionar arquivo'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Arquivos Excel (.xlsx, .xls)
                  </p>
                </div>
              </label>
            </div>

            {file && (
              <div className="flex gap-3">
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1"
                >
                  {isUploading ? 'Enviando...' : 'Enviar Planilha'}
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  disabled={isUploading}
                >
                  Limpar
                </Button>
              </div>
            )}

            {uploadResult && (
              <Alert variant={uploadResult.success ? 'default' : 'destructive'}>
                <div className="flex items-start gap-3">
                  {uploadResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <div className="flex-1">
                    <AlertDescription>
                      <p className="font-medium">{uploadResult.message}</p>
                      {uploadResult.total !== undefined && (
                        <p className="text-sm mt-1">
                          Total de produtos importados: {uploadResult.total}
                        </p>
                      )}
                      {uploadResult.errors && uploadResult.errors.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Erros encontrados:</p>
                          <ul className="text-xs mt-1 list-disc list-inside">
                            {uploadResult.errors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
