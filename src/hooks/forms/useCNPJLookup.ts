import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cnpjService } from '@/services/cnpjService';
import { validateCNPJ } from '@/utils/validation';
import { onlyDigits } from '@/utils/formatting';

export interface CNPJLookupResult {
  razaoSocial: string;
  nomeFantasia: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone?: string;
  email?: string;
}

/**
 * Hook para busca de dados de empresa por CNPJ
 * Aplicando Single Responsibility Principle - apenas lógica de busca de CNPJ
 */
export const useCNPJLookup = () => {
  const [isLookupEnabled, setIsLookupEnabled] = useState(false);
  const [cnpj, setCnpj] = useState('');

  // Query para buscar dados do CNPJ
  const {
    data: cnpjData,
    isLoading: isLookingUp,
    error: lookupError,
    refetch: refetchCNPJ,
  } = useQuery({
    queryKey: ['cnpj-lookup', cnpj],
    queryFn: () => cnpjService.searchByCnpj(cnpj),
    enabled: isLookupEnabled && validateCNPJ(cnpj) && onlyDigits(cnpj).length === 14,
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: 1,
  });

  /**
   * Ativa a busca de CNPJ
   */
  const enableLookup = useCallback(() => {
    setIsLookupEnabled(true);
  }, []);

  /**
   * Desativa a busca de CNPJ
   */
  const disableLookup = useCallback(() => {
    setIsLookupEnabled(false);
  }, []);

  /**
   * Define o CNPJ para busca
   */
  const setCnpjForLookup = useCallback((cnpjValue: string) => {
    const cleanCnpj = onlyDigits(cnpjValue);
    setCnpj(cleanCnpj);
  }, []);

  /**
   * Força uma nova busca
   */
  const lookupCNPJ = useCallback(() => {
    if (validateCNPJ(cnpj) && onlyDigits(cnpj).length === 14) {
      refetchCNPJ();
    }
  }, [cnpj, refetchCNPJ]);

  /**
   * Verifica se o CNPJ é válido para busca
   */
  const isValidForLookup = useCallback((cnpjValue: string): boolean => {
    const cleanCnpj = onlyDigits(cnpjValue);
    return validateCNPJ(cnpjValue) && cleanCnpj.length === 14;
  }, []);

  return {
    // Dados
    cnpjData: cnpjData as CNPJLookupResult | undefined,
    
    // Estados
    isLookingUp,
    isLookupEnabled,
    lookupError,
    
    // Funções
    enableLookup,
    disableLookup,
    setCnpjForLookup,
    lookupCNPJ,
    isValidForLookup,
  };
};
