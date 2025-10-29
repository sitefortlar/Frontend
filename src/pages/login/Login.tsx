import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components";
import { 
  AuthFormContainer,
  LoginFooter, 
  LoginFooterText, 
  LoginFooterLink, 
  LoginFooterSecondaryLink 
} from "./styles";

const Login = () => {


  const footer = () => (
    <LoginFooter>
      <LoginFooterText>
        Se você não tem uma conta,{" "}
        <LoginFooterLink to="/cadastro">
          Criar Conta
        </LoginFooterLink>
      </LoginFooterText>
      <LoginFooterText>
        <LoginFooterSecondaryLink to="/esqueci-senha">
          Esqueci minha senha
        </LoginFooterSecondaryLink>
      </LoginFooterText>
      <LoginFooterText>
        <LoginFooterSecondaryLink to="/confirmar-cadastro">
          Validar token do email
        </LoginFooterSecondaryLink>
      </LoginFooterText>
    </LoginFooter>
  );

  return (
    <AuthLayout
      footer={footer()}
    >
      <AuthFormContainer>
        <LoginForm />
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default Login;
