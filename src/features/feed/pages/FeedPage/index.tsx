import { useState } from 'react';
import { Briefcase, Trophy, MoreHorizontal, Heart, MessageCircle, Share2, Users } from 'lucide-react';
import './FeedPage.css';

const mockPosts = [
  {
    id: 1,
    author: 'Ana Silva',
    role: 'Freelancer',
    time: 'há cerca de 2 anos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    content: 'Acabei de finalizar um projeto incrível usando Next.js 14 com Server Components. A performance ficou absurda! Alguém mais está explorando essa stack?',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    author: 'Ricardo Lima',
    role: 'Dev Full Stack',
    time: 'há 5 horas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    content: 'Dica rápida: se você ainda não usa Zod para validação de formulários com React Hook Form, está perdendo tempo. Combinação perfeita! ',
    image: null,
    likes: 41,
    comments: 12,
  },
  {
    id: 3,
    author: 'Juliana Ferreira',
    role: 'UI/UX Designer',
    time: 'há 1 dia',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    content: 'O mercado de design está cada vez mais exigente. Figma, Framer, Protopie... não basta só saber desenhar bonito. Quem não domina animações e micro-interações está ficando pra trás. Qual ferramenta vocês mais usam no dia a dia?',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    likes: 87,
    comments: 34,
  },
  {
    id: 4,
    author: 'Marcos Oliveira',
    role: 'Tech Lead',
    time: 'há 2 dias',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    content: 'IA generativa está mudando completamente o fluxo de trabalho dos devs. Uso o Cursor + Claude todo dia e minha produtividade triplicou. Mas atenção: quem não souber revisar o código gerado vai ter problemas sérios em produção. A IA é uma ferramenta, não um substituto.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=400&fit=crop',
    likes: 156,
    comments: 62,
  },
  {
    id: 5,
    author: 'Camila Rocha',
    role: 'Engenheira de Software · Google',
    time: 'há 3 dias',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
    content: 'Acabei de passar pelo processo seletivo do Google e quero compartilhar: foram 6 meses de preparação, 5 rounds de entrevistas técnicas e muito LeetCode. Mas o que realmente fez diferença foi entender os fundamentos — algoritmos, estrutura de dados e system design. Se você quer uma big tech, invista nos fundamentos. 🎯',
    image: null,
    likes: 312,
    comments: 98,
  },
  {
    id: 6,
    author: 'Felipe Nunes',
    role: 'DevOps Engineer',
    time: 'há 3 dias',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    content: 'Kubernetes em produção sem observabilidade é receita pra desastre. Montamos uma stack completa com Grafana + Prometheus + Loki e finalmente conseguimos dormir tranquilos. Tempo médio de detecção de incidentes caiu de 40min para menos de 2min.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    likes: 73,
    comments: 21,
  },
  {
    id: 7,
    author: 'Beatriz Santos',
    role: 'Product Manager',
    time: 'há 4 dias',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face',
    content: 'O mercado de tech no Brasil em 2024: salários estabilizaram após o boom do remote work, mas a demanda por profissionais sênior continua altíssima. Vejo empresas pagando R$ 25k+ para bons engenheiros. O problema? Falta de profissionais qualificados, não falta de vagas. Invistam em vocês mesmos! 📈',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    likes: 204,
    comments: 87,
  },
  {
    id: 8,
    author: 'Gabriel Costa',
    role: 'Mobile Developer',
    time: 'há 5 dias',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
    content: 'React Native vs Flutter em 2024: após usar os dois em projetos grandes, minha conclusão é que Flutter ganhou em performance e consistência visual, mas React Native ainda vence em ecossistema e reaproveitamento de código web. Qual time você está? 👇',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    likes: 118,
    comments: 53,
  },
];

const featuredProjects = [
  { id: 1, title: 'E-commerce Completo com Next.js', price: 'R$ 8.000 - 15.000', candidates: 1, skills: ['Next.js', 'React'] },
  { id: 2, title: 'Redesign de Aplicativo Mobile', price: 'R$ 5.000 - 8.000', candidates: 1, skills: ['Figma', 'UI Design'] },
  { id: 3, title: 'App de Gestão Financeira', price: 'R$ 15.000 - 25.000', candidates: 0, skills: ['React Native', 'Node.js'] },
];

