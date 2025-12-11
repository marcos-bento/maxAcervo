import React from 'react'

function CategoryFilter({ categorias, categoriaAtiva, onChange }) {
  return (
    <div className="category-filter">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={
            categoria === categoriaAtiva ? 'category-button active' : 'category-button'
          }
          onClick={() => onChange(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
