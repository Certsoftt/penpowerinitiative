import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, BookOpen, Blocks, CalendarDays, FilePenLine, Settings, LogOut, Menu, Heart } from 'lucide-react'
import { adminLogout } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'

const navigation = [
  { label: 'Overview', to: '/admin', icon: BarChart3, end: true },
  { label: 'Blog settings', to: '/admin/blog', icon: BookOpen },
  { label: 'Section builder', to: '/admin/sections', icon: Blocks },
  { label: 'Page builder', to: '/admin/pages', icon: FilePenLine },
  { label: 'Event creator', to: '/admin/events', icon: CalendarDays },
  { label: 'Reservations', to: '/admin/reservations', icon: CalendarDays },
  { label: 'Donations', to: '/admin/donations', icon: Heart },
  { label: 'General settings', to: '/admin/settings', icon: Settings },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const { role } = useAuth()
  const visibleNavigation = role === 'super-admin' ? [...navigation, { label: 'Plugins', to: '/admin/plugins', icon: Blocks }] : navigation

  const handleLogout = async () => {
    if (await adminLogout()) navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-heading">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2>Control center</h2>
            <small className="admin-role">{role.replace('-', ' ')}</small>
          </div>
          <Menu size={20} aria-hidden="true" />
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {visibleNavigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          <LogOut size={18} aria-hidden="true" />
          <span>Sign out</span>
        </button>
      </aside>
      <main className="admin-main"><Outlet /></main>
    </div>
  )
}
