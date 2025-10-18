import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button, AuthLayout } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { CompanyDataForm } from "@/components/auth/CompanyDataForm";
import { AddressForm } from "@/components/auth/AddressForm";
import { ContactForm } from "@/components/auth/ContactForm";
import { PasswordForm } from "@/components/auth/PasswordForm";
import { AUTH_MESSAGES } from "@/constants/auth";

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
    <AuthLayout
      title="Cadastro de Cliente"
      subtitle="Preencha os dados para criar sua conta no sistema"
      showLogo={false}
      footer={
        <div className="flex items-center justify-between">
          <Link 
            to="/login" 
            className="text-white hover:text-white/80 transition-all duration-300 p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transform hover:scale-105 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar ao Login
          </Link>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/login")}
              className="px-6 h-11 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="default"
              className="px-6 h-11 bg-[hsl(var(--auth-button))] hover:bg-[hsl(var(--primary-glow))] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Criar Conta
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Cadastro;
