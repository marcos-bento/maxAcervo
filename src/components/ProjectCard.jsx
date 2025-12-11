import React from 'react'

const categoryColors = [
  { bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', border: 'rgba(99, 102, 241, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(249, 115, 22, 0.12)', color: '#f97316', border: 'rgba(249, 115, 22, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' },
]

const getCategoryStyle = (category) => {
  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const tone = categoryColors[hash % categoryColors.length]
  return {
    background: tone.bg,
    color: tone.color,
    borderColor: tone.border,
  }
}

function ProjectCard({ project, onClick }) {
  const tecnologias = Array.isArray(project.tecnologias)
    ? project.tecnologias.slice(0, 3)
    : []

  const hostname = (() => {
    try {
      return project.url ? new URL(project.url).hostname : ''
    } catch (_e) {
      return ''
    }
  })()

  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="project-card__header">
        <div className="project-card__icon">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`Thumbnail de ${project.titulo}`}
              loading="lazy"
            />
          ) : (
            <span>{project.titulo?.[0] || '?'}</span>
          )}
        </div>
        <span className="project-card__pill" style={getCategoryStyle(project.categoria)}>
          {project.categoria}
        </span>
      </div>

      <h3 className="project-card__title">{project.titulo}</h3>
      <p className="project-card__description">{project.descricaoCurta}</p>

      {tecnologias.length ? (
        <div className="project-card__tags">
          {tecnologias.map((tec) => (
            <span key={tec} className="tag">{tec}</span>
          ))}
        </div>
      ) : null}

      <div className="project-card__footer">
        <span className="project-card__meta">{project.ano}</span>
        {hostname ? <span className="project-card__link">{hostname}</span> : null}
      </div>
    </div>
  )
}

export default ProjectCard
