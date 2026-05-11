import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Couleurs déclarées
const GREEN_ACCENT = '#059669';
const DARK_GREEN = '#064e3b';
const GREEN_LIGHT = '#34d399'; // Ajouté pour corriger l'erreur

export default function Contact() {
  return (
    <div style={{ padding: '120px 20px 60px', color: 'white', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
            <motion.h1 
              style={{ 
                fontSize: 'clamp(40px, 8vw, 72px)', 
                fontWeight: '950', 
                letterSpacing: '-0.04em', 
                lineHeight: 1, 
                marginBottom: '32px',
                textAlign: 'center' // Ajout pour centrer
              }}
            >
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ display: 'inline-block' }}
                >
                   Contactez 
                </motion.span>
                <br/> 
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                  style={{ 
                    color: GREEN_ACCENT, 
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textShadow: `0 0 50px ${GREEN_ACCENT}60`,
                    background: `linear-gradient(90deg, ${GREEN_ACCENT}, ${GREEN_LIGHT}, ${GREEN_ACCENT})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% auto',
                    animation: 'shine 3s linear infinite'
                  }}
                >
                  L'Équipe.
                </motion.span>
            </motion.h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          Une question sur nos packs ou besoin d'un accompagnement personnalisé ? Nous vous répondons sous 24h.
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 900 ? '1fr' : '1fr 1.5fr', 
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Infos de contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ContactCard 
            icon={<Mail color={GREEN_ACCENT} />} 
            title="Email" 
            detail="dote.sene@gmail.com" 
          />
          <ContactCard 
            icon={<Phone color={GREEN_ACCENT} />} 
            title="Téléphone / WhatsApp" 
            detail="+33 6 05 73 17 63" 
          />
          <ContactCard 
            icon={<MapPin color={GREEN_ACCENT} />} 
            title="Bureaux" 
            detail="Paris, France / Dakar, Sénégal" 
          />
        </div>

        {/* Formulaire */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ 
            background: '#0a0a0a', 
            padding: '40px', 
            borderRadius: '24px', 
            border: `1px solid ${DARK_GREEN}`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px' 
            }}>
              <InputGroup label="Nom complet" placeholder="Votre nom" />
              <InputGroup label="Email" placeholder="votre@email.com" type="email" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>Sujet</label>
              <select style={inputStyle}>
                <option>CV Anti-ATS</option>
                <option>Packs Candidatures</option>
                <option>Campus France</option>
                <option>Autre</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>Message</label>
              <textarea placeholder="Comment pouvons-nous vous aider ?" rows={5} style={inputStyle}></textarea>
            </div>

            <button 
              type="button"
              className="btn-primary"
              style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                display: 'flex', // Pour aligner l'icône
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                background: GREEN_ACCENT,
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              Envoyer le message <Send size={18} style={{ marginLeft: '10px' }} />
            </button>
          </form>
        </motion.div>

      </div>

      {/* Animation CSS pour le shine (à mettre dans votre index.css idéalement) */}
      <style>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────
   COMPOSANTS INTERNES
────────────────────────────────────────── */

const ContactCard = ({ icon, title, detail }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px', 
    padding: '24px', 
    background: 'rgba(255,255,255,0.02)', 
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
    <div style={{ background: `${DARK_GREEN}40`, padding: '12px', borderRadius: '12px' }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '16px', fontWeight: '700', margin: '4px 0 0' }}>{detail}</p>
    </div>
  </div>
);

const InputGroup = ({ label, placeholder, type = "text" }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <label style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>{label}</label>
    <input type={type} placeholder={placeholder} style={inputStyle} />
  </div>
);

const inputStyle = {
  padding: '14px',
  borderRadius: '10px',
  background: '#111',
  border: `1px solid ${DARK_GREEN}`,
  color: 'white',
  outline: 'none',
  fontSize: '15px'
};