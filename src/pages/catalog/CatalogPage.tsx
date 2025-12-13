import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAuthContext } from '@/contexts/AuthContext';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import type { CatalogLoaderData } from './loader';
import {
  CatalogContainer,
  FloatingElement,
  CatalogLoadingContainer,
  CatalogLoadingContent,
  CatalogLoadingSpinner,
  CatalogLoadingText,
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
  const { refreshUser } = useAuthContext();
  const loaderData = useLoaderData() as CatalogLoaderData | undefined;

  // Atualizar o contexto de autenticação quando os dados do loader estiverem disponíveis
  useEffect(() => {
    if (loaderData?.user?.company) {
      refreshUser();
    }
  }, [loaderData, refreshUser]);

  // Show loading state
  if (isLoading || !loaderData) {
    return (
      <CatalogContainer>
        <FloatingElement top="10%" right="10%" width="8rem" height="8rem" />
        <FloatingElement bottom="20%" left="15%" width="12rem" height="12rem" delay="2s" />
        
        <CatalogLoadingContainer>
          <CatalogLoadingContent>
            <CatalogLoadingSpinner />
            <CatalogLoadingText>Carregando catálogo...</CatalogLoadingText>
          </CatalogLoadingContent>
        </CatalogLoadingContainer>
      </CatalogContainer>
    );
  }

  // Show error state
  if (!isAuthenticated) {
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
        {loaderData && (
          <ProductCatalog 
            products={loaderData.products}
            categories={loaderData.categories}
            companyId={loaderData.user?.company?.id_empresa}
          />
        )}
      </CatalogContent>
    </CatalogContainer>
  );
};

export default CatalogPage;
