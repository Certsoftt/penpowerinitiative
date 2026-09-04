import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, BrainCircuit, Users, Sparkles, HeartHandshake, CalendarDays, Quote, BadgeCheck, CheckCircle2 } from 'lucide-react'
import { siteConfig, stats, programCards, values, galleryItems, eventTimeline, blogPosts } from '../data/siteData'

const lucideMap = {
  BookOpen,
  Users,
  Sparkles,
  BrainCircuit,
}

export function HomePage() {
  const featuredPost = blogPosts[0]

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{siteConfig.tagline}</p>
            <h1>Empowering children, teens, and young adults to grow with purpose.</h1>
            <p className="lead">
              We work with young people to strengthen literacy, leadership, values, and confidence so they can become thoughtful contributors to their communities.
            </p>
            <div className="cta-row">
              <Link to="/blog" className="button button-primary">Support a young person</Link>
              <Link to="/blog" className="button button-secondary">Read our story</Link>
            </div>
            <div className="hero-meta">
              <span><BadgeCheck size={18} /> Community-led</span>
              <span><HeartHandshake size={18} /> Youth-focused</span>
            </div>
          </div>

          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80" alt="Young people gathering for a mentorship session" />
            <div className="floating-card">
              <span className="tag">Impact in action</span>
              <strong>12,000+ youth reached</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Our mission</p>
            <h2>Building more than literacy — building identity, purpose, and courage.</h2>
          </div>

          <div className="mission-grid">
            <div className="mission-copy">
              <p>
                We believe education should go beyond passing examinations. A child should not only know what to learn, but also understand who they are, what they can become, and how they can contribute to society.
              </p>
              <p>
                That is why Pen-Power Initiative develops platforms where young people can learn, think, speak, and discover purpose.
              </p>
            </div>

            <ul className="check-list">
              {values.map((item) => (
                <li key={item}><CheckCircle2 size={18} /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>Programs designed to equip young people with confidence and skills.</h2>
          </div>

          <div className="program-grid">
            {programCards.map((item) => {
              const Icon = lucideMap[item.icon]
              return (
                <article key={item.title} className="info-card">
                  <div className="icon-box"><Icon size={22} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="featured-blog">
            <div className="featured-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
            </div>
            <div className="featured-copy">
              <p className="eyebrow">Featured blog post</p>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="blog-meta">
                <span>{featuredPost.author}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <Link to={`/blog/${featuredPost.id}`} className="button button-primary">Read article <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            <h2>Moments from our outreach and learning spaces.</h2>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <figure key={item.title} className="gallery-item">
                <img src={item.image} alt={item.alt} />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Timeline</p>
            <h2>Milestones of our mission in action.</h2>
          </div>

          <div className="timeline">
            {eventTimeline.map((item) => (
              <article key={item.title} className="timeline-item">
                <div className="timeline-date">
                  <span>{item.date}</span>
                </div>
                <div className="timeline-visual">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="timeline-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-box">
          <div>
            <p className="eyebrow">Join the movement</p>
            <h2>Support a generation that is educated, conscious, and ready to lead.</h2>
          </div>
          <div className="cta-row">
            <Link to="/blog" className="button button-primary">Donate</Link>
            <Link to="/blog" className="button button-secondary">Volunteer</Link>
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="container quote-card">
          <Quote size={26} />
          <p>
            “We believe every young person has a story to tell, a potential to develop, and a contribution to make.”
          </p>
        </div>
      </section>
    </>
  )
}
