import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

const ConfirmarCadastro = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const [token, setToken] = useState(tokenFromUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [tokenFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast({
        title: "Erro",
        description: "Por favor, informe o token de validação.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/auth/verify-account', { token });

      toast({
        title: "Conta verificada!",
        description: "Sua conta foi ativada com sucesso. Você pode fazer login agora.",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Token inválido ou expirado. Por favor, solicite um novo e-mail de confirmação.",
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
        <div className="w-full max-w-2xl">
          {/* Header with glassmorphism */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-4">Confirme seu cadastro</h1>
            <p className="text-white/90 text-base leading-relaxed">
              Obrigado por se cadastrar! Para ativar sua conta, clique no botão abaixo:
            </p>
          </div>

          {/* Form with glassmorphism */}
          <div className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Token de validação:
                </label>
                <Input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="h-14 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-[hsl(var(--auth-input-bg))] transition-all duration-300 hover:border-white/30"
                  readOnly={!!tokenFromUrl}
                  required
                />
                <p className="text-white/70 text-sm mt-2">
                  {tokenFromUrl 
                    ? "Token detectado automaticamente da URL"
                    : "Cole aqui o token recebido no e-mail"
                  }
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-[hsl(var(--auth-button))] hover:bg-[hsl(var(--primary-glow))] text-white font-semibold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verificando...
                  </div>
                ) : (
                  "Verificar Conta"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Se você não se cadastrou, ignore este e-mail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCadastro;
