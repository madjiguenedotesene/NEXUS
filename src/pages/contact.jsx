"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Couleurs déclarées
const GREEN_ACCENT = '#059669';
const DARK_GREEN = '#064e3b';
const GREEN_LIGHT = '#34d399'; 
const TEXT_MUTED = '#94a3b8';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const formData = new FormData(e.currentTarget);
  formData.append('pack', `CONTACT : Message Client`);
  formData.append('methodePaiement', 'Aucune / Prise de contact');

  try {
    // 💡 Détection automatique de l'environnement (Local vs Production)
    const API_NODE_URL = import.meta.env.VITE_API_NODE_URL || "http://localhost:3001";
    
    // Utilisation de la variable globale dynamique
    const response = await fetch(`${API_NODE_URL}/api/send-order`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(`Erreur Serveur : ${data.message || "Échec de l'envoi du message"}`);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Le serveur ne répond pas. S'il est en ligne, attendez quelques secondes qu'il sorte de sa veille initiale et cliquez à nouveau.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div style={{ padding: '120px 20px 60px', color: 'white', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '950', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '32px', textAlign: 'center' }}>
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
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          Une question sur nos packs ou besoin d'un accompagnement personnalisé ? Nous vous répondons sous 24h.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', 
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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '20px' 
                }}>
                  {/* Ajout des attributs "name" cruciaux pour FormData */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>Nom complet</label>
                    <input type="text" name="identifiantFT" placeholder="Votre nom" required style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>Email</label>
                    <input type="email" name="emailDedicace" placeholder="votre@email.com" required style={inputStyle} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>Sujet d'intérêt</label>
                  <input type="text" name="passwordFT" placeholder="Ex: Packs Candidatures / Campus France" required style={inputStyle} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>Message</label>
                  <textarea name="passwordDedicace" placeholder="Comment pouvons-nous vous aider ? Écrivez votre message ici..." rows={5} required style={inputStyle}></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  style={{ 
                    padding: '16px', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    background: GREEN_ACCENT,
                    color: 'white',
                    fontWeight: 'bold',
                    gap: '10px'
                  }}
                >
                  {loading ? (
                    <>Envoi en cours... <Loader2 className="animate-spin" size={18} /></>
                  ) : (
                    <>Envoyer le message <Send size={18} /></>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        ) : (
          /* Écran Succès local */
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center', padding: '60px 24px' }}
          >
            <div style={{ width: '100px', height: '100px', background: `${GREEN_ACCENT}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', border: `1px solid ${GREEN_ACCENT}30` }}>
              <CheckCircle2 size={50} color={GREEN_ACCENT} />
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '16px' }}>Message Envoyé !</h2>
            <p style={{ fontSize: '18px', color: TEXT_MUTED, maxWidth: '500px', margin: '0 auto 40px' }}>
              Votre message de test a bien été intercepté par le serveur local. L'e-mail a été envoyé avec succès.
            </p>
            <button 
              onClick={() => setSuccess(false)} 
              style={{ padding: '16px 32px', background: '#fff', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' }}
            >
              Envoyer un autre message
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
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
    <div style={{ background: `${DARK_GREEN}40`, padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '16px', fontWeight: '700', margin: '4px 0 0' }}>{detail}</p>
    </div>
  </div>
);

const inputStyle = {
  padding: '14px',
  borderRadius: '10px',
  background: '#111',
  border: `1px solid ${DARK_GREEN}`,
  color: 'white',
  outline: 'none',
  fontSize: '15px',
  width: '100%',
  boxSizing: 'border-box'
};