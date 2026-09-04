import { CheckCircle2 } from 'lucide-react'
import { values, stats } from '../data/siteData'

export function AboutPage() {
  return (
    <section className="section page-shell">
      <div className="container">
        <div className="page-intro">
          <p className="eyebrow">About us</p>
          <h1>Raising a generation that is educated, confident, and conscious.</h1>
          <p className="lead">
            Pen-Power Initiative is a youth- and child-focused development initiative committed to raising a generation of children, teenagers, and young adults who are educated, confident, thoughtful, responsible, and conscious of their potential.
          </p>
        </div>

        <div className="two-column" style={{ marginTop: '2rem' }}>
          <div className="page-banner">
            <h2>Our vision</h2>
            <p>
              To raise a conscious, educated, confident, and purpose-driven generation capable of transforming their communities and shaping a better society.
            </p>
            <h2 style={{ marginTop: '1.5rem' }}>Our mission</h2>
            <p>
              To empower children, teenagers, and young adults through education, mentorship, literacy, leadership development, critical thinking, and character formation.
            </p>
          </div>

          <div className="card-list">
            {values.map((item) => (
              <li key={item}><CheckCircle2 size={18} style={{ marginRight: '0.5rem', color: '#0E7C72' }} /> {item}</li>
            ))}
          </div>
        </div>

        <div className="stats-grid" style={{ marginTop: '2.5rem' }}>
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
