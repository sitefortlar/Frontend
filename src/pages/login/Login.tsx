import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoginForm } from "@/components/auth/LoginForm";
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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-auth)' }}>
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/3 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header with modern styling */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block p-5 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 mb-4">
              <img 
                src={fortLarLogo} 
                alt="Fort-Lar Logo" 
                className="h-12 mx-auto"
              />
            </div>
          </div>

          {/* Login Form with glassmorphism matching reference */}
          <div className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>

          {/* Footer Links with modern styling */}
          <div className="mt-6 text-center space-y-3 animate-slide-up" style={{animationDelay: '0.4s'}}>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
