import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { usePasswordValidation } from "@/hooks/useFormValidation";
import { passwordService } from "@/services/auth/password";
import { Key, Lock, Check, X } from "lucide-react";
import {
  RedefinirSenhaForm as StyledForm,
  RedefinirSenhaFormGroup,
  RedefinirSenhaInputGroup,
  RedefinirSenhaInput,
  RedefinirSenhaInputIcon,
  RedefinirSenhaButton,
  RedefinirSenhaButtonContent,
  RedefinirSenhaError,
  RedefinirSenhaPasswordValidation,
  RedefinirSenhaPasswordTitle,
  RedefinirSenhaPasswordGrid,
  RedefinirSenhaPasswordItem,
  RedefinirSenhaPasswordIcon,
  LoadingSpinner
} from "./styles";

export const RedefinirSenhaForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const tokenFromUrl = searchParams.get("token");
  const companyId = searchParams.get("companyId");
  
  // Hook de validação de senha
  const passwordValidations = usePasswordValidation(novaSenha);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!codigo || !novaSenha || !confirmarSenha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    // Validação usando as regras do PasswordForm
    if (!passwordValidations.hasMinLength) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (!passwordValidations.hasUppercase) {
      setError("A senha deve conter pelo menos uma letra maiúscula.");
      return;
    }

    if (!passwordValidations.hasNumber) {
      setError("A senha deve conter pelo menos um número.");
      return;
    }

    if (!passwordValidations.hasSpecialChar) {
      setError("A senha deve conter pelo menos um caractere especial (@$!%*?&).");
      return;
    }

    setIsLoading(true);

    try {
      await passwordService.resetPassword({
        token: token || codigo,
        company_id: parseInt(companyId),
        new_password: novaSenha,
        confirm_password: confirmarSenha
      });

      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi alterada com sucesso. Faça login com sua nova senha.",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.message || "Ocorreu um erro ao redefinir a senha. Verifique o código e tente novamente.";
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

  return (
    <StyledForm onSubmit={handleSubmit}>
      <RedefinirSenhaFormGroup>
        {!token && (
          <RedefinirSenhaInputGroup>
            <RedefinirSenhaInputIcon>
              <Key className="h-4 w-4" />
            </RedefinirSenhaInputIcon>
            <RedefinirSenhaInput
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Código de verificação"
              required
            />
          </RedefinirSenhaInputGroup>
        )}

        <RedefinirSenhaInputGroup>
          <RedefinirSenhaInputIcon>
            <Lock className="h-4 w-4" />
          </RedefinirSenhaInputIcon>
          <RedefinirSenhaInput
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Nova senha"
            required
          />
        </RedefinirSenhaInputGroup>

        {/* Validação visual de senha */}
        {novaSenha && (
          <RedefinirSenhaPasswordValidation>
            <RedefinirSenhaPasswordTitle>Critérios de segurança:</RedefinirSenhaPasswordTitle>
            <RedefinirSenhaPasswordGrid>
              <RedefinirSenhaPasswordItem isValid={passwordValidations.hasMinLength}>
                <RedefinirSenhaPasswordIcon>
                  {passwordValidations.hasMinLength ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </RedefinirSenhaPasswordIcon>
                Mínimo 8 caracteres
              </RedefinirSenhaPasswordItem>
              
              <RedefinirSenhaPasswordItem isValid={passwordValidations.hasUppercase}>
                <RedefinirSenhaPasswordIcon>
                  {passwordValidations.hasUppercase ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </RedefinirSenhaPasswordIcon>
                Uma letra maiúscula
              </RedefinirSenhaPasswordItem>
              
              <RedefinirSenhaPasswordItem isValid={passwordValidations.hasNumber}>
                <RedefinirSenhaPasswordIcon>
                  {passwordValidations.hasNumber ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </RedefinirSenhaPasswordIcon>
                Um número
              </RedefinirSenhaPasswordItem>
              
              <RedefinirSenhaPasswordItem isValid={passwordValidations.hasSpecialChar}>
                <RedefinirSenhaPasswordIcon>
                  {passwordValidations.hasSpecialChar ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </RedefinirSenhaPasswordIcon>
                Um caractere especial (@$!%*?&)
              </RedefinirSenhaPasswordItem>
            </RedefinirSenhaPasswordGrid>
          </RedefinirSenhaPasswordValidation>
        )}

        <RedefinirSenhaInputGroup>
          <RedefinirSenhaInputIcon>
            <Lock className="h-4 w-4" />
          </RedefinirSenhaInputIcon>
          <RedefinirSenhaInput
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirmar nova senha"
            required
          />
        </RedefinirSenhaInputGroup>
        
        {error && (
          <RedefinirSenhaError>{error}</RedefinirSenhaError>
        )}
      </RedefinirSenhaFormGroup>

      <RedefinirSenhaButton type="submit" disabled={isLoading}>
        <RedefinirSenhaButtonContent>
          {isLoading ? (
            <>
              <LoadingSpinner />
              Redefinindo...
            </>
          ) : (
            "Redefinir Senha"
          )}
        </RedefinirSenhaButtonContent>
      </RedefinirSenhaButton>
    </StyledForm>
  );
};
