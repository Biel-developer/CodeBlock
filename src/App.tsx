import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { AppProviders } from './providers/AppProviders';

export function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}
