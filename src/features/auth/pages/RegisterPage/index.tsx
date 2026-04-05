import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authHttpService } from '../../http/AuthHttpService';
import { useNotification } from '@context/Notification';
import { Environment } from '@/Environment';
import './RegisterPage.css';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações desabilitadas no modo standalone (apresentação)
    if (!Environment.ENABLE_MOCK_API) {
      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      if (password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres');
        return;
      }
    }

    setLoading(true);
    try {
      console.log('Tentando registrar usuário:', { name, email });
      const response = await authHttpService.register({ name, email, password });
      console.log('Resposta do registro:', response);
      showNotification('success', 'Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      console.error('Registration failed:', err);
      console.error('Erro completo:', err.response);
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao cadastrar. Tente novamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Left Side - Branding */}
        <div className="register-brand">
          <div className="brand-content">
            <div className="brand-logo">CB</div>
            <h1>CodeBlock</h1>
            <p>Conecte-se com os melhores freelancers</p>
            
            <div className="brand-features">
              <div className="feature-item">
                <div className="feature-icon"></div>
                <span>Cadastro rápido e simples</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon"></div>
                <span>Acesso imediato ao sistema</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon"></div>
                <span>Dados protegidos e seguros</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="register-form-container">
          <div className="register-form-header">
            <h2>Criar conta</h2>
            <p>Preencha os dados abaixo para se cadastrar</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <div className="input-wrapper">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </button>

            <div className="register-footer">
              <p>
                Já tem uma conta? <Link to="/login">Faça login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
