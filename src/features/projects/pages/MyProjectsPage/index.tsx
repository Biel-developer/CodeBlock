import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsHttpService } from '../../http/ProjectsHttpService';
import { Project, Candidate } from '../../types';
import styles from './MyProjectsPage.module.css';

export function MyProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // candidates modal state
  const [candidatesModalProjectId, setCandidatesModalProjectId] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatesLoading, setCandidatesLoading] = useState(false);

  // action menu state
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // delete confirmation
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    setError('');
    try {
      const res = await projectsHttpService.getMyProjects();
      setProjects(res.data);
    } catch {
      setError('Erro ao carregar projetos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function openCandidatesModal(projectId: number) {
    setCandidatesModalProjectId(projectId);
    setCandidatesLoading(true);
    try {
      const res = await projectsHttpService.getCandidates(projectId);
      setCandidates(res.data);
    } catch {
      setCandidates([]);
    } finally {
      setCandidatesLoading(false);
    }
  }

  function closeCandidatesModal() {
    setCandidatesModalProjectId(null);
    setCandidates([]);
  }

  async function handleCandidateStatus(candidateId: number, status: 'accepted' | 'rejected') {
    if (!candidatesModalProjectId) return;
    try {
      await projectsHttpService.updateCandidateStatus(candidatesModalProjectId, candidateId, status);
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? { ...c, status } : c)),
      );
    } catch {
      alert('Erro ao atualizar status do candidato.');
    }
  }

  async function handleDelete(id: number) {
    setDeleteLoading(true);
    try {
      await projectsHttpService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeletingId(null);
    } catch {
      alert('Erro ao excluir o projeto.');
    } finally {
      setDeleteLoading(false);
    }
  }

  function formatBudget(min: number, max: number) {
    if (min == null || max == null) return 'A definir';
    const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return `${fmt(min)} - ${fmt(max)}`;
  }

  function formatDeadline(d: string) {
    return new Date(d).toLocaleDateString('pt-BR');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meus Projetos</h1>
        <button className={styles.newBtn} onClick={() => navigate('/projects/my/create')}>
          + Novo Projeto
        </button>
      </div>

      {loading && <p className={styles.status}>Carregando projetos...</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <div className={styles.emptyState}>
          <p>Você ainda não possui projetos publicados.</p>
          <button className={styles.newBtn} onClick={() => navigate('/projects/my/create')}>
            Criar primeiro projeto
          </button>
        </div>
      )}

      <div className={styles.list}>
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardTop}>
              <a
                className={styles.projectTitle}
                onClick={() => navigate(`/projetos/${project.id}`)}
              >
                {project.title}
              </a>
              <div className={styles.menuWrapper}>
                <button
                  className={styles.menuBtn}
                  onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                >
                  ⋯
                </button>
                {openMenuId === project.id && (
                  <div className={styles.menu}>
                    <button onClick={() => { setOpenMenuId(null); navigate(`/projetos/${project.id}`); }}>
                      Ver projeto
                    </button>
                    <button onClick={() => { setOpenMenuId(null); navigate(`/projects/my/create?id=${project.id}`); }}>
                      Editar projeto
                    </button>
                    <button
                      className={styles.deleteMenuItem}
                      onClick={() => { setOpenMenuId(null); setDeletingId(project.id); }}
                    >
                      Excluir projeto
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.meta}>
              <span className={styles.metaItem}>💰 {formatBudget(project.budgetMin, project.budgetMax)}</span>
              <span className={styles.metaItem}>📅 Prazo: {formatDeadline(project.deadline)}</span>
            </div>

            {project.skills && project.skills.length > 0 && (
              <div className={styles.tags}>
                {project.skills.map((s) => (
                  <span key={s.id} className={styles.tag}>{s.name}</span>
                ))}
              </div>
            )}

            <hr className={styles.divider} />

            <div className={styles.cardBottom}>
              <button
                className={styles.candidatesBtn}
                onClick={() => openCandidatesModal(project.id)}
              >
                {project.candidatesCount ?? 0} candidato(s)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Candidates Modal */}
      {candidatesModalProjectId !== null && (
        <div className={styles.modalOverlay} onClick={closeCandidatesModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Candidatos</h2>
              <button className={styles.closeBtn} onClick={closeCandidatesModal}>✕</button>
            </div>
            {candidatesLoading && <p className={styles.status}>Carregando candidatos...</p>}
            {!candidatesLoading && candidates.length === 0 && (
              <p className={styles.status}>Nenhum candidato ainda.</p>
            )}
            {candidates.map((c) => (
              <div key={c.id} className={styles.candidateRow}>
                <div className={styles.candidateInfo}>
                  <div className={styles.avatar}>{c.name.substring(0, 2).toUpperCase()}</div>
                  <div>
                    <p className={styles.candidateName}>{c.name}</p>
                    <p className={styles.candidateEmail}>{c.email}</p>
                    {c.proposedValue != null && (
                      <p className={styles.candidateEmail}>
                        💰 {Number(c.proposedValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    )}
                    {c.proposalText && (
                      <p style={{ fontSize: 12, color: '#374151', marginTop: 4, maxWidth: 280, lineHeight: 1.4 }}>
                        {c.proposalText}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.candidateActions}>
                  {c.status === 'pending' ? (
                    <>
                      <button
                        className={styles.acceptBtn}
                        onClick={() => handleCandidateStatus(c.id, 'accepted')}
                      >Aceitar</button>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleCandidateStatus(c.id, 'rejected')}
                      >Recusar</button>
                    </>
                  ) : (
                    <span className={c.status === 'accepted' ? styles.statusAccepted : styles.statusRejected}>
                      {c.status === 'accepted' ? 'Aceito' : 'Recusado'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId !== null && (
        <div className={styles.modalOverlay} onClick={() => setDeletingId(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Excluir projeto</h2>
            <p>Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.</p>
            <div className={styles.confirmActions}>
              <button className={styles.cancelBtn} onClick={() => setDeletingId(null)} disabled={deleteLoading}>
                Cancelar
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(deletingId)}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
