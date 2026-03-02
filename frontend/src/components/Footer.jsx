import React from 'react'
import './Footer.css'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand-col">
          <div className="footer__brand" onClick={() => scrollTo('home')}>Prostaff Solution</div>
          <p className="footer__tagline">
            Connecting exceptional talent with the world's most prestigious luxury brands since our founding.
          </p>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Navigate</div>
          <ul className="footer__links">
            <li><button onClick={() => scrollTo('home')}>Home</button></li>
            <li><button onClick={() => scrollTo('about')}>About Us</button></li>
            <li><button onClick={() => scrollTo('services')}>Services</button></li>
            <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
          </ul>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Services</div>
          <ul className="footer__links">
            <li><span>Executive Search</span></li>
            <li><span>Luxury Retail Staffing</span></li>
            <li><span>Hospitality Placement</span></li>
            <li><span>Contract & Interim</span></li>
            <li><span>Talent Consulting</span></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">© {new Date().getFullYear()} Prostaff Solution Private Limited. All rights reserved.</span>
        <span className="footer__reg">Pvt. Ltd. Registered in India</span>
      </div>
    </footer>
  )
}
