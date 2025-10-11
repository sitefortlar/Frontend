import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-auth)' }}>
      {/* Floating elements */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-32 left-16 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>

      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          {/* Header with glassmorphism */}
          <div className="flex items-center mb-8 animate-fade-in">
            <Link to="/login" className="text-white hover:text-white/80 transition-all duration-300 mr-4 p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transform hover:scale-105">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 flex-1">
              <h1 className="text-3xl font-bold text-white mb-1">Cadastro de Cliente</h1>
              <p className="text-white/90 text-base">Preencha os dados para criar sua conta no sistema</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
            <div className="flex justify-end space-x-4 animate-slide-up" style={{animationDelay: '0.5s'}}>
              <Button 
                type="button" 
                onClick={() => navigate("/login")}
                className="px-8 h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="px-8 h-12 bg-[hsl(var(--auth-button))] hover:bg-[hsl(var(--primary-glow))] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Criar Conta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
