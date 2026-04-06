import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Space, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, SaveOutlined } from '@ant-design/icons';
import { profileHttpService, UpdateProfileData } from '../../http/ProfileHttpService';
import { useAuth } from '@context/UserAuthentication';
import { useNotification } from '@context/Notification';
import './ProfilePage.css';

const { Title, Text } = Typography;

export function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { user, login } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoadingData(true);
      if (user) {
        form.setFieldsValue({
          name: user.name,
          email: user.email,
        });
      }
    } catch (error: any) {
      console.error('Erro ao carregar perfil:', error);
      showNotification('error', 'Erro ao carregar dados do perfil');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const updateData: UpdateProfileData = {
        name: values.name,
        email: values.email,
      };

      // Only include password if user wants to change it
      if (values.currentPassword && values.newPassword) {
        updateData.currentPassword = values.currentPassword;
        updateData.newPassword = values.newPassword;
      }

      await profileHttpService.updateProfile(updateData);
      
      // Update local storage with new user data
      const updatedUser = {
        ...user!,
        name: values.name,
        email: values.email,
      };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      
      showNotification('success', 'Perfil atualizado com sucesso!');
      
      // Clear password fields
      form.setFieldsValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar perfil';
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <Title level={2}>Meu Perfil</Title>
        <Text type="secondary">Gerencie suas informações pessoais e segurança</Text>
      </div>

      <div className="profile-content">
        <Card className="profile-card" loading={loadingData}>
          <div className="profile-section">
            <Title level={4}>Informações Pessoais</Title>
            <Text type="secondary">Atualize seus dados pessoais</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            requiredMark="optional"
          >
            <Form.Item
              label="Nome Completo"
              name="name"
              rules={[
                { required: true, message: 'Por favor, insira seu nome completo' },
                { min: 3, message: 'O nome deve ter no mínimo 3 caracteres' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />}
                placeholder="Seu nome completo" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Por favor, insira seu email' },
                { type: 'email', message: 'Por favor, insira um email válido' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />}
                placeholder="seu@email.com" 
                size="large"
              />
            </Form.Item>

            <Divider />

            <div className="profile-section">
              <Title level={4}>Alterar Senha</Title>
              <Text type="secondary">Deixe em branco se não quiser alterar a senha</Text>
            </div>

            <Form.Item
              label="Senha Atual"
              name="currentPassword"
            >
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="Digite sua senha atual"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Nova Senha"
              name="newPassword"
              dependencies={['currentPassword']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const currentPassword = getFieldValue('currentPassword');
                    if (currentPassword && !value) {
                      return Promise.reject(new Error('Por favor, insira a nova senha'));
                    }
                    if (value && value.length < 6) {
                      return Promise.reject(new Error('A senha deve ter no mínimo 6 caracteres'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="Mínimo 6 caracteres"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Confirmar Nova Senha"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const newPassword = getFieldValue('newPassword');
                    if (newPassword && !value) {
                      return Promise.reject(new Error('Por favor, confirme a nova senha'));
                    }
                    if (value && newPassword !== value) {
                      return Promise.reject(new Error('As senhas não coincidem'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="Digite a nova senha novamente"
                size="large"
              />
            </Form.Item>

            <Form.Item className="form-actions">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                icon={<SaveOutlined />}
                loading={loading}
                block
              >
                Salvar Alterações
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card className="profile-info-card">
          <div className="profile-section">
            <Title level={4}>Informações da Conta</Title>
          </div>
          
          <div className="info-item">
            <Text type="secondary">Tipo de Conta</Text>
            <Text strong>{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</Text>
          </div>
          
          <Divider />
          
          <div className="info-item">
            <Text type="secondary">ID do Usuário</Text>
            <Text code>{user?.id}</Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
