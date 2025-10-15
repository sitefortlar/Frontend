import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Define variáveis de ambiente para o navegador
      'window.ENV': JSON.stringify({
        REACT_APP_CNPJ_API_URL: env.VITE_CNPJ_API_URL || 'https://www.receitaws.com.br/v1/cnpj',
        REACT_APP_CEP_API_URL: env.VITE_CEP_API_URL || 'https://viacep.com.br/ws',
        NODE_ENV: mode,
      }),
    },
  };
});
