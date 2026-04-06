import { ReactNode } from 'react';
import './ContentPage.css';

interface ContentPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * ContentPage Template
 * Shared template for content pages
 */
export function ContentPage({ title, subtitle, children }: ContentPageProps) {
  return (
    <div className="content-page">
      <div className="content-page-header">
        <h1>{title}</h1>
        {subtitle && <p className="content-page-subtitle">{subtitle}</p>}
      </div>
      <div className="content-page-body">{children}</div>
    </div>
  );
}
