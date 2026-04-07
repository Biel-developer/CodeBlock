import React from 'react';
import './styles.css';

// ----------------------------------------------------
// ÍCONES SVG DA APLICAÇÃO
// ----------------------------------------------------
const SearchIcon = ({ size, color }: { size: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const TrophyIcon = ({ size, color, fill, className }: { size: number; color?: string; fill?: string; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const MedalIcon = ({ size, color, fill, style }: { size: number; color?: string; fill?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const StarIcon = ({ size, color, fill }: { size: number; color?: string; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const BriefcaseIcon = ({ size, color }: { size: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);


// ----------------------------------------------------
// DADOS MOCKADOS E CONFIGURAÇÕES
// ----------------------------------------------------
const mockFreelancers = [
  { id: 1, name: 'Ana Silva', location: 'São Paulo, SP', skills: ['UI/UX Design', 'Figma', 'React'], rating: '5.0', projects: 50, avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Carlos Santos', location: 'Belo Horizonte, MG', skills: ['Node.js', 'PostgreSQL', 'AWS'], rating: '4.9', projects: 42, avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Marina Oliveira', location: 'Curitiba, PR', skills: ['Copywriting', 'SEO', 'Marketing'], rating: '4.8', projects: 30, avatar: 'https://i.pravatar.cc/150?img=35' },
  { id: 4, name: 'Roberto Fernandes', location: 'Rio de Janeiro, RJ', skills: ['Illustrator', 'Photoshop', 'Branding'], rating: '4.8', projects: 28, avatar: 'https://i.pravatar.cc/150?img=60' }
];


// ----------------------------------------------------
// COMPONENTE PRINCIPAL DA PÁGINA
// ----------------------------------------------------
export function RankingPage() {

  const getRowClassName = (index: number) => {
    const base = 'freelancer-row-hover row-base';
    const border = index < mockFreelancers.length - 1 ? ' row-border' : '';

    switch (index) {
      case 0: return base + border + ' bg-first';
      case 1: return base + border + ' bg-second';
      case 2: return base + border + ' bg-third';
      default: return base + border + ' bg-default';
    }
  };

  const renderPositionIcon = (index: number) => {
    switch (index) {
      case 0: return <TrophyIcon size={28} color="#ffe600ff" fill="#fef08a" />;
      case 1: return <MedalIcon size={28} color="#5e5e5eff" fill="#e5e7eb" />;
      case 2: return <MedalIcon size={28} color="#5e5e5eff" fill=" #CD7F32" />;
      default: return <div className="default-position">{index + 1}</div>;
    }
  };

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* CONTAINER PRINCIPAL */}
      {/* ---------------------------------------------------- */}
      <div className="ranking-page-container">

        {/* ---------------------------------------------------- */}
        {/* HEADER SUPERIOR E BUSCA */}
        {/* ---------------------------------------------------- */}
        <div className="header-container">

          <div className="search-box">
            <SearchIcon size={20} color="#9ca3af" />
            <input type="text" placeholder="Buscar projetos, freelancers..." className="search-input" />
          </div>

          <button className="login-btn">Entrar</button>
        </div>


        {/* ---------------------------------------------------- */}
        {/* TÍTULOS CENTRALIZADOS */}
        {/* ---------------------------------------------------- */}
        <div className="title-container">
          <h1 className="main-title">Ranking</h1>
          <p className="sub-title">Os melhores profissionais e contratantes da plataforma</p>
        </div>


        {/* ---------------------------------------------------- */}
        {/* CONTROLE DE ABAS (TABS) */}
        {/* ---------------------------------------------------- */}
        <div className="tabs-outer-container">
          <div className="tabs-wrapper">
            <div className="tab-active">Top Freelancers</div>
            <div className="tab-inactive">Top Contratantes</div>
          </div>
        </div>


        {/* ---------------------------------------------------- */}
        {/* CARTÃO DA LISTA DE FREELANCERS */}
        {/* ---------------------------------------------------- */}
        <div className="card-container">

          <div className="card-header">
            <TrophyIcon size={24} color="#2563eb" className="icon" />
            <h2 className="card-title">Melhores Freelancers</h2>
          </div>

          <div className="list-container">
            {mockFreelancers.map((freelancer, index) => (

              /* ---------------------------------------------------- */
              /* COMPONENTE DA LINHA DO FREELANCER (ITEM) */
              /* ---------------------------------------------------- */
              <div key={freelancer.id} className={getRowClassName(index)}>

                <div className="position-container">
                  {renderPositionIcon(index)}
                </div>

                <div className="profile-container">
                  <img src={freelancer.avatar} alt={freelancer.name} className="profile-avatar" />

                  <div className="profile-info">

                    <div className="profile-texts">
                      <span className="profile-name">{freelancer.name}</span>
                      <span className="profile-location">{freelancer.location}</span>
                    </div>

                    <div className="tags-container">
                      {freelancer.skills.map((skill, i) => (
                        <span key={i} className="tag-item">{skill}</span>
                      ))}
                    </div>

                  </div>
                </div>

                <div className="stats-container">

                  <div className="stat-item">
                    <StarIcon size={20} color="#eab308" fill="#eab308" />
                    <span className="stat-text">{freelancer.rating}</span>
                  </div>

                  <div className="stat-item">
                    <BriefcaseIcon size={20} color="#9ca3af" />
                    <span className="stat-text-projects">
                      {freelancer.projects} <span className="stat-label">projetos</span>
                    </span>
                  </div>

                </div>

              </div>

            ))}
          </div>
        </div>

      </div>
    </>
  );
}
