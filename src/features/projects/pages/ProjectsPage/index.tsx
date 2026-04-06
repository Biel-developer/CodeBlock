import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './projects.css'
import { RiEqualizerLine } from 'react-icons/ri';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { RiCalendar2Line } from 'react-icons/ri';
import { RiGroupLine } from 'react-icons/ri';
import { useState } from 'react';

export function ProjectsPage() {

  const [value, setValue] = useState(30000);


  return (
    <div className="containerPages">

      <div className="titlePage">
        <h1 className='mainTitle'>Econtrar Projetos</h1>
        <h4 className='secondTitle'>Explore oportunidades e encontre o projeto perfeito para você</h4>
      </div>

      <div className="searchProject">
        <Input.Search placeholder="Buscar Projetos..." enterButton={<SearchOutlined />} variant="filled" />
      </div>

      <div className='projectsPage'>
        <div className='projectsFilter'>
          <div className='titleCard'>
            <RiEqualizerLine className='filterIcon' />
            <span className='filterName'>Filtros</span>
          </div>

          <div className='filtersCategory'>
            <label className='filterLabel'>Categoria</label>
            <select className='selectCategory' name="category" id="category">
              <option value="">Todas as categorias</option>
              <option value="">Desenvolvimento Web</option>
              <option value="">Design UI/UX</option>
              <option value="">Mobile</option>
              <option value="">Marketing Digital</option>
              <option value="">Escrita e Tradução</option>
              <option value="">Video e Animação</option>
              <option value="">Consultoria</option>
              <option value="">Data Science</option>
            </select>
          </div>

          <div className='FilterPrice'>
            <label className='moneySelect'>
              Orçamento: {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} - R$ 30.000,00
            </label>
            <input
              type="range"
              min="0"
              max="30000"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="filterRange"
              style={{ "--value": `${(value / 30000) * 100}%` }}
            />
          </div>

          <div className='filterSkills'>
            <label className="nameFilter">Habilidades</label>

            <div className="filterTags">
              <span className="tagFilter">Next.js</span>
              <span className="tagFilter">React</span>
              <span className="tagFilter">Node.js</span>
              <span className="tagFilter">PostgreSQL</span>
              <span className="tagFilter">Stripe</span>
              <span className="tagFilter">Figma</span>
            </div>
          </div>
        </div>

        <div className='projectsList'>
          <div className='topInformations'>
            <p className='titleProjects'>5 projeto(s) encontrado(s)</p>

            <div className='filtersCategory'>
              <select className='selectCategory' name="category" id="category">
                <option value="">Mais recentes</option>
                <option value="">Maior Orçamento</option>
                <option value="">Menor Orçamento</option>
                <option value="">Prazo mais Proximo</option>
              </select>
            </div>
          </div>

          <div className='projectCard'>
            <div className='containerCard'>
              <div className='nameProject'>
                <h2 className='project'>E-commerce Completo com Next.js</h2>
                <p className='statusProject'>Aberto</p>
              </div>
              <div className='clientInfo'>
                <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' />
                <span>Carlos Mendes</span>
              </div>
              <div className='descriptionProject'>
                <span>Preciso de um desenvolvedor experiente para criar uma loja virtual completa com carrinho, checkout, integracao com gateway de</span>
              </div>
              <div className='skillsProject'>
                <span>Next.jx</span>
                <span>React</span>
                <span>Node.js</span>
                <span>PostgreeSQL</span>
                <span>+1</span>
              </div>
              <div className='infoProject'>
                <div>
                  <RiMoneyDollarCircleLine color="rgba(198,197,197,1)" />
                  <span>R$ 8.000 - R$ 15.000</span>
                </div>
                <div>
                  <RiCalendar2Line color="rgba(190,190,190,1)" />
                  <span>Prazo: 14/07/2026</span>
                </div>
                <div>
                  <RiGroupLine color="rgba(184,182,182,1)" />
                  <span>1 candidato(s)</span>
                </div>
              </div>

              <div className='cardFooter'>
                <span className='publishedAt'>Publicado há cerca de 1 mês</span>
                <button className='btnCandidatar'>Candidatar-se</button>
              </div>
            </div>

            <div className='containerCard'>
              <div className='nameProject'>
                <h2 className='project'>Redesign de Aplicativo Mobile</h2>
                <p className='statusProject'>Aberto</p>
              </div>
              <div className='clientInfo'>
                <img src='https://i.pinimg.com/1200x/91/9c/28/919c28ac6f069f5081961bcc071b608b.jpg' />
                <span>João Carlos</span>
              </div>
              <div className='descriptionProject'>
                <span>Buscando designer UI/UX para redesenhar completamente nosso aplicativo de delivery. Precisamos de um visual moderno e intuitivo.</span>
              </div>
              <div className='skillsProject'>
                <span>Figma</span>
                <span>UI Design</span>
                <span>UX Research</span>
                <span>Prototipagem</span>
              </div>
              <div className='infoProject'>
                <div>
                  <RiMoneyDollarCircleLine color="rgba(198,197,197,1)" />
                  <span>R$ 5.000 - R$ 8.000</span>
                </div>
                <div>
                  <RiCalendar2Line color="rgba(190,190,190,1)" />
                  <span>Prazo: 27/10/2026</span>
                </div>
                <div>
                  <RiGroupLine color="rgba(184,182,182,1)" />
                  <span>1 candidato(s)</span>
                </div>
              </div>

              <div className='cardFooter'>
                <span className='publishedAt'>Publicado há cerca de 2 meses</span>
                <button className='btnCandidatar'>Candidatar-se</button>
              </div>
            </div>

            <div className='containerCard'>
              <div className='nameProject'>
                <h2>Campanha de Marketing Digital</h2>
                <p className='statusProject'>Aberto</p>
              </div>
              <div className='clientInfo'>
                <img src='https://i.pinimg.com/736x/e1/4a/83/e14a8371f954ca9c153ba39cb4af9b87.jpg' />
                <span>Matheus Ryan</span>
              </div>
              <div className='descriptionProject'>
                <span>Precisamos de um especialista para criar e gerenciar campanhas no Google Ads e Meta Ads para nosso lancamento de produto.</span>
              </div>
              <div className='skillsProject'>
                <span>Google Ads</span>
                <span>Facebook Ads</span>
                <span>Analytics</span>
                <span>Copywriting</span>
              </div>
              <div className='infoProject'>
                <div>
                  <RiMoneyDollarCircleLine color="rgba(198,197,197,1)" />
                  <span>R$ 3.000 - R$ 5.000</span>
                </div>
                <div>
                  <RiCalendar2Line color="rgba(190,190,190,1)" />
                  <span>Prazo: 14/09/2026</span>
                </div>
                <div>
                  <RiGroupLine color="rgba(184,182,182,1)" />
                  <span>1 candidato(s)</span>
                </div>
              </div>

              <div className='cardFooter'>
                <span className='publishedAt'>Publicado há cerca de 2 meses</span>
                <button className='btnCandidatar'>Candidatar-se</button>
              </div>
            </div>

            <div className='containerCard'>
              <div className='nameProject'>
                <h2 className='project'>App de Gestao Financeira</h2>
                <p className='statusProject'>Aberto</p>
              </div>
              <div className='clientInfo'>
                <img src='https://i.pinimg.com/736x/56/e6/57/56e657eb35d83c2790c9990751e55eb7.jpg' />
                <span>Lucas Bianco</span>
              </div>
              <div className='descriptionProject'>
                <span>Desenvolvimento de aplicativo mobile para gestao financeira pessoal com graficos, metas e integracao bancaria.</span>
              </div>
              <div className='skillsProject'>
                <span>React Native</span>
                <span>Node.js</span>
                <span>Firebase</span>
                <span>Open Banking API</span>
              </div>
              <div className='infoProject'>
                <div>
                  <RiMoneyDollarCircleLine color="rgba(198,197,197,1)" />
                  <span>R$ 15.000 - R$ 25.000</span>
                </div>
                <div>
                  <RiCalendar2Line color="rgba(190,190,190,1)" />
                  <span>Prazo: 01/08/2026</span>
                </div>
                <div>
                  <RiGroupLine color="rgba(184,182,182,1)" />
                  <span>0 candidato(s)</span>
                </div>
              </div>

              <div className='cardFooter'>
                <span className='publishedAt'>Publicado há cerca de 1 mês</span>
                <button className='btnCandidatar'>Candidatar-se</button>
              </div>
            </div>

            <div className='containerCard'>
              <div className='nameProject'>
                <h2 className='project'>Dashboard de Analytics</h2>
                <p className='statusProject'>Aberto</p>
              </div>
              <div className='clientInfo'>
                <img src='https://i.pinimg.com/736x/83/98/5d/83985d6701fdf8ddca82b6f5aaf7eb21.jpg' />
                <span>Elvis Castro</span>
              </div>
              <div className='descriptionProject'>
                <span>Criar dashboard interativo para visualizacao de dados de vendas e metricas de negocio.</span>
              </div>
              <div className='skillsProject'>
                <span>React</span>
                <span>D3.js</span>
                <span>Python</span>
                <span>SQL</span>
                <span>+1</span>
              </div>
              <div className='infoProject'>
                <div>
                  <RiMoneyDollarCircleLine color="rgba(198,197,197,1)" />
                  <span>R$ 6.000 - R$ 10.000</span>
                </div>
                <div>
                  <RiCalendar2Line color="rgba(190,190,190,1)" />
                  <span>Prazo: 29/07/2026</span>
                </div>
                <div>
                  <RiGroupLine color="rgba(184,182,182,1)" />
                  <span>3 candidato(s)</span>
                </div>
              </div>

              <div className='cardFooter'>
                <span className='publishedAt'>Publicado há cerca de 2 meses</span>
                <button className='btnCandidatar'>Candidatar-se</button>
              </div>
            </div>


          </div>


        </div>
      </div>



    </div>
  );
}
