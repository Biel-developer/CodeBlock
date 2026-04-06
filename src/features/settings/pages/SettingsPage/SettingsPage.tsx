import React from 'react';
import './SettingsPage.css';

export const SettingsPage = () => {
  return (
    <div className="container-page">
      <div className="topbar">
        <button className="btn-back" onClick={() => window.history.back()}>Voltar</button>
      </div>

      <h1 className="main-title">Configurações</h1>

      <div className="settings-content">
        {/* CARD 1: PERFIL */}
        <div className="perfil-card">
          <div className="card-header"><h3>Perfil</h3></div>
          <p className="card-subtitle">Informações exibidas publicamente</p>
          
          <div className="avatar-edit-section">
            <div className="avatar-placeholder">L</div>
            <button className="btn-secondary">📷 Alterar Foto</button>
          </div>

          <div className="form-settings">
            <div className="input-group-settings">
              <label>Nome</label>
              <input type="text" defaultValue="Lucca Rocha" className="input-settings input-name" />
            </div>
            <div className="input-group-settings">
              <label>Bio</label>
              <textarea placeholder="Conte um pouco sobre você..." className="input-settings textarea-settings" />
            </div>
            <div className="input-group-settings">
              <label>Localização</label>
              <input type="text" placeholder="Ex: São Paulo, SP" className="input-settings" />
            </div>
          </div>
        </div>

        {/* CARD 2: TIPO DE CONTA */}
        <div className="perfil-card">
          <div className="card-header"><h3>Tipo de Conta</h3></div>
          <p className="card-subtitle">Escolha como deseja usar a plataforma</p>
          
          <div className="options-settings">
            <div className="option-card-settings">
              <div className="option-icon">💼</div>
              <div className="option-info-settings">
                <strong>Freelancer</strong>
                <span>Encontre projetos e ofereça seus serviços</span>
              </div>
            </div>

            <div className="option-card-settings">
              <div className="option-icon green">👥</div>
              <div className="option-info-settings">
                <strong>Contratante</strong>
                <span>Publique projetos e encontre talentos</span>
              </div>
            </div>
            
            <div className="option-card-settings active">
              <div className="option-icon">👤</div>
              <div className="option-info-settings">
                <strong>Apenas Explorar</strong>
                <span>Participe da comunidade sem compromisso</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: NOTIFICAÇÕES */}
        <div className="perfil-card">
          <div className="card-header"><h3>Notificações</h3></div>
          <p className="card-subtitle">Configure como deseja receber notificações</p>
          
          <div className="switches-settings">
            <div className="switch-item-settings">
              <div className="option-info-settings">
                <strong>Notificações por Email</strong>
                <span>Receba atualizações no seu email</span>
              </div>
              <label className="toggle-switch-settings">
                <input type="checkbox" defaultChecked />
                <span className="slider-settings"></span>
              </label>
            </div>

            <div className="switch-item-settings">
              <div className="option-info-settings">
                <strong>Notificações Push</strong>
                <span>Receba notificações no navegador</span>
              </div>
              <label className="toggle-switch-settings">
                <input type="checkbox" defaultChecked />
                <span className="slider-settings"></span>
              </label>
            </div>

            <div className="switch-item-settings">
              <div className="option-info-settings">
                <strong>Alertas de Projetos</strong>
                <span>Seja notificado sobre novos projetos</span>
              </div>
              <label className="toggle-switch-settings">
                <input type="checkbox" defaultChecked />
                <span className="slider-settings"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="actions-settings">
           <button className="btn-primary-save">Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;