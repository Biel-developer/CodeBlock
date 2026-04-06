import { ReactNode } from 'react';
import { UserAuthenticationProvider } from '@context/UserAuthentication';
import { SideBarProvider } from '@context/SideBar';
import { NotificationProvider } from '@context/Notification';
import { Toast } from '@components/Toast';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * App Providers
 * Wraps the application with all necessary context providers
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <UserAuthenticationProvider>
      <NotificationProvider>
        <SideBarProvider>
          {children}
          <Toast />
        </SideBarProvider>
      </NotificationProvider>
    </UserAuthenticationProvider>
  );
}
