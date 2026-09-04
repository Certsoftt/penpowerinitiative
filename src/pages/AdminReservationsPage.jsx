import { useEffect, useState } from 'react'
import { CalendarCheck, RefreshCw } from 'lucide-react'
import { events } from '../data/siteData'
import { readCollection, saveDocument } from '../lib/firebase'

export function AdminReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')

  const loadReservations = async () => {
    setLoading(true)
    const records = await readCollection('eventReservations')
    setReservations(records.sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt))))
    setLoading(false)
  }

  useEffect(() => { loadReservations() }, [])

  const cancelReservation = async (reservation) => {
    const result = await saveDocument('eventReservations', { status: 'cancelled' }, reservation.id)
    if (result.success) {
      setReservations((current) => current.map((item) => item.id === reservation.id ? { ...item, status: 'cancelled' } : item))
      setNotice('Reservation cancelled.')
    } else setNotice(result.message || 'Unable to update reservation.')
  }

  const eventTitle = (eventId) => events.find((event) => event.id === eventId)?.title || eventId

  return <section className="admin-workspace"><div className="workspace-heading"><div><p className="eyebrow">Event operations</p><h1>Reservations</h1><p className="lead">Review free event bookings and manage attendee status.</p></div><button type="button" className="button button-secondary" onClick={loadReservations}><RefreshCw size={17} aria-hidden="true" />Refresh</button></div>{notice && <p className="workspace-notice">{notice}</p>}{loading ? <div className="loader-wrap"><div className="loader" /></div> : reservations.length === 0 ? <div className="empty-state"><CalendarCheck size={28} /><h2>No reservations yet</h2><p>New free event bookings will appear here.</p></div> : <div className="reservation-list">{reservations.map((reservation) => <article className="reservation-row" key={reservation.id}><div><strong>{reservation.name}</strong><span>{reservation.email}</span></div><div><strong>{eventTitle(reservation.eventId)}</strong><span>{reservation.createdAt ? new Date(reservation.createdAt).toLocaleString() : 'Date unavailable'}</span></div><span className={`status-pill ${reservation.status}`}>{reservation.status}</span>{reservation.status !== 'cancelled' && <button type="button" className="text-button" onClick={() => cancelReservation(reservation)}>Cancel</button>}</article>)}</div>}</section>
}
