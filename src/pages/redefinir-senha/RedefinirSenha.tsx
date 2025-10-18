import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Lock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

const RedefinirSenha = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codigo || !novaSenha || !confirmarSenha) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (novaSenha.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/auth/reset-password', { 
        token: token || codigo, 
        password: novaSenha 
      });

      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi alterada com sucesso. Faça login com sua nova senha.",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Ocorreu um erro ao redefinir a senha. Verifique o código e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-auth)' }}>
      {/* Floating elements */}
      <div className="absolute top-32 right-16 w-28 h-28 bg-white/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-40 left-20 w-36 h-36 bg-white/5 rounded-full blur-2xl animate-float" style={{animationDelay: '1.8s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/3 rounded-full blur-lg animate-float" style={{animationDelay: '2.5s'}}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header with glassmorphism */}
          <div className="text-center mb-8 animate-fade-in">
            <Link to="/login" className="inline-flex items-center text-white hover:text-white/80 transition-all duration-300 mb-6 p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transform hover:scale-105">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao Login
            </Link>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-6">
              <h1 className="text-2xl font-bold text-white mb-3">Redefinir Senha</h1>
              <p className="text-white/90 text-sm leading-relaxed">
                Informe o código recebido por e-mail e crie sua nova senha.
              </p>
            </div>
          </div>

          {/* Form with glassmorphism */}
          <div className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!token && (
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors duration-300" />
                  <Input
                    type="text"
                    placeholder="Código de verificação"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="pl-12 h-14 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-[hsl(var(--auth-input-bg))] transition-all duration-300 hover:border-white/30"
                    required
                  />
                </div>
              )}

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors duration-300" />
                <Input
                  type="password"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="pl-12 h-14 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-[hsl(var(--auth-input-bg))] transition-all duration-300 hover:border-white/30"
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors duration-300" />
                <Input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="pl-12 h-14 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-[hsl(var(--auth-input-bg))] transition-all duration-300 hover:border-white/30"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-[hsl(var(--auth-button))] hover:bg-[hsl(var(--primary-glow))] text-white font-semibold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Redefinindo...
                  </div>
                ) : (
                  "Redefinir Senha"
                )}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <p className="text-white/90 text-base">
              Lembrou da senha?{" "}
              <Link 
                to="/login" 
                className="text-white hover:text-[hsl(var(--primary-glow))] transition-all duration-300 font-medium underline underline-offset-4"
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

export default RedefinirSenha;
