import React from 'react'

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
          aria-label="Fechar"
        >
          ×
        </button>

        <h2>{project.titulo}</h2>
        <p className="muted">{project.descricaoDetalhada}</p>

        <div className="modal__meta">
          <span className="tag">{project.ano}</span>
          <span className="status-pill">{project.status}</span>
        </div>

        {project.tecnologias?.length ? (
          <div className="modal__tags">
            {project.tecnologias.map((tec) => (
              <span key={tec} className="tag">{tec}</span>
            ))}
          </div>
        ) : null}

        {project.tags?.length ? (
          <div className="modal__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        ) : null}

        {project.url ? (
          <div className="modal__links">
            <a className="primary-button" href={project.url} target="_blank" rel="noreferrer">
              Ver site
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProjectModal
