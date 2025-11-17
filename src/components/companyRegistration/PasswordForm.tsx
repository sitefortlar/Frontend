import { Lock, Check, X } from "lucide-react";
import { usePasswordValidation } from "@/hooks/useFormValidation";
import {
  AuthFormCard,
  AuthFormHeader,
  AuthFormTitle,
  AuthFormIcon,
  AuthFormContent,
  AuthInput,
  AuthError,
  AuthPasswordValidation,
  AuthPasswordTitle,
  AuthPasswordGrid,
  AuthPasswordItem,
  AuthPasswordIcon
} from "./styles.tsx";

interface PasswordFormProps {
  password: string;
  onPasswordChange: (value: string) => void;
  errors: Record<string, string>;
}

export const PasswordForm = ({
  password,
  onPasswordChange,
  errors,
}: PasswordFormProps) => {
  const passwordValidations = usePasswordValidation(password);

  return (
    <AuthFormCard delay="0.4s">
      <AuthFormHeader>
        <AuthFormTitle>
          <AuthFormIcon>
            <Lock className="h-4 w-4 text-white" />
          </AuthFormIcon>
          Senha de Acesso
        </AuthFormTitle>
      </AuthFormHeader>
      <AuthFormContent>
        <div>
          <AuthInput
            type="password"
            placeholder="Senha *"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
          {errors.password && (
            <AuthError>{errors.password}</AuthError>
          )}
        </div>
        
        <AuthPasswordValidation>
          <AuthPasswordTitle>Critérios de segurança:</AuthPasswordTitle>
          <AuthPasswordGrid>
            <AuthPasswordItem isValid={passwordValidations.hasMinLength}>
              <AuthPasswordIcon>
                {passwordValidations.hasMinLength ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </AuthPasswordIcon>
              Mínimo 8 caracteres
            </AuthPasswordItem>
            
            <AuthPasswordItem isValid={passwordValidations.hasUppercase}>
              <AuthPasswordIcon>
                {passwordValidations.hasUppercase ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </AuthPasswordIcon>
              Uma letra maiúscula
            </AuthPasswordItem>
            
            <AuthPasswordItem isValid={passwordValidations.hasNumber}>
              <AuthPasswordIcon>
                {passwordValidations.hasNumber ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </AuthPasswordIcon>
              Um número
            </AuthPasswordItem>
            
            <AuthPasswordItem isValid={passwordValidations.hasSpecialChar}>
              <AuthPasswordIcon>
                {passwordValidations.hasSpecialChar ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </AuthPasswordIcon>
              Um caractere especial (@$!%*?&)
            </AuthPasswordItem>
          </AuthPasswordGrid>
        </AuthPasswordValidation>
      </AuthFormContent>
    </AuthFormCard>
  );
};
