import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, X, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCouponContext } from '@/contexts/CouponContext';
import { useToast } from '@/hooks/use-toast';

interface CouponSectionProps {
  disabled?: boolean;
}

export const CouponSection = ({ disabled = false }: CouponSectionProps) => {
  const { appliedCoupon, loading, error, applyCoupon, removeCoupon } = useCouponContext();
  const [couponCode, setCouponCode] = useState('');
  const { toast } = useToast();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: 'Código vazio',
        description: 'Por favor, digite um código de cupom.',
        variant: 'destructive',
      });
      return;
    }

    const result = await applyCoupon(couponCode.toUpperCase());
    
    if (result.success && result.coupon) {
      toast({
        title: 'Cupom aplicado!',
        description: `Desconto de ${result.coupon.tipo === 'percentual' 
          ? `${result.coupon.valor}%` 
          : `R$ ${result.coupon.valor.toFixed(2)}`} aplicado com sucesso.`,
      });
      setCouponCode('');
    } else {
      toast({
        title: 'Cupom inválido',
        description: result.message || 'Não foi possível aplicar o cupom.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: 'Cupom removido',
      description: 'O cupom foi removido do seu pedido.',
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && !appliedCoupon) {
      handleApplyCoupon();
    }
  };

  return (
    <div className="space-y-3">
      <Separator />
      
      <div className="space-y-2">
        <label htmlFor="coupon-code" className="text-sm font-medium flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Cupom de Desconto
        </label>
        
        {!appliedCoupon ? (
          <div className="flex gap-2">
            <Input
              id="coupon-code"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Digite o código do cupom"
              disabled={loading || disabled}
              maxLength={50}
              className="flex-1"
              aria-label="Código do cupom"
              aria-describedby={error ? 'coupon-error' : undefined}
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={loading || disabled || !couponCode.trim()}
              size="default"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Validando...
                </>
              ) : (
                'Aplicar'
              )}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <div className="flex items-center gap-2 flex-1">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700">
                    {appliedCoupon.codigo}
                  </Badge>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {appliedCoupon.tipo === 'percentual'
                      ? `${appliedCoupon.valor}% de desconto`
                      : `R$ ${appliedCoupon.valor.toFixed(2)} de desconto`}
                  </span>
                </div>
                {appliedCoupon.validade_fim && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Válido até {new Date(appliedCoupon.validade_fim).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveCoupon}
              disabled={disabled}
              className="h-8 w-8 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40"
              aria-label="Remover cupom"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {error && !appliedCoupon && (
          <div className="flex items-center gap-2 text-sm text-destructive" id="coupon-error" role="alert">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
