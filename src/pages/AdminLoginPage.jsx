import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin, initializeFirestoreData } from '../lib/firebase'
import { defaultAdminData } from '../data/siteData'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@penpower.org')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const result = await adminLogin(email, password)

    if (result.success) {
      if (result.mode === 'firebase') {
        const initialization = await initializeFirestoreData(defaultAdminData)
        if (!initialization.success) {
          setError(`Signed in, but Firestore setup failed: ${initialization.message}`)
          setLoading(false)
          return
        }
      }
      navigate('/admin')
      return
    }

    setError(result.message || 'Unable to sign in.')
    setLoading(false)
  }

  return (
    <section className="section section-narrow">
      <div className="container auth-shell">
        <form className="auth-card" onSubmit={handleSubmit}>
          <p className="eyebrow">Admin access</p>
          <h1>Login</h1>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <p className="demo-note">
            Firebase auth is supported. If no project config is provided, the app falls back to demo mode.
          </p>
        </form>
      </div>
    </section>
  )
}
