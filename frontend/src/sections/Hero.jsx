import React from 'react'
import './Hero.css'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const STATS = [
  { num: '500+', label: 'Candidates Placed' },
  { num: '3+',   label: 'Years of Excellence' },
  { num: '50+',  label: 'Luxury Brands Served' },
  { num: '100%', label: 'Client Retention Rate' },
]

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero">
        <div className="hero__content">
          <div className="eyebrow">Premium Staffing Solutions</div>
          <h1>
            Connecting <em>Exceptional</em><br />
            Talent with<br />
            Luxury Brands
          </h1>
          <p>
            Prostafff Solution specialises in curating elite professionals for the world's
            most prestigious organisations. With over three years of excellence, we redefine
            what it means to recruit with purpose.
          </p>
          <div className="hero__actions">
            <button className="btn-gold" onClick={() => scrollTo('services')}>Explore Services</button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>Partner With Us</button>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        {STATS.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat__num">{s.num}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
