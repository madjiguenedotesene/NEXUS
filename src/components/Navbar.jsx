import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Zap, Cpu, Home, Search, GraduationCap } from 'lucide-react'
import logoUrl from '../assets/logo.png';
/* ──────────────────────────────────────────
   PALETTE APEX GREEN
────────────────────────────────────────── */
const APEX_BLACK = '#000000'
const DARK_GREEN = '#064e3b'
const GREEN_ACCENT = '#059669'
const TEXT_WHITE = '#ffffff'
const TEXT_MUTED = '#94a3b8'

// Liens mis à jour selon ta structure de fichiers
const navLinks = [
  { name: 'Accueil', path: '/', icon: <Home size={15} /> },
  { name: 'CV Anti-ATS', path: '/CvAntiAts', icon: <Cpu size={15} /> },
  { name: 'Candidatures', path: '/Spontanee', icon: <Zap size={15} /> },
  { name: 'Campus France', path: '/Dossier', icon: <GraduationCap size={15} /> },
  { name: 'Recherche', path: '/Recherche', icon: <Search size={15} /> },
]

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isOpen) setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(0,0,0,0.9)' : APEX_BLACK,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: `1px solid ${DARK_GREEN}`,
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isMobile ? '0 16px' : '0 32px',
            height: isMobile ? '76px' : '88px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
         <Link to="/" style={{ lineHeight: 0, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
  <img 
    src={logoUrl} 
    alt="Nexus Omni Bot Logo" 
    style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
  />
</Link>

          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navLinks.map((link) => (
                <NavLink key={link.path} link={link} active={location.pathname === link.path} />
              ))}
            </div>
          )}

          {isMobile && (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                width: '40px', height: '40px', borderRadius: '10px',
                border: `1px solid ${DARK_GREEN}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#111', cursor: 'pointer', color: TEXT_WHITE,
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              style={{
                position: 'fixed', top: 0, right: 0, height: '100vh', width: '280px',
                background: APEX_BLACK, zIndex: 201, padding: '24px', display: 'flex', flexDirection: 'column',
                borderLeft: `1px solid ${DARK_GREEN}`,
              }}
            >
              <div style={{ marginBottom: '24px', borderBottom: `1px solid ${DARK_GREEN}`, paddingBottom: '20px' }}>
                <span style={{ color: GREEN_ACCENT, fontWeight: '900', fontSize: '24px' }}>ÉLAN PRO</span>
              </div>

              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} style={mobileNavLinkStyle(location.pathname === link.path)}>
                  <span style={{ color: location.pathname === link.path ? GREEN_ACCENT : TEXT_MUTED }}>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const NavLink = ({ link, active }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={link.path}
      style={{
        display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 12px', borderRadius: '10px',
        fontSize: '14px', textDecoration: 'none', fontWeight: active ? '700' : '500',
        color: TEXT_WHITE,
        background: active ? DARK_GREEN : hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        transition: 'all 0.15s ease', position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ color: active ? GREEN_ACCENT : TEXT_MUTED }}>{link.icon}</span>
      {link.name}
      {active && (
        <motion.div layoutId="nav-pill" style={{ position: 'absolute', bottom: '0', left: '12px', right: '12px', height: '2px', background: GREEN_ACCENT, borderRadius: '2px' }} />
      )}
    </Link>
  )
}

const mobileNavLinkStyle = (active) => ({
  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px',
  textDecoration: 'none', fontWeight: active ? '700' : '500', fontSize: '15px',
  color: TEXT_WHITE, background: active ? DARK_GREEN : 'transparent', marginBottom: '4px',
})

export default Navbar