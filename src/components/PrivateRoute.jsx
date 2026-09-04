import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="loader-wrap"><div className="loader" /></div>
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}
