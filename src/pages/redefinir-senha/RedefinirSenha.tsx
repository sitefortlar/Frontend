import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { RedefinirSenhaForm } from "@/components/auth/RedefinirSenhaForm";
import {
  RedefinirSenhaContainer,
  FloatingElement,
  RedefinirSenhaContent,
  RedefinirSenhaHeader,
  RedefinirSenhaBackLink,
  RedefinirSenhaBackButton,
  RedefinirSenhaTitleCard,
  RedefinirSenhaTitle,
  RedefinirSenhaSubtitle,
  RedefinirSenhaFormContainer,
  RedefinirSenhaFooter,
  RedefinirSenhaFooterLink
} from "./styles";

const RedefinirSenha = () => {
  const footer = () => (
    <RedefinirSenhaFooter>
      Lembrou da senha?{" "}
      <Link 
        to="/login" 
        className="text-white hover:text-[hsl(var(--primary-glow))] transition-all duration-300 font-medium underline underline-offset-4"
      >
        Fazer Login
      </Link>
    </RedefinirSenhaFooter>
  );

  return (
    <RedefinirSenhaContainer>
      {/* Floating elements */}
      <FloatingElement top="8rem" right="4rem" width="7rem" height="7rem" />
      <FloatingElement bottom="10rem" left="5rem" width="9rem" height="9rem" delay="1.8s" />
      <FloatingElement top="30%" right="30%" width="5rem" height="5rem" delay="2.5s" />

      <RedefinirSenhaContent>
        <RedefinirSenhaHeader>
          <RedefinirSenhaBackLink>
            <Link to="/login" className="inline-flex items-center text-white hover:text-white/80 transition-all duration-300">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao Login
            </Link>
          </RedefinirSenhaBackLink>
          
          <RedefinirSenhaTitleCard>
            <RedefinirSenhaTitle>Redefinir Senha</RedefinirSenhaTitle>
            <RedefinirSenhaSubtitle>
              Informe o código recebido por e-mail e crie sua nova senha.
            </RedefinirSenhaSubtitle>
          </RedefinirSenhaTitleCard>
        </RedefinirSenhaHeader>

        <RedefinirSenhaFormContainer>
          <RedefinirSenhaForm />
        </RedefinirSenhaFormContainer>

        {footer()}
      </RedefinirSenhaContent>
    </RedefinirSenhaContainer>
  );
};

export default RedefinirSenha;
