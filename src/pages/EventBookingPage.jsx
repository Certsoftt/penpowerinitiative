import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { events } from '../data/siteData'
import { createEventReservation } from '../lib/firebase'

export function EventBookingPage() {
  const { slug } = useParams()
  const event = events.find((item) => item.slug === slug)
  const [form, setForm] = useState({ name: '', email: '' })
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  if (!event) return <section className="section page-shell"><div className="container"><h1>Event not found</h1></div></section>

  const isFull = event.capacity > 0 && event.reservedSeats >= event.capacity
  const date = new Date(event.startsAt)

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault()
    setSaving(true)
    const result = await createEventReservation(event.id, form)
    setMessage(result.success ? 'Your seat is reserved. A confirmation will be sent to your email.' : result.message)
    setSaving(false)
  }

  return (
    <section className="section page-shell">
      <div className="container booking-layout">
        <div>
          <Link className="text-button" to="/events">Back to events</Link>
          <p className="eyebrow" style={{ marginTop: '1.5rem' }}>{event.status}</p>
          <h1>{event.title}</h1>
          <img className="booking-image" src={event.image} alt={event.title} />
          <p className="lead">{event.description}</p>
          <div className="booking-details">
            <p><strong>Date</strong>{date.toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
            <p><strong>Time</strong>{date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} - {new Date(event.endsAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} ({event.timezone})</p>
            <p><strong>Host</strong>{event.host.name}</p>
            {event.guests.length > 0 && <p><strong>Guests</strong>{event.guests.map((guest) => guest.name).join(', ')}</p>}
          </div>
        </div>
        <form className="booking-card" onSubmit={handleSubmit}>
          <p className="eyebrow">Free booking</p>
          <h2>Reserve your seat</h2>
          <p>{event.capacity ? `${Math.max(event.capacity - event.reservedSeats, 0)} seats remaining.` : 'Open event with unlimited capacity.'}</p>
          <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
          {message && <p className="workspace-notice">{message}</p>}
          <button className="button button-primary" type="submit" disabled={saving || isFull}>{isFull ? 'Event full' : saving ? 'Reserving...' : 'Reserve seat'}</button>
        </form>
      </div>
    </section>
  )
}