const topFreelancers = [
  { rank: 1, name: 'Mariana Costa', skill: 'Figma', rating: 5.0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
  { rank: 2, name: 'Ana Silva', skill: 'React', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { rank: 3, name: 'Ricardo Lima', skill: 'React Native', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { rank: 4, name: 'Julia Santos', skill: 'SEO', rating: 4.6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
];

const communityGroups = [
  {
    id: 1,
    name: 'React Developers BR',
    members: '0',
    icon: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&fit=crop',
    joined: true,
  },
  {
    id: 2,
    name: 'UI/UX Design',
    members: '0',
    icon: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&h=80&fit=crop',
    joined: false,
  },
  {
    id: 3,
    name: 'Node.js & Backend',
    members: '0',
    icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=80&h=80&fit=crop',
    joined: true,
  },
  {
    id: 4,
    name: 'Freelancers Brasil',
    members: '0',
    icon: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=80&h=80&fit=crop',
    joined: false,
  },
  {
    id: 5,
    name: 'DevOps & Cloud',
    members: '0',
    icon: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=80&h=80&fit=crop',
    joined: false,
  },
  {
    id: 6,
    name: 'Mobile Dev',
    members: '0',
    icon: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=80&h=80&fit=crop',
    joined: false,
  },
];

export function FeedPage() {
  const [activeTab, setActiveTab] = useState('para-voce');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [groups, setGroups] = useState(communityGroups);
  const [showAllGroups, setShowAllGroups] = useState(false);

  const toggleLike = (id: number) => {
    setLikedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleJoin = (id: number) => {
    setGroups(prev =>
      prev.map(g => g.id === id ? { ...g, joined: !g.joined } : g)
    );
  };

  const visibleGroups = showAllGroups ? groups : groups.slice(0, 4);

  return (
    <div className="feed-page">
      <div className="feed-main">
        <div className="feed-share-box">
          <div className="share-avatar placeholder">?</div>
          <input
            className="share-input"
            placeholder="Entre para compartilhar algo com a comunidade..."
          />
        </div>

        <div className="feed-tabs">
          {[{ key: 'para-voce', label: 'Para Você' }, { key: 'recentes', label: 'Recentes' }, { key: 'populares', label: 'Populares' }].map(tab => (
            <button
              key={tab.key}
              className={`feed-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {mockPosts.map(post => (
          <div key={post.id} className="feed-post">
            <div className="post-header">
              <img src={post.avatar} alt={post.author} className="post-avatar" />
              <div className="post-author-info">
                <span className="post-author-name">{post.author}</span>
                <span className="post-author-meta">{post.role} • {post.time}</span>
              </div>
              <button className="post-more"><MoreHorizontal size={18} /></button>
            </div>

            <p className="post-content">{post.content}</p>

            {post.image && (
              <img src={post.image} alt="post" className="post-image" />
            )}

            <div className="post-actions">
              <button
                className={`post-action-btn ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <Heart size={16} fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} />
                <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
              </button>
              <button className="post-action-btn">
                <MessageCircle size={16} />
                <span>{post.comments}</span>
              </button>
              <button className="post-action-btn">
                <Share2 size={16} />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="feed-sidebar">

        <div className="sidebar-card">
          <div className="sidebar-card-title">
            <Users size={18} color="#8b5cf6" />
            <span>Comunidades</span>
          </div>
          <div className="group-list">
            {visibleGroups.map(group => (
              <div key={group.id} className="group-item">
                <img src={group.icon} alt={group.name} className="group-icon-img" />
                <div className="group-info">
                  <span className="group-name">{group.name}</span>
                  <span className="group-members">{group.members} membros</span>
                </div>
                <button
                  className={`group-join-btn ${group.joined ? 'joined' : ''}`}
                  onClick={() => toggleJoin(group.id)}
                >
                  {group.joined ? 'Entrou' : 'Entrar'}
                </button>
              </div>
            ))}
          </div>
          <button className="sidebar-link-btn" onClick={() => setShowAllGroups(prev => !prev)}>
            {showAllGroups ? 'Ver menos' : 'Ver todas as comunidades'}
          </button>
        </div>

        {/* Projetos em Destaque */}
        <div className="sidebar-card">
          <div className="sidebar-card-title">
            <Briefcase size={18} />
            <span>Projetos em Destaque</span>
          </div>
          <div className="project-list">
            {featuredProjects.map(project => (
              <div key={project.id} className="project-item">
                <div className="project-item-top">
                  <span className="project-item-name">{project.title}</span>
                  <span className="project-item-candidates">{project.candidates} candidatos</span>
                </div>
                <div className="project-item-bottom">
                  <span className="project-item-price">{project.price}</span>
                  <div className="project-skills">
                    {project.skills.map(s => (
                      <span key={s} className="project-skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="sidebar-link-btn">Ver todos os projetos</button>
        </div>

        {/* Top Freelancers */}
        <div className="sidebar-card">
          <div className="sidebar-card-title">
            <Trophy size={18} color="#f59e0b" />
            <span>Top Freelancers</span>
          </div>
          <div className="freelancer-list">
            {topFreelancers.map(f => (
              <div key={f.rank} className="freelancer-item">
                <span className="freelancer-rank">{f.rank}</span>
                <img src={f.avatar} alt={f.name} className="freelancer-avatar" />
                <div className="freelancer-info">
                  <span className="freelancer-name">{f.name}</span>
                  <span className="freelancer-skill">{f.skill}</span>
                </div>
                <div className="freelancer-rating">
                  <span>⭐</span>
                  <span>{f.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="sidebar-link-btn">Ver ranking completo</button>
        </div>

      </aside>
    </div>
  );
}

