import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu e-mail.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o e-mail. Tente novamente.",
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
      
      {/* Floating elements */}
      <div className="absolute top-32 right-16 w-28 h-28 bg-primary/8 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-40 left-20 w-36 h-36 bg-accent/6 rounded-full blur-2xl animate-float" style={{animationDelay: '1.8s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-primary/4 rounded-full blur-lg animate-float" style={{animationDelay: '2.5s'}}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header with glassmorphism */}
          <div className="text-center mb-12 animate-fade-in">
            <Link to="/login" className="inline-flex items-center text-white hover:text-primary transition-all duration-300 mb-8 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transform hover:scale-105">
              <ArrowLeft className="h-5 w-5 mr-3" />
              Voltar ao Login
            </Link>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Esqueci minha senha</h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Informe seu e-mail cadastrado e enviaremos instruções para redefinir sua senha.
              </p>
            </div>
          </div>

          {/* Form with glassmorphism */}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-white/60 group-focus-within:text-white/90 transition-colors duration-300" />
                <Input
                  type="email"
                  placeholder="Seu e-mail cadastrado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/60 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 hover:bg-white/8"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-medium text-lg rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Enviando...
                  </div>
                ) : (
                  "Enviar Instruções"
                )}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <p className="text-white/80 text-lg">
              Lembrou da senha?{" "}
              <Link 
                to="/login" 
                className="text-white hover:text-primary transition-all duration-300 font-medium relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Fazer Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;