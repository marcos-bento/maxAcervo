import React from 'react'
import ProjectCard from './ProjectCard'

function ProjectGrid({ projects, onSelectProject }) {
  if (!projects.length) {
    return <p className="muted">Nenhum projeto encontrado.</p>
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={onSelectProject} />
      ))}
    </div>
  )
}

export default ProjectGrid
