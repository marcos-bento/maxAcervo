import React, { useMemo, useState } from 'react'
import { Search, ExternalLink, Github, Globe, X, Filter, Sparkles } from 'lucide-react'
import projetos from '../data/projetos.json'
import Footer from '../components/Footer'

const categoryIconMap = {
  'Projeto Profissional': '🧭',
  Freelancer: '🧰',
  'Projeto Pessoal': '🌟',
  Jogo: '🎮',
}

const gradientPalette = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #22c55e, #14b8a6)',
  'linear-gradient(135deg, #f97316, #ef4444)',
  'linear-gradient(135deg, #0ea5e9, #2563eb)',
  'linear-gradient(135deg, #a855f7, #ec4899)',
]

const getStatusClass = (status) => {
  const normalized = status?.toLowerCase()
  if (normalized?.includes('online')) return 'status-pill status-online'
  if (normalized?.includes('desenvolvimento')) return 'status-pill status-dev'
  if (normalized?.includes('offline')) return 'status-pill status-offline'
  return 'status-pill status-default'
}

const getGradient = (project) => {
  const base = project?.categoria || ''
  const hash = base.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return gradientPalette[hash % gradientPalette.length]
}

const getCategoryIcon = (categoria) => categoryIconMap[categoria] || '📦'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = useMemo(() => {
    const uniques = Array.from(new Set(projetos.map((project) => project.categoria)))
    return [
      { id: 'all', name: 'Todos', icon: '🌟' },
      ...uniques.map((cat) => ({
        id: cat,
        name: cat,
        icon: getCategoryIcon(cat),
      })),
    ]
  }, [])

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return projetos.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.categoria === selectedCategory
      const haystack = [
        project.titulo,
        project.descricaoCurta,
        project.descricaoDetalhada,
        ...(project.tags || []),
        ...(project.tecnologias || []),
      ]
      const matchesTerm = haystack.some((field) => field?.toLowerCase().includes(term))
      return matchesCategory && matchesTerm
    })
  }, [searchTerm, selectedCategory])

  const generalProjects = filteredProjects.filter((project) => project.categoria !== 'Jogo')
  const gameProjects = filteredProjects.filter((project) => project.categoria === 'Jogo')

  const getHeroStyle = (project) => {
    if (project.thumbnail) {
      return {
        backgroundImage: `linear-gradient(140deg, rgba(15,23,42,0.65), rgba(15,23,42,0.25)), url(${project.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    return {
      backgroundImage: getGradient(project),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }

  return (
    <div className="page">
      <header className="portfolio-header">
        <div className="page-container header-content">
          <div className="header-title">
            <div className="spark-icon">
              <Sparkles size={24} />
            </div>
            <div>
              <h1>Max Acervo</h1>
              <p>Explore minha coleção de aplicações e funcionalidades.</p>
            </div>
          </div>
          <div className="header-counter">
            <span className="counter-number">{projetos.length}</span>
            <span>projetos</span>
          </div>
        </div>
      </header>

      <main className="page-container main-content">
        <section className="search-section">
          <div className="search-wrapper">
            <Search className="input-icon" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar projetos, tecnologias..."
              className="search-input"
            />
          </div>

          <div className="category-bar">
            <Filter size={18} className="filter-icon" />
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id ? 'category-pill active' : 'category-pill'
                  }
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Aplicações</h2>
          <div className="projects-grid">
            {generalProjects.map((project) => {
              const tags = [...(project.tecnologias || []), ...(project.tags || [])].slice(0, 4)

              return (
                <article
                  key={project.id}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                  style={{ '--card-gradient': getGradient(project), ...getHeroStyle(project) }}
                >
                  <div className="card-hero">
                    <div className="card-icon">{getCategoryIcon(project.categoria)}</div>
                    <span className={getStatusClass(project.status)}>{project.status}</span>
                  </div>

                  <div className="card-body">
                    <h3>{project.titulo}</h3>
                    <p>{project.descricaoCurta}</p>

                    {tags.length ? (
                      <div className="tag-list">
                        {tags.map((tag) => (
                          <span key={tag} className="pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="card-footer">
                      {project.url ? (
                        <a
                          href={project.url}
                          onClick={(event) => event.stopPropagation()}
                          className="link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Globe size={16} />
                          Demo
                        </a>
                      ) : null}
                      {project.url ? (
                        <a
                          href={project.url}
                          onClick={(event) => event.stopPropagation()}
                          className="link muted-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink size={16} />
                          Visitar
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <div className="divider" />

        <section>
          <h2 className="section-title">Jogos</h2>
          <div className="projects-grid">
            {gameProjects.map((project) => {
              const tags = [...(project.tecnologias || []), ...(project.tags || [])].slice(0, 4)

              return (
                <article
                  key={project.id}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                  style={{ '--card-gradient': getGradient(project), ...getHeroStyle(project) }}
                >
                  <div className="card-hero">
                    <div className="card-icon">{getCategoryIcon(project.categoria)}</div>
                    <span className={getStatusClass(project.status)}>{project.status}</span>
                  </div>

                  <div className="card-body">
                    <h3>{project.titulo}</h3>
                    <p>{project.descricaoCurta}</p>

                    {tags.length ? (
                      <div className="tag-list">
                        {tags.map((tag) => (
                          <span key={tag} className="pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="card-footer">
                      {project.url ? (
                        <a
                          href={project.url}
                          onClick={(event) => event.stopPropagation()}
                          className="link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Globe size={16} />
                          Demo
                        </a>
                      ) : null}
                      {project.url ? (
                        <a
                          href={project.url}
                          onClick={(event) => event.stopPropagation()}
                          className="link muted-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink size={16} />
                          Visitar
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Nenhum projeto encontrado</h3>
            <p>Tente ajustar os filtros ou termos de busca</p>
          </div>
        ) : null}
      </main>

      {selectedProject ? (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content new-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-hero" style={getHeroStyle(selectedProject)}>
              <button className="modal-close" type="button" onClick={() => setSelectedProject(null)}>
                <X size={18} />
              </button>
              <div className="modal-icon">{getCategoryIcon(selectedProject.categoria)}</div>
              <h2>{selectedProject.titulo}</h2>
              <span className={getStatusClass(selectedProject.status)}>{selectedProject.status}</span>
            </div>

            <div className="modal-body">
              <h3>Sobre o Projeto</h3>
              <p className="muted-text">{selectedProject.descricaoDetalhada}</p>

              <h4>Tecnologias</h4>
              <div className="tag-list">
                {(selectedProject.tecnologias || []).map((tec) => (
                  <span key={tec} className="pill primary">
                    {tec}
                  </span>
                ))}
              </div>

              {selectedProject.tags?.length ? (
                <>
                  <h4>Tags</h4>
                  <div className="tag-list">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}

              <div className="modal-actions">
                {selectedProject.url ? (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="primary-button modal-button"
                  >
                    <ExternalLink size={18} />
                    Ver Demo
                  </a>
                ) : null}
                {selectedProject.url ? (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button modal-button"
                  >
                    <Github size={18} />
                    Ver Código
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer/>
    </div>
  )
}

export default Home
