import React from 'react'

const Header = () => (
  <header className="header">
    <div className="header__content">
      <div className="logo-circle">M</div>
      <div>
        <p className="eyebrow">Acervo</p>
        <h1 className="title">MaxAcervo</h1>
      </div>
      <nav className="header__nav">
        <a href="#projects">Projetos</a>
        <a href="#contato">Contato</a>
      </nav>
    </div>
  </header>
)

export default Header
