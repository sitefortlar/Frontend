import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Check, X } from "lucide-react";
import { usePasswordValidation } from "@/hooks/useFormValidation";

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
    <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.4s'}}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
          <div className="p-2 bg-white/20 rounded-xl">
            <Lock className="h-5 w-5 text-white" />
          </div>
          Senha de Acesso
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <Input
          type="password"
          placeholder="Senha *"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password}</p>
        )}
        
        {/* Checklist de validação */}
        <div className="space-y-3">
          <p className="text-white/90 text-sm font-medium">Critérios de segurança:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
              passwordValidations.hasMinLength 
                ? 'text-green-400' 
                : 'text-white/60'
            }`}>
              {passwordValidations.hasMinLength ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Mínimo 8 caracteres
            </div>
            
            <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
              passwordValidations.hasUppercase 
                ? 'text-green-400' 
                : 'text-white/60'
            }`}>
              {passwordValidations.hasUppercase ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Uma letra maiúscula
            </div>
            
            <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
              passwordValidations.hasNumber 
                ? 'text-green-400' 
                : 'text-white/60'
            }`}>
              {passwordValidations.hasNumber ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Um número
            </div>
            
            <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
              passwordValidations.hasSpecialChar 
                ? 'text-green-400' 
                : 'text-white/60'
            }`}>
              {passwordValidations.hasSpecialChar ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              Um caractere especial (@$!%*?&)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
