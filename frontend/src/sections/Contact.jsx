import React, { useState } from 'react'
import axios from 'axios'
import './Contact.css'

const INITIAL = { firstName: '', lastName: '', email: '', phone: '', profileType: '', message: '' }

export default function Contact() {
  const [form,   setForm]   = useState(INITIAL)
  const [status, setStatus] = useState('idle')   // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setErrMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <div className="eyebrow">Get in Touch</div>
        <h2 className="section-title">Let's Build Something<br /><em>Exceptional</em> Together</h2>
      </div>

      <div className="contact__grid">
        {/* Info */}
        <div className="contact__info">
          <p className="contact__quote">
            "Whether you're a brand seeking top talent or a professional ready for your next chapter — we're here."
          </p>
          <div className="contact__details">
            <div className="c-item">
              <div className="c-item__icon">📍</div>
              <div><div className="c-item__label">Location</div><div className="c-item__val">India</div></div>
            </div>
            <div className="c-item">
              <div className="c-item__icon">✉</div>
              <div><div className="c-item__label">Email</div><div className="c-item__val">info@prostaffsolution.com</div></div>
            </div>
            <div className="c-item">
              <div className="c-item__icon">🕐</div>
              <div><div className="c-item__label">Office Hours</div><div className="c-item__val">Monday – Saturday, 9am – 6pm IST</div></div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="contact__form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="fgroup">
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={onChange} placeholder="Your first name" required />
            </div>
            <div className="fgroup">
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Your last name" required />
            </div>
          </div>
          <div className="form-row">
            <div className="fgroup">
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" required />
            </div>
            <div className="fgroup">
              <label>Phone (optional)</label>
              <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="fgroup">
            <label>I am a</label>
            <select name="profileType" value={form.profileType} onChange={onChange} required>
              <option value="" disabled>Select your profile</option>
              <option value="employer">Employer / Brand</option>
              <option value="candidate">Job Seeker / Candidate</option>
              <option value="partnership">Partnership Enquiry</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="fgroup">
            <label>Message</label>
            <textarea name="message" value={form.message} onChange={onChange} rows={5} placeholder="Tell us about your requirements..." required />
          </div>

          <button type="submit" className="btn-submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="feedback feedback--success">✦ &nbsp; Thank you. We'll be in touch within 24 hours.</div>
          )}
          {status === 'error' && (
            <div className="feedback feedback--error">✕ &nbsp; {errMsg}</div>
          )}
        </form>
      </div>
    </section>
  )
}
