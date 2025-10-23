import { Search, Building } from "lucide-react";
import { formatCNPJ } from "@/utils/validation";
import {
  AuthFormCard,
  AuthFormHeader,
  AuthFormTitle,
  AuthFormIcon,
  AuthFormContent,
  AuthFormFullWidth,
  AuthInputGroup,
  AuthInput,
  AuthInputWithIcon,
  AuthInputButton,
  AuthError
} from "./styles.tsx";

interface CompanyDataFormProps {
  cnpj: string;
  razaoSocial: string;
  fantasia: string;
  onCnpjChange: (value: string) => void;
  onRazaoSocialChange: (value: string) => void;
  onFantasiaChange: (value: string) => void;
  onSearchByCnpj: () => void;
  errors: Record<string, string>;
}

export const CompanyDataForm = ({
  cnpj,
  razaoSocial,
  fantasia,
  onCnpjChange,
  onRazaoSocialChange,
  onFantasiaChange,
  onSearchByCnpj,
  errors,
}: CompanyDataFormProps) => {
  const handleCnpjChange = (value: string) => {
    const maskedValue = formatCNPJ(value);
    onCnpjChange(maskedValue);
  };
  return (
    <AuthFormCard delay="0.1s">
      <AuthFormHeader>
        <AuthFormTitle>
          <AuthFormIcon>
            <Building className="h-4 w-4 text-white" />
          </AuthFormIcon>
          Dados da Empresa
        </AuthFormTitle>
      </AuthFormHeader>
      <AuthFormContent>
        <AuthFormFullWidth>
          <AuthInputGroup>
            <AuthInputWithIcon
              placeholder="CNPJ *"
              value={cnpj}
              onChange={(e) => handleCnpjChange(e.target.value)}
              required
              maxLength={18}
            />
            <AuthInputButton
              type="button"
              onClick={onSearchByCnpj}
              title="Buscar dados da empresa pelo CNPJ"
            >
              <Search className="h-5 w-5" />
            </AuthInputButton>
          </AuthInputGroup>
          {errors.cnpj && (
            <AuthError>{errors.cnpj}</AuthError>
          )}
        </AuthFormFullWidth>
        
        <div>
          <AuthInput
            placeholder="Razão Social *"
            value={razaoSocial}
            onChange={(e) => onRazaoSocialChange(e.target.value)}
            required
          />
          {errors.razaoSocial && (
            <AuthError>{errors.razaoSocial}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="Fantasia *"
            value={fantasia}
            onChange={(e) => onFantasiaChange(e.target.value)}
            required
          />
          {errors.fantasia && (
            <AuthError>{errors.fantasia}</AuthError>
          )}
        </div>
      </AuthFormContent>
    </AuthFormCard>
  );
};
