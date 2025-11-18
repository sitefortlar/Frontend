import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import faviconV2 from '@/assets/faviconV2.png';

// Atualiza o favicon dinamicamente
const updateFavicon = (iconPath: string) => {
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = iconPath;
  document.getElementsByTagName('head')[0].appendChild(link);
};

updateFavicon(faviconV2);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
