"use client";

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, Upload, Send, 
  FileText, ShieldCheck, Zap, Target, Rocket, Sparkles,
  HelpCircle, ArrowRight, Lock, Mail, Loader2,
  Globe, BarChart3, GraduationCap, ClipboardList, Search, Download, Eye, UserPlus, MessageCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'


/* ─────────────────────────────────────────────────────────────────────────────
   VARIABLES DE STYLE (NEXUS SYSTEM)
   ───────────────────────────────────────────────────────────────────────────── */
const GREEN_ACCENT = '#059669';
const GREEN_LIGHT = '#10b981'; // Parfois appelée GREEN_LIGHT
const GREEN_BRIGHT = '#10b981'; // Ajoute cette ligne si elle manque !
const DARK_GREEN = '#064e3b';
const TEXT_MUTED = '#94a3b8';
const BG_PURE = '#000000';

const cardGradient = `linear-gradient(135deg, rgba(6, 78, 59, 0.4) 0%, rgba(0, 0, 0, 1) 100%)`
const activeGradient = `linear-gradient(135deg, ${DARK_GREEN} 0%, ${GREEN_ACCENT} 100%)`

/* ─────────────────────────────────────────────────────────────────────────────
   DATA DES PACKS CAMPUS FRANCE
   ───────────────────────────────────────────────────────────────────────────── */
const campusPacks = [
  { 
    id: 1, 
    name: 'Pack Audit', 
    price: '50 000', 
    currency: 'FCFA',
    icon: <Search size={32} />, 
    desc: 'Correction technique et mise en conformité de votre dossier Campus France existant.',
    features: [
      'Audit lettre de motivation',
      'Optimisation CV Campus',
      'Saisie technique plateforme',
      'Vérification des justificatifs'
    ]
  },
  { 
    id: 2, 
    name: 'Pack Sérénité', 
    price: '75 000', 
    currency: 'FCFA',
    icon: <Rocket size={32} />, 
    popular: true, 
    desc: 'Gestion intégrale de A à Z. Du choix des universités jusqu\'à l\'obtention du Visa.',
    features: [
      'Stratégie des 7 vœux',
      'Rédaction des 7 motivations',
      'Simulations entretien illimitées',
      'Dossier Visa & AVI Express',
      'Accompagnement WhatsApp 24/7'
    ]
  },
  { 
    id: 3, 
    name: 'Pack Expert+', 
    price: '100 000', 
    currency: 'FCFA',
    icon: <Sparkles size={32} />, 
    desc: 'Accompagnement VIP incluant la recherche de logement et l\'installation en France.',
    features: [
      'Tout le Pack Sérénité',
      'Recherche de logement certifié',
      'Accompagnement installation',
      'Coaching arrivée en France',
      'Garantie de conformité 100%'
    ]
  },
]

