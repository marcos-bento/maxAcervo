import React from 'react'
import { Database } from 'lucide-react'

function Header({ totalProjetos }) {
  return (
      <header className="portfolio-header">
        <div className="page-container header-content">
          <div className="header-title">
            <div className="spark-icon">
              <Database size={24} />
            </div>
            <div>
              <h1>Max Acervo</h1>
              <p>Explore minha coleção de aplicações e funcionalidades.</p>
            </div>
          </div>
          <div className="header-counter">
            <span className="counter-number">{totalProjetos}</span>
            <span>projetos</span>
          </div>
        </div>
      </header>
  )
}

export default Header
