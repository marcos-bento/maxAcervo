import React from 'react'

function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="category-filter">
      <p className="eyebrow">Categorias</p>
      <div className="category-filter__chips">
        {categories.map((category) => (
          <button
            key={category}
            className={category === activeCategory ? 'chip chip--active' : 'chip'}
            onClick={() => onChange(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
