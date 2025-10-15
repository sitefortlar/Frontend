import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { createQueryClient } from '@/config/queryClient';
import { isDevelopment } from '@/config/environment';
import { theme } from '@/design-system/theme';
import { GlobalStyles } from '@/design-system/GlobalStyles';
import router from './routes';

// Cria o cliente do React Query com configurações otimizadas
const queryClient = createQueryClient();

const App = () => (
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
          {/* DevTools apenas em desenvolvimento */}
          {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
