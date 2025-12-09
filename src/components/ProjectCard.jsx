import React from 'react'

function ProjectCard({ project, onSelect }) {
  return (
    <article className="project-card" onClick={() => onSelect(project)}>
      <div className="project-card__pill">{project.category}</div>
      <h3>{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </article>
  )
}

export default ProjectCard
