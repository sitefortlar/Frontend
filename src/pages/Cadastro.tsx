import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building, User, FileText, Search, Lock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearchByCnpj = () => {
    if (!cnpj) {
      toast({
        title: "CNPJ necessário",
        description: "Digite um CNPJ para buscar os dados da empresa.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Buscando dados...",
      description: "Funcionalidade em desenvolvimento.",
    });
  };
  
  // Dados da empresa - campos aparentes
  const [razaoSocial, setRazaoSocial] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  
  // Campos ocultos com códigos numéricos
  const [origem] = useState("001"); // Código numérico para origem
  const [pais] = useState("1058"); // Brasil
  const [regimeTributario] = useState("001"); // Código numérico para regime
  const [regiao] = useState("001"); // Código numérico para região
  const [ramoAtividade] = useState("001"); // Código numérico para ramo
  const [vendedor] = useState("001"); // Código numérico para vendedor
  
  // Endereço
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [ibge] = useState(""); // Oculto mas obrigatório, será preenchido via CEP

  // Contatos
  const [nomeContato, setNomeContato] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [senha, setSenha] = useState("");

  // Validações da senha em tempo real
  const senhaValidations = {
    hasMinLength: senha.length >= 8,
    hasUppercase: /[A-Z]/.test(senha),
    hasNumber: /\d/.test(senha),
    hasSpecialChar: /[@$!%*?&]/.test(senha)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se todos os campos obrigatórios estão preenchidos
    const requiredFields = [
      razaoSocial, fantasia, cep, endereco, numero, complemento, bairro, 
      cidade, uf, cnpj, nomeContato, telefone, email, whatsapp, senha
    ];
    
    // Validar senha
    const allPasswordValidationsPass = Object.values(senhaValidations).every(Boolean);
    if (!allPasswordValidationsPass) {
      toast({
        title: "Senha inválida",
        description: "A senha deve atender todos os critérios de segurança.",
        variant: "destructive"
      });
      return;
    }
    
    if (requiredFields.some(field => !field)) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Cadastro realizado!",
      description: "Sua conta foi criada com sucesso. Redirecionando para o login...",
    });

    setTimeout(() => {
      navigate("/");
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
            {/* Dados da Empresa */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.1s'}}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  Dados da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative group md:col-span-2">
                  <Input
                    placeholder="CNPJ *"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    className="h-12 pr-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSearchByCnpj}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
                    title="Buscar dados da empresa pelo CNPJ"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
                
                <Input
                  placeholder="Razão Social *"
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="Fantasia *"
                  value={fantasia}
                  onChange={(e) => setFantasia(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  placeholder="CEP *"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="Endereço *"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="Número *"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="Complemento *"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="Bairro *"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="Cidade *"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Select value={uf} onValueChange={setUf}>
                  <SelectTrigger className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white focus:border-white/40">
                    <SelectValue placeholder="UF *" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--auth-bg-start))] border-white/20">
                    <SelectItem value="AC">AC</SelectItem>
                    <SelectItem value="AL">AL</SelectItem>
                    <SelectItem value="AP">AP</SelectItem>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="BA">BA</SelectItem>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="DF">DF</SelectItem>
                    <SelectItem value="ES">ES</SelectItem>
                    <SelectItem value="GO">GO</SelectItem>
                    <SelectItem value="MA">MA</SelectItem>
                    <SelectItem value="MT">MT</SelectItem>
                    <SelectItem value="MS">MS</SelectItem>
                    <SelectItem value="MG">MG</SelectItem>
                    <SelectItem value="PA">PA</SelectItem>
                    <SelectItem value="PB">PB</SelectItem>
                    <SelectItem value="PR">PR</SelectItem>
                    <SelectItem value="PE">PE</SelectItem>
                    <SelectItem value="PI">PI</SelectItem>
                    <SelectItem value="RJ">RJ</SelectItem>
                    <SelectItem value="RN">RN</SelectItem>
                    <SelectItem value="RS">RS</SelectItem>
                    <SelectItem value="RO">RO</SelectItem>
                    <SelectItem value="RR">RR</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="SP">SP</SelectItem>
                    <SelectItem value="SE">SE</SelectItem>
                    <SelectItem value="TO">TO</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.3s'}}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  placeholder="Nome *"
                  value={nomeContato}
                  onChange={(e) => setNomeContato(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="Telefone *"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  type="email"
                  placeholder="E-mail *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                <Input
                  placeholder="WhatsApp *"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
              </CardContent>
            </Card>

            {/* Senha */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.4s'}}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  Senha de Acesso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input
                  type="password"
                  placeholder="Senha *"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                
                {/* Checklist de validação */}
                <div className="space-y-3">
                  <p className="text-white/90 text-sm font-medium">Critérios de segurança:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      senhaValidations.hasMinLength 
                        ? 'text-green-400' 
                        : 'text-white/60'
                    }`}>
                      {senhaValidations.hasMinLength ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      Mínimo 8 caracteres
                    </div>
                    
                    <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      senhaValidations.hasUppercase 
                        ? 'text-green-400' 
                        : 'text-white/60'
                    }`}>
                      {senhaValidations.hasUppercase ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      Uma letra maiúscula
                    </div>
                    
                    <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      senhaValidations.hasNumber 
                        ? 'text-green-400' 
                        : 'text-white/60'
                    }`}>
                      {senhaValidations.hasNumber ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      Um número
                    </div>
                    
                    <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      senhaValidations.hasSpecialChar 
                        ? 'text-green-400' 
                        : 'text-white/60'
                    }`}>
                      {senhaValidations.hasSpecialChar ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      Um caractere especial (@$!%*?&)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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