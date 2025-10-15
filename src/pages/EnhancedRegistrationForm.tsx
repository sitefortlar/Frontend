import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, MapPin, User, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCnpjService, CnpjServiceError } from '@/services/cnpjService';
import { useCepService, CepServiceError } from '@/services/cepService';
import { CnpjInput, PhoneInput, CepInput } from '@/components/inputs';
import { AUTH_MESSAGES } from '@/constants/auth';
import fortLarLogo from '@/assets/fort-lar-logo.png';

/**
 * Formulário de cadastro aprimorado com máscaras dinâmicas e travas de dígitos
 * Demonstra o funcionamento completo dos componentes de input
 */
const EnhancedRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { searchByCnpj } = useCnpjService();
  const { searchByCep } = useCepService();

  // Estados do formulário
  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    fantasia: '',
    nomeContato: '',
    email: '',
    telefone: '',
    senha: '',
  });

  const [addressData, setAddressData] = useState({
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  // Estados de loading e validação
  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cnpjError, setCnpjError] = useState('');

  /**
   * Busca dados da empresa por CNPJ
   * Executada automaticamente quando CNPJ é válido e completo
   */
  const handleCnpjSearch = async () => {
    if (!formData.cnpj) {
      setCnpjError('CNPJ é obrigatório');
      return;
    }

    setIsLoadingCnpj(true);
    setCnpjError('');

    try {
      const data = await searchByCnpj(formData.cnpj);
      
      // Preenche automaticamente os campos
      setFormData(prev => ({
        ...prev,
        razaoSocial: data.razaoSocial,
        fantasia: data.nomeFantasia,
      }));

      setAddressData(prev => ({
        ...prev,
        endereco: data.logradouro,
        numero: data.numero,
        complemento: data.complemento || '',
        bairro: data.bairro,
        cidade: data.municipio,
        uf: data.uf,
        cep: data.cep,
      }));

      toast({
        title: "✅ Dados encontrados!",
        description: "Os dados da empresa foram preenchidos automaticamente.",
      });

    } catch (error) {
      const cnpjError = error as CnpjServiceError;
      
      let errorMessage = 'Erro ao buscar dados do CNPJ';
      
      switch (cnpjError.type) {
        case 'INVALID_CNPJ':
          errorMessage = 'CNPJ inválido';
          break;
        case 'NOT_FOUND':
          errorMessage = 'CNPJ não encontrado na base de dados';
          break;
        case 'RATE_LIMIT':
          errorMessage = 'Muitas consultas. Aguarde um momento e tente novamente.';
          break;
        case 'NETWORK_ERROR':
          errorMessage = 'Erro de conexão. Verifique sua internet.';
          break;
        case 'API_ERROR':
          errorMessage = 'Erro na API. Tente novamente.';
          break;
      }

      setCnpjError(errorMessage);
      toast({
        title: "❌ Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoadingCnpj(false);
    }
  };

  /**
   * Busca endereço por CEP
   */
  const handleCepSearch = async () => {
    if (!addressData.cep) {
      toast({
        title: "CEP necessário",
        description: "Digite um CEP para buscar o endereço",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingCep(true);

    try {
      const data = await searchByCep(addressData.cep);
      
      setAddressData(prev => ({
        ...prev,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      }));

      toast({
        title: "✅ Endereço encontrado!",
        description: "O endereço foi preenchido automaticamente.",
      });

    } catch (error) {
      const cepError = error as CepServiceError;
      
      let errorMessage = 'Erro ao buscar endereço';
      
      switch (cepError.type) {
        case 'INVALID_CEP':
          errorMessage = 'CEP inválido';
          break;
        case 'NOT_FOUND':
          errorMessage = 'CEP não encontrado';
          break;
        case 'NETWORK_ERROR':
          errorMessage = 'Erro de conexão. Verifique sua internet.';
          break;
        case 'API_ERROR':
          errorMessage = 'Erro na API. Tente novamente.';
          break;
      }

      toast({
        title: "❌ Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  /**
   * Submete o formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.cnpj || !formData.razaoSocial || !formData.fantasia) {
      toast({
        title: "❌ Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simula envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "🎉 Cadastro realizado!",
        description: AUTH_MESSAGES.REGISTRATION_SUCCESS,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      toast({
        title: "❌ Erro",
        description: "Erro ao realizar cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-auth)' }}>
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/3 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block p-5 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 mb-4">
              <img 
                src={fortLarLogo} 
                alt="Fort-Lar Logo" 
                className="h-12 mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Cadastro de Empresa</h1>
            <p className="text-white/80">Formulário com máscaras dinâmicas e validação em tempo real</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados da Empresa */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  Dados da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <CnpjInput
                    value={formData.cnpj}
                    onChange={(value) => setFormData(prev => ({ ...prev, cnpj: value }))}
                    onSearch={handleCnpjSearch}
                    showSearchButton={true}
                    isLoading={isLoadingCnpj}
                    error={cnpjError}
                  />
                </div>
                
                <Input
                  placeholder="Razão Social *"
                  value={formData.razaoSocial}
                  onChange={(e) => setFormData(prev => ({ ...prev, razaoSocial: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                
                <Input
                  placeholder="Nome Fantasia *"
                  value={formData.fantasia}
                  onChange={(e) => setFormData(prev => ({ ...prev, fantasia: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <CepInput
                    value={addressData.cep}
                    onChange={(value) => setAddressData(prev => ({ ...prev, cep: value }))}
                    onSearch={handleCepSearch}
                    showSearchButton={true}
                    isLoading={isLoadingCep}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Input
                    placeholder="Endereço *"
                    value={addressData.endereco}
                    onChange={(e) => setAddressData(prev => ({ ...prev, endereco: e.target.value }))}
                    className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                    required
                  />
                </div>
                
                <Input
                  placeholder="Número *"
                  value={addressData.numero}
                  onChange={(e) => setAddressData(prev => ({ ...prev, numero: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                
                <Input
                  placeholder="Complemento"
                  value={addressData.complemento}
                  onChange={(e) => setAddressData(prev => ({ ...prev, complemento: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                />
                
                <Input
                  placeholder="Bairro *"
                  value={addressData.bairro}
                  onChange={(e) => setAddressData(prev => ({ ...prev, bairro: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                
                <Input
                  placeholder="Cidade *"
                  value={addressData.cidade}
                  onChange={(e) => setAddressData(prev => ({ ...prev, cidade: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                
                <Input
                  placeholder="UF *"
                  value={addressData.uf}
                  onChange={(e) => setAddressData(prev => ({ ...prev, uf: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  maxLength={2}
                  required
                />
              </CardContent>
            </Card>

            {/* Contato */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
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
                  placeholder="Nome do Contato *"
                  value={formData.nomeContato}
                  onChange={(e) => setFormData(prev => ({ ...prev, nomeContato: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                
                <PhoneInput
                  value={formData.telefone}
                  onChange={(value) => setFormData(prev => ({ ...prev, telefone: value }))}
                />
                
                <Input
                  type="email"
                  placeholder="E-mail *"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
                
                <Input
                  type="password"
                  placeholder="Senha *"
                  value={formData.senha}
                  onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                  className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
                  required
                />
              </CardContent>
            </Card>

            {/* Features Demo */}
            <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  Funcionalidades Demonstradas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">✅ Máscaras Dinâmicas</h4>
                    <ul className="text-sm space-y-1">
                      <li>• CNPJ: 14 dígitos máximo (99.999.999/9999-99)</li>
                      <li>• CEP: 8 dígitos máximo (99999-999)</li>
                      <li>• Telefone: 10-11 dígitos ((99) 9999-9999)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">✅ Validação em Tempo Real</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Validação de dígitos verificadores</li>
                      <li>• Feedback visual (ícones de status)</li>
                      <li>• Mensagens de erro específicas</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">✅ Busca Automática</h4>
                    <ul className="text-sm space-y-1">
                      <li>• CNPJ → ReceitaWS API</li>
                      <li>• CEP → ViaCEP API</li>
                      <li>• Preenchimento automático</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">✅ Tratamento de Erros</h4>
                    <ul className="text-sm space-y-1">
                      <li>• CNPJ inválido/inexistente</li>
                      <li>• Erros de rede/API</li>
                      <li>• Rate limiting</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link
                to="/login"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Login
              </Link>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Empresa'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRegistrationForm;
