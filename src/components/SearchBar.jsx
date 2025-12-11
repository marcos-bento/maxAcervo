import React from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Buscar por título, tecnologia ou palavra-chave..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
