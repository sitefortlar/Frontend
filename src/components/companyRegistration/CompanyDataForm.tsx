import { Search, Building, Loader2 } from "lucide-react";
import { formatCNPJ, onlyDigits } from "@/utils/formatting";
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
  isLoadingCnpj?: boolean;
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
  isLoadingCnpj = false,
  errors,
}: CompanyDataFormProps) => {
  const handleCnpjChange = (value: string) => {
    const cleanValue = onlyDigits(value);
    const limitedValue = cleanValue.slice(0, 14);
    onCnpjChange(limitedValue);
  };

  const handleSearchByCnpj = () => {
    const cleanCnpj = onlyDigits(cnpj);
    if (cleanCnpj.length === 14) {
      onSearchByCnpj();
    }
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
              placeholder="CNPJ (apenas números) *"
              value={cnpj}
              onChange={(e) => handleCnpjChange(e.target.value)}
              required
              maxLength={14}
              inputMode="numeric"
            />
            <AuthInputButton
              type="button"
              onClick={handleSearchByCnpj}
              disabled={isLoadingCnpj || onlyDigits(cnpj).length !== 14}
              title="Buscar dados da empresa pelo CNPJ"
            >
              {isLoadingCnpj ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </AuthInputButton>
          </AuthInputGroup>
          {errors.cnpj && (
            <AuthError>{errors.cnpj}</AuthError>
          )}
          {isLoadingCnpj && (
            <p className="text-blue-400 text-sm mt-1">Consultando CNPJ...</p>
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
