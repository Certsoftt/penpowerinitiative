import { useState } from 'react'
import { Heart, ShieldCheck } from 'lucide-react'
import { createDonation } from '../lib/firebase'

export function DonationPage() {
  const [form, setForm] = useState({ name: '', email: '', amount: '', currency: 'NGN', message: '' })
  const [notice, setNotice] = useState('')
  const [saving, setSaving] = useState(false)

  const submitDonation = async (event) => {
    event.preventDefault()
    setSaving(true)
    const result = await createDonation(form)
    setNotice(result.success ? 'Thank you. Your donation request was recorded and is awaiting payment confirmation.' : result.message || 'Unable to record donation.')
    setSaving(false)
  }

  return <section className="section page-shell"><div className="container donation-layout"><div><p className="eyebrow">Support the work</p><h1>Help raise a conscious generation.</h1><p className="lead">Your contribution supports literacy, mentorship, leadership, and community outreach for young people.</p><div className="donation-promise"><ShieldCheck size={24} /><span>Donations are recorded securely. A supporter badge is shown only after payment is confirmed.</span></div></div><form className="booking-card donation-card" onSubmit={submitDonation}><Heart size={28} className="donation-icon" /><h2>Make a donation</h2><label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label><label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label><div className="amount-row"><label>Amount<input type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></label><label>Currency<select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}><option>NGN</option><option>USD</option><option>GBP</option></select></label></div><label>Message (optional)<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>{notice && <p className="workspace-notice">{notice}</p>}<button className="button button-primary" type="submit" disabled={saving}>{saving ? 'Recording...' : 'Continue donation'}</button><p className="demo-note">Payment confirmation will be connected when a payment provider key is configured.</p></form></div></section>
}