export default function Dossier() {
  const [selectedPack, setSelectedPack] = useState(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('pack', `CAMPUS : ${selectedPack?.name}`);
    formData.append('methodePaiement', 'Virement / Mobile Money');

    try {
      // Utilisation du endpoint 'any' pour éviter les erreurs de champs Multer
      const API_NODE_URL = import.meta.env.VITE_API_NODE_URL || "http://localhost:3001";
      const response = await fetch(`${API_NODE_URL}/api/send-order`, {
        method: 'POST',
        body: formData,
});

      if (response.ok) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Erreur technique sur le serveur (Port 3001).");
      }
    } catch (error) {
      alert("Erreur réseau : Le serveur NEXUS est-il bien allumé ?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BG_PURE, color: '#fff', fontFamily: 'sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* ── DESIGN BACKGROUND : VAGUE SINUSOÏDALE ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', lineHeight: 0, zIndex: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 320" fill="none" style={{ width: '100%', height: 'auto' }}>
          <path d="M0 160L48 144C96 128 192 96 288 106.7C384 117 480 171 576 165.3C672 160 768 96 864 90.7C960 85 1056 139 1152 160C1248 181 1344 171 1392 165.3L1440 160V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V160Z" fill="url(#nexus_wave)" />
          <defs><linearGradient id="nexus_wave" x1="720" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse"><stop stopColor={DARK_GREEN} /><stop offset="1" stopColor={BG_PURE} stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
        
        <AnimatePresence mode="wait">
          {!success ? (
            step === 1 ? (
              <motion.section key="step1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
                
                {/* ── HEADER ULTRA-ANIMÉ ── */}
<header style={{ textAlign: 'center', marginBottom: '100px', perspective: '1000px' }}>
  
  {/* Icône Flottante avec Halo Pulsé */}
  <motion.div 
    initial={{ scale: 0, rotate: -225, filter: 'blur(20px)' }} 
    animate={{ scale: 1, rotate: 0, filter: 'blur(0px)' }} 
    transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 1.2 }}
    style={{ position: 'relative', display: 'inline-block', marginBottom: '40px' }}
  >
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{ 
        position: 'absolute', inset: '-15px', background: GREEN_BRIGHT, 
        filter: 'blur(35px)', borderRadius: '50%', zIndex: 0 
      }} 
    />
    <div style={{ 
      position: 'relative', zIndex: 1, padding: '25px', borderRadius: '35px', 
      background: 'rgba(5, 5, 5, 0.8)', border: `2px solid ${GREEN_ACCENT}`,
      boxShadow: `0 0 30px ${GREEN_ACCENT}40`, backdropFilter: 'blur(10px)'
    }}>
      <GraduationCap size={55} color={GREEN_BRIGHT} className="animate-pulse" />
    </div>
  </motion.div>
      {/* Titre Principal avec apparition par mot */}
      <motion.h1 
        style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '950', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '32px' }}
      >
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: 'inline-block' }}
          >
              Architecturez votre avenir
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
             Avec Succès en France.
          </motion.span>
      </motion.h1>
  

  {/* Sous-titre avec Balayage Horizontal */}
  <motion.div
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width: '100%' }}
    transition={{ delay: 1, duration: 1 }}
    style={{ overflow: 'hidden', whiteSpace: 'nowrap', margin: '20px auto' }}
  >
    <p style={{ fontSize: '20px', color: TEXT_MUTED, maxWidth: '900px', margin: '0 auto', lineHeight: 1.7, fontWeight: '500' }}>
      Expertise <span style={{ color: '#fff', fontWeight: '800' }}>Campus France</span> & Ingénierie Consulaire. 
      Nous transformons votre parcours en un dossier <span style={{ color: GREEN_BRIGHT }}>irrésistible</span>.
    </p>
  </motion.div>

  {/* Ligne de Scan Décorative */}
  <motion.div 
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
    style={{ width: '150px', height: '2px', background: GREEN_ACCENT, margin: '30px auto', position: 'relative', overflow: 'hidden' }}
  >
    <motion.div 
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      style={{ width: '40px', height: '100%', background: GREEN_BRIGHT, boxShadow: `0 0 10px ${GREEN_BRIGHT}` }}
    />
  </motion.div>

  {/* Injection CSS pour l'animation de brillance */}
  <style>{`
    @keyframes shine {
      to { background-position: 200% center; }
    }
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
  `}</style>
</header>

