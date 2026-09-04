import { useState } from 'react'
import { Plus, Save } from 'lucide-react'
import { deleteContent, saveContent } from '../lib/contentService'
import { blogPosts, defaultAdminData } from '../data/siteData'
import { useAuth } from '../context/AuthContext'

const workspaceData = {
  blog: {
    eyebrow: 'Content studio',
    title: 'Blog settings',
    description: 'Create and manage articles, categories, tags, SEO metadata, and featured media.',
    items: ['Building Confidence Through Mentorship', 'Why Literacy Goes Beyond Books', 'Purpose-Driven Leadership for the Next Generation'],
    action: 'New blog post',
  },
  sections: {
    eyebrow: 'Reusable content',
    title: 'Section builder',
    description: 'Build reusable sections once, then place them on any page from the page builder.',
    items: ['Hero Section', 'Stats Section', 'Programs Section', 'Gallery Section', 'Timeline Section'],
    action: 'Create section',
  },
  pages: {
    eyebrow: 'Site structure',
    title: 'Page builder',
    description: 'Create, publish, edit, reorder, and manage the pages that make up the public site.',
    items: ['Home (protected)', 'About', 'Blog', 'Events', 'Contact'],
    action: 'Create page',
  },
  settings: {
    eyebrow: 'Brand system',
    title: 'General settings',
    description: 'Manage identity, logo, favicon, contact details, and the site color system.',
    items: ['Brand identity', 'Logo and favicon', 'Primary and secondary colors', 'Contact information'],
    action: 'Save settings',
  },
  events: {
    eyebrow: 'Community calendar',
    title: 'Event creator',
    description: 'Create free or capacity-limited events with booking details, hosts, guests, and meeting links.',
    items: ['Featured event', 'Upcoming events', 'Past events', 'Seat reservations'],
    action: 'Create event',
  },
}

export function AdminWorkspacePage({ type }) {
  if (type === 'blog') return <BlogEditor />
  if (type === 'events') return <EventCreator />
  if (type === 'pages') return <PageBuilder />
  if (type === 'sections') return <SectionBuilder />
  if (type === 'settings') return <GeneralSettings />

  const workspace = workspaceData[type]
  const [notice, setNotice] = useState('')

  const handleAction = () => {
    setNotice(`${workspace.action} workspace is ready for editing.`)
  }

  return (
    <section className="admin-workspace">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">{workspace.eyebrow}</p>
          <h1>{workspace.title}</h1>
          <p className="lead">{workspace.description}</p>
        </div>
        <button type="button" className="button button-primary" onClick={handleAction}>
          {workspace.action === 'Save settings' ? <Save size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
          {workspace.action}
        </button>
      </div>
      {notice && <p className="workspace-notice">{notice}</p>}
      <div className="workspace-grid">
        {workspace.items.map((item, index) => (
          <article className="workspace-card" key={item}>
            <span className="workspace-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item}</h3>
            <p>Editable module with draft, publish, visibility, and content controls.</p>
            <button type="button" className="text-button" onClick={handleAction}>Open editor</button>
          </article>
        ))}
      </div>
    </section>
  )
}

const blankPost = { id: '', title: '', excerpt: '', author: '', category: '', tags: '', keywords: '', seoTitle: '', seoDescription: '', image: '', status: 'draft', contentHtml: '<h2>Start writing</h2><p>Tell your community what matters.</p>' }

function BlogEditor() {
  const [post, setPost] = useState(blankPost)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  const loadPost = (selected) => setPost({ ...blankPost, ...selected, tags: selected.tags?.join(', ') || '', keywords: selected.keywords?.join(', ') || '', contentHtml: selected.contentHtml || selected.content?.map((paragraph) => `<p>${paragraph}</p>`).join('') || blankPost.contentHtml })
  const format = (command, value = null) => document.execCommand(command, false, value)

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault()
    setSaving(true)
    const id = post.id || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const payload = { ...post, id, tags: post.tags.split(',').map((tag) => tag.trim()).filter(Boolean), keywords: post.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean) }
    const result = await saveContent('blogPosts', payload, id)
    setNotice(result.success ? 'Blog post saved successfully.' : result.message || 'Unable to save blog post.')
    setSaving(false)
  }

  return (
    <section className="admin-workspace">
      <div className="workspace-heading"><div><p className="eyebrow">Content studio</p><h1>Blog settings</h1><p className="lead">Write, optimize, and publish community stories from one editor.</p></div><button type="button" className="button button-secondary" onClick={() => setPost(blankPost)}><Plus size={17} aria-hidden="true" />New post</button></div>
      <div className="post-picker">{blogPosts.map((item) => <button type="button" key={item.id} className="text-button" onClick={() => loadPost(item)}>{item.title}</button>)}</div>
      <form className="event-editor" onSubmit={handleSubmit}>
        <div className="editor-section"><h2>Publishing details</h2><div className="editor-grid">
          <label>Title<input value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} required /></label>
          <label>Status<select value={post.status} onChange={(e) => setPost({ ...post, status: e.target.value })}><option value="draft">Draft</option><option value="published">Published</option><option value="scheduled">Scheduled</option></select></label>
          <label>Category<input value={post.category} onChange={(e) => setPost({ ...post, category: e.target.value })} required /></label>
          <label>Author<input value={post.author} onChange={(e) => setPost({ ...post, author: e.target.value })} required /></label>
          <label className="editor-wide">Excerpt<textarea value={post.excerpt} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} required /></label>
          <label>Tags<input value={post.tags} onChange={(e) => setPost({ ...post, tags: e.target.value })} placeholder="mentorship, youth" /></label>
          <label>Keywords<input value={post.keywords} onChange={(e) => setPost({ ...post, keywords: e.target.value })} placeholder="education, leadership" /></label>
          <label className="editor-wide">Featured image URL<input type="url" value={post.image} onChange={(e) => setPost({ ...post, image: e.target.value })} placeholder="https://..." /></label>
        </div></div>
        <div className="editor-section"><h2>Search preview</h2><div className="editor-grid"><label>SEO title<input value={post.seoTitle} onChange={(e) => setPost({ ...post, seoTitle: e.target.value })} /></label><label>SEO description<textarea value={post.seoDescription} onChange={(e) => setPost({ ...post, seoDescription: e.target.value })} /></label></div></div>
        <div className="editor-section"><h2>Article body</h2><div className="editor-toolbar" role="toolbar" aria-label="Formatting tools"><button type="button" onClick={() => format('formatBlock', 'h2')}>Heading</button><button type="button" onClick={() => format('formatBlock', 'p')}>Paragraph</button><button type="button" onClick={() => format('bold')}><strong>Bold</strong></button><button type="button" onClick={() => format('insertUnorderedList')}>List</button><button type="button" onClick={() => format('createLink', window.prompt('Link URL'))}>Link</button><button type="button" onClick={() => format('formatBlock', 'pre')}>Code</button></div><div className="rich-editor" contentEditable suppressContentEditableWarning onInput={(e) => setPost({ ...post, contentHtml: e.currentTarget.innerHTML })} dangerouslySetInnerHTML={{ __html: post.contentHtml }} /></div>
        {notice && <p className="workspace-notice">{notice}</p>}<button className="button button-primary" type="submit" disabled={saving}><Save size={17} aria-hidden="true" />{saving ? 'Saving...' : 'Save blog post'}</button>
      </form>
    </section>
  )
}

function PageBuilder() {
  const { role } = useAuth()
  const reusableSections = ['hero', 'stats', 'programs', 'gallery', 'timeline']
  const [pages, setPages] = useState([
    { slug: 'home', title: 'Home', status: 'published', sections: reusableSections },
    { slug: 'about', title: 'About', status: 'published' },
    { slug: 'blog', title: 'Blog', status: 'published' },
    { slug: 'events', title: 'Events', status: 'published' },
    { slug: 'contact', title: 'Contact', status: 'published', sections: [] },
  ])
  const [notice, setNotice] = useState('')

  const updatePage = async (page, field, value) => {
    const updated = { ...page, [field]: value }
    setPages((current) => current.map((item) => item.slug === page.slug ? updated : item))
    const result = await saveContent('pages', updated, page.slug)
    if (!result.success) setNotice(result.message || 'Unable to update page.')
  }

  const createPage = async () => {
    const title = window.prompt('Page title')
    if (!title?.trim()) return
    const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const page = { slug, title: title.trim(), status: 'draft' }
    const result = await saveContent('pages', page, slug)
    if (result.success) { setPages((current) => [...current, page]); setNotice('Draft page created.') }
    else setNotice(result.message || 'Unable to create page.')
  }

  const removePage = async (page) => {
    if (page.slug === 'home' || role !== 'super-admin') return
    const result = await deleteContent('pages', page.slug)
    if (result.success) setPages((current) => current.filter((item) => item.slug !== page.slug))
    else setNotice(result.message || 'Unable to delete page.')
  }

  const togglePageSection = async (page, sectionType) => {
    const sections = page.sections || []
    const updated = { ...page, sections: sections.includes(sectionType) ? sections.filter((item) => item !== sectionType) : [...sections, sectionType] }
    setPages((current) => current.map((item) => item.slug === page.slug ? updated : item))
    await saveContent('pages', updated, page.slug)
  }

  return <section className="admin-workspace"><div className="workspace-heading"><div><p className="eyebrow">Site structure</p><h1>Page builder</h1><p className="lead">Create pages, assign reusable sections, control publishing, and protect Home from deletion.</p></div><button type="button" className="button button-primary" onClick={createPage}><Plus size={17} aria-hidden="true" />Create page</button></div>{notice && <p className="workspace-notice">{notice}</p>}<div className="builder-list">{pages.map((page) => <article className="builder-row page-builder-row" key={page.slug}><div><strong>{page.title}</strong><span>/{page.slug}</span><div className="page-section-picker">{reusableSections.map((sectionType) => <label key={sectionType}><input type="checkbox" checked={(page.sections || []).includes(sectionType)} onChange={() => togglePageSection(page, sectionType)} />{sectionType}</label>)}</div></div><select value={page.status} onChange={(e) => updatePage(page, 'status', e.target.value)}><option value="draft">Draft</option><option value="published">Published</option><option value="scheduled">Scheduled</option></select><button type="button" className="text-button" disabled={page.slug === 'home' || role !== 'super-admin'} onClick={() => removePage(page)}>{page.slug === 'home' ? 'Protected' : role === 'super-admin' ? 'Delete' : 'Super Admin only'}</button></article>)}</div></section>
}

