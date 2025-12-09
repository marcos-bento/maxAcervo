import React from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="eyebrow" htmlFor="search">Buscar projetos</label>
      <input
        id="search"
        type="text"
        placeholder="Procure por nome, tecnologia ou palavra-chave"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
