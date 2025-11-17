import { useSearchParams } from "react-router-dom";
import { ConfirmarCadastroForm } from "@/components/auth/ConfirmarCadastroForm";
import {
  ConfirmarCadastroContainer,
  FloatingElement,
  ConfirmarCadastroContent,
  ConfirmarCadastroHeader,
  ConfirmarCadastroTitle,
  ConfirmarCadastroSubtitle,
  ConfirmarCadastroFormContainer,
  ConfirmarCadastroFooter
} from "./styles";

const ConfirmarCadastro = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const companyId = searchParams.get("companyId");

  const footer = () => (
    <ConfirmarCadastroFooter>
      Se você não se cadastrou, ignore este e-mail.
    </ConfirmarCadastroFooter>
  );

  return (
    <ConfirmarCadastroContainer>
      {/* Floating elements */}
      <FloatingElement top="8rem" right="4rem" width="7rem" height="7rem" />
      <FloatingElement bottom="10rem" left="5rem" width="9rem" height="9rem" delay="1.8s" />
      <FloatingElement top="30%" right="30%" width="5rem" height="5rem" delay="2.5s" />

      <ConfirmarCadastroContent>
        <ConfirmarCadastroHeader>
          <ConfirmarCadastroTitle>Confirme seu cadastro</ConfirmarCadastroTitle>
          <ConfirmarCadastroSubtitle>
            Obrigado por se cadastrar! Para ativar sua conta, informe o token de validação abaixo:
          </ConfirmarCadastroSubtitle>
        </ConfirmarCadastroHeader>

        <ConfirmarCadastroFormContainer>
          <ConfirmarCadastroForm tokenFromUrl={tokenFromUrl} companyId={companyId} />
        </ConfirmarCadastroFormContainer>

        {footer()}
      </ConfirmarCadastroContent>
    </ConfirmarCadastroContainer>
  );
};

export default ConfirmarCadastro;
