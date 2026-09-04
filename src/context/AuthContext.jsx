import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getAdminProfile, subscribeToAuth } from '../lib/firebase'

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  role: 'editor',
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('editor')

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
      setUser(currentUser)
      const profile = currentUser ? await getAdminProfile(currentUser) : { role: 'editor' }
      setRole(profile.role || 'editor')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      role,
    }),
    [user, loading, role],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
