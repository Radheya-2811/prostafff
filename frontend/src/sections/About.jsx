import React from 'react'
import './About.css'

const VALUES = [
  { icon: '✦', title: 'Precision Matching',      desc: 'We go beyond CVs — understanding culture fit, ambition, and potential to ensure placements that stand the test of time.' },
  { icon: '◆', title: 'Confidential & Discreet', desc: "Handling every search with the utmost discretion, protecting both our clients' reputation and our candidates' privacy." },
  { icon: '❋', title: 'Long-Term Partnerships',  desc: 'We invest in relationships, not transactions. Our 100% retention rate is testament to the enduring partnerships we build.' },
]

const MILESTONES = [
  { num: '500+', label: 'Placements'   },
  { num: '50+',  label: 'Luxury Brands' },
  { num: '100%', label: 'Retention'    },
  { num: '3+',   label: 'Years Active' },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <div className="eyebrow">Our Story</div>
        <h2 className="section-title">Built on Trust,<br />Driven by <em>Excellence</em></h2>
      </div>

      <div className="about__grid">
        {/* Left — text + values */}
        <div className="about__text">
          <p>Prostaff Solution Private Limited was founded with a singular vision: to bridge the gap between <strong>extraordinary talent</strong> and the brands that demand nothing less than exceptional. We understand that in the luxury sector, every hire is a statement.</p>
          <p>Our consultants bring deep industry knowledge and an unmatched network across hospitality, fashion, lifestyle, and premium retail. We don't just fill positions — we <strong>craft careers</strong> and <strong>build teams</strong> that last.</p>
          <p>With a 100% client retention rate and over 500 successful placements, our results speak for themselves. Every candidate we place is a reflection of our commitment to quality.</p>
          <div className="gold-line" />
          <div className="values">
            {VALUES.map((v, i) => (
              <div className="value" key={i}>
                <span className="value__icon">{v.icon}</span>
                <div>
                  <div className="value__title">{v.title}</div>
                  <div className="value__desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — quote + milestone grid */}
        <div className="about__right">
          <div className="quote-block">
            <blockquote>"We don't simply place professionals — we architect the foundations of exceptional organisations."</blockquote>
            <cite>— Prostaff Solution, Est. 3+ Years</cite>
          </div>
          <div className="milestones">
            {MILESTONES.map((m, i) => (
              <div className="milestone" key={i}>
                <div className="milestone__num">{m.num}</div>
                <div className="milestone__label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
