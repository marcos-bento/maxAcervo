import React from 'react'
import ProjectCard from './ProjectCard'

function ProjectGrid({ projects, onSelect }) {
  if (!projects.length) {
    return <p className="muted">Nenhum projeto encontrado.</p>
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default ProjectGrid
