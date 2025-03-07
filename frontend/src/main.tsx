import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Layout } from './Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
    </QueryClientProvider>
);
