import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import {
  EsqueciSenhaContainer,
  FloatingElement,
  EsqueciSenhaContent,
  EsqueciSenhaHeader,
  EsqueciSenhaBackLink,
  EsqueciSenhaInfoCard,
  EsqueciSenhaTitle,
  EsqueciSenhaDescription,
  EsqueciSenhaFormContainer,
  EsqueciSenhaForm,
  EsqueciSenhaInputGroup,
  EsqueciSenhaInput,
  EsqueciSenhaIcon,
  EsqueciSenhaButton,
  EsqueciSenhaFooter,
  EsqueciSenhaFooterText,
  EsqueciSenhaFooterLink,
  LoadingSpinner
} from "./styles";

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
      await api.post('/auth/forgot-password', { email });

      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Ocorreu um erro ao enviar o e-mail. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EsqueciSenhaContainer>
      {/* Floating elements */}
      <FloatingElement top="8rem" right="4rem" width="7rem" height="7rem" />
      <FloatingElement bottom="10rem" left="5rem" width="9rem" height="9rem" delay="1.8s" />
      <FloatingElement top="33%" right="33%" width="5rem" height="5rem" delay="2.5s" />

      <EsqueciSenhaContent>
        <EsqueciSenhaHeader>
          <EsqueciSenhaBackLink to="/login">
            <ArrowLeft className="h-5 w-5" />
            Voltar ao Login
          </EsqueciSenhaBackLink>
          
          <EsqueciSenhaInfoCard>
            <EsqueciSenhaTitle>Esqueci minha senha</EsqueciSenhaTitle>
            <EsqueciSenhaDescription>
              Informe seu e-mail cadastrado e enviaremos instruções para redefinir sua senha.
            </EsqueciSenhaDescription>
          </EsqueciSenhaInfoCard>
        </EsqueciSenhaHeader>

        <EsqueciSenhaFormContainer>
          <EsqueciSenhaForm onSubmit={handleSubmit}>
            <EsqueciSenhaInputGroup>
              <EsqueciSenhaIcon>
                <Mail className="h-5 w-5" />
              </EsqueciSenhaIcon>
              <EsqueciSenhaInput
                type="email"
                placeholder="Seu e-mail cadastrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </EsqueciSenhaInputGroup>

            <EsqueciSenhaButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Enviando...
                </>
              ) : (
                "Enviar Instruções"
              )}
            </EsqueciSenhaButton>
          </EsqueciSenhaForm>
        </EsqueciSenhaFormContainer>

        <EsqueciSenhaFooter>
          <EsqueciSenhaFooterText>
            Lembrou da senha?{" "}
            <EsqueciSenhaFooterLink to="/login">
              Fazer Login
            </EsqueciSenhaFooterLink>
          </EsqueciSenhaFooterText>
        </EsqueciSenhaFooter>
      </EsqueciSenhaContent>
    </EsqueciSenhaContainer>
  );
};

export default EsqueciSenha;
