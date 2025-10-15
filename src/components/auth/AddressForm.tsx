import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { BRAZILIAN_STATES } from "@/constants/auth";

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
    <Card className="bg-[hsl(var(--auth-form-bg))] backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-white text-lg font-semibold">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-4 w-4 text-white" />
          </div>
          Endereço
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="CEP *"
          value={cep}
          onChange={(e) => onCepChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.cep && (
          <p className="text-red-400 text-sm mt-1">{errors.cep}</p>
        )}
        
        <Input
          placeholder="Endereço *"
          value={endereco}
          onChange={(e) => onEnderecoChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.endereco && (
          <p className="text-red-400 text-sm mt-1">{errors.endereco}</p>
        )}
        
        <Input
          placeholder="Número *"
          value={numero}
          onChange={(e) => onNumeroChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.numero && (
          <p className="text-red-400 text-sm mt-1">{errors.numero}</p>
        )}
        
        <Input
          placeholder="Complemento *"
          value={complemento}
          onChange={(e) => onComplementoChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.complemento && (
          <p className="text-red-400 text-sm mt-1">{errors.complemento}</p>
        )}
        
        <Input
          placeholder="Bairro *"
          value={bairro}
          onChange={(e) => onBairroChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.bairro && (
          <p className="text-red-400 text-sm mt-1">{errors.bairro}</p>
        )}
        
        <Input
          placeholder="Cidade *"
          value={cidade}
          onChange={(e) => onCidadeChange(e.target.value)}
          className="h-11 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.cidade && (
          <p className="text-red-400 text-sm mt-1">{errors.cidade}</p>
        )}
        
        <Select value={uf} onValueChange={onUfChange}>
          <SelectTrigger className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white focus:border-white/40">
            <SelectValue placeholder="UF *" />
          </SelectTrigger>
          <SelectContent className="bg-[hsl(var(--auth-bg-start))] border-white/20">
            {BRAZILIAN_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.uf && (
          <p className="text-red-400 text-sm mt-1">{errors.uf}</p>
        )}
      </CardContent>
    </Card>
  );
};
