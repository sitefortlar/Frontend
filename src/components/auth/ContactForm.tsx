import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

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
    <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.3s'}}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-white text-lg font-semibold">
          <div className="p-2 bg-white/20 rounded-lg">
            <User className="h-4 w-4 text-white" />
          </div>
          Contato
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Nome *"
          value={nomeContato}
          onChange={(e) => onNomeContatoChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.nomeContato && (
          <p className="text-red-400 text-sm mt-1">{errors.nomeContato}</p>
        )}
        
        <Input
          placeholder="Telefone *"
          value={telefone}
          onChange={(e) => onTelefoneChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.telefone && (
          <p className="text-red-400 text-sm mt-1">{errors.telefone}</p>
        )}
        
        <Input
          type="email"
          placeholder="E-mail *"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
        
        <Input
          placeholder="WhatsApp *"
          value={whatsapp}
          onChange={(e) => onWhatsappChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.whatsapp && (
          <p className="text-red-400 text-sm mt-1">{errors.whatsapp}</p>
        )}
      </CardContent>
    </Card>
  );
};
