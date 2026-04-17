import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LetterheadPage from './pages/LetterheadPage'

function Layout() {
  const { pathname } = useLocation()
  const isLetterhead = pathname === '/letterhead'

  if (isLetterhead) {
    return (
      <Routes>
        <Route path="/letterhead" element={<LetterheadPage />} />
      </Routes>
    )
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '6rem 1.5rem 2rem' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '7rem', fontWeight: 700, color: 'var(--color-gold-500)', lineHeight: 1 }}>404</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'white', margin: '1rem 0 0.5rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--color-silver-500)', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
        <a href="/" style={{ padding: '0.75rem 2rem', background: 'var(--color-gold-500)', color: 'var(--color-navy-900)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '6px', textDecoration: 'none' }}>
          Return Home
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}


