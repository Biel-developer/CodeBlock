import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsHttpService } from '../../http/ProjectsHttpService';
import { MyJob } from '../../types';
import styles from './MyJobsPage.module.css';

function formatBudget(min?: number, max?: number): string {
  if (min == null || max == null) return '—';
  const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return `${fmt(min)} – ${fmt(max)}`;
}

function formatDeadline(deadline?: string): string {
  if (!deadline) return '—';
  return new Date(deadline).toLocaleDateString('pt-BR');
}

export function MyJobsPage() {
  const [jobs, setJobs] = useState<MyJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setLoading(true);
    setError('');
    try {
      const res = await projectsHttpService.getMyJobs();
      setJobs(res.data);
    } catch {
      setError('Erro ao carregar seus jobs. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meus Jobs</h1>
      </div>

      {loading && <p className={styles.status}>Carregando jobs...</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <div className={styles.emptyState}>
          <p>Voce ainda nao foi aceito em nenhum projeto.</p>
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className={styles.list}>
          {jobs.map((job) => (
            <div key={job.id} className={styles.card}>
              <div className={styles.cardTop}>
                <Link to={`/projetos/${job.id}`} className={styles.projectTitle}>
                  {job.title}
                </Link>
                <span className={styles.acceptedBadge}>✓ Aceito</span>
              </div>

              <p className={styles.description}>{job.description}</p>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  💰 {formatBudget(job.budgetMin, job.budgetMax)}
                </span>
                <span className={styles.metaItem}>
                  📅 Prazo: {formatDeadline(job.deadline)}
                </span>
                {job.category && (
                  <span className={styles.metaItem}>🏷 {job.category.name}</span>
                )}
              </div>

              {job.skills && job.skills.length > 0 && (
                <div className={styles.tags}>
                  {job.skills.map((s) => (
                    <span key={s.id} className={styles.tag}>{s.name}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
