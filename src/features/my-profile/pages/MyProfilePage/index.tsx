import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileHttpService, buildAvatarUrl, UserProfile } from '../../http/ProfileHttpService';
import './MeuPerfil.css';

export const MyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    profileHttpService
      .getMe()
      .then((res) => {
        setProfile(res.data);
        setAvatarSrc(buildAvatarUrl(res.data.avatarUrl));
      })
      .catch(() => setError('Não foi possível carregar o perfil.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="perfil-page">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="perfil-page">
        <p>{error ?? 'Perfil não encontrado.'}</p>
      </div>
    );
  }

  const initial = profile.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className="perfil-page">
      <h1 className="perfil-title">Meu Perfil</h1>

      <div className="perfil-grid">
        <section className="perfil-card perfil-card-profile">
          <div className="perfil-avatar" style={{ overflow: 'hidden', position: 'relative' }}>
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              initial
            )}
          </div>
          <div className="perfil-user-data">
            <h2>{profile.name}</h2>
            <span className="perfil-badge">{profile.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
          </div>
          <div className="perfil-member-info">
            <span>🗓️ Membro desde {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '-'}</span>
          </div>
        </section>

        <section className="perfil-card perfil-card-about">
          <div className="perfil-card-header">
            <h3>Sobre</h3>
            <button className="perfil-action-link" onClick={() => navigate('/settings')}>Editar</button>
          </div>
          <p className="perfil-about-text">
            {profile.bio ?? 'Você ainda não adicionou uma bio.'}
          </p>
          {!profile.bio && (
            <button className="perfil-primary-btn" onClick={() => navigate('/settings')}>
              Adicionar Bio
            </button>
          )}
          {profile.location && (
            <p style={{ marginTop: 8, color: '#64748b', fontSize: '0.9rem' }}>📍 {profile.location}</p>
          )}
        </section>

        <section className="perfil-card perfil-card-stats">
          <h3>Estatísticas</h3>
          <div className="perfil-stats-list">
            <div className="perfil-stat-item">
              <strong>0</strong>
              <span>Projetos</span>
            </div>
          </div>
        </section>

        <section className="perfil-card perfil-card-actions">
          <h3>Ações Rápidas</h3>
          <button className="perfil-secondary-btn" onClick={() => navigate('/settings')}>
            <span>⚙️</span> Configurações
          </button>
        </section>
      </div>
    </div>
  );
};

export default MyProfilePage;

