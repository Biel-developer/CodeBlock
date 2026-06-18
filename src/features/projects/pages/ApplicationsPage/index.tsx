import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsHttpService } from '../../http/ProjectsHttpService';
import { AvailableProject } from '../../types';
import styles from './ApplicationsPage.module.css';

function formatBudget(min?: number, max?: number): string {
  if (min == null || max == null) return '—';
  return `R$ ${Number(min).toLocaleString('pt-BR')} – R$ ${Number(max).toLocaleString('pt-BR')}`;
}

function formatDeadline(deadline?: string): string {
  if (!deadline) return '—';
  return new Date(deadline).toLocaleDateString('pt-BR');
}

interface ApplyModalProps {
  project: AvailableProject;
  onClose: () => void;
  onSuccess: (projectId: number) => void;
}

function ApplyModal({ project, onClose, onSuccess }: ApplyModalProps) {
  const [proposedValue, setProposedValue] = useState('');
  const [proposalText, setProposalText] = useState('');
  const [errors, setErrors] = useState<{ proposedValue?: string; proposalText?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: typeof errors = {};
    const val = Number(proposedValue);
    if (!proposedValue || isNaN(val) || val <= 0) e.proposedValue = 'Informe um valor positivo.';
    if (proposalText.trim().length < 20) e.proposalText = 'A proposta deve ter pelo menos 20 caracteres.';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await projectsHttpService.applyToProject(project.id, {
        proposedValue: Number(proposedValue),
        proposalText: proposalText.trim(),
      });
      onSuccess(project.id);
    } catch {
      setErrors({ proposalText: 'Erro ao enviar candidatura. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Candidatar-se</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>{project.title}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="proposedValue">Valor proposto (R$) *</label>
            <input
              id="proposedValue"
              type="number"
              min="0"
              step="0.01"
              placeholder="ex: 1500.00"
              value={proposedValue}
              onChange={(e) => setProposedValue(e.target.value)}
            />
            {errors.proposedValue && <span className={styles.fieldError}>{errors.proposedValue}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="proposalText">Carta de apresentação *</label>
            <textarea
              id="proposalText"
              rows={5}
              placeholder="Descreva sua experiência e por que você é a melhor escolha para este projeto..."
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
            />
            {errors.proposalText && <span className={styles.fieldError}>{errors.proposalText}</span>}
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar candidatura'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ApplicationsPage() {
  const [projects, setProjects] = useState<AvailableProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyingProject, setApplyingProject] = useState<AvailableProject | null>(null);
  const [appliedIds, setAppliedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    setError('');
    try {
      const res = await projectsHttpService.getAvailableProjects();
      setProjects(res.data);
      setAppliedIds(new Set(res.data.filter((p) => p.alreadyApplied).map((p) => p.id)));
    } catch {
      setError('Erro ao carregar projetos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleApplySuccess(projectId: number) {
    setAppliedIds((prev) => new Set([...prev, projectId]));
    setApplyingProject(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Candidaturas</h1>
      </div>

      {loading && <p className={styles.status}>Carregando projetos...</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <div className={styles.emptyState}>
          <span>Nenhum projeto disponível no momento.</span>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className={styles.list}>
          {projects.map((project) => {
            const applied = appliedIds.has(project.id);
            return (
              <div key={project.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <Link to={`/projetos/${project.id}`} className={styles.projectTitle}>
                    {project.title}
                  </Link>
                </div>

                <p className={styles.description}>{project.description}</p>

                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    💰 {formatBudget(project.budgetMin, project.budgetMax)}
                  </span>
                  <span className={styles.metaItem}>
                    📅 {formatDeadline(project.deadline)}
                  </span>
                  {project.category && (
                    <span className={styles.metaItem}>🏷 {project.category.name}</span>
                  )}
                </div>

                <hr className={styles.divider} />

                <div className={styles.cardBottom}>
                  <Link to={`/projetos/${project.id}`} className={styles.viewBtn}>
                    Ver projeto →
                  </Link>
                  {applied ? (
                    <span className={styles.appliedBadge}>✓ Candidatura enviada</span>
                  ) : (
                    <button className={styles.applyBtn} onClick={() => setApplyingProject(project)}>
                      Candidatar-se
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {applyingProject && (
        <ApplyModal
          project={applyingProject}
          onClose={() => setApplyingProject(null)}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
}
