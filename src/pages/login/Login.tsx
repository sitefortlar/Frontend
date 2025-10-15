import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components";
import { AUTH_MESSAGES } from "@/constants/auth";
import fortLarLogo from "@/assets/fort-lar-logo.png";

const Login = () => {
  const { toast } = useToast();

  const handleLoginSuccess = () => {
    toast({
      title: "Login realizado",
      description: AUTH_MESSAGES.LOGIN_SUCCESS,
    });
  };

  return (
    <AuthLayout
      title="Fort-Lar"
      subtitle="Sistema de Gestão Empresarial"
      showLogo={true}
      footer={
        <div className="space-y-3">
          <p className="text-white/90 text-base">
            Se você não tem uma conta,{" "}
            <Link 
              to="/cadastro" 
              className="text-white hover:text-[hsl(var(--primary-glow))] transition-all duration-300 font-medium underline underline-offset-4"
            >
              Criar Conta
            </Link>
          </p>
          <p>
            <Link 
              to="/esqueci-senha" 
              className="text-white/80 hover:text-white transition-all duration-300 text-sm underline underline-offset-4"
            >
              Esqueci minha senha
            </Link>
          </p>
        </div>
      }
    >
      <div className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </AuthLayout>
  );
};

export default Login;
