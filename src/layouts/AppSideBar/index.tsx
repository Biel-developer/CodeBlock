import { Link, useLocation } from 'react-router-dom';
import { useSideBar } from '@context/SideBar';
import { useAuth } from '@context/UserAuthentication';
import { House, Search, PanelsTopLeft, Trophy, LogOut, Settings } from 'lucide-react';
import './AppSideBar.css';

export function AppSideBar() {
  const { isOpen } = useSideBar();
  const { user } = useAuth();
  const location = useLocation();

  if (!isOpen) return null;

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="app-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">CB</div>
          <div className="logo-text">CodeBlock</div>
        </div>
        <div className="sidebar-subtitle">Sistema de Freelancers</div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Geral</div>

          <Link to="/feed" className={`sidebar-link ${isActive('/feed')}`}>
            <span className="link-icon"><House /></span>
            <span className="link-text">Feed</span>
          </Link>

          <Link to="/projects" className={`sidebar-link ${isActive('/projects')}`}>
            <span className="link-icon"><Search /></span>
            <span className="link-text">Buscar Projetos</span>
          </Link>

          <Link to="/freelancers" className={`sidebar-link ${isActive('/freelancers')}`}>
            <span className="link-icon"><PanelsTopLeft /></span>
            <span className="link-text">Freelancers</span>
          </Link>

          <Link to="/ranking" className={`sidebar-link ${isActive('/ranking')}`}>
            <span className="link-icon"><Trophy /></span>
            <span className="link-text">Ranking</span>
          </Link>

          {user?.role === 'admin' && (
            <Link to="/users" className={`sidebar-link ${isActive('/users')}`}>
              <span className="link-icon">👥</span>
              <span className="link-text">Usuários</span>
            </Link>
          )}
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Minha Conta</div>

          <Link to="/my-profile" className={`sidebar-link ${isActive('/my-profile')}`}>
            <span className="link-icon">👤</span>
            <span className="link-text">Meu Perfil</span>
          </Link>

          <Link to="/settings" className={`sidebar-link ${isActive('/settings')}`}>
            <span className="link-icon">⚙️</span>
            <span className="link-text">Configurações Perfil</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">{user?.name?.substring(0, 2).toUpperCase() || 'U'}</div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Usuário'}</span>
            <span className="user-role">{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
          </div>
        </div>

        <div className="sidebar-footer-actions">
          <Link to="/profile" className={`settings-link ${isActive('/profile')}`}>
            <span className="link-icon"><Settings color='#fff' /></span>
            <span className="setting-text">Configurações Perfil</span>
          </Link>
          <button className="btn-logout" >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
