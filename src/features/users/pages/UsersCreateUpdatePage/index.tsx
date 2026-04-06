import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, Typography, Card, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CrownOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { usersHttpService } from '../../http/UsersHttpService';
import { useNotification } from '@context/Notification';
import './UsersCreateUpdatePage.css';

const { Title, Text } = Typography;
const { Option } = Select;

interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'client';
}

export function UsersCreateUpdatePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      loadUserData();
    }
  }, [id]);

  const loadUserData = async () => {
    try {
      setLoadingData(true);
      const user = await usersHttpService.getById(id!);
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error: any) {
      console.error('Erro ao carregar usuário:', error);
      showNotification('error', 'Erro ao carregar dados do usuário');
      navigate('/users');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (values: UserFormData) => {
    try {
      setLoading(true);
      
      if (isEditMode) {
        // Remove password if empty in edit mode
        const updateData = { ...values };
        if (!updateData.password) {
          delete updateData.password;
        }
        await usersHttpService.update(id!, updateData);
        showNotification('success', 'Usuário atualizado com sucesso!');
      } else {
        await usersHttpService.create(values);
        showNotification('success', 'Usuário criado com sucesso!');
      }
      
      navigate('/users');
    } catch (error: any) {
      console.error('Erro ao salvar usuário:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao salvar usuário';
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-create-update-page">
      <div className="page-header">
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/users')}
            type="text"
          >
            Voltar
          </Button>
        </Space>
        <div>
          <Title level={2}>
            {isEditMode ? 'Editar Usuário' : 'Criar Novo Usuário'}
          </Title>
          <Text type="secondary">
            {isEditMode 
              ? 'Atualize as informações do usuário abaixo' 
              : 'Preencha os dados para criar um novo usuário'}
          </Text>
        </div>
      </div>

      <Card className="user-form-card" loading={loadingData}>
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
              { required: true, message: 'Por favor, insira o nome completo' },
              { min: 3, message: 'O nome deve ter no mínimo 3 caracteres' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />}
              placeholder="Nome completo do usuário" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira o email' },
              { type: 'email', message: 'Por favor, insira um email válido' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />}
              placeholder="email@exemplo.com" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={isEditMode ? 'Nova Senha (deixe em branco para manter a atual)' : 'Senha'}
            name="password"
            rules={[
              { 
                required: !isEditMode, 
                message: 'Por favor, insira a senha' 
              },
              { 
                min: 6, 
                message: 'A senha deve ter no mínimo 6 caracteres' 
              }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder={isEditMode ? 'Nova senha (opcional)' : 'Mínimo 6 caracteres'}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Tipo de Usuário"
            name="role"
            rules={[{ required: true, message: 'Por favor, selecione o tipo de usuário' }]}
            initialValue="client"
          >
            <Select 
              size="large"
              placeholder="Selecione o tipo de usuário"
            >
              <Option value="client">
                <Space>
                  <UserOutlined />
                  Cliente
                </Space>
              </Option>
              <Option value="admin">
                <Space>
                  <CrownOutlined />
                  Administrador
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item className="form-actions">
            <Space size="middle">
              <Button 
                size="large" 
                onClick={() => navigate('/users')}
              >
                Cancelar
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                loading={loading}
              >
                {isEditMode ? 'Atualizar Usuário' : 'Criar Usuário'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
