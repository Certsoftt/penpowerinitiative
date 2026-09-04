import { useEffect, useState } from 'react'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import { readCollection, saveDocument } from '../lib/firebase'

export function AdminDonationsPage() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')

  const loadDonations = async () => {
    setLoading(true)
    const records = await readCollection('donations')
    setDonations(records.sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt))))
    setLoading(false)
  }

  useEffect(() => { loadDonations() }, [])

  const confirmDonation = async (donation) => {
    const result = await saveDocument('donations', { status: 'confirmed', supporterBadge: true, confirmedAt: new Date().toISOString() }, donation.id)
    if (result.success) {
      setDonations((current) => current.map((item) => item.id === donation.id ? { ...item, status: 'confirmed', supporterBadge: true } : item))
      setNotice('Donation confirmed and supporter badge applied.')
    } else setNotice(result.message || 'Unable to confirm donation.')
  }

  const confirmedTotal = donations.filter((donation) => donation.status === 'confirmed').reduce((total, donation) => total + Number(donation.amount || 0), 0)

  return <section className="admin-workspace"><div className="workspace-heading"><div><p className="eyebrow">Community support</p><h1>Donations</h1><p className="lead">Review donation requests, confirm payments, and recognize confirmed supporters.</p></div><button type="button" className="button button-secondary" onClick={loadDonations}><RefreshCw size={17} aria-hidden="true" />Refresh</button></div><div className="donation-total"><span>Confirmed donations</span><strong>NGN {confirmedTotal.toLocaleString()}</strong></div>{notice && <p className="workspace-notice">{notice}</p>}{loading ? <div className="loader-wrap"><div className="loader" /></div> : donations.length === 0 ? <div className="empty-state"><CheckCircle2 size={28} /><h2>No donations recorded yet</h2><p>Donation requests will appear here.</p></div> : <div className="reservation-list">{donations.map((donation) => <article className="reservation-row" key={donation.id}><div><strong>{donation.name}</strong><span>{donation.email}</span></div><div><strong>{donation.currency} {Number(donation.amount).toLocaleString()}</strong><span>{donation.message || 'No message'}</span></div><span className={`status-pill ${donation.status}`}>{donation.status}</span>{donation.status === 'pending' && <button type="button" className="text-button" onClick={() => confirmDonation(donation)}>Confirm payment</button>}{donation.supporterBadge && <span className="supporter-badge">Supporter</span>}</article>)}</div>}</section>
}
