import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation } from "@/hooks/useFormValidation";
import { authService } from "@/services";
import { AUTH_MESSAGES } from "@/constants/auth";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { validateForm, errors, clearErrors } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    
    if (!validateForm({ email, password })) {
      toast({
        title: "Erro",
        description: AUTH_MESSAGES.REQUIRED_FIELDS,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      toast({
        title: "Login realizado",
        description: AUTH_MESSAGES.LOGIN_SUCCESS,
      });

      // Redirect to welcome page
      navigate('/welcome');
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error 
          ? error.message 
          : AUTH_MESSAGES.LOGIN_ERROR,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="form-group group">
          <Mail className="form-icon group-focus-within:text-white" />
          <Input
            type="email"
            placeholder="E-mail ou CNPJ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12 h-14 auth-input"
            required
          />
          {errors.email && (
            <p className="form-error">{errors.email}</p>
          )}
        </div>
        
        <div className="form-group group">
          <Lock className="form-icon group-focus-within:text-white" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 pr-12 h-14 auth-input"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          {errors.password && (
            <p className="form-error">{errors.password}</p>
          )}
        </div>
      </div>

      <Button 
        type="submit"
        disabled={isLoading}
        className="w-full h-14 auth-button"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="loading-spinner"></div>
            Entrando...
          </div>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
};
