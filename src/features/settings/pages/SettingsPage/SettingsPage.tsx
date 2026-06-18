import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileHttpService, buildAvatarUrl } from '@features/my-profile/http/ProfileHttpService';
import { useAuth } from '@context/UserAuthentication';
import './SettingsPage.css';

type AccountType = 'freelancer' | 'contractor' | 'explorer';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('explorer');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    profileHttpService
      .getMe()
      .then((res) => {
        const p = res.data;
        setName(p.name ?? '');
        setBio(p.bio ?? '');
        setLocation(p.location ?? '');
        setAccountType(p.accountType ?? 'explorer');
        setAvatarPreview(buildAvatarUrl(p.avatarUrl));
      })
      .catch(() => showToast('error', 'Não foi possível carregar os dados do perfil.'))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (pendingFile) {
        const avatarRes = await profileHttpService.updateAvatar(pendingFile);
        const newUrl = buildAvatarUrl(avatarRes.data.avatarUrl);
        setAvatarPreview(newUrl);
        updateUser({ avatarUrl: avatarRes.data.avatarUrl ?? undefined });
        setPendingFile(null);
      }

      const profileRes = await profileHttpService.updateMe({ name, bio, location, accountType });
      updateUser({ name: profileRes.data.name, accountType });

      showToast('success', 'Perfil atualizado com sucesso!');
    } catch {
      showToast('error', 'Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container-page">
        <p>Carregando...</p>
      </div>
    );
  }

  const initial = name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className="container-page">
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            padding: '12px 20px',
            borderRadius: 10,
            background: toast.type === 'success' ? '#22c55e' : '#ef4444',
            color: '#fff',
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          }}
        >
          {toast.message}
        </div>
      )}

      <div className="topbar">
        <button className="btn-back" onClick={() => navigate(-1)}>Voltar</button>
      </div>

      <h1 className="main-title">Configurações</h1>

      <div className="settings-content">
        {/* CARD 1: PERFIL */}
        <div className="perfil-card">
          <div className="card-header"><h3>Perfil</h3></div>
          <p className="card-subtitle">Informações exibidas publicamente</p>

          <div className="avatar-edit-section">
            <div
              className="avatar-placeholder"
              style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', flexShrink: 0 }}
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '50%' }}
                />
              ) : (
                initial
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
              📷 Alterar Foto
            </button>
            {pendingFile && (
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {pendingFile.name} — salvar para confirmar
              </span>
            )}
          </div>

          <div className="form-settings">
            <div className="input-group-settings">
              <label>Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-settings input-name"
              />
            </div>
            <div className="input-group-settings">
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você..."
                className="input-settings textarea-settings"
                maxLength={500}
              />
            </div>
            <div className="input-group-settings">
              <label>Localização</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: São Paulo, SP"
                className="input-settings"
              />
            </div>
          </div>
        </div>

        <div className="perfil-card">
          <div className="card-header"><h3>Tipo de Conta</h3></div>
          <p className="card-subtitle">Escolha como deseja usar a plataforma</p>

          <div className="options-settings">
            <button
              type="button"
              className={`option-card-settings ${accountType === 'freelancer' ? 'active' : ''}`}
              onClick={() => setAccountType('freelancer')}
            >
              <div className="option-icon">💼</div>
              <div className="option-info-settings">
                <strong>Freelancer</strong>
                <span>Encontre projetos e ofereca seus servicos</span>
              </div>
            </button>

            <button
              type="button"
              className={`option-card-settings ${accountType === 'contractor' ? 'active' : ''}`}
              onClick={() => setAccountType('contractor')}
            >
              <div className="option-icon">👥</div>
              <div className="option-info-settings">
                <strong>Contratante</strong>
                <span>Publique projetos e encontre talentos</span>
              </div>
            </button>

            <button
              type="button"
              className={`option-card-settings ${accountType === 'explorer' ? 'active' : ''}`}
              onClick={() => setAccountType('explorer')}
            >
              <div className="option-icon">👤</div>
              <div className="option-info-settings">
                <strong>Apenas Explorar</strong>
                <span>Participe da comunidade sem compromisso</span>
              </div>
            </button>
          </div>
        </div>

        <div className="actions-settings">
          <button
            className="btn-primary-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
