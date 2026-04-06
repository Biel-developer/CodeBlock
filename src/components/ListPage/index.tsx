import { ReactNode } from 'react';
import './ListPage.css';

interface ListPageProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * ListPage Template
 * Shared template for list pages
 */
export function ListPage({ title, actions, children }: ListPageProps) {
  return (
    <div className="list-page">
      <div className="list-page-header">
        <h1>{title}</h1>
        {actions && <div className="list-page-actions">{actions}</div>}
      </div>
      <div className="list-page-content">{children}</div>
    </div>
  );
}
