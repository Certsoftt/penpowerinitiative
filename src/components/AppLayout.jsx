import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Mail, Phone, MapPin, Globe, Camera, Send, BriefcaseBusiness } from 'lucide-react'
import { siteConfig } from '../data/siteData'
import { recordPageView } from '../lib/firebase'
import { useEffect } from 'react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Donate', to: '/donate' },
  { label: 'Admin', to: '/admin/login' },
]

const socialIconMap = {
  facebook: Globe,
  instagram: Camera,
  twitter: Send,
  linkedin: BriefcaseBusiness,
}

export function AppLayout() {
  const location = useLocation()

  useEffect(() => {
    recordPageView(location.pathname)
  }, [location.pathname])

  return (
    <>
      <header className="topbar">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Pen-Power Initiative home">
            <img src={siteConfig.logo} alt="Pen-Power Initiative logo" className="brand-logo" />
            <div>
              <span className="brand-name">{siteConfig.brandName}</span>
              <small>{siteConfig.tagline}</small>
            </div>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/admin/login" className="button button-primary nav-cta">
            Admin Login
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <img src={siteConfig.logo} alt="Pen-Power Initiative logo" className="brand-logo footer-logo" />
            <h3>{siteConfig.brandName}</h3>
            <p>{siteConfig.tagline}</p>
          </div>

          <div>
            <h4>Quick links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/admin/login">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul className="contact-list">
              <li><Mail size={16} /> {siteConfig.email}</li>
              <li><Phone size={16} /> {siteConfig.phone}</li>
              <li><MapPin size={16} /> {siteConfig.address}</li>
            </ul>
          </div>

          <div>
            <h4>Follow us</h4>
            <div className="social-row">
              {Object.entries(siteConfig.socialLinks).map(([key, value]) => {
                const Icon = socialIconMap[key]
                return (
                  <a key={key} href={value} target="_blank" rel="noreferrer" aria-label={key} className="social-badge">
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Pen-Power Initiative</span>
          <Link to="/admin/login" className="inline-link">
            Admin portal <ArrowRight size={15} />
          </Link>
        </div>
      </footer>
    </>
  )
}
