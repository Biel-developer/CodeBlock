import { useState, useEffect } from 'react';
import { List, Avatar, Tag, Spin, Button, Space, Typography } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, CrownOutlined, UserAddOutlined } from '@ant-design/icons';
import { usersHttpService, User } from '../../http/UsersHttpService';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@context/Notification';
import './UsersListPage.css';

const { Title, Text } = Typography;

export function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersHttpService.getAll();
      if (!Array.isArray(data)) {
        console.error('Formato inesperado da resposta de usuários:', data);
        showNotification('error', 'Resposta inválida da API de usuários');
        setUsers([]);
        return;
      }
      setUsers(data);
    } catch (error: any) {
      console.error('Erro ao carregar usuários:', error);
      showNotification('error', 'Erro ao carregar lista de usuários');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'gold' : 'blue';
  };

  const getRoleText = (role: string) => {
    return role === 'admin' ? 'Administrador' : 'Cliente';
  };

  return (
    <div className="users-list-page">
      <div className="users-list-header">
        <div>
          <Title level={2}>Gerenciamento de Usuários</Title>
          <Text type="secondary">Visualize e gerencie todos os usuários do sistema</Text>
        </div>
        <Button 
          type="primary" 
          icon={<UserAddOutlined />}
          size="large"
          onClick={() => navigate('/users/create')}
        >
          Novo Usuário
        </Button>
      </div>

      {loading ? (
        <div className="users-list-loading">
          <Spin size="large" />
        </div>
      ) : (
        <List
          className="users-list"
          itemLayout="horizontal"
          dataSource={Array.isArray(users) ? users : []}
          renderItem={(user) => (
            <List.Item
              className="user-list-item"
              actions={[
                <Button 
                  type="text" 
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                >
                  Editar
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar 
                    size={64} 
                    icon={<UserOutlined />} 
                    style={{ 
                      backgroundColor: user.role === 'admin' ? '#faad14' : '#1677ff'
                    }}
                  />
                }
                title={
                  <Space direction="vertical" size={4}>
                    <Space>
                      <Text strong style={{ fontSize: '16px' }}>{user.name}</Text>
                      <Tag color={getRoleColor(user.role)} icon={user.role === 'admin' ? <CrownOutlined /> : <UserOutlined />}>
                        {getRoleText(user.role)}
                      </Tag>
                    </Space>
                  </Space>
                }
                description={
                  <Space direction="vertical" size={8} style={{ marginTop: '8px' }}>
                    <Space>
                      <MailOutlined style={{ color: '#666' }} />
                      <Text type="secondary">{user.email}</Text>
                    </Space>
                    <Space>
                      <CalendarOutlined style={{ color: '#666' }} />
                      <Text type="secondary">Criado em: {formatDate(user.createdAt)}</Text>
                    </Space>
                    <Space>
                      <Text type="secondary" style={{ fontSize: '12px' }}>ID: {user.id}</Text>
                    </Space>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
