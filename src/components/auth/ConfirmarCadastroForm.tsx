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
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [resendError, setResendError] = useState("");
  const [tokenSent, setTokenSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Modo: se veio com token/companyId na URL ou se precisa solicitar
  const hasUrlParams = !!(tokenFromUrl && companyId);
  const needsEmailInput = !hasUrlParams && !tokenSent;

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
    setIsResending(true);
    setResendError("");

    try {
      if (companyId) {
        await emailTokenService.resendEmailToken(parseInt(companyId));
        toast({
          title: "E-mail reenviado!",
          description: "Um novo token de verificação foi enviado para o seu e-mail.",
        });
      } else if (email) {
        const response = await emailTokenService.resendEmailTokenByEmail(email);
        
        toast({
          title: "E-mail enviado!",
          description: "Um token de verificação foi enviado para o seu e-mail.",
        });
        
        // Redirecionar com os parâmetros na URL
        navigate(`/confirmar-cadastro?token=${response.token}&companyId=${response.company_id}`);
      } else {
        setResendError("Por favor, informe o e-mail para reenviar o token.");
        setIsResending(false);
        return;
      }
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
    <StyledForm onSubmit={needsEmailInput ? (e) => { e.preventDefault(); handleResendToken(); } : handleSubmit}>
      <ConfirmarCadastroFormGroup>
        {needsEmailInput ? (
          <>
            <ConfirmarCadastroInputGroup>
              <ConfirmarCadastroInputIcon>
                <CheckCircle className="h-4 w-4" />
              </ConfirmarCadastroInputIcon>
              <ConfirmarCadastroInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail cadastrado"
                required
              />
            </ConfirmarCadastroInputGroup>
            
            {resendError && (
              <ConfirmarCadastroError>{resendError}</ConfirmarCadastroError>
            )}
            
            <ConfirmarCadastroDescription>
              Informe seu e-mail para receber o token de validação
            </ConfirmarCadastroDescription>

            <ConfirmarCadastroButton type="submit" disabled={isResending}>
              <ConfirmarCadastroButtonContent>
                {isResending ? (
                  <>
                    <LoadingSpinner />
                    Enviando...
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-4 w-4" />
                    Enviar Token
                  </>
                )}
              </ConfirmarCadastroButtonContent>
            </ConfirmarCadastroButton>
          </>
        ) : (
          <>
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
                : tokenSent 
                  ? "Digite o token recebido no e-mail"
                  : "Cole aqui o token recebido no e-mail"
              }
            </ConfirmarCadastroDescription>

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
              disabled={isResending}
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
          </>
        )}
      </ConfirmarCadastroFormGroup>
    </StyledForm>
  );
};
