import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { siteConfig } from '../data/siteData'

export function ContactPage() {
  return (
    <section className="section page-shell">
      <div className="container">
        <div className="page-intro">
          <p className="eyebrow">Contact</p>
          <h1>Let’s build a generation of purpose together.</h1>
          <p className="lead">
            Whether you want to volunteer, donate, mentor, or partner with us, we would love to connect with you.
          </p>
        </div>

        <div className="contact-grid" style={{ marginTop: '2rem' }}>
          <div className="contact-card">
            <h2>Get in touch</h2>
            <ul className="contact-list-block">
              <li><Mail size={18} /> {siteConfig.email}</li>
              <li><Phone size={18} /> {siteConfig.phone}</li>
              <li><MapPin size={18} /> {siteConfig.address}</li>
            </ul>
          </div>

          <div className="form-card">
            <h2>Send a message</h2>
            <form>
              <input type="text" placeholder="Your name" />
              <input type="email" placeholder="Email address" />
              <textarea placeholder="How can we help?" />
              <button type="submit" className="button button-primary">
                <Send size={16} /> Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
