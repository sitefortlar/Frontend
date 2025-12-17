import { useEffect } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAuthContext } from '@/contexts/AuthContext';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import {
  CatalogContainer,
  FloatingElement,
  CatalogErrorContainer,
  CatalogErrorContent,
  CatalogErrorCard,
  CatalogErrorTitle,
  CatalogErrorDescription,
  CatalogErrorButton,
  CatalogContent
} from './styles';

const CatalogPage = () => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const { refreshUser, user: contextUser } = useAuthContext();

  // Garantir que o contexto carregue dados da empresa (para companyId / user_estate)
  useEffect(() => {
    // Evitar chamadas repetidas: se já temos company no contexto, não precisa
    if (!contextUser?.company) {
      refreshUser();
    }
  }, [contextUser?.company, refreshUser]);

  // Show error state
  if (!isLoading && !isAuthenticated) {
    return (
      <CatalogContainer>
        <FloatingElement top="15%" right="20%" width="6rem" height="6rem" />
        <FloatingElement bottom="25%" left="10%" width="10rem" height="10rem" delay="1.5s" />
        
        <CatalogErrorContainer>
          <CatalogErrorContent>
            <CatalogErrorCard>
              <CatalogErrorTitle>Acesso não autorizado</CatalogErrorTitle>
              <CatalogErrorDescription>
                Você precisa estar logado para acessar o catálogo.
                Faça login para continuar.
              </CatalogErrorDescription>
              <CatalogErrorButton onClick={() => window.location.href = '/login'}>
                Ir para Login
              </CatalogErrorButton>
            </CatalogErrorCard>
          </CatalogErrorContent>
        </CatalogErrorContainer>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      <FloatingElement top="5%" right="5%" width="4rem" height="4rem" />
      <FloatingElement bottom="10%" left="5%" width="6rem" height="6rem" delay="3s" />
      
      <CatalogContent>
        <ProductCatalog companyId={contextUser?.company?.id_empresa} />
      </CatalogContent>
    </CatalogContainer>
  );
};

export default CatalogPage;
