import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '@context/UserAuthentication';
import { useSideBar } from '@context/SideBar';
import './AppHeaderBar.css';

export function AppHeaderBar() {
  const { user, logout } = useAuth();
  const { toggleSideBar } = useSideBar();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'logout') {
      logout();
      navigate('/login');
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Meu Perfil',
      icon: <UserSwitchOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Sair',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const getAvatarColor = (role?: string) => {
    return role === 'admin' ? '#faad14' : '#1677ff';
  };

  return (
    <header className="app-header">
      <button onClick={toggleSideBar} className="header-menu-btn">
        ☰
      </button>
      <div className="header-logo">
        <h1>CodeBlock</h1>
      </div>
      <div className="header-actions">
        {user && (
          <Dropdown 
            menu={{ items: menuItems, onClick: handleMenuClick }}
            placement="bottomRight"
            trigger={['click']}
          >
            <div className="header-user-dropdown">
              <Avatar 
                style={{ backgroundColor: getAvatarColor(user.role), cursor: 'pointer' }}
                icon={<UserOutlined />}
              >
                {user.name?.substring(0, 2).toUpperCase()}
              </Avatar>
              <span className="header-user-name">{user.name}</span>
            </div>
          </Dropdown>
        )}
      </div>
    </header>
  );
}
