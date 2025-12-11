import React from 'react'

function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="page-container footer-content">
        <p>© {new Date().getFullYear()} Marcos Bento</p>
      </div>
    </footer>
  )
}

export default Footer