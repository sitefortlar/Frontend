import { FileText, Search, Loader2 } from "lucide-react";
import { BRAZILIAN_STATES } from "@/constants/auth";
import { formatCEP, onlyDigits } from "@/utils/formatting";
import {
  AuthFormCard,
  AuthFormHeader,
  AuthFormTitle,
  AuthFormIcon,
  AuthFormContent,
  AuthInput,
  AuthSelect,
  AuthError,
  AuthInputGroup,
  AuthInputWithIcon,
  AuthInputButton
} from "./styles.tsx";

interface AddressFormProps {
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  onCepChange: (value: string) => void;
  onEnderecoChange: (value: string) => void;
  onNumeroChange: (value: string) => void;
  onComplementoChange: (value: string) => void;
  onBairroChange: (value: string) => void;
  onCidadeChange: (value: string) => void;
  onUfChange: (value: string) => void;
  onSearchByCep: () => void;
  isLoadingCep?: boolean;
  errors: Record<string, string>;
}

export const AddressForm = ({
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  onCepChange,
  onEnderecoChange,
  onNumeroChange,
  onComplementoChange,
  onBairroChange,
  onCidadeChange,
  onUfChange,
  onSearchByCep,
  isLoadingCep = false,
  errors,
}: AddressFormProps) => {
  const handleCepChange = (value: string) => {
    const cleanValue = onlyDigits(value);
    const limitedValue = cleanValue.slice(0, 8);
    const formattedValue = formatCEP(limitedValue);
    onCepChange(formattedValue);
  };

  const handleSearchByCep = () => {
    const cleanCep = onlyDigits(cep);
    if (cleanCep.length === 8) {
      onSearchByCep();
    }
  };
  return (
    <AuthFormCard delay="0.2s">
      <AuthFormHeader>
        <AuthFormTitle>
          <AuthFormIcon>
            <FileText className="h-4 w-4 text-white" />
          </AuthFormIcon>
          Endereço
        </AuthFormTitle>
      </AuthFormHeader>
      <AuthFormContent>
        <div>
          <AuthInputGroup>
            <AuthInputWithIcon
              placeholder="CEP *"
              value={cep}
              onChange={(e) => handleCepChange(e.target.value)}
              required
              maxLength={9}
            />
            <AuthInputButton
              type="button"
              onClick={handleSearchByCep}
              disabled={isLoadingCep || onlyDigits(cep).length !== 8}
              title="Buscar endereço pelo CEP"
            >
              {isLoadingCep ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </AuthInputButton>
          </AuthInputGroup>
          {errors.cep && (
            <AuthError>{errors.cep}</AuthError>
          )}
          {isLoadingCep && (
            <p className="text-blue-400 text-sm mt-1">Consultando CEP...</p>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="Endereço *"
            value={endereco}
            onChange={(e) => onEnderecoChange(e.target.value)}
            required
          />
          {errors.endereco && (
            <AuthError>{errors.endereco}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="Número *"
            value={numero}
            onChange={(e) => onNumeroChange(e.target.value)}
            required
          />
          {errors.numero && (
            <AuthError>{errors.numero}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="Complemento *"
            value={complemento}
            onChange={(e) => onComplementoChange(e.target.value)}
            required
          />
          {errors.complemento && (
            <AuthError>{errors.complemento}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="Bairro *"
            value={bairro}
            onChange={(e) => onBairroChange(e.target.value)}
            required
          />
          {errors.bairro && (
            <AuthError>{errors.bairro}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="Cidade *"
            value={cidade}
            onChange={(e) => onCidadeChange(e.target.value)}
            required
          />
          {errors.cidade && (
            <AuthError>{errors.cidade}</AuthError>
          )}
        </div>
        
        <div>
          <AuthSelect
            value={uf}
            onChange={(e) => onUfChange(e.target.value)}
            required
          >
            <option value="">UF *</option>
            {BRAZILIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </AuthSelect>
          {errors.uf && (
            <AuthError>{errors.uf}</AuthError>
          )}
        </div>
      </AuthFormContent>
    </AuthFormCard>
  );
};
