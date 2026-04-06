import { ReactNode } from 'react';
import { AppHeaderBar } from '../AppHeaderBar';
import { AppSideBar } from '../AppSideBar';
import './AppLayout.css';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <AppHeaderBar />
      <div className="app-layout-body">
        <AppSideBar />
        <main className="app-layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
