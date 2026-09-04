import { Link } from 'react-router-dom'
import { events } from '../data/siteData'

export function EventsPage() {
  const featuredEvent = events.find((event) => event.featured)
  const upcomingEvents = events.filter((event) => event.status === 'upcoming')
  const pastEvents = events.filter((event) => event.status === 'past')

  return (
    <section className="section page-shell">
      <div className="container">
        <div className="page-intro">
          <p className="eyebrow">Events</p>
          <h1>Community programmes and learning experiences.</h1>
          <p className="lead">
            Our events are designed to bring learning, mentorship, leadership, and outreach into the spaces where young people live, learn, and dream.
          </p>
        </div>

        {featuredEvent && <article className="featured-event">
          <img src={featuredEvent.image} alt={featuredEvent.title} />
          <div><p className="eyebrow">Featured event</p><h2>{featuredEvent.title}</h2><p>{featuredEvent.description}</p><Link className="button button-primary" to={`/events/${featuredEvent.slug}`}>Book this event</Link></div>
        </article>}

        <h2 className="section-title">Upcoming events</h2>
        <div className="event-carousel">
          {upcomingEvents.map((event) => (
            <article key={event.title} className="event-card">
              <img src={event.image} alt={event.title} />
              <div className="event-card-body">
                <p className="eyebrow" style={{ marginBottom: '0.3rem' }}>{new Date(event.startsAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <Link className="text-button" to={`/events/${event.slug}`}>View booking</Link>
              </div>
            </article>
          ))}
        </div>

        <h2 className="section-title">Past events</h2>
        <div className="event-grid">
          {pastEvents.map((event) => <article key={event.id} className="event-card"><img src={event.image} alt={event.title} /><div className="event-card-body"><p className="eyebrow">{event.date}</p><h3>{event.title}</h3><p>{event.description}</p></div></article>)}
        </div>
      </div>
    </section>
  )
}
