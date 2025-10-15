# Exemplo de Uso - Formulário de Cadastro

## 🚀 Implementação Completa

Este documento mostra como usar a implementação refatorada do formulário de cadastro com máscaras, validação e integração com APIs.

## 📋 Pré-requisitos

```bash
# Instalar dependências
npm install react-input-mask @types/react-input-mask

# Configurar variáveis de ambiente
echo "REACT_APP_CNPJ_API_URL=https://brasilapi.com.br/api/cnpj/v1" >> .env
echo "REACT_APP_CEP_API_URL=https://viacep.com.br/ws" >> .env
```

## 🎯 Exemplo 1: Uso Básico dos Componentes

```tsx
import React, { useState } from 'react';
import { CnpjInput, PhoneInput, CepInput } from '@/components/inputs';

const BasicForm = () => {
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');

  return (
    <form className="space-y-4">
      <CnpjInput
        value={cnpj}
        onChange={setCnpj}
        placeholder="Digite o CNPJ"
      />
      
      <PhoneInput
        value={phone}
        onChange={setPhone}
        placeholder="Digite o telefone"
      />
      
      <CepInput
        value={cep}
        onChange={setCep}
        placeholder="Digite o CEP"
      />
    </form>
  );
};
```

## 🎯 Exemplo 2: Com Busca Automática

```tsx
import React, { useState } from 'react';
import { CnpjInput, CepInput } from '@/components/inputs';
import { useCnpjService, useCepService } from '@/services';
import { useToast } from '@/hooks/use-toast';

const AutoSearchForm = () => {
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  
  const { searchByCnpj } = useCnpjService();
  const { searchByCep } = useCepService();
  const { toast } = useToast();

  const handleCnpjSearch = async () => {
    if (!cnpj) return;
    
    setIsLoadingCnpj(true);
    try {
      const data = await searchByCnpj(cnpj);
      toast({
        title: "Sucesso!",
        description: `Empresa encontrada: ${data.razaoSocial}`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "CNPJ não encontrado",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCnpj(false);
    }
  };

  const handleCepSearch = async () => {
    if (!cep) return;
    
    setIsLoadingCep(true);
    try {
      const data = await searchByCep(cep);
      toast({
        title: "Sucesso!",
        description: `Endereço encontrado: ${data.logradouro}`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "CEP não encontrado",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  return (
    <form className="space-y-4">
      <CnpjInput
        value={cnpj}
        onChange={setCnpj}
        onSearch={handleCnpjSearch}
        showSearchButton={true}
        isLoading={isLoadingCnpj}
      />
      
      <CepInput
        value={cep}
        onChange={setCep}
        onSearch={handleCepSearch}
        showSearchButton={true}
        isLoading={isLoadingCep}
      />
    </form>
  );
};
```

## 🎯 Exemplo 3: Com Hook useMaskedInputs

```tsx
import React from 'react';
import { CnpjInput, PhoneInput, CepInput } from '@/components/inputs';
import { useMaskedInputs } from '@/hooks/useMaskedInputs';

const HookForm = () => {
  const {
    cnpj,
    setCnpj,
    phone,
    setPhone,
    cep,
    setCep,
    validateAll,
    clearAllErrors,
  } = useMaskedInputs();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateAll()) {
      console.log('Formulário válido!');
      console.log({ cnpj: cnpj.value, phone: phone.value, cep: cep.value });
    } else {
      console.log('Formulário inválido!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CnpjInput
        value={cnpj.value}
        onChange={setCnpj}
        error={cnpj.error}
      />
      
      <PhoneInput
        value={phone.value}
        onChange={setPhone}
        error={phone.error}
      />
      
      <CepInput
        value={cep.value}
        onChange={setCep}
        error={cep.error}
      />
      
      <button type="submit">Enviar</button>
      <button type="button" onClick={clearAllErrors}>
        Limpar Erros
      </button>
    </form>
  );
};
```

## 🎯 Exemplo 4: Formulário Completo com Preenchimento Automático

