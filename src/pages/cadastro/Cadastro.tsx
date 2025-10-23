import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { CompanyDataForm } from "@/components/companyRegistration/CompanyDataForm";
import { AddressForm } from "@/components/companyRegistration/AddressForm";
import { ContactForm } from "@/components/companyRegistration/ContactForm";
import { PasswordForm } from "@/components/companyRegistration/PasswordForm";
import { AUTH_MESSAGES } from "@/constants/auth";
import {
  CadastroContainer,
  CadastroContent,
  CadastroHeader,
  CadastroTitle,
  CadastroSubtitle,
  CadastroFormContainer,
  CadastroForm,
  CadastroFooter,
  CadastroBackLink,
  CadastroButtonGroup,
  CadastroButton
} from "./styles";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, errors, updateField, validateRegistration, resetForm } = useRegistrationForm();

  const handleSearchByCnpj = () => {
    if (!formData.cnpj) {
      toast({
        title: "CNPJ necessário",
        description: AUTH_MESSAGES.CNPJ_REQUIRED,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Buscando dados...",
      description: AUTH_MESSAGES.SEARCHING_DATA,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegistration()) {
      toast({
        title: "Erro",
        description: AUTH_MESSAGES.REQUIRED_FIELDS,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Cadastro realizado!",
      description: AUTH_MESSAGES.REGISTRATION_SUCCESS,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <CadastroContainer>
      <CadastroContent>
        <CadastroHeader>
          <CadastroTitle>Cadastro de Cliente</CadastroTitle>
          <CadastroSubtitle>
            Preencha os dados para criar sua conta no sistema
          </CadastroSubtitle>
        </CadastroHeader>

        <CadastroFormContainer>
          <CadastroForm onSubmit={handleSubmit}>
            <CompanyDataForm
              cnpj={formData.cnpj}
              razaoSocial={formData.razaoSocial}
              fantasia={formData.fantasia}
              onCnpjChange={(value) => updateField('cnpj', value)}
              onRazaoSocialChange={(value) => updateField('razaoSocial', value)}
              onFantasiaChange={(value) => updateField('fantasia', value)}
              onSearchByCnpj={handleSearchByCnpj}
              errors={errors}
            />

            <AddressForm
              cep={formData.cep}
              endereco={formData.endereco}
              numero={formData.numero}
              complemento={formData.complemento}
              bairro={formData.bairro}
              cidade={formData.cidade}
              uf={formData.uf}
              onCepChange={(value) => updateField('cep', value)}
              onEnderecoChange={(value) => updateField('endereco', value)}
              onNumeroChange={(value) => updateField('numero', value)}
              onComplementoChange={(value) => updateField('complemento', value)}
              onBairroChange={(value) => updateField('bairro', value)}
              onCidadeChange={(value) => updateField('cidade', value)}
              onUfChange={(value) => updateField('uf', value)}
              errors={errors}
            />

            <ContactForm
              nomeContato={formData.nomeContato}
              telefone={formData.telefone}
              email={formData.email}
              whatsapp={formData.whatsapp}
              onNomeContatoChange={(value) => updateField('nomeContato', value)}
              onTelefoneChange={(value) => updateField('telefone', value)}
              onEmailChange={(value) => updateField('email', value)}
              onWhatsappChange={(value) => updateField('whatsapp', value)}
              errors={errors}
            />

            <PasswordForm
              password={formData.senha}
              onPasswordChange={(value) => updateField('senha', value)}
              errors={errors}
            />

            <CadastroButtonGroup>
              <CadastroButton 
                type="button" 
                variant="secondary"
                onClick={() => navigate("/login")}
              >
                Cancelar
              </CadastroButton>
              <CadastroButton 
                type="submit" 
                variant="primary"
              >
                Criar Conta
              </CadastroButton>
            </CadastroButtonGroup>
          </CadastroForm>
        </CadastroFormContainer>

        <CadastroFooter>
          <CadastroBackLink to="/login">
            <ArrowLeft className="h-5 w-5" />
            Voltar ao Login
          </CadastroBackLink>
        </CadastroFooter>
      </CadastroContent>
    </CadastroContainer>
  );
};

export default Cadastro;
