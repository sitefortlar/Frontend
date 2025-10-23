import { FileText } from "lucide-react";
import { BRAZILIAN_STATES } from "@/constants/auth";
import {
  AuthFormCard,
  AuthFormHeader,
  AuthFormTitle,
  AuthFormIcon,
  AuthFormContent,
  AuthInput,
  AuthSelect,
  AuthError
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
  errors,
}: AddressFormProps) => {
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
          <AuthInput
            placeholder="CEP *"
            value={cep}
            onChange={(e) => onCepChange(e.target.value)}
            required
            maxLength={9}
          />
          {errors.cep && (
            <AuthError>{errors.cep}</AuthError>
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
