import { useLoaderData } from 'react-router-dom';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
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
import type { CatalogLoaderData } from './loader';

const CatalogPage = () => {
  const loaderData = useLoaderData() as CatalogLoaderData;
  console.log('CatalogPage received data:', loaderData);

  // Se chegou até aqui, o loader já validou a autenticação
  // e retornou os dados do usuário e empresa

  return (
    <CatalogContainer>
      <FloatingElement top="5%" right="5%" width="4rem" height="4rem" />
      <FloatingElement bottom="10%" left="5%" width="6rem" height="6rem" delay="3s" />
      
      <CatalogContent>
        <ProductCatalog />
      </CatalogContent>
    </CatalogContainer>
  );
};

export default CatalogPage;
