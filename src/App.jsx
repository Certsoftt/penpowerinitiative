import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { EventsPage } from './pages/EventsPage'
import { EventBookingPage } from './pages/EventBookingPage'
import { ContactPage } from './pages/ContactPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminWorkspacePage } from './pages/AdminWorkspacePage'
import { AdminReservationsPage } from './pages/AdminReservationsPage'
import { AdminDonationsPage } from './pages/AdminDonationsPage'
import { AdminPluginsPage } from './pages/AdminPluginsPage'
import { DonationPage } from './pages/DonationPage'
import { PageNotFound } from './pages/PageNotFound'
import { AppLayout } from './components/AppLayout'
import { PrivateRoute } from './components/PrivateRoute'
import { AdminLayout } from './components/AdminLayout'
import { AuthProvider } from './context/AuthContext'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:slug" element={<EventBookingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
            </Route>
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="blog" element={<AdminWorkspacePage type="blog" />} />
              <Route path="sections" element={<AdminWorkspacePage type="sections" />} />
              <Route path="pages" element={<AdminWorkspacePage type="pages" />} />
              <Route path="events" element={<AdminWorkspacePage type="events" />} />
              <Route path="reservations" element={<AdminReservationsPage />} />
              <Route path="donations" element={<AdminDonationsPage />} />
              <Route path="plugins" element={<AdminPluginsPage />} />
              <Route path="settings" element={<AdminWorkspacePage type="settings" />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
