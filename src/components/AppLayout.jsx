import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Mail, Phone, MapPin, Globe, Camera, Send, BriefcaseBusiness } from 'lucide-react'
import { siteConfig } from '../data/siteData'
import { blogPosts } from '../data/siteData'
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

const seoPages = {
  '/': {
    title: 'Pen-Power Initiative | Raising a Conscious Generation',
    description: 'Pen-Power Initiative empowers children, teens, and young adults through literacy, mentorship, leadership development, and community outreach.',
  },
  '/about': {
    title: 'About Pen-Power Initiative | Our Mission and Vision',
    description: 'Learn how Pen-Power Initiative helps young people grow with purpose through education, values, confidence, and leadership development.',
  },
  '/events': {
    title: 'Events and Outreach Programmes | Pen-Power Initiative',
    description: 'Discover upcoming seminars, mentorship programmes, literacy campaigns, and community events from Pen-Power Initiative.',
  },
  '/blog': {
    title: 'Insights on Education, Mentorship and Leadership | Pen-Power Initiative',
    description: 'Read practical insights on literacy, mentorship, personal development, and purpose-driven leadership for the next generation.',
  },
  '/contact': {
    title: 'Contact Pen-Power Initiative | Get Involved',
    description: 'Contact Pen-Power Initiative to support youth development, volunteer, collaborate, or learn more about our community programmes.',
  },
  '/donate': {
    title: 'Donate to Pen-Power Initiative | Support Young People',
    description: 'Support literacy, mentorship, leadership, and outreach programmes that help children and young adults grow with purpose.',
  },
  '/admin/login': {
    title: 'Admin Login | Pen-Power Initiative',
    description: 'Secure administration portal for Pen-Power Initiative content and programme management.',
    noIndex: true,
  },
}

function updateMetaTag(attribute, value, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${value}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, value)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function updateLinkTag(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

export function AppLayout() {
  const location = useLocation()

  useEffect(() => {
    recordPageView(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    const blogPost = location.pathname.startsWith('/blog/')
      ? blogPosts.find((post) => `/blog/${post.id}` === location.pathname)
      : null
    const page = blogPost
      ? { title: `${blogPost.title} | Pen-Power Initiative`, description: blogPost.excerpt }
      : seoPages[location.pathname] || seoPages['/']
    const url = `${window.location.origin}${location.pathname}`
    document.title = page.title
    updateMetaTag('name', 'description', page.description)
    updateMetaTag('name', 'robots', page.noIndex ? 'noindex, nofollow' : 'index, follow')
    updateMetaTag('property', 'og:title', page.title)
    updateMetaTag('property', 'og:description', page.description)
    updateMetaTag('property', 'og:type', blogPost ? 'article' : 'website')
    updateMetaTag('property', 'og:url', url)
    updateMetaTag('property', 'og:site_name', siteConfig.brandName)
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', page.title)
    updateMetaTag('name', 'twitter:description', page.description)
    updateLinkTag('canonical', url)
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
