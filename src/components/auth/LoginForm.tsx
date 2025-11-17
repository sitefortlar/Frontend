import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation } from "@/hooks/useFormValidation";
import { authService } from "@/services/auth/auth";
import { AUTH_MESSAGES } from "@/constants/auth";
import {
  LoginForm as StyledLoginForm,
  LoginFormGroup,
  LoginInputGroup,
  LoginInput,
  LoginInputIcon,
  LoginInputButton,
  LoginError,
  LoginButton,
  LoginButtonContent,
  LoadingSpinner
} from "./styles";

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { validateForm, errors, clearErrors } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    
    if (!validateForm({ email: login, password })) {
      toast({
        title: "Erro",
        description: AUTH_MESSAGES.REQUIRED_FIELDS,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ login, password });
      
      toast({
        title: "Login realizado",
        description: AUTH_MESSAGES.LOGIN_SUCCESS,
      });

      // Redirect to catalog page
      navigate('/catalog');
    } catch (error: any) {
      console.log('error', error);
      if (error.status === 403) {
        toast({
          title: "Erro ao fazer login",
          description: "Validação do email pendente",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao fazer login",
          description: error.message || "Erro desconhecido",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <LoginFormGroup>
        <LoginInputGroup>
          <LoginInputIcon>
            <Mail className="h-5 w-5" />
          </LoginInputIcon>
          <LoginInput
            type="email"
            placeholder="E-mail"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </LoginInputGroup>
        {errors.email && (
          <LoginError>{errors.email}</LoginError>
        )}
        
        <LoginInputGroup>
          <LoginInputIcon>
            <Lock className="h-5 w-5" />
          </LoginInputIcon>
          <LoginInput
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoginInputButton
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </LoginInputButton>
        </LoginInputGroup>
        {errors.password && (
          <LoginError>{errors.password}</LoginError>
        )}
      </LoginFormGroup>

      <LoginButton 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoginButtonContent>
            <LoadingSpinner />
            Entrando...
          </LoginButtonContent>
        ) : (
          "Entrar"
        )}
      </LoginButton>
    </StyledLoginForm>
  );
};
