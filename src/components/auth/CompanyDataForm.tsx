import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

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
  return (
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
            onChange={(e) => onCnpjChange(e.target.value)}
            className="h-12 pr-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
            required
          />
          <button
            type="button"
            onClick={onSearchByCnpj}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
            title="Buscar dados da empresa pelo CNPJ"
          >
            <Search className="h-5 w-5" />
          </button>
          {errors.cnpj && (
            <p className="text-red-400 text-sm mt-1">{errors.cnpj}</p>
          )}
        </div>
        
        <Input
          placeholder="Razão Social *"
          value={razaoSocial}
          onChange={(e) => onRazaoSocialChange(e.target.value)}
          className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.razaoSocial && (
          <p className="text-red-400 text-sm mt-1">{errors.razaoSocial}</p>
        )}
        
        <Input
          placeholder="Fantasia *"
          value={fantasia}
          onChange={(e) => onFantasiaChange(e.target.value)}
          className="h-12 bg-[hsl(var(--auth-input-bg))] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-300 hover:border-white/30"
          required
        />
        {errors.fantasia && (
          <p className="text-red-400 text-sm mt-1">{errors.fantasia}</p>
        )}
      </CardContent>
    </Card>
  );
};
