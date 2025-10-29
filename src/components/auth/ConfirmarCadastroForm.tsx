import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { emailTokenService } from "@/services/auth/emailToken";
import { CheckCircle, RotateCcw } from "lucide-react";
import {
  ConfirmarCadastroForm as StyledForm,
  ConfirmarCadastroFormGroup,
  ConfirmarCadastroInputGroup,
  ConfirmarCadastroInput,
  ConfirmarCadastroInputIcon,
  ConfirmarCadastroButton,
  ConfirmarCadastroButtonContent,
  ConfirmarCadastroResendButton,
  ConfirmarCadastroError,
  ConfirmarCadastroDescription,
  LoadingSpinner
} from "./styles";

interface ConfirmarCadastroFormProps {
  tokenFromUrl?: string | null;
  companyId?: string | null;
}

export const ConfirmarCadastroForm = ({ tokenFromUrl, companyId }: ConfirmarCadastroFormProps) => {
  const [token, setToken] = useState(tokenFromUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [resendError, setResendError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!token) {
      setError("Por favor, informe o token de validação.");
      return;
    }

    setIsLoading(true);
    if (!companyId) {
      setError("ID da empresa não encontrado. Não é possível verificar o token.");
      return;
    }

    try {
      await emailTokenService.verifyToken({ token, company_id: parseInt(companyId) });

      toast({
        title: "Conta verificada!",
        description: "Sua conta foi ativada com sucesso. Você pode fazer login agora.",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.message || "Token inválido ou expirado. Por favor, solicite um novo e-mail de confirmação.";
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendToken = async () => {
    if (!companyId) {
      setResendError("ID da empresa não encontrado. Não é possível reenviar o token.");
      return;
    }

    setIsResending(true);
    setResendError("");

    try {
      await emailTokenService.resendEmailToken(parseInt(companyId));
      
      toast({
        title: "E-mail reenviado!",
        description: "Um novo token de verificação foi enviado para o e-mail da empresa.",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao reenviar e-mail de verificação.";
      setResendError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <ConfirmarCadastroFormGroup>
        <ConfirmarCadastroInputGroup>
          <ConfirmarCadastroInputIcon>
            <CheckCircle className="h-4 w-4" />
          </ConfirmarCadastroInputIcon>
          <ConfirmarCadastroInput
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Token de validação"
            readOnly={!!tokenFromUrl}
            required
          />
        </ConfirmarCadastroInputGroup>
        
        {error && (
          <ConfirmarCadastroError>{error}</ConfirmarCadastroError>
        )}
        
        {resendError && (
          <ConfirmarCadastroError>{resendError}</ConfirmarCadastroError>
        )}
        
        <ConfirmarCadastroDescription>
          {tokenFromUrl 
            ? "Token detectado automaticamente da URL"
            : "Cole aqui o token recebido no e-mail"
          }
        </ConfirmarCadastroDescription>
      </ConfirmarCadastroFormGroup>

      <ConfirmarCadastroButton type="submit" disabled={isLoading}>
        <ConfirmarCadastroButtonContent>
          {isLoading ? (
            <>
              <LoadingSpinner />
              Verificando...
            </>
          ) : (
            "Verificar Conta"
          )}
        </ConfirmarCadastroButtonContent>
      </ConfirmarCadastroButton>

      <ConfirmarCadastroResendButton 
        type="button" 
        onClick={handleResendToken}
        disabled={isResending || !companyId}
      >
        <ConfirmarCadastroButtonContent>
          {isResending ? (
            <>
              <LoadingSpinner />
              Reenviando...
            </>
          ) : (
            <>
              <RotateCcw className="h-4 w-4" />
              Reenviar Token
            </>
          )}
        </ConfirmarCadastroButtonContent>
      </ConfirmarCadastroResendButton>
    </StyledForm>
  );
};
