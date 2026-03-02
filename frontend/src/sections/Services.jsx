import React from 'react'
import './Services.css'

const SERVICES = [
  { num: '01', icon: '👔', title: 'Executive Search',       desc: 'Identifying and attracting C-suite and senior leadership talent who drive transformation and growth within luxury organisations.',        features: ['Director & VP level placements', 'Confidential search mandates', 'Succession planning support'] },
  { num: '02', icon: '✨', title: 'Luxury Retail Staffing', desc: 'Connecting premium retail brands with client-facing professionals who embody brand values and deliver five-star experiences.',           features: ['Brand ambassadors & stylists', 'Store manager placements', 'Customer experience specialists'] },
  { num: '03', icon: '🏨', title: 'Hospitality Placement',  desc: 'Staffing luxury hotels, resorts, and fine dining establishments with professionals who understand the art of exceptional service.',     features: ['Hotel management talent', 'F&B specialists', 'Guest experience professionals'] },
  { num: '04', icon: '🎯', title: 'Contract & Interim',     desc: 'Agile staffing solutions for seasonal peaks, project launches, and short-term requirements without compromising on calibre.',           features: ['Event & launch staffing', 'Seasonal workforce', 'Project-based hiring'] },
  { num: '05', icon: '🌐', title: 'Talent Consulting',      desc: 'Strategic HR advisory helping luxury brands build compelling employer brands and talent pipelines for long-term success.',              features: ['Employer branding strategy', 'Compensation benchmarking', 'Workforce planning'] },
  { num: '06', icon: '💼', title: 'Career Partnerships',    desc: 'Dedicated support for ambitious professionals seeking to transition into or advance within the luxury and premium lifestyle sector.',    features: ['Career path consultation', 'CV & interview coaching', 'Exclusive job access'] },
]

const INDUSTRIES = [
  { icon: '👗', name: 'Fashion'       },
  { icon: '💍', name: 'Jewellery'     },
  { icon: '🏨', name: 'Hospitality'   },
  { icon: '🛒', name: 'Premium Retail'},
  { icon: '🚗', name: 'Automotive'    },
]

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section-header">
        <div className="eyebrow">What We Offer</div>
        <h2 className="section-title">Tailored Staffing<br />for a <em>Discerning</em> World</h2>
      </div>

      <div className="svc-grid">
        {SERVICES.map((s, i) => (
          <div className="svc-card" key={i}>
            <div className="svc-card__num">{s.num}</div>
            <div className="svc-card__icon">{s.icon}</div>
            <div className="svc-card__title">{s.title}</div>
            <div className="svc-card__desc">{s.desc}</div>
            <ul className="svc-card__list">
              {s.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="industries">
        <h3 className="industries__title">Industries We Serve</h3>
        <p className="industries__sub">Specialising across the full luxury lifestyle spectrum</p>
        <div className="industries__grid">
          {INDUSTRIES.map((ind, i) => (
            <div className="industry-card" key={i}>
              <div className="industry-card__icon">{ind.icon}</div>
              <div className="industry-card__name">{ind.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
