import { User } from "lucide-react";
import {
  AuthFormCard,
  AuthFormHeader,
  AuthFormTitle,
  AuthFormIcon,
  AuthFormContent,
  AuthInput,
  AuthError
} from "./styles.tsx";

interface ContactFormProps {
  nomeContato: string;
  telefone: string;
  email: string;
  whatsapp: string;
  onNomeContatoChange: (value: string) => void;
  onTelefoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  errors: Record<string, string>;
}

export const ContactForm = ({
  nomeContato,
  telefone,
  email,
  whatsapp,
  onNomeContatoChange,
  onTelefoneChange,
  onEmailChange,
  onWhatsappChange,
  errors,
}: ContactFormProps) => {
  return (
    <AuthFormCard delay="0.3s">
      <AuthFormHeader>
        <AuthFormTitle>
          <AuthFormIcon>
            <User className="h-4 w-4 text-white" />
          </AuthFormIcon>
          Contato
        </AuthFormTitle>
      </AuthFormHeader>
      <AuthFormContent>
        <div>
          <AuthInput
            placeholder="Nome *"
            value={nomeContato}
            onChange={(e) => onNomeContatoChange(e.target.value)}
            required
          />
          {errors.nomeContato && (
            <AuthError>{errors.nomeContato}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="Telefone *"
            value={telefone}
            onChange={(e) => onTelefoneChange(e.target.value)}
            required
          />
          {errors.telefone && (
            <AuthError>{errors.telefone}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            type="email"
            placeholder="E-mail *"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
          {errors.email && (
            <AuthError>{errors.email}</AuthError>
          )}
        </div>
        
        <div>
          <AuthInput
            placeholder="WhatsApp *"
            value={whatsapp}
            onChange={(e) => onWhatsappChange(e.target.value)}
            required
          />
          {errors.whatsapp && (
            <AuthError>{errors.whatsapp}</AuthError>
          )}
        </div>
      </AuthFormContent>
    </AuthFormCard>
  );
};
