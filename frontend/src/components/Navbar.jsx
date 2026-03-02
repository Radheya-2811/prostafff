import React, { useEffect, useState } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'Home',     id: 'home' },
  { label: 'About',    id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact',  id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      // Determine which section is in view
      let current = 'home'
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) current = id
      })
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <img src="/src/img/logo.png" alt="Logo" style={{height:"40px",width:"auto"}}/>

      <ul className="navbar__links">
        {NAV_ITEMS.map(({ label, id }) => (
          <li key={id}>
            <button
              className={`navbar__link ${active === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <button className="navbar__cta" onClick={() => scrollTo('contact')}>
        Get in Touch
      </button>
    </nav>
  )
}
