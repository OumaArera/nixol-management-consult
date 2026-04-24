import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage       from './pages/HomePage'
import ServicesPage   from './pages/ServicesPage'
import AboutPage      from './pages/AboutPage'
import ContactPage    from './pages/ContactPage'
import BookingPage    from './pages/Booking'
import LetterheadPage from './pages/LetterheadPage'

function AppRoutes() {
  const location = useLocation()
  // Letterhead has its own full-screen layout (no Navbar/Footer)
  const isLetterhead = location.pathname === '/letterhead'

  return (
    <>
      {!isLetterhead && <Navbar />}
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/services"    element={<ServicesPage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/contact"     element={<ContactPage />} />
        <Route path="/booking"     element={<BookingPage />} />
        {/* Hidden, auth-protected — no nav link */}
        <Route path="/letterhead"  element={<LetterheadPage />} />
        {/* 404 */}
        <Route path="*" element={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '8rem 1.75rem', background: '#04101F' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '7rem', fontWeight: 700, color: '#C9A84C', margin: 0, lineHeight: 1 }}>404</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', margin: '1rem 0 0.75rem' }}>Page Not Found</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#8B9BB4', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
            <a href="/" style={{ padding: '0.85rem 2rem', background: '#C9A84C', color: '#0B1D3A', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px' }}>
              Return Home
            </a>
          </div>
        } />
      </Routes>
      {!isLetterhead && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}