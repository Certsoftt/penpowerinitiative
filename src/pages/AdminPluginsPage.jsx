import { useEffect, useState } from 'react'
import { Blocks, Check, Download, Power } from 'lucide-react'
import { saveContent } from '../lib/contentService'
import { readCollection } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'

const catalog = [
  { id: 'event-booking', name: 'Event booking', description: 'Free reservations, capacity controls, and attendee management.' },
  { id: 'donations', name: 'Donation tracking', description: 'Donation records, confirmations, totals, and supporter badges.' },
  { id: 'page-analytics', name: 'Page analytics', description: 'Firebase page-view tracking for the admin overview.' },
]

export function AdminPluginsPage() {
  const { role } = useAuth()
  const [installed, setInstalled] = useState([])
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (role === 'super-admin') readCollection('plugins').then(setInstalled)
  }, [role])

  if (role !== 'super-admin') return <section className="admin-workspace"><div className="empty-state"><h1>Super Admin access required</h1><p>Only Super Admins can install or manage plugins.</p></div></section>

  const install = async (plugin) => {
    const record = { ...plugin, enabled: true, installedAt: new Date().toISOString() }
    const result = await saveContent('plugins', record, plugin.id)
    if (result.success) {
      setInstalled((current) => [...current.filter((item) => item.id !== plugin.id), record])
      setNotice(`${plugin.name} installed.`)
    } else setNotice(result.message || 'Unable to install plugin.')
  }

  const toggle = async (plugin) => {
    const updated = { ...plugin, enabled: !plugin.enabled }
    const result = await saveContent('plugins', updated, plugin.id)
    if (result.success) setInstalled((current) => current.map((item) => item.id === plugin.id ? updated : item))
    else setNotice(result.message || 'Unable to update plugin.')
  }

  return <section className="admin-workspace"><div className="workspace-heading"><div><p className="eyebrow">Platform extensions</p><h1>Plugins</h1><p className="lead">Install and control approved modules that extend the CMS without running untrusted browser code.</p></div></div>{notice && <p className="workspace-notice">{notice}</p>}<div className="plugin-grid">{catalog.map((plugin) => { const active = installed.find((item) => item.id === plugin.id); return <article className="workspace-card plugin-card" key={plugin.id}><Blocks size={24} /><h3>{plugin.name}</h3><p>{plugin.description}</p>{active ? <button type="button" className="button button-secondary" onClick={() => toggle(active)}><Power size={16} aria-hidden="true" />{active.enabled ? 'Disable' : 'Enable'}<Check size={16} aria-hidden="true" /></button> : <button type="button" className="button button-primary" onClick={() => install(plugin)}><Download size={16} aria-hidden="true" />Install</button>}</article> })}</div></section>
}
