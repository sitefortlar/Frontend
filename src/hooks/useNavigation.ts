import { useNavigate, useLocation } from 'react-router-dom';
import { paths, Path } from '@/routes/paths';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path: Path) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const replace = (path: Path) => {
    navigate(path, { replace: true });
  };

  const isCurrentPath = (path: Path) => {
    return location.pathname === path;
  };

  const getCurrentPath = () => {
    return location.pathname;
  };

  return {
    goTo,
    goBack,
    goForward,
    replace,
    isCurrentPath,
    getCurrentPath,
    paths, // Export paths for easy access
  };
};