function SectionBuilder() {
  const [sections, setSections] = useState([
    { name: 'Hero Section', type: 'hero', visible: true },
    { name: 'Stats Section', type: 'stats', visible: true },
    { name: 'Programs Section', type: 'programs', visible: true },
    { name: 'Gallery Section', type: 'gallery', visible: true },
    { name: 'Timeline Section', type: 'timeline', visible: true },
  ])
  const [notice, setNotice] = useState('')

  const persist = async (updated) => {
    setSections(updated)
    const results = await Promise.all(updated.map((section) => saveContent('sections', section, section.type)))
    if (results.some((result) => !result.success)) setNotice('Some section changes could not be saved.')
  }

  const addSection = async () => {
    const name = window.prompt('Section name')
    if (!name?.trim()) return
    const type = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    await persist([...sections, { name: name.trim(), type, visible: true }])
    setNotice('Reusable section added.')
  }

  const moveSection = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= sections.length) return
    const updated = [...sections]
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    persist(updated)
  }

  return <section className="admin-workspace"><div className="workspace-heading"><div><p className="eyebrow">Reusable content</p><h1>Section builder</h1><p className="lead">Build reusable sections and control their visibility before placing them on pages.</p></div><button type="button" className="button button-primary" onClick={addSection}><Plus size={17} aria-hidden="true" />Create section</button></div>{notice && <p className="workspace-notice">{notice}</p>}<div className="builder-list">{sections.map((section, index) => <article className="builder-row" key={section.type}><div><strong>{section.name}</strong><span>{section.type}</span></div><label className="toggle-row"><input type="checkbox" checked={section.visible} onChange={() => persist(sections.map((item) => item.type === section.type ? { ...item, visible: !item.visible } : item))} />Visible</label><div className="builder-actions"><button type="button" className="text-button" onClick={() => moveSection(index, -1)}>Up</button><button type="button" className="text-button" onClick={() => moveSection(index, 1)}>Down</button></div></article>)}</div></section>
}

function GeneralSettings() {
  const [settings, setSettings] = useState(defaultAdminData.siteSettings)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  const update = (field, value) => setSettings((current) => ({ ...current, [field]: value }))
  const saveSettings = async (event) => {
    event.preventDefault()
    setSaving(true)
    const result = await saveContent('siteSettings', settings, 'general')
    setNotice(result.success ? 'General settings saved.' : result.message || 'Unable to save settings.')
    setSaving(false)
  }

  return <section className="admin-workspace"><div className="workspace-heading"><div><p className="eyebrow">Brand system</p><h1>General settings</h1><p className="lead">Control the identity, media references, colors, and contact details used across the site.</p></div></div><form className="event-editor" onSubmit={saveSettings}><div className="editor-section"><h2>Identity</h2><div className="editor-grid"><label>Site name<input value={settings.siteName} onChange={(e) => update('siteName', e.target.value)} required /></label><label>Tagline<input value={settings.tagline} onChange={(e) => update('tagline', e.target.value)} required /></label><label>Logo image URL<input type="url" value={settings.logoUrl || ''} onChange={(e) => update('logoUrl', e.target.value)} placeholder="https://..." /></label><label>Favicon URL<input type="url" value={settings.faviconUrl || ''} onChange={(e) => update('faviconUrl', e.target.value)} placeholder="https://..." /></label></div></div><div className="editor-section"><h2>Appearance</h2><div className="editor-grid"><label>Primary color<input type="color" value={settings.primaryColor} onChange={(e) => update('primaryColor', e.target.value)} /></label><label>Secondary color<input type="color" value={settings.accentColor} onChange={(e) => update('accentColor', e.target.value)} /></label></div></div><div className="editor-section"><h2>Contact</h2><div className="editor-grid"><label>Email<input type="email" value={settings.email} onChange={(e) => update('email', e.target.value)} /></label><label>Phone<input value={settings.phone} onChange={(e) => update('phone', e.target.value)} /></label><label className="editor-wide">Address<textarea value={settings.address} onChange={(e) => update('address', e.target.value)} /></label></div></div>{notice && <p className="workspace-notice">{notice}</p>}<button type="submit" className="button button-primary" disabled={saving}><Save size={17} aria-hidden="true" />{saving ? 'Saving...' : 'Save settings'}</button></form></section>
}

