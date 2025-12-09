import React from 'react'

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <header className="modal__header">
          <div className="project-card__pill">{project.category}</div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Fechar">×</button>
        </header>
        <h2>{project.title}</h2>
        <p className="muted">{project.description}</p>
        <div className="modal__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="modal__links">
          {project.link && <a href={project.link} target="_blank" rel="noreferrer">Ver projeto</a>}
          {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Código fonte</a>}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