```tsx
import React, { useState } from 'react';
import { CnpjInput, PhoneInput, CepInput } from '@/components/inputs';
import { useCnpjService, useCepService } from '@/services';
import { useToast } from '@/hooks/use-toast';

const CompleteForm = () => {
  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    fantasia: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const { searchByCnpj } = useCnpjService();
  const { searchByCep } = useCepService();
  const { toast } = useToast();

  const handleCnpjSearch = async () => {
    if (!formData.cnpj) return;

    setIsLoadingCnpj(true);
    try {
      const data = await searchByCnpj(formData.cnpj);
      
      setFormData(prev => ({
        ...prev,
        razaoSocial: data.razaoSocial,
        fantasia: data.nomeFantasia,
        endereco: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.municipio,
        uf: data.uf,
        cep: data.cep,
      }));

      toast({
        title: "Dados encontrados!",
        description: "Os dados da empresa foram preenchidos automaticamente.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "CNPJ não encontrado ou inválido",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCnpj(false);
    }
  };

  const handleCepSearch = async () => {
    if (!formData.cep) return;

    setIsLoadingCep(true);
    try {
      const data = await searchByCep(formData.cep);
      
      setFormData(prev => ({
        ...prev,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      }));

      toast({
        title: "Endereço encontrado!",
        description: "O endereço foi preenchido automaticamente.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "CEP não encontrado",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  return (
    <form className="space-y-6">
      {/* CNPJ */}
      <div>
        <label className="block text-sm font-medium mb-2">CNPJ</label>
        <CnpjInput
          value={formData.cnpj}
          onChange={(value) => setFormData(prev => ({ ...prev, cnpj: value }))}
          onSearch={handleCnpjSearch}
          showSearchButton={true}
          isLoading={isLoadingCnpj}
        />
      </div>

      {/* Razão Social */}
      <div>
        <label className="block text-sm font-medium mb-2">Razão Social</label>
        <input
          type="text"
          value={formData.razaoSocial}
          onChange={(e) => setFormData(prev => ({ ...prev, razaoSocial: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Digite a razão social"
        />
      </div>

      {/* Nome Fantasia */}
      <div>
        <label className="block text-sm font-medium mb-2">Nome Fantasia</label>
        <input
          type="text"
          value={formData.fantasia}
          onChange={(e) => setFormData(prev => ({ ...prev, fantasia: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Digite o nome fantasia"
        />
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium mb-2">Telefone</label>
        <PhoneInput
          value={formData.telefone}
          onChange={(value) => setFormData(prev => ({ ...prev, telefone: value }))}
        />
      </div>

      {/* CEP */}
      <div>
        <label className="block text-sm font-medium mb-2">CEP</label>
        <CepInput
          value={formData.cep}
          onChange={(value) => setFormData(prev => ({ ...prev, cep: value }))}
          onSearch={handleCepSearch}
          showSearchButton={true}
          isLoading={isLoadingCep}
        />
      </div>

      {/* Endereço */}
      <div>
        <label className="block text-sm font-medium mb-2">Endereço</label>
        <input
          type="text"
          value={formData.endereco}
          onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Digite o endereço"
        />
      </div>

      {/* Número */}
      <div>
        <label className="block text-sm font-medium mb-2">Número</label>
        <input
          type="text"
          value={formData.numero}
          onChange={(e) => setFormData(prev => ({ ...prev, numero: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Digite o número"
        />
      </div>

      {/* Bairro */}
      <div>
        <label className="block text-sm font-medium mb-2">Bairro</label>
        <input
          type="text"
          value={formData.bairro}
          onChange={(e) => setFormData(prev => ({ ...prev, bairro: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Digite o bairro"
        />
      </div>

      {/* Cidade */}
      <div>
        <label className="block text-sm font-medium mb-2">Cidade</label>
        <input
          type="text"
          value={formData.cidade}
          onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Digite a cidade"
        />
      </div>

      {/* UF */}
      <div>
        <label className="block text-sm font-medium mb-2">UF</label>
        <input
          type="text"
          value={formData.uf}
          onChange={(e) => setFormData(prev => ({ ...prev, uf: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Digite a UF"
          maxLength={2}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
      >
        Cadastrar Empresa
      </button>
    </form>
  );
};
```

## 🎯 Exemplo 5: Teste de Validação

```typescript
import { validateCNPJ, validatePhone, validateCEP } from '@/utils/validation';

// Teste de CNPJ
console.log(validateCNPJ('11222333000181')); // true
console.log(validateCNPJ('11111111111111')); // false
console.log(validateCNPJ('11.222.333/0001-81')); // true

// Teste de telefone
console.log(validatePhone('11933334444')); // true
console.log(validatePhone('1133334444')); // true
console.log(validatePhone('(11) 93333-4444')); // true

// Teste de CEP
console.log(validateCEP('01234567')); // true
console.log(validateCEP('01234-567')); // true
console.log(validateCEP('1234567')); // false
```