const emptyEvent = {
  id: '',
  slug: '',
  title: '',
  description: '',
  image: '',
  startsAt: '',
  endsAt: '',
  timezone: 'WAT',
  meetingLink: '',
  capacity: 0,
  status: 'upcoming',
  featured: false,
  host: { name: '', image: '' },
  guests: [{ name: '', image: '' }],
}

function EventCreator() {
  const [event, setEvent] = useState(emptyEvent)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  const update = (field, value) => setEvent((current) => ({ ...current, [field]: value }))
  const updateHost = (field, value) => setEvent((current) => ({ ...current, host: { ...current.host, [field]: value } }))
  const updateGuest = (field, value) => setEvent((current) => ({ ...current, guests: [{ ...current.guests[0], [field]: value }] }))

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault()
    setSaving(true)
    setNotice('')
    const id = event.id || event.slug || event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const result = await saveContent('events', { ...event, id, slug: id, capacity: Number(event.capacity) || 0 }, id)
    setNotice(result.success ? 'Event saved successfully.' : result.message || 'Unable to save event.')
    setSaving(false)
  }

  return (
    <section className="admin-workspace">
      <div className="workspace-heading"><div><p className="eyebrow">Community calendar</p><h1>Event creator</h1><p className="lead">Create free events with schedules, capacity, meeting details, and speaker profiles.</p></div></div>
      <form className="event-editor" onSubmit={handleSubmit}>
        <div className="editor-section"><h2>Event details</h2><div className="editor-grid">
          <label>Title<input value={event.title} onChange={(e) => update('title', e.target.value)} required /></label>
          <label>Status<select value={event.status} onChange={(e) => update('status', e.target.value)}><option value="draft">Draft</option><option value="upcoming">Upcoming</option><option value="past">Past</option></select></label>
          <label className="editor-wide">Description<textarea value={event.description} onChange={(e) => update('description', e.target.value)} required /></label>
          <label>Featured image URL<input type="url" value={event.image} onChange={(e) => update('image', e.target.value)} placeholder="https://..." required /></label>
          <label>Capacity (0 = open)<input type="number" min="0" value={event.capacity} onChange={(e) => update('capacity', e.target.value)} /></label>
          <label>Starts<input type="datetime-local" value={event.startsAt} onChange={(e) => update('startsAt', e.target.value)} required /></label>
          <label>Ends<input type="datetime-local" value={event.endsAt} onChange={(e) => update('endsAt', e.target.value)} required /></label>
          <label>Timezone<input value={event.timezone} onChange={(e) => update('timezone', e.target.value)} required /></label>
          <label>Meeting link<input type="url" value={event.meetingLink} onChange={(e) => update('meetingLink', e.target.value)} placeholder="https://meet.google.com/..." /></label>
        </div></div>
        <div className="editor-section"><h2>People</h2><div className="editor-grid">
          <label>Host name<input value={event.host.name} onChange={(e) => updateHost('name', e.target.value)} required /></label>
          <label>Host image URL<input type="url" value={event.host.image} onChange={(e) => updateHost('image', e.target.value)} placeholder="https://..." required /></label>
          <label>Guest name<input value={event.guests[0].name} onChange={(e) => updateGuest('name', e.target.value)} /></label>
          <label>Guest image URL<input type="url" value={event.guests[0].image} onChange={(e) => updateGuest('image', e.target.value)} placeholder="https://..." /></label>
        </div></div>
        <label className="toggle-row"><input type="checkbox" checked={event.featured} onChange={(e) => update('featured', e.target.checked)} /> Featured event</label>
        {notice && <p className="workspace-notice">{notice}</p>}
        <button className="button button-primary" type="submit" disabled={saving}><Save size={17} aria-hidden="true" />{saving ? 'Saving...' : 'Save event'}</button>
      </form>
    </section>
  )
}
