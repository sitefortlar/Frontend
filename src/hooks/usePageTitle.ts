import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { paths } from '@/routes/paths';

const pageTitles: Record<string, string> = {
  [paths.login]: 'Login - Fort-Lar',
  [paths.cadastro]: 'Cadastro - Fort-Lar',
  [paths.esqueciSenha]: 'Esqueci Senha - Fort-Lar',
  [paths.home]: 'Fort-Lar - Catálogo de Produtos',
  [paths.catalog]: 'Catálogo - Fort-Lar',
  [paths.notFound]: '404 - Página Não Encontrada',
};

export const usePageTitle = (customTitle?: string) => {
  const location = useLocation();

  useEffect(() => {
    const title = customTitle || pageTitles[location.pathname] || 'Fort-Lar';
    document.title = title;
  }, [location.pathname, customTitle]);
};