## 🎯 Exemplo 6: Configuração de API Customizada

```typescript
import { CnpjService } from '@/services/cnpjService';

// Usar API customizada
const customCnpjService = new CnpjService('https://minha-api-cnpj.com/v1');

// Buscar CNPJ
const data = await customCnpjService.searchByCnpj('11222333000181');
console.log(data);
```

## 🎯 Exemplo 7: Tratamento de Erros

```typescript
import { useCnpjService } from '@/services/cnpjService';

const MyComponent = () => {
  const { searchByCnpj } = useCnpjService();

  const handleSearch = async (cnpj: string) => {
    try {
      const data = await searchByCnpj(cnpj);
      // Sucesso
      console.log('Dados encontrados:', data);
    } catch (error) {
      // Tratar diferentes tipos de erro
      switch (error.type) {
        case 'INVALID_CNPJ':
          console.error('CNPJ inválido');
          break;
        case 'NOT_FOUND':
          console.error('CNPJ não encontrado');
          break;
        case 'NETWORK_ERROR':
          console.error('Erro de conexão');
          break;
        case 'API_ERROR':
          console.error('Erro na API');
          break;
        default:
          console.error('Erro desconhecido');
      }
    }
  };

  return (
    <button onClick={() => handleSearch('11222333000181')}>
      Buscar CNPJ
    </button>
  );
};
```

## 🎯 Exemplo 8: Integração com Formulário Existente

```tsx
import React, { useState } from 'react';
import { CnpjInput } from '@/components/inputs';
import { useCnpjService } from '@/services/cnpjService';

const ExistingForm = () => {
  const [cnpj, setCnpj] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const { searchByCnpj } = useCnpjService();

  const handleCnpjChange = async (value: string) => {
    setCnpj(value);
    
    // Buscar automaticamente quando CNPJ estiver completo
    if (value.replace(/\D/g, '').length === 14) {
      try {
        const data = await searchByCnpj(value);
        setCompanyData(data);
      } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
      }
    }
  };

  return (
    <div>
      <CnpjInput
        value={cnpj}
        onChange={handleCnpjChange}
        placeholder="Digite o CNPJ"
      />
      
      {companyData && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h3>Dados da Empresa:</h3>
          <p><strong>Razão Social:</strong> {companyData.razaoSocial}</p>
          <p><strong>Nome Fantasia:</strong> {companyData.nomeFantasia}</p>
          <p><strong>Endereço:</strong> {companyData.logradouro}</p>
        </div>
      )}
    </div>
  );
};
```

## 🎯 Exemplo 9: Máscara Customizada

```tsx
import React from 'react';
import { MaskedInput } from '@/components/inputs';

const CustomMaskedInput = () => {
  const [value, setValue] = useState('');

  return (
    <MaskedInput
      mask="999.999.999-99"
      maskChar=""
      value={value}
      onChange={setValue}
      placeholder="Digite o CPF"
      className="custom-input"
    />
  );
};
```

## 🎯 Exemplo 10: Validação em Tempo Real

```tsx
import React, { useState, useEffect } from 'react';
import { CnpjInput } from '@/components/inputs';
import { validateCNPJ } from '@/utils/validation';

const RealTimeValidation = () => {
  const [cnpj, setCnpj] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cnpj) {
      const valid = validateCNPJ(cnpj);
      setIsValid(valid);
      setError(valid ? '' : 'CNPJ inválido');
    } else {
      setIsValid(false);
      setError('');
    }
  }, [cnpj]);

  return (
    <div>
      <CnpjInput
        value={cnpj}
        onChange={setCnpj}
        error={error}
      />
      
      {cnpj && (
        <div className={`mt-2 text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
          {isValid ? 'CNPJ válido' : 'CNPJ inválido'}
        </div>
      )}
    </div>
  );
};
```

## 🚀 Próximos Passos

1. **Teste a implementação** com os exemplos acima
2. **Configure as APIs** conforme a documentação
3. **Customize os estilos** conforme necessário
4. **Adicione testes** para seus casos específicos
5. **Integre com seu sistema** existente

## 📚 Recursos Adicionais

- [Documentação da API de CNPJ](./API_CONFIGURATION.md)
- [README do Formulário](./REGISTRATION_FORM_README.md)
- [Testes Unitários](./src/tests/)
- [Componentes de Input](./src/components/inputs/)
