import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/UserAuthentication';
import { useSideBar } from '@context/SideBar';
import { Bell, CheckCheck, Briefcase, MessageSquare, Star, LogOut } from 'lucide-react';
import './AppHeaderBar.css';

const mockNotifications = [
  {
    id: 1,
    icon: <Briefcase size={16} />,
    title: 'Nova proposta recebida',
    description: 'Carlos Mendes enviou uma proposta para seu projeto.',
    time: 'Agora mesmo',
    read: false,
  },
  {
    id: 2,
    icon: <MessageSquare size={16} />,
    title: 'Nova mensagem',
    description: 'Você tem uma nova mensagem de Ana Silva.',
    time: 'Há 10 minutos',
    read: false,
  },
  {
    id: 3,
    icon: <Star size={16} />,
    title: 'Avaliação recebida',
    description: 'Seu projeto recebeu uma avaliação 5 estrelas!',
    time: 'Há 1 hora',
    read: false,
  },
];

export function AppHeaderBar() {
  const { user, logout } = useAuth();
  const { toggleSideBar } = useSideBar();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="app-header">
      <button onClick={toggleSideBar} className="header-menu-btn">☰</button>
      <div className="header-logo">
        <h1>CodeBlock</h1>
      </div>
      <div className="header-actions">
        <div className="notification-wrapper">
          <button className="btn-notification" onClick={() => setOpen(prev => !prev)}>
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {open && (
            <>
              <div className="notification-overlay" onClick={() => setOpen(false)} />
              <div className="notification-dropdown">
                <div className="notification-header">
                  <span className="notification-title">Notificações</span>
                  {unreadCount > 0 && (
                    <button className="mark-all-read" onClick={markAllRead}>
                      <CheckCheck size={14} />
                      Marcar todas como lidas
                    </button>
                  )}
                </div>

                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div className="notification-empty">Nenhuma notificação</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className={`notification-item ${!n.read ? 'unread' : ''}`}
                        onClick={() => setNotifications(prev =>
                          prev.map(item => item.id === n.id ? { ...item, read: true } : item)
                        )}
                      >
                        <div className="notification-icon">{n.icon}</div>
                        <div className="notification-content">
                          <span className="notification-item-title">{n.title}</span>
                          <span className="notification-item-desc">{n.description}</span>
                          <span className="notification-item-time">{n.time}</span>
                        </div>
                        {!n.read && <div className="notification-dot" />}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* {user && ( */}
        {/* )} */}

        <button
          className="btn-logout-header"
          onClick={() => { logout(); navigate('/login'); }}
          title="Sair"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}