{/* ── TITRE INCITATIF PAIEMENT ── */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: '900', 
                    letterSpacing: '4px', 
                    color: GREEN_LIGHT, 
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}>
                    <span className="animate-pulse">●</span> Protocole de règlement
                  </h2>
                  <p style={{ 
                    color: '#fff', 
                    fontSize: '22px', 
                    fontWeight: '800', 
                    maxWidth: '600px', 
                    margin: '0 auto' 
                  }}>
                    Veuillez sélectionner votre <span style={{ color: GREEN_LIGHT }}>méthode de paiement</span> préférée pour activer votre dossier.
                  </p>
                </motion.div>

                {/* CANAUX DE RÈGLEMENT */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '20px', marginBottom: '80px' }}>
                  {[
                    { t: "ORANGE MONEY", v: "+221 77 885 50 15", c: "#FF7900", d: "Validation instantanée." },
                    { t: "WAVE", v: "+221 77 885 50 15", c: "#1ea1f2", d: "Zéro frais de transfert." },
                    { t: "WERO / PAYLIB", v: "06 05 73 17 63", c: GREEN_LIGHT, d: "Idéal depuis la France." },
                    { t: "RIB BANCAIRE", v: "FR76 2823 ... 631", c: "#FFF", d: "Virement certifié SEPA.", rib: true }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: `0 10px 30px ${item.c}20`,
                        borderColor: item.c 
                      }} 
                      style={{ 
                        padding: '24px', 
                        background: '#050505', 
                        borderRadius: '24px', 
                        border: `2px solid ${item.c}40`, 
                        position: 'relative', 
                        overflow: 'hidden',
                        transition: '0.3s border-color'
                      }}
                    >
                      <div style={{ fontSize: '10px', fontWeight: '900', color: item.c, letterSpacing: '2px', marginBottom: '10px' }}>{item.t}</div>
                      <div style={{ fontSize: item.rib ? '12px' : '15px', fontWeight: '800', color: '#fff', wordBreak: 'break-all', fontFamily: 'monospace' }}>{item.v}</div>
                      <p style={{ fontSize: '10px', color: TEXT_MUTED, margin: 0 }}>{item.d}</p>
                    </motion.div>
                  ))}
                </div>


       
                {/* ── TITRE INCITATIF PACKS ── */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  style={{ textAlign: 'center', marginBottom: '50px', marginTop: '40px' }}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    style={{ display: 'inline-block' }}
                  >
                    <h2 style={{ 
                      fontSize: '18px', 
                      fontWeight: '900', 
                      color: '#fff', 
                      textTransform: 'uppercase', 
                      letterSpacing: '2px',
                      background: `linear-gradient(90deg, #fff, ${GREEN_LIGHT}, #fff)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundSize: '200% auto',
                      animation: 'shine 4s linear infinite'
                    }}>
                     Sélectionnez votre niveau d'accompagnement
                    </h2>
                  </motion.div>
                  <p style={{ 
                    color: TEXT_MUTED, 
                    fontSize: '16px', 
                    marginTop: '15px', 
                    maxWidth: '700px', 
                    margin: '15px auto',
                    lineHeight: 1.6
                  }}>
                    De l'audit technique à la prise en charge VIP, choisissez la puissance de frappe nécessaire pour <span style={{ color: '#fff', fontWeight: '700' }}>garantir votre admission</span> en France.
                  </p>
                </motion.div>

                {/* GRILLE DES PACKS */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '40px' }}>
                  {campusPacks.map((pack) => (
                    <motion.div key={pack.id} whileHover={{ y: -15 }} style={{ padding: '60px 40px', borderRadius: '48px', background: pack.popular ? activeGradient : cardGradient, border: `2px solid ${pack.popular ? GREEN_LIGHT : 'rgba(255,255,255,0.05)'}`, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                      {pack.popular && <div style={{ position: 'absolute', top: '30px', right: '30px', background: '#fff', color: '#000', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '900' }}>ÉLITE</div>}
                      <div style={{ color: pack.popular ? '#000' : GREEN_ACCENT, background: pack.popular ? '#fff' : 'rgba(255,255,255,0.03)', width: '70px', height: '70px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>{pack.icon}</div>
                      <h3 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '16px' }}>{pack.name}</h3>
                      <p style={{ fontSize: '14px', marginBottom: '32px', minHeight: '60px', opacity: 0.8 }}>{pack.desc}</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flex: 1 }}>
                        {pack.features.map((feat, i) => <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', fontSize: '13px' }}><CheckCircle2 size={16} /> {feat}</li>)}
                      </ul>
                      <div style={{ fontSize: '48px', fontWeight: '900', marginBottom: '32px' }}>{pack.price} <span style={{ fontSize: '16px' }}>{pack.currency}</span></div>
                      <button onClick={() => { setSelectedPack(pack); setStep(2); window.scrollTo({ top: 0 }); }} style={{ width: '100%', padding: '20px', borderRadius: '20px', background: pack.popular ? '#000' : GREEN_ACCENT, color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer' }}>Démarrer mon Dossier</button>
                    </motion.div>
                  ))}
                </div>

                         {/* ── SECTION GATEWAY : VÉRIFICATION COMPTE ── */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ 
            marginTop: '40px', 
            padding: '60px 40px', 
            background: `linear-gradient(145deg, #050505 0%, ${DARK_GREEN}20 100%)`, 
            borderRadius: '50px', 
            border: `2px solid ${GREEN_ACCENT}30`,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Décoration en arrière-plan */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: GREEN_ACCENT, filter: 'blur(100px)', opacity: 0.1 }} />

          <h3 style={{ fontSize: '32px', fontWeight: '950', marginBottom: '15px', letterSpacing: '-1px' }}>
            PRÊT À LANCER VOTRE <span style={{ color: GREEN_LIGHT }}>PROCÉDURE ?</span>
          </h3>
          <p style={{ color: TEXT_MUTED, fontSize: '16px', maxWidth: '600px', margin: '0 auto 40px' }}>
            La première étape cruciale est la possession d'un compte sur le portail officiel Pastel.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '30px', 
            maxWidth: '900px', 
            margin: '0 auto' 
          }}>
            
            {/* OPTION A : DÉJÀ UN COMPTE */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ 
                padding: '30px', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '30px', 
                border: `1px solid ${GREEN_LIGHT}40`,
                textAlign: 'left'
              }}
            >
              <div style={{ color: GREEN_LIGHT, marginBottom: '15px' }}><CheckCircle2 size={32} /></div>
              <h4 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '10px' }}>J'ai déjà mon compte</h4>
              <p style={{ fontSize: '13px', color: TEXT_MUTED, marginBottom: '20px' }}>
                Passez directement au choix de votre pack et transmettez vos bulletins en 2 minutes.
              </p>
              <button 
                onClick={() => { setStep(1); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                style={{ 
                  background: GREEN_LIGHT, color: '#000', border: 'none', 
                  padding: '12px 25px', borderRadius: '12px', fontWeight: '900', 
                  fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' 
                }}
              >
                CHOISIR MON PACK <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* OPTION B : PAS DE COMPTE */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ 
                padding: '30px', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '30px', 
                border: `1px solid #fff2`,
                textAlign: 'left'
              }}
            >
              <div style={{ color: '#fff', marginBottom: '15px' }}><UserPlus size={32} /></div>
              <h4 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '10px' }}>Pas encore de compte ?</h4>
              <p style={{ fontSize: '13px', color: TEXT_MUTED, marginBottom: '20px' }}>
                Vous devez créer vos identifiants Pastel avant que nous puissions intervenir.
              </p>
              <a 
                href="https://pastel.diplomatie.gouv.fr/etudesenfrance" 
                target="_blank" 
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button 
                  style={{ 
                    background: 'transparent', color: '#fff', border: '1px solid #fff', 
                    padding: '12px 25px', borderRadius: '12px', fontWeight: '900', 
                    fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' 
                  }}
                >
                  CRÉER MON COMPTE <Globe size={16} />
                </button>
              </a>
            </motion.div>

          </div>
        </motion.section>

              </motion.section>
            ) : (
              <motion.section key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                  <button onClick={() => setStep(1)} style={{ color: GREEN_ACCENT, background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> Retour aux packs
                  </button>

                  <form onSubmit={handleSubmit} style={{ background: cardGradient, borderRadius: '56px', border: `2px solid ${GREEN_ACCENT}30`, padding: isMobile ? '40px 24px' : '72px' }}>
                    <h2 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '40px' }}>Configuration : <span style={{ color: GREEN_ACCENT }}>{selectedPack?.name}</span></h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
                      {/* IDENTIFIANTS */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: GREEN_ACCENT, fontWeight: '900', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '24px' }}><Lock size={18} /> ACCÈS CAMPUS FRANCE</div>
                        <div style={inputBoxStyle}><Mail size={18} color={GREEN_ACCENT} /><input name="emailDedicace" style={inputStyle} placeholder="Email plateforme Pastel" required /></div>
                        <div style={inputBoxStyle}><Lock size={18} color={GREEN_ACCENT} /><input name="passwordDedicace" type="password" style={inputStyle} placeholder="Mot de passe" required /></div>
                      </div>
                      {/* STATUT */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: GREEN_ACCENT, fontWeight: '900', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '24px' }}><ClipboardCheck size={18} /> PARCOURS</div>
                        <div style={inputBoxStyle}><GraduationCap size={18} color={GREEN_ACCENT} /><input name="niveau_etude" style={inputStyle} placeholder="Niveau actuel (ex: L3)" required /></div>
                        <div style={inputBoxStyle}><FileText size={18} color={GREEN_ACCENT} /><input name="annee_en_cours" style={inputStyle} placeholder="Année universitaire" required /></div>
                      </div>
                    </div>

                    {/* UPLOADS DES 6 RELEVÉS */}
                    <div style={{ marginBottom: '48px' }}>
                       <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '24px', color: GREEN_LIGHT }}>RELEVÉS DE NOTES (S1 & S2) DES 3 DERNIÈRES ANNÉES</h3>
                       <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
                          <FileUpload name="bulletin_n1_s1" label="Année N-1" desc="Semestre 1" />
                          <FileUpload name="bulletin_n1_s2" label="Année N-1" desc="Semestre 2" />
                          <FileUpload name="bulletin_n2_s1" label="Année N-2" desc="Semestre 1" />
                          <FileUpload name="bulletin_n2_s2" label="Année N-2" desc="Semestre 2" />
                          <FileUpload name="bulletin_n3_s1" label="Année N-3" desc="Semestre 1" />
                          <FileUpload name="bulletin_n3_s2" label="Année N-3" desc="Semestre 2" />
                       </div>
                    </div>

                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '24px', borderRadius: '24px', fontSize: '18px', fontWeight: '950', background: GREEN_ACCENT, color: '#000', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: `0 20px 40px ${GREEN_ACCENT}30` }}>
                      {loading ? <Loader2 className="animate-spin" /> : "Initialiser mon Dossier Élite"}
                    </button>
                  </form>
                </div>
              </motion.section>
            )
          ) : (
            <motion.section key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '120px 24px' }}>
              <div style={{ width: '120px', height: '120px', background: `${GREEN_ACCENT}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px', border: `1px solid ${GREEN_ACCENT}30` }}>
                <CheckCircle2 size={60} color={GREEN_ACCENT} />
              </div>
              <h2 style={{ fontSize: '48px', fontWeight: '950', marginBottom: '24px' }}>Protocole Activé</h2>
              <p style={{ fontSize: '20px', color: TEXT_MUTED, maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>André Gomis a bien reçu vos bulletins. Une analyse approfondie de votre éligibilité commence. Retour sous 24h par email.</p>
              <Link to="/" style={{ textDecoration: 'none', color: '#000', background: '#fff', padding: '20px 40px', borderRadius: '16px', fontWeight: '900' }}>Retour à l'Accueil</Link>
            </motion.section>
          )}
        </AnimatePresence>

       {/* ── SECTION DE RÉASSURANCE AVANT LE FOOTER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            marginTop: '100px', 
            textAlign: 'center', 
            padding: '40px', 
            background: `linear-gradient(135deg, ${DARK_GREEN}40 0%, #000 100%)`, 
            borderRadius: '40px',
            border: `1px solid ${GREEN_ACCENT}30`
          }}
        >
          <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>
            L'excellence académique à portée de clic
          </h3>
          <p style={{ color: TEXT_MUTED, fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
            NEXUS ne se contente pas d'envoyer des dossiers. Nous architecturons votre succès en France grâce à une infrastructure technologique sécurisée et une expertise humaine inégalée.
          </p>
        </motion.div>

        {/* ── FOOTER TECHNIQUE ACCENTUÉ & COLORÉ ── */}
        <footer style={{ 
          marginTop: '60px', 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
          gap: '20px',
          paddingBottom: '80px'
        }}>
          {[
            { 
              icon: <Globe size={28}/>, 
              t: "Portée France", 
              d: "Toutes les académies (LMD).", 
              color: "#3b82f6", // Bleu
              shadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
            },
            { 
              icon: <ShieldCheck size={28}/>, 
              t: "Sécurité SSL", 
              d: "Cryptage militaire des accès.", 
              color: GREEN_LIGHT, // Vert
              shadow: `0 10px 30px ${GREEN_ACCENT}40`
            },
            { 
              icon: <BarChart3 size={28}/>, 
              t: "Traçabilité", 
              d: "Suivi live de la procédure.", 
              color: "#ec4899", // Rose
              shadow: "0 10px 30px rgba(236, 72, 153, 0.2)"
            },
            { 
              icon: <Zap size={28}/>, 
              t: "Vitesse Nexus", 
              d: "Traitement prioritaire 24h.", 
              color: "#f59e0b", // Orange
              shadow: "0 10px 30px rgba(245, 158, 11, 0.2)"
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ 
                y: -10, 
                boxShadow: item.shadow,
                borderColor: item.color 
              }}
              style={{ 
                padding: '35px 25px', 
                background: 'rgba(5, 5, 5, 0.8)', 
                backdropFilter: 'blur(15px)', 
                borderRadius: '35px', 
                border: `2px solid rgba(255,255,255,0.05)`,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Point de lueur interne pour l'accentuation */}
              <div style={{ 
                position: 'absolute', top: '-20px', right: '-20px', 
                width: '60px', height: '60px', background: item.color, 
                filter: 'blur(45px)', opacity: 0.15 
              }} />

              <div style={{ 
                color: item.color, 
                marginBottom: '20px', 
                display: 'flex', 
                justifyContent: 'center',
                filter: `drop-shadow(0 0 10px ${item.color}60)`
              }}>
                {item.icon}
              </div>

              <h4 style={{ 
                fontWeight: '950', 
                color: '#fff', 
                marginBottom: '10px', 
                fontSize: '14px', 
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {item.t}
              </h4>

              <p style={{ 
                fontSize: '12px', 
                color: TEXT_MUTED, 
                lineHeight: 1.5,
                fontWeight: '500'
              }}>
                {item.d}
              </p>
            </motion.div>
          ))}
        </footer>
        {/* ── SECTION CRITIQUE : DIAGNOSTIC DYNAMIQUE ── */}
        <motion.section 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            marginTop: '120px', 
            marginBottom: '100px',
            padding: '100px 40px', 
            background: `linear-gradient(145deg, ${DARK_GREEN} 0%, #000 60%, ${DARK_GREEN} 100%)`, 
            borderRadius: '80px', 
            border: `2px solid ${GREEN_LIGHT}`,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 0 80px ${GREEN_ACCENT}20`
          }}
        >
          {/* Rayons lumineux tournants en background */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ 
              position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', 
              background: `conic-gradient(from 0deg, transparent, ${GREEN_ACCENT}10, transparent)`, 
              zIndex: 0 
            }} 
          />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Icône avec scan vertical infini */}
            <motion.div 
              style={{ 
                width: '100px', height: '100px', background: 'rgba(5, 5, 5, 0.6)', 
                borderRadius: '30px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', margin: '0 auto 40px', border: `2px solid ${GREEN_LIGHT}`,
                position: 'relative', overflow: 'hidden'
              }}
            >
              <motion.div 
                animate={{ y: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', width: '100%', height: '2px', background: GREEN_LIGHT, boxShadow: `0 0 15px ${GREEN_LIGHT}`, zIndex: 2 }}
              />
              <HelpCircle size={45} color={GREEN_LIGHT} />
            </motion.div>

                {/* Titre Principal avec apparition par mot */}
                <motion.h2
                  style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '950', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '32px' }}
                >
                    <motion.span
                      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ display: 'inline-block' }}
                    >
                      Des doutes sur votre
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
                      Éligibilité ?
                    </motion.span>
                </motion.h2>
            
            {/* Texte descriptif avec apparition par fondu glissé */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ 
                color: TEXT_MUTED, 
                fontSize: '20px', 
                maxWidth: '850px', 
                margin: '0 auto 50px', 
                lineHeight: 1.6,
                fontWeight: '500'
              }}
            >
              Moyennes fragiles, parcours atypique ou peur du refus consulaire ? <br/>
              <motion.span 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ color: '#fff', fontWeight: '800' }}
              >
                Ne laissez pas l'incertitude briser votre projet.
              </motion.span> 
              <br/>Nos experts analysent votre profil pour sécuriser votre investissement.
            </motion.p>

            {/* Bouton Pulsar Ultra-Réactif */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a href="https://wa.me/33605731763" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <motion.button 
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: `0 0 50px ${GREEN_LIGHT}`,
                    backgroundColor: '#fff',
                    color: '#000'
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    boxShadow: [
                      `0 0 20px ${GREEN_ACCENT}40`, 
                      `0 0 40px ${GREEN_ACCENT}70`, 
                      `0 0 20px ${GREEN_ACCENT}40`
                    ] 
                  }}
                  transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                  style={{ 
                    background: GREEN_LIGHT, 
                    color: '#000', 
                    border: 'none', 
                    padding: '28px 60px', 
                    borderRadius: '25px', 
                    fontWeight: '950', 
                    fontSize: '18px',
                    letterSpacing: '2px',
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <MessageCircle size={28} /> Lancer mon diagnostic gratuit
                </motion.button>
              </a>
            </div>

            {/* Badge de statut temps réel */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <div style={{ width: '10px', height: '10px', background: GREEN_LIGHT, borderRadius: '50%', boxShadow: `0 0 10px ${GREEN_LIGHT}` }} className="animate-pulse" />
              <span style={{ fontSize: '12px', color: GREEN_LIGHT, fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase' }}>
                ANALYSE PRIORITAIRE DISPONIBLE (24/7)
              </span>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <style>{`.animate-pulse { animation: pulse 2s infinite; } @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } } .animate-spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}


/* ─────────────────────────────────────────────────────────────────────────────
   UTILS
   ───────────────────────────────────────────────────────────────────────────── */
const FileUpload = ({ name, label, desc }) => (
  <div style={{ border: `2px dashed ${DARK_GREEN}`, borderRadius: '24px', padding: '20px', textAlign: 'center', background: 'rgba(5, 150, 105, 0.02)' }}>
    <CloudUpload size={24} color={GREEN_ACCENT} style={{ marginBottom: '12px' }} />
    <p style={{ fontSize: '13px', fontWeight: '900', color: '#fff' }}>{label}</p>
    <p style={{ fontSize: '10px', color: TEXT_MUTED, marginBottom: '15px' }}>{desc}</p>
    <input name={name} type="file" required style={{ fontSize: '10px', width: '100%', cursor: 'pointer' }} />
  </div>
)

const inputBoxStyle = { display: 'flex', alignItems: 'center', gap: '16px', background: BG_PURE, border: `1px solid ${DARK_GREEN}`, borderRadius: '16px', padding: '0 20px', marginBottom: '16px' }
const inputStyle = { width: '100%', padding: '18px 0', background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '14px' }

import { CloudUpload, ClipboardCheck } from 'lucide-react'