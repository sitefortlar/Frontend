import { useState, useRef } from 'react';
import { Upload, File, AlertTriangle, CheckCircle2, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { productService } from '@/services/product';

export const ProductUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedExtensions = ['.csv', '.xls', '.xlsx'];
  const allowedMimeTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const validateFile = (file: File): boolean => {
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    const isValidExtension = allowedExtensions.includes(fileExtension);
    const isValidMimeType = allowedMimeTypes.includes(file.type);
    
    return isValidExtension || isValidMimeType;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }

    if (!validateFile(file)) {
      toast({
        title: 'Tipo de arquivo inválido',
        description: 'Apenas arquivos CSV ou Excel (.csv, .xls, .xlsx) são permitidos.',
        variant: 'destructive',
      });
      setSelectedFile(null);
      setIsConfirmed(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setSelectedFile(file);
    setIsConfirmed(false); // Resetar confirmação quando novo arquivo é selecionado
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setIsConfirmed(false);
    setUploadStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !isConfirmed) {
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      await productService.upload(selectedFile);
      
      setUploadStatus('success');
      toast({
        title: 'Sucesso!',
        description: 'Produtos importados com sucesso.',
      });

      // Resetar formulário após sucesso
      setTimeout(() => {
        setSelectedFile(null);
        setIsConfirmed(false);
        setUploadStatus('idle');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    } catch (error: any) {
      setUploadStatus('error');
      const message = error.message || 'Erro ao fazer upload do arquivo. Tente novamente.';
      setErrorMessage(message);
      toast({
        title: 'Erro no upload',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload de Arquivo</CardTitle>
        <CardDescription>
          Selecione um arquivo CSV ou Excel para importar produtos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Alerta de impacto */}
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            Este processo apagará <strong>todos os produtos cadastrados atualmente</strong> e os substituirá pelos dados do arquivo enviado.
          </AlertDescription>
        </Alert>

        {/* Input de arquivo */}
        <div className="space-y-2">
          <Label htmlFor="file-upload">Arquivo (CSV ou Excel)</Label>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Arquivo
            </Button>
            
            {selectedFile && (
              <div className="flex items-center gap-2 flex-1">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground flex-1">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Formatos aceitos: .csv, .xls, .xlsx
          </p>
        </div>

        {/* Checkbox de confirmação */}
        <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/50">
          <Checkbox
            id="confirm-replace"
            checked={isConfirmed}
            onCheckedChange={(checked) => setIsConfirmed(checked === true)}
            disabled={!selectedFile || isUploading}
          />
          <Label
            htmlFor="confirm-replace"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Estou ciente de que os produtos atuais serão substituídos pelos dados do arquivo enviado.
          </Label>
        </div>

        {/* Status de upload */}
        {uploadStatus === 'success' && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>
              Produtos importados com sucesso.
            </AlertDescription>
          </Alert>
        )}

        {uploadStatus === 'error' && errorMessage && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Botão de envio */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !isConfirmed || isUploading}
          className="w-full"
          size="lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Enviar Arquivo
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};


