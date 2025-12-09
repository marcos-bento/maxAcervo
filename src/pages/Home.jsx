import React, { useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProjectGrid from '../components/ProjectGrid'
import ProjectModal from '../components/ProjectModal'
import SearchBar from '../components/SearchBar'
import projetos from '../data/projetos.json'

function Home() {
  const categories = useMemo(
    () => ['Todos', ...new Set(projetos.map((project) => project.category))],
    [],
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return projetos.filter((project) => {
      const matchesCategory =
        selectedCategory === 'Todos' || project.category === selectedCategory
      const matchesTerm =
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tags.some((tag) => tag.toLowerCase().includes(term))

      return matchesCategory && matchesTerm
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="page">
      <Header />
      <main className="content">
        <section className="hero">
          <div>
            <p className="eyebrow">Explorar</p>
            <h2>Projetos em destaque</h2>
            <p className="muted">
              Busque por palavra-chave ou filtre por categoria para navegar pelo acervo.
            </p>
          </div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </section>

        <section className="filters">
          <CategoryFilter
            categories={categories}
            activeCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        </section>

        <section id="projects" className="projects-section">
          <ProjectGrid projects={filteredProjects} onSelect={setSelectedProject} />
        </section>
      </main>

      <Footer />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default Home
