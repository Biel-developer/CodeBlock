import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsHttpService } from '../../http/ProjectsHttpService';
import { Project, Candidate } from '../../types';
import styles from './ProjectDetailsPage.module.css';

export function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [approvedCandidates, setApprovedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    loadProject(Number(id));
  }, [id]);

  async function loadProject(projectId: number) {
    setLoading(true);
    setError('');
    try {
      const res = await projectsHttpService.getProjectById(projectId);
      setProject(res.data);
      // Try to load approved candidates; might fail if not owner
      try {
        const cRes = await projectsHttpService.getCandidates(projectId);
        setApprovedCandidates(cRes.data.filter((c) => c.status === 'accepted'));
      } catch {
        setApprovedCandidates([]);
      }
    } catch {
      setError('Projeto não encontrado.');
    } finally {
      setLoading(false);
    }
  }

  function formatBudget(min: number, max: number) {
    const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return `${fmt(min)} - ${fmt(max)}`;
  }

  function formatDeadline(d: string) {
    return new Date(d).toLocaleDateString('pt-BR');
  }

  if (loading) return <div className={styles.page}><p className={styles.status}>Carregando projeto...</p></div>;
  if (error || !project) return <div className={styles.page}><p className={styles.errorText}>{error || 'Projeto não encontrado.'}</p></div>;

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>← Voltar</button>
      <div className={styles.layout}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <h1 className={styles.projectTitle}>{project.title}</h1>

            <h3 className={styles.sectionTitle}>Descrição</h3>
            <p className={styles.text}>{project.description}</p>

            <h3 className={styles.sectionTitle}>Escopo do Projeto</h3>
            <p className={styles.text}>{project.scope}</p>

            {project.skills && project.skills.length > 0 && (
              <>
                <h3 className={styles.sectionTitle}>Habilidades Necessárias</h3>
                <div className={styles.tags}>
                  {project.skills.map((s) => (
                    <span key={s.id} className={styles.tag}>{s.name}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Approved Candidates */}
          {approvedCandidates.length > 0 && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Candidatos Aprovados</h2>
              {approvedCandidates.map((c) => (
                <div key={c.id} className={styles.candidateRow}>
                  <div className={styles.avatar}>{c.name.substring(0, 2).toUpperCase()}</div>
                  <div>
                    <p className={styles.candidateName}>{c.name}</p>
                    <p className={styles.candidateEmail}>{c.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Summary Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Resumo</h2>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Orçamento</span>
              <span className={styles.summaryValue}>{formatBudget(project.budgetMin, project.budgetMax)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Prazo</span>
              <span className={styles.summaryValue}>{formatDeadline(project.deadline)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Status</span>
              <span className={styles.summaryValue}>{project.status}</span>
            </div>
            {project.category && (
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Categoria</span>
                <span className={styles.summaryValue}>{project.category.name}</span>
              </div>
            )}
          </div>

          {/* Contractor Card */}
          {project.contractor && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Sobre o Contratante</h2>
              <div className={styles.contractorHeader}>
                <div className={styles.contractorAvatar}>
                  {project.contractor.avatarUrl
                    ? <img src={project.contractor.avatarUrl} alt={project.contractor.name} className={styles.avatarImg} />
                    : <span>{project.contractor.name.substring(0, 2).toUpperCase()}</span>
                  }
                </div>
                <div>
                  <p className={styles.contractorName}>{project.contractor.name}</p>
                  {(project.contractor.city || project.contractor.state) && (
                    <p className={styles.contractorLocation}>
                      📍 {[project.contractor.city, project.contractor.state].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </div>
              {project.contractor.bio && <p className={styles.contractorBio}>{project.contractor.bio}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
