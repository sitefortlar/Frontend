import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import {
  NotFoundContainer,
  FloatingElement,
  NotFoundContent,
  NotFoundCard,
  NotFoundNumber,
  NotFoundTitle,
  NotFoundDescription,
  NotFoundButton,
  NotFoundIcon
} from "./styles";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <NotFoundContainer>
      {/* Floating elements */}
      <FloatingElement top="10%" right="10%" width="8rem" height="8rem" />
      <FloatingElement bottom="20%" left="15%" width="12rem" height="12rem" delay="2s" />
      <FloatingElement top="60%" right="30%" width="6rem" height="6rem" delay="4s" />

      <NotFoundContent>
        <NotFoundCard>
          <NotFoundNumber>404</NotFoundNumber>
          <NotFoundTitle>Oops! Página não encontrada</NotFoundTitle>
          <NotFoundDescription>
            A página que você está procurando não existe ou foi movida.
            Que tal voltar para a página inicial?
          </NotFoundDescription>
          <NotFoundButton to="/">
            <NotFoundIcon>
              <Home className="h-5 w-5" />
            </NotFoundIcon>
            Voltar ao Início
          </NotFoundButton>
        </NotFoundCard>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;
