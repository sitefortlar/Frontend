import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { emailTokenService } from "@/services/auth/emailToken";
import { CheckCircle, RotateCcw, Key, Mail } from "lucide-react";
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
  const [isManualMode, setIsManualMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Atualiza o token quando tokenFromUrl mudar (apenas se não estiver em modo manual)
  useEffect(() => {
    if (tokenFromUrl && !isManualMode) {
      setToken(tokenFromUrl);
    }
  }, [tokenFromUrl, isManualMode]);

  // Determina se há token na URL
  const hasTokenInUrl = !!tokenFromUrl;
  
  // Determina se o campo de token deve ser somente leitura
  const isTokenReadOnly = hasTokenInUrl && !isManualMode;
  
  // Determina se deve mostrar o campo de e-mail (quando não há token na URL e não está em modo manual)
  const shouldShowEmailInput = !hasTokenInUrl && !isManualMode && !tokenSent;

  // Alterna para modo manual
  const handleSwitchToManualMode = () => {
    setIsManualMode(true);
    // Limpa o token se veio da URL para permitir inserção manual
    if (hasTokenInUrl) {
      setToken("");
    }
    setError("");
    setResendError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!token) {
      setError("Por favor, informe o token de validação.");
      return;
    }

    setIsLoading(true);
    
    // Se não tem companyId, tenta verificar apenas com o token
    if (!companyId) {
      setError("ID da empresa não encontrado. Por favor, solicite um novo token através do e-mail.");
      setIsLoading(false);
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

  const handleSendTokenByEmail = async () => {
    setIsResending(true);
    setResendError("");

    try {
      if (companyId) {
        await emailTokenService.resendEmailToken(parseInt(companyId));
        toast({
          title: "E-mail enviado!",
          description: "Um token de verificação foi enviado para o seu e-mail.",
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
        setResendError("Por favor, informe o e-mail para enviar o token.");
        setIsResending(false);
        return;
      }
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao enviar e-mail de verificação.";
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
    <StyledForm onSubmit={shouldShowEmailInput ? (e) => { e.preventDefault(); handleSendTokenByEmail(); } : handleSubmit}>
      <ConfirmarCadastroFormGroup>
        {shouldShowEmailInput ? (
          <>
            <ConfirmarCadastroInputGroup>
              <ConfirmarCadastroInputIcon>
                <Mail className="h-4 w-4" />
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
              Informe seu e-mail para receber o token de validação por e-mail
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
                    <Mail className="h-4 w-4" />
                    Enviar token por e-mail
                  </>
                )}
              </ConfirmarCadastroButtonContent>
            </ConfirmarCadastroButton>

            {/* Botão secundário para alternar para modo manual */}
            <ConfirmarCadastroResendButton 
              type="button" 
              onClick={handleSwitchToManualMode}
            >
              <ConfirmarCadastroButtonContent>
                <Key className="h-4 w-4" />
                Clique aqui se já possuir o token
              </ConfirmarCadastroButtonContent>
            </ConfirmarCadastroResendButton>
          </>
        ) : (
          <>
            <ConfirmarCadastroInputGroup>
              <ConfirmarCadastroInputIcon>
                <Key className="h-4 w-4" />
              </ConfirmarCadastroInputIcon>
              <ConfirmarCadastroInput
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Token de validação"
                readOnly={isTokenReadOnly}
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
              {isTokenReadOnly
                ? "Token identificado automaticamente pelo link. Clique em 'Confirmar cadastro' para continuar."
                : "Digite o token recebido no e-mail"
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
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Confirmar cadastro
                  </>
                )}
              </ConfirmarCadastroButtonContent>
            </ConfirmarCadastroButton>

            {/* Botão secundário para alternar para modo manual (quando token veio da URL) */}
            {isTokenReadOnly && (
              <ConfirmarCadastroResendButton 
                type="button" 
                onClick={handleSwitchToManualMode}
              >
                <ConfirmarCadastroButtonContent>
                  <Key className="h-4 w-4" />
                  Clique aqui se já possuir o token
                </ConfirmarCadastroButtonContent>
              </ConfirmarCadastroResendButton>
            )}

            {/* Botão para reenviar token (quando não está em modo automático) */}
            {!isTokenReadOnly && companyId && (
              <ConfirmarCadastroResendButton 
                type="button" 
                onClick={handleSendTokenByEmail}
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
                      Reenviar token por e-mail
                    </>
                  )}
                </ConfirmarCadastroButtonContent>
              </ConfirmarCadastroResendButton>
            )}
          </>
        )}
      </ConfirmarCadastroFormGroup>
    </StyledForm>
  );
};
