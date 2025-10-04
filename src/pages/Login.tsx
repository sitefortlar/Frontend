import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import fortLarLogo from "@/assets/fort-lar-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message === "Invalid login credentials" 
            ? "E-mail ou senha incorretos." 
            : error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.session) {
        toast({
          title: "Login realizado",
          description: "Bem-vindo ao sistema Fort-Lar!",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors duration-300" />
                  <Input
                    type="email"
                    placeholder="E-mail ou CNPJ"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-[hsl(var(--auth-input-bg))] transition-all duration-300 hover:border-white/30"
                    required
                  />
                </div>
                
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors duration-300" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-[hsl(var(--auth-input-bg))] transition-all duration-300 hover:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-[hsl(var(--auth-button))] hover:bg-[hsl(var(--primary-glow))] text-white font-semibold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
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