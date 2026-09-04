import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogout, isFirebaseConfigured, readCollection } from '../lib/firebase'
import { fetchContent, saveContent, deleteContent } from '../lib/contentService'
import { defaultAdminData } from '../data/siteData'
import { useAuth } from '../context/AuthContext'

const STORAGE_KEY = 'penpower-admin-content'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [content, setContent] = useState(defaultAdminData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [analytics, setAnalytics] = useState({ visitors: 0, donations: 0 })
  const { role } = useAuth()

  useEffect(() => {
    const loadContent = async () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      const dashboardData = isFirebaseConfigured ? await fetchContent() : stored ? JSON.parse(stored) : await fetchContent()
      if (isFirebaseConfigured) {
        const [pageViews, donations] = await Promise.all([readCollection('pageViews'), readCollection('donations')])
        setAnalytics({ visitors: pageViews.length, donations: donations.filter((donation) => donation.status === 'confirmed').reduce((total, donation) => total + Number(donation.amount || 0), 0) })
      }
      setContent(dashboardData)
      setLoading(false)
    }

    loadContent()
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    }
  }, [content, loading])

  const handleLogout = async () => {
    const ok = await adminLogout()
    if (ok) {
      navigate('/admin/login')
    }
  }

  const saveSiteSettings = async () => {
    setSaving(true)
    await saveContent('siteSettings', content.siteSettings, 'general')
    setSaving(false)
  }

  const removeBlogPost = async (id) => {
    const updatedPosts = content.blogPosts.filter((post) => post.id !== id)
    setContent((current) => ({ ...current, blogPosts: updatedPosts }))
    await deleteContent('blogPosts', id)
  }

  const updatePageStatus = (slug, status) => {
    setContent((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.slug === slug ? { ...page, status } : page,
      ),
    }))
  }

  const toggleSectionVisibility = (name, visible) => {
    setContent((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.name === name ? { ...section, visible } : section,
      ),
    }))
  }

  if (loading) {
    return <div className="loader-wrap"><div className="loader" /></div>
  }

  const metrics = [
    { label: 'Published blog posts', value: content.blogPosts.filter((post) => post.status !== 'draft').length },
    { label: 'Page visitors', value: analytics.visitors.toLocaleString() },
    { label: 'Total events', value: content.events?.length || 0 },
    { label: 'Upcoming events', value: content.events?.filter((event) => event.status === 'upcoming').length || 0 },
    { label: 'Featured events', value: content.events?.filter((event) => event.featured).length || 0 },
    { label: 'Community donations', value: `NGN ${analytics.donations.toLocaleString()}` },
  ]

  return (
    <section className="section admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Dashboard</p>

            <h1>Admin control center</h1>
          </div>
          <button type="button" className="button button-secondary" onClick={handleLogout}>Logout</button>
        </div>

        <div className="admin-metrics" aria-label="Site metrics">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="panel">
            <h3>Site settings</h3>
            <label>
              Site name
              <input
                value={content.siteSettings.siteName}
                onChange={(event) => setContent((current) => ({
                  ...current,
                  siteSettings: { ...current.siteSettings, siteName: event.target.value },
                }))}
              />
            </label>
            <label>
              Tagline
              <input
                value={content.siteSettings.tagline}
                onChange={(event) => setContent((current) => ({
                  ...current,
                  siteSettings: { ...current.siteSettings, tagline: event.target.value },
                }))}
              />
            </label>
            <label>
              Email
              <input
                value={content.siteSettings.email}
                onChange={(event) => setContent((current) => ({
                  ...current,
                  siteSettings: { ...current.siteSettings, email: event.target.value },
                }))}
              />
            </label>
            <button type="button" className="button button-primary" onClick={saveSiteSettings} disabled={saving}>
              {saving ? 'Saving...' : 'Save settings'}
            </button>
          </div>

          <div className="panel">
            <h3>Page builder</h3>
            <ul className="stack-list">
              {content.pages.map((page) => (
                <li key={page.slug}>
                  <span>{page.title}</span>
                  <select
                    value={page.status}
                    onChange={(event) => updatePageStatus(page.slug, event.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel full-panel">
            <h3>Section builder</h3>
            <ul className="stack-list">
              {content.sections.map((section) => (
                <li key={section.name}>
                  <span>{section.name}</span>
                  <label className="toggle-row">
                    <input
                      type="checkbox"
                      checked={section.visible}
                      onChange={(event) => toggleSectionVisibility(section.name, event.target.checked)}
                    />
                    Visible
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel full-panel">
            <h3>Blog posts</h3>
            <div className="admin-blog-list">
              {content.blogPosts.map((post) => (
                <article key={post.id} className="admin-blog-item">
                  <div>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                  </div>
                  <button type="button" className="button button-secondary" disabled={role !== 'super-admin'} onClick={() => removeBlogPost(post.id)}>{role === 'super-admin' ? 'Delete' : 'Super Admin only'}</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
