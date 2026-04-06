import React from 'react';
import './MeuPerfil.css';

interface Usuario {
  nome: string;
  titulo: string;
  membroDesde: string;
  bio: string;
  projetos: number;
  avaliacao: string;
}

export const MyProfilePage: React.FC = () => {
  const usuario: Usuario = {
    nome: 'Felipe',
    titulo: 'Usuario',
    membroDesde: 'abril de 2026',
    bio: 'Voce ainda nao adicionou uma bio.',
    projetos: 0,
    avaliacao: '0.0'
  };

  return (
    
    <div className="perfil-page">
      <div className="perfil-topbar">
        <input
          className="perfil-search"
          type="search"
          placeholder="Buscar projetos, freelancers..."
          aria-label="Buscar projetos"
        />
        <button className="perfil-config-btn">Configuracoes</button>
      </div>

      <h1 className="perfil-title">Meu Perfil</h1>

      <div className="perfil-grid">
        <section className="perfil-card perfil-card-profile">
          <div className="perfil-avatar">{usuario.nome.charAt(0).toUpperCase()}</div>
          <div className="perfil-user-data">
            <h2>{usuario.nome}</h2>
            <span className="perfil-badge">{usuario.titulo}</span>
          </div>
          <div className="perfil-member-info">
            <span>🗓️ Membro desde {usuario.membroDesde}</span>
          </div>
        </section>

        <section className="perfil-card perfil-card-about">
          <div className="perfil-card-header">
            <h3>Sobre</h3>
            <button className="perfil-action-link">Editar</button>
          </div>
          <p className="perfil-about-text">{usuario.bio}</p>
          <button className="perfil-primary-btn">Adicionar Bio</button>
        </section>

        <section className="perfil-card perfil-card-stats">
          <h3>Estatisticas</h3>
          <div className="perfil-stats-list">
            <div className="perfil-stat-item">
              <strong>{usuario.projetos}</strong>
              <span>Projetos</span>
            </div>
            <div className="perfil-stat-item">
              <strong>{usuario.avaliacao}</strong>
              <span>Avaliacao</span>
            </div>
          </div>
        </section>

        <section className="perfil-card perfil-card-actions">
          <h3>Acoes Rapidas</h3>
          <button className="perfil-secondary-btn">
            <span>⚙️</span> Configuracoes
          </button>
        </section>
      </div>
    </div>
  );
};

export default MyProfilePage;
