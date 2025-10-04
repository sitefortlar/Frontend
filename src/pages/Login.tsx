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
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fort-blue via-fort-blue-dark to-fort-blue-light"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header with modern styling */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 mb-6">
              <img 
                src={fortLarLogo} 
                alt="Fort-Lar Logo" 
                className="h-12 mx-auto"
              />
            </div>
          </div>

          {/* Login Form with glassmorphism */}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-white/60 group-focus-within:text-white/90 transition-colors duration-300" />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/60 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 hover:bg-white/8"
                    required
                  />
                </div>
                
                <div className="relative group">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-white/60 group-focus-within:text-white/90 transition-colors duration-300" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/60 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 hover:bg-white/8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 h-5 w-5 text-white/60 hover:text-white/90 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-medium text-lg rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
          <div className="text-center space-y-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <p className="text-white/80 text-lg">
              Se você não tem uma conta,{" "}
              <Link 
                to="/cadastro" 
                className="text-white hover:text-primary transition-all duration-300 font-medium relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Criar Conta
              </Link>
            </p>
            <p>
              <Link 
                to="/esqueci-senha" 
                className="text-white/70 hover:text-white transition-all duration-300 font-medium relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
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