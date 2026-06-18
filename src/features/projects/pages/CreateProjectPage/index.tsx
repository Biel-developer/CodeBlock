import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  categoriesHttpService,
  skillsHttpService,
  projectsHttpService,
} from '../../http/ProjectsHttpService';
import { Category, Skill } from '../../types';
import styles from './CreateProjectPage.module.css';

export function CreateProjectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const isEdit = Boolean(editId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    title: '',
    categoryId: '',
    description: '',
    scope: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    categoriesHttpService.getAll().then((res) => setCategories(res.data));
    skillsHttpService.getAll().then((res) => setSkills(res.data));
  }, []);

  useEffect(() => {
    if (!editId) return;
    setLoadingProject(true);
    projectsHttpService.getProjectById(Number(editId))
      .then((res) => {
        const p = res.data;
        setForm({
          title: p.title,
          categoryId: String(p.categoryId),
          description: p.description,
          scope: p.scope,
          budgetMin: String(p.budgetMin),
          budgetMax: String(p.budgetMax),
          deadline: p.deadline.substring(0, 10),
        });
        setSelectedSkills((p.skills ?? []).map((s) => s.name));
      })
      .catch(() => setError('Erro ao carregar projeto para edição.'))
      .finally(() => setLoadingProject(false));
  }, [editId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function addSkill(name: string) {
    const trimmed = name.trim();
    if (!trimmed || selectedSkills.includes(trimmed)) return;
    setSelectedSkills((prev) => [...prev, trimmed]);
    setSkillInput('');
  }

  function removeSkill(name: string) {
    setSelectedSkills((prev) => prev.filter((s) => s !== name));
  }

  function handleSkillKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title || !form.categoryId || !form.description || !form.scope || !form.budgetMin || !form.budgetMax || !form.deadline) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    if (Number(form.budgetMax) < Number(form.budgetMin)) {
      setError('O orçamento máximo deve ser maior ou igual ao mínimo.');
      return;
    }

    const pendingSkill = skillInput.trim();
    const payloadSkills = pendingSkill
      ? Array.from(new Set([...selectedSkills, pendingSkill]))
      : selectedSkills;

    const payload = {
      title: form.title,
      categoryId: Number(form.categoryId),
      description: form.description,
      scope: form.scope,
      budgetMin: Number(form.budgetMin),
      budgetMax: Number(form.budgetMax),
      deadline: form.deadline,
      skills: payloadSkills,
    };

    setLoading(true);
    try {
      if (isEdit && editId) {
        await projectsHttpService.updateProject(Number(editId), payload);
        setSuccess('Projeto atualizado com sucesso!');
      } else {
        await projectsHttpService.createProject(payload);
        setSuccess('Projeto criado com sucesso!');
      }
      setTimeout(() => navigate('/projects/my'), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || `Erro ao ${isEdit ? 'atualizar' : 'criar'} o projeto.`);
    } finally {
      setLoading(false);
    }
  }

  if (loadingProject) {
    return <div className={styles.container}><p>Carregando projeto...</p></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEdit && (
          <button className={styles.backBtn} onClick={() => navigate(-1)}>← Voltar</button>
        )}
        <h1 className={styles.title}>{isEdit ? 'Editar Projeto' : 'Criar Projeto'}</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.errorBanner}>{error}</div>}
        {success && <div className={styles.successBanner}>{success}</div>}

        <div className={styles.field}>
          <label className={styles.label}>Título *</label>
          <input
            className={styles.input}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: Desenvolvimento de aplicativo mobile"
            maxLength={120}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Categoria *</label>
          <select className={styles.select} name="categoryId" value={form.categoryId} onChange={handleChange}>
            <option value="">Selecione uma categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Descrição *</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descreva o projeto em detalhes..."
            rows={5}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Escopo *</label>
          <textarea
            className={styles.textarea}
            name="scope"
            value={form.scope}
            onChange={handleChange}
            placeholder="Descreva o escopo do trabalho..."
            rows={3}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Orçamento mínimo (R$) *</label>
            <input
              className={styles.input}
              name="budgetMin"
              type="number"
              min="0"
              step="0.01"
              value={form.budgetMin}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Orçamento máximo (R$) *</label>
            <input
              className={styles.input}
              name="budgetMax"
              type="number"
              min="0"
              step="0.01"
              value={form.budgetMax}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Prazo *</label>
          <input
            className={styles.input}
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Habilidades requeridas</label>
          <div className={styles.skillsContainer}>
            {selectedSkills.map((s) => (
              <span key={s} className={styles.skillTag}>
                {s}
                <button type="button" className={styles.skillRemove} onClick={() => removeSkill(s)}>×</button>
              </span>
            ))}
            <input
              className={styles.skillInput}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Digite uma habilidade (Enter adiciona tag)"
            />
          </div>
          {skills.length > 0 && (
            <div className={styles.skillSuggestions}>
              {skills
                .filter((s) => !selectedSkills.includes(s.name))
                .slice(0, 10)
                .map((s) => (
                  <span key={s.id} className={styles.skillChip} onClick={() => addSkill(s.name)}>
                    {s.name}
                  </span>
                ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (isEdit ? 'Salvando...' : 'Criando...') : (isEdit ? 'Salvar' : 'Criar Projeto')}
          </button>
        </div>
      </form>
    </div>
  );
}

