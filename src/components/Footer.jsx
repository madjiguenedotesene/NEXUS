import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ExternalLink, Share2, Send, ChevronRight } from 'lucide-react'
// Importation correcte du logo
import logo from '../assets/logo.png';

const Footer = () => {
  const year = new Date().getFullYear()

  const GREEN_BRIGHT = '#059669' 
  const GREEN_DEEP = '#064e3b'   
  const GREEN_ULTRA_DARK = '#022c22' 
  const isNarrow = window.innerWidth < 768

  const services = [
    { name: 'Ingénierie CV Anti-ATS', path: '/CvAntiAts' },
    { name: 'Stratégie de Candidature', path: '/Spontanee' },
    { name: 'Accompagnement Campus France', path: '/Dossier' },
    { name: 'Intelligence Marché & Réseau', path: '/Recherche' },
  ]

  const company = [
    { name: 'Notre Vision', path: '/about' },
    { name: 'Expertise & Contact', path: '/contact' },
    { name: 'Cadre Juridique', path: '/' },
  ]

  return (
    <footer style={{ 
      background: `linear-gradient(135deg, ${GREEN_DEEP} 0%, ${GREEN_ULTRA_DARK} 100%)`, 
      borderTop: `1px solid ${GREEN_BRIGHT}40`, 
      padding: '80px 0 30px',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff'
    }}>
      
      {/* Ligne décorative supérieure */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
        opacity: 0.5
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isNarrow ? '1fr' : '2fr 1fr 1fr 1.5fr', 
          gap: '48px',
          marginBottom: '64px'
        }}>

          {/* Colonne Marque / Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Link to="/" style={{ display: 'inline-block' }}>
              {/* Utilisation de la variable {logo} et suppression du filtre brightness/invert */}
              <img 
                src={logo} 
                alt="Nexus Omni Bot" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
              />
            </Link>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '320px' }}>
              Maîtrisez votre trajectoire professionnelle grâce à nos solutions d'élite.
              <br/>
              <span style={{ fontWeight: '800', color: '#fff', letterSpacing: '0.02em' }}>L'excellence comme seul standard.</span>
            </p>
            
            {/* Réseaux Sociaux */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: <ExternalLink size={18} />, label: 'Instagram' },
                { icon: <Share2 size={18} />, label: 'LinkedIn' },
                { icon: <Send size={18} />, label: 'Telegram' },
              ].map((s, i) => (
                <a key={i} href="#" style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = GREEN_DEEP; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Liens de Navigation */}
          {[
            { title: 'Écosystème', links: services },
            { title: 'Nexus', links: company }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 style={{ color: GREEN_BRIGHT, fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px' }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.links.map(l => (
                  <Link key={l.name} to={l.path} style={{ 
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', 
                    display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s' 
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(5px)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.transform = 'translateX(0)' }}>
                    <ChevronRight size={12} style={{ color: GREEN_BRIGHT }} /> {l.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Box */}
          <div style={{ 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(255,255,255,0.05)', 
            padding: '28px', borderRadius: '24px',
          }}>
            <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
              Parlons de votre futur
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: <Mail size={16} />, text: 'dote.sene@gmail.com' },
                { icon: <Phone size={16} />, text: '+33 (0)6 05 73 17 63' },
                { icon: <MapPin size={16} />, text: "Quartier d'Affaires, Paris" },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  <div style={{ color: GREEN_BRIGHT }}>{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barre de pied de page (Bottom Bar) */}
        <div style={{ 
          paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', 
          display: 'flex', flexDirection: isNarrow ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: 'center', gap: '20px'
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>
            © {year} NEXUS OMNI-BOT. <span style={{ opacity: 0.6 }}>Propulsé par l'audace et</span> <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700' }}>MDS Digital</a>
          </p>
          
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link to="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Politique de Confidentialité</Link>
            <Link to="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Conditions d'Usage</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer