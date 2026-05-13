"use client";

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, Upload, Send, 
  FileText, ShieldCheck, Zap, ChevronRight, Target, Rocket, Sparkles,
  MessageCircle, HelpCircle, ArrowRight, Lock, User, Mail, Loader2,
  Globe, MousePointer2, BarChart3, Users, Briefcase, Database
} from 'lucide-react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────────────────────
   PALETTE DE COULEURS & VARIABLES DE STYLE (NEXUS SYSTEM)
   ───────────────────────────────────────────────────────────────────────────── */
const GREEN_ACCENT = '#059669'
const GREEN_LIGHT = '#10b981'
const DARK_GREEN = '#064e3b'
const TEXT_MUTED = '#94a3b8'
const BG_PURE = '#000000'

const cardGradient = `linear-gradient(135deg, rgba(6, 78, 59, 0.4) 0%, rgba(0, 0, 0, 1) 100%)`
const activeGradient = `linear-gradient(135deg, ${DARK_GREEN} 0%, ${GREEN_ACCENT} 100%)`

/* ─────────────────────────────────────────────────────────────────────────────
   CONFIGURATION DÉTAILLÉE DES PACKS (DATA)
   ───────────────────────────────────────────────────────────────────────────── */
const packs = [
  { 
    id: 1, 
    name: 'Pack Starter', 
    qty: '1000', 
    price: '20', 
    icon: <Target size={32} />, 
    desc: 'Idéal pour initier votre visibilité sur un secteur géographique ou métier précis.',
    features: [
      'Diffusion sur 1000 entreprises ciblées',
      'Optimisation ATS du profil',
      'Accès au portail France Travail',
      'Support par ticket sous 48h'
    ]
  },
  { 
    id: 2, 
    name: 'Pack Business', 
    qty: '1500', 
    price: '30', 
    icon: <Rocket size={32} />, 
    popular: true, 
    desc: 'La puissance de frappe optimale pour générer un flux constant d\'entretiens hebdomadaires.',
    features: [
      'Diffusion sur 1500 entreprises premium',
      'Priorisation algorithmique',
      'Ajustement sémantique du CV',
      'Support WhatsApp Prioritaire',
      'Rapport hebdomadaire d\'envoi'
    ]
  },
  { 
    id: 3, 
    name: 'Pack Expert', 
    qty: '3000', 
    price: '50', 
    icon: <Sparkles size={32} />, 
    desc: 'Dominez totalement votre marché. Une saturation massive pour les profils à hautes responsabilités.',
    features: [
      'Saturation sur 3000 entreprises nationales',
      'Double vérification humaine du dossier',
      'Lettre de motivation ultra-personnalisée',
      'Accès Conciergerie 24/7',
      'Garantie de visibilité maximale'
    ]
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL : SPONTANEE
   ───────────────────────────────────────────────────────────────────────────── */
export default function Spontanee() {
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

  /* ── GESTION DE LA SOUMISSION ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('pack', selectedPack?.name || "Non défini");
    formData.append('methodePaiement', 'Virement Bancaire / Capture écran');

    try {
      const API_NODE_URL = "https://server-rt0x.onrender.com";
      const response = await fetch(`${API_NODE_URL}/api/send-order`, {
        method: 'POST',
        body: formData,
});
      if (response.ok) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Une erreur technique est survenue. Vérifiez la connexion au serveur (Port 3001).");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Erreur réseau : Le serveur NEXUS est-il bien allumé ?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: BG_PURE, 
      color: '#fff', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative', 
      overflowX: 'hidden' 
    }}>
      
      {/* ── DESIGN BACKGROUND : VAGUE SINUSOÏDALE ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', lineHeight: 0, zIndex: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          <path 
            d="M0 160L48 144C96 128 192 96 288 106.7C384 117 480 171 576 165.3C672 160 768 96 864 90.7C960 85 1056 139 1152 160C1248 181 1344 171 1392 165.3L1440 160V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V160Z" 
            fill="url(#nexus_gradient_wave)"
          />
          <defs>
            <linearGradient id="nexus_gradient_wave" x1="720" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor={DARK_GREEN} />
              <stop offset="1" stopColor={BG_PURE} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
        
        <AnimatePresence mode="wait">
          {!success ? (
            step === 1 ? (
              <motion.section 
                key="step1" 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
               {/* HEADER TITRE ANIMÉ */}
<div style={{ textAlign: 'center', marginBottom: '100px' }}>
    {/* Icône avec effet de flottement et d'éclat */}
    <motion.div 
      initial={{ scale: 0, rotate: -180 }} 
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      style={{ color: GREEN_ACCENT, marginBottom: '32px', display: 'flex', justifyContent: 'center' }}
    >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            padding: '20px', 
            borderRadius: '30px', 
            background: `${GREEN_ACCENT}15`, 
            border: `1px solid ${GREEN_ACCENT}30`,
            boxShadow: `0 0 30px ${GREEN_ACCENT}20` 
          }}
        >
            <Zap size={40} className="animate-pulse" />
        </motion.div>
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
          Propulsez votre avenir
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
          à l'échelle industrielle.
        </motion.span>
    </motion.h1>

    {/* Texte de description avec apparition progressive */}
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      style={{ fontSize: '20px', color: TEXT_MUTED, maxWidth: '900px', margin: '0 auto', lineHeight: 1.7 }}
    >
        Libérez-vous des contraintes du temps. NEXUS déploie votre expertise auprès de milliers d'entreprises 
        via une technologie d'automatisation intelligente. <br/>
        <motion.span 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: '#fff', fontWeight: '800' }}
        >
          Plus de volume, plus d'opportunités.
        </motion.span>
    </motion.p>

    {/* CSS Inline pour l'effet de brillance sur le texte vert */}
    <style jsx>{`
      @keyframes shine {
        to { background-position: 200% center; }
      }
    `}</style>
</div>
                {/* ── TEXTE AVANT PAIEMENT ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '4px', color: GREEN_LIGHT, textTransform: 'uppercase' }}>
            <span className="animate-pulse">●</span> Étape 1 : Choisissez votre canal de règlement
          </h2>
          <p style={{ color: TEXT_MUTED, fontSize: '13px', marginTop: '10px' }}>Transactions sécurisées et instantanées pour un lancement immédiat.</p>
        </motion.div>

        {/* ── CARTES PAIEMENT ── */}
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(4, 1fr)', gap: '20px', marginBottom: '80px' }}>
          {[
            { t: "WERO", v: "06 05 73 17 63", c: GREEN_LIGHT, d: "L'instantanéité absolue." },
            { t: "REVOLUT", v: "06 05 73 17 63", c: "#0075EB", d: "La banque nouvelle génération." },
            { t: "PAYPAL", v: "madjiguenesene20@gmail.com", c: "#003087", d: "Sécurité maximale (Amis/Proches)." },
            { t: "RIB BANCAIRE", v: "FR76 2823 3000 0114 2098 6070 631", c: "#FFF", d: "Virement instantané certifié.", rib: true }
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${item.c}40` }}
              style={{ padding: '24px', background: '#050505', borderRadius: '24px', border: `2px solid ${item.c}40`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '10px', fontWeight: '900', color: item.c, letterSpacing: '2px', marginBottom: '10px' }}>{item.t}</div>
              <div style={{ fontSize: item.rib ? '12px' : '15px', fontWeight: '800', fontFamily: 'monospace', color: '#fff', marginBottom: '10px', wordBreak: 'break-all' }}>{item.v}</div>
              <p style={{ fontSize: '10px', color: TEXT_MUTED, margin: 0 }}>{item.d}</p>
            </motion.div>
          ))}
        </div>

        {/* ── TEXTE AVANT PACK ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ display: 'inline-block' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', textTransform: 'uppercase', background: `linear-gradient(90deg, #fff, ${GREEN_LIGHT}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Sélectionnez la puissance de votre diffusion
            </h2>
          </motion.div>
          <p style={{ color: TEXT_MUTED, fontSize: '14px', marginTop: '10px', maxWidth: '600px', margin: '10px auto' }}>Plus l'envoi est massif, plus vos chances de décrocher l'entretien de vos rêves augmentent de manière exponentielle.</p>
        </motion.div>

                {/* GRILLE DES PACKS DÉTAILLÉS */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                  gap: '40px', 
                  alignItems: 'stretch' 
                }}>
                  {packs.map((pack, idx) => (
                    <motion.div 
                      key={pack.id} 
                      whileHover={{ y: -15 }}
                      style={{
                        padding: '60px 40px',
                        borderRadius: '48px',
                        background: pack.popular ? activeGradient : cardGradient,
                        border: `2px solid ${pack.popular ? GREEN_LIGHT : 'rgba(255,255,255,0.05)'}`,
                        display: 'flex', flexDirection: 'column',
                        position: 'relative', overflow: 'hidden',
                        boxShadow: pack.popular ? `0 30px 60px ${GREEN_ACCENT}25` : 'none'
                      }}
                    >
                      {pack.popular && (
                        <div style={{ 
                          position: 'absolute', top: '30px', right: '30px', 
                          background: '#fff', color: '#000', padding: '6px 16px', 
                          borderRadius: '20px', fontSize: '11px', fontWeight: '900',
                          textTransform: 'uppercase'
                        }}>Populaire</div>
                      )}

                      <div style={{ 
                        color: pack.popular ? '#000' : GREEN_ACCENT, 
                        background: pack.popular ? '#fff' : 'rgba(255,255,255,0.03)', 
                        width: '70px', height: '70px', borderRadius: '24px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        marginBottom: '32px' 
                      }}>
                        {pack.icon}
                      </div>

                      <h3 style={{ fontSize: '32px', fontWeight: '900', color: pack.popular ? '#000' : '#fff', marginBottom: '16px' }}>
                        {pack.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: pack.popular ? 'rgba(0,0,0,0.7)' : TEXT_MUTED, marginBottom: '32px', minHeight: '60px' }}>
                        {pack.desc}
                      </p>

                      <div style={{ marginBottom: '40px' }}>
                        <div style={{ fontSize: '64px', fontWeight: '950', color: pack.popular ? '#000' : '#fff', lineHeight: 1 }}>
                          {pack.qty}
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: pack.popular ? '#000' : GREEN_ACCENT, letterSpacing: '0.1em' }}>
                          Unités de Candidature
                        </span>
                      </div>

                      {/* LISTE DES FEATURES */}
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flex: 1 }}>
                        {pack.features.map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', fontSize: '13px', color: pack.popular ? '#000' : 'rgba(255,255,255,0.8)' }}>
                            <CheckCircle2 size={16} /> {feat}
                          </li>
                        ))}
                      </ul>

                      <div style={{ fontSize: '48px', fontWeight: '900', color: pack.popular ? '#000' : '#fff', marginBottom: '32px' }}>
                        {pack.price}€
                      </div>

                      <button 
                        onClick={() => { setSelectedPack(pack); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ 
                          width: '100%', padding: '20px', borderRadius: '20px', 
                          background: pack.popular ? '#000' : GREEN_ACCENT, 
                          color: '#fff', border: 'none', fontWeight: '900', 
                          fontSize: '16px', cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Sélectionner ce Pack
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* ── FOOTER DÉTAILS TECHNIQUES (DYNAMISÉ) ── */}
<div style={{ 
  marginTop: '120px', 
  display: 'grid', 
  gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(4, 1fr)', 
  gap: '20px',
  perspective: '1000px' 
}}>
   {[
     { 
       icon: <Globe size={24}/>, 
       t: "Portée Nationale", 
       d: "Toutes les régions couvertes, de Paris à Lyon en passant par les DOM-TOM.",
       gradient: "linear-gradient(135deg, #059669 0%, #000 100%)" 
     },
     { 
       icon: <ShieldCheck size={24}/>, 
       t: "Sécurité Militaire", 
       d: "Vos accès sont protégés par un cryptage SSL 256 bits et supprimés après envoi.",
       gradient: "linear-gradient(135deg, #064e3b 0%, #000 100%)"
     },
     { 
       icon: <BarChart3 size={24}/>, 
       t: "Transparence Totale", 
       d: "Suivez chaque envoi. Un rapport détaillé est généré après chaque campagne.",
       gradient: "linear-gradient(135deg, #059669 0%, #000 100%)"
     },
     { 
       icon: <Users size={24}/>, 
       t: "Matching IA", 
       d: "Notre algorithme cible uniquement les recruteurs en recherche active.",
       gradient: "linear-gradient(135deg, #064e3b 0%, #000 100%)"
     }
   ].map((item, i) => (
     <motion.div 
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        whileHover={{ 
          y: -10, 
          borderColor: GREEN_LIGHT,
          boxShadow: `0 0 30px ${GREEN_ACCENT}20` 
        }}
        style={{ 
          padding: '32px 24px', 
          background: 'rgba(5, 5, 5, 0.6)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '32px', 
          border: `1px solid rgba(255,255,255,0.08)`,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
     >
        {/* Effet de lueur subtile en fond */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: item.gradient, 
          opacity: 0.05, 
          zIndex: 0 
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '16px', 
              background: `${GREEN_ACCENT}20`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: GREEN_LIGHT,
              marginBottom: '20px',
              border: `1px solid ${GREEN_ACCENT}40`
            }}>
              {item.icon}
            </div>

            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '900', 
              marginBottom: '12px', 
              color: '#fff',
              letterSpacing: '-0.5px'
            }}>
              {item.t}
            </h4>

            <p style={{ 
              fontSize: '13px', 
              color: TEXT_MUTED, 
              lineHeight: '1.6',
              margin: 0
            }}>
              {item.d}
            </p>
        </div>
     </motion.div>
   ))}
</div>
              </motion.section>
            ) : (
              /* ─────────────────────────────────────────────────────────────────────────────
                 ÉTAPE 2 : FORMULAIRE DE DOSSIER (DÉTAILLÉ)
                 ───────────────────────────────────────────────────────────────────────────── */
              <motion.section 
                key="step2" 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -50 }}
              >
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                  <button 
                    onClick={() => setStep(1)} 
                    style={{ 
                      color: GREEN_ACCENT, background: 'none', border: 'none', 
                      cursor: 'pointer', marginBottom: '32px', fontWeight: '800', 
                      display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' 
                    }}
                  >
                    <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> 
                    Retour au choix des packs
                  </button>

                  <form onSubmit={handleSubmit} style={{ background: cardGradient, borderRadius: '56px', border: `1px solid ${GREEN_ACCENT}30`, padding: isMobile ? '40px 24px' : '72px' }}>
                    <div style={{ marginBottom: '48px' }}>
                      <h2 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '12px' }}>
                        Dossier : <span style={{ color: GREEN_ACCENT }}>{selectedPack?.name}</span>
                      </h2>
                      <p style={{ color: TEXT_MUTED, fontSize: '16px' }}>
                        Veuillez configurer vos accès pour permettre à notre infrastructure d'automatiser vos envois.
                      </p>
                    </div>

                    {/* SECTION IDENTIFIANTS */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
                      
                      {/* FRANCE TRAVAIL BLOCK */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: GREEN_ACCENT, fontWeight: '900', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '24px' }}>
                          <ShieldCheck size={18} /> Accès France Travail
                        </div>
                        <div style={inputBoxStyle}>
                          <User size={18} color={GREEN_ACCENT} />
                          <input name="identifiantFT" style={inputStyle} placeholder="Identifiant" required />
                        </div>
                        <div style={inputBoxStyle}>
                          <Lock size={18} color={GREEN_ACCENT} />
                          <input name="passwordFT" type="password" style={inputStyle} placeholder="Mot de passe" required />
                        </div>
                      </div>

                      {/* ESPACE PERSO BLOCK */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: GREEN_ACCENT, fontWeight: '900', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '24px' }}>
                          <Mail size={18} /> Espace Candidat Dédié
                        </div>
                        <div style={inputBoxStyle}>
                          <Mail size={18} color={GREEN_ACCENT} />
                          <input name="emailDedicace" style={inputStyle} placeholder="Email de connexion" required />
                        </div>
                        <div style={inputBoxStyle}>
                          <Lock size={18} color={GREEN_ACCENT} />
                          <input name="passwordDedicace" type="password" style={inputStyle} placeholder="Mot de passe" required />
                        </div>
                      </div>
                    </div>

                    {/* SECTION UPLOADS */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
                       <FileUpload name="cv" label="CV (PDF Uniquement)" desc="Format ATS recommandé." />
                       <FileUpload name="letter" label="Lettre de Motivation" desc="PDF haute résolution." />
                       <FileUpload name="proof" label="Preuve de Paiement" desc="Capture ou Reçu." />
                    </div>

                    <div style={{ background: `${GREEN_ACCENT}05`, padding: '24px', borderRadius: '24px', marginBottom: '48px', border: `1px solid ${GREEN_ACCENT}20` }}>
                      <p style={{ fontSize: '13px', color: TEXT_MUTED, lineHeight: 1.5, margin: 0 }}>
                         <span style={{ color: GREEN_ACCENT, fontWeight: '800' }}>Note de sécurité :</span> Vos informations de connexion sont cryptées et utilisées exclusivement 
                         pour l'action d'automatisation. Elles sont supprimées de nos registres dès la fin du déploiement.
                      </p>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      style={{ 
                        width: '100%', padding: '24px', borderRadius: '24px', 
                        fontSize: '18px', fontWeight: '950', background: GREEN_ACCENT, 
                        color: '#000', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: `0 20px 40px ${GREEN_ACCENT}30`,
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px'
                      }}
                    >
                      {loading ? (
                        <>Traitement en cours... <Loader2 className="animate-spin" /></>
                      ) : (
                        <>Initialiser l'automatisation <Rocket size={20} /></>
                      )}
                    </button>
                  </form>
                </div>
              </motion.section>
            )
          ) : (
            /* ─────────────────────────────────────────────────────────────────────────────
               ÉTAPE SUCCÈS : CONFIRMATION FINALE
               ───────────────────────────────────────────────────────────────────────────── */
            <motion.section 
              key="success" 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '120px 24px' }}
            >
              <div style={{ 
                width: '120px', height: '120px', background: `${GREEN_ACCENT}15`, 
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                margin: '0 auto 40px', border: `1px solid ${GREEN_ACCENT}30` 
              }}>
                <CheckCircle2 size={60} color={GREEN_ACCENT} />
              </div>
              <h2 style={{ fontSize: '48px', fontWeight: '950', marginBottom: '24px' }}>Dossier Transmis avec Succès</h2>
              <p style={{ fontSize: '20px', color: TEXT_MUTED, maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                Nos algorithmes analysent actuellement vos documents. Le déploiement commencera sous 24h. 
                Vous recevrez une notification par email dès le premier envoi.
              </p>
              <Link 
                to="/" 
                style={{ 
                  textDecoration: 'none', color: '#000', background: '#fff', 
                  padding: '20px 40px', borderRadius: '16px', fontWeight: '900', fontSize: '16px' 
                }}
              >
                Retour à l'Espace NEXUS
              </Link>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── SECTION SUPPORT BAS DE PAGE ── */}
        <section style={{ marginTop: '120px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
               <h3 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '24px' }}>Besoin d'une expertise humaine ?</h3>
               <p style={{ color: TEXT_MUTED, fontSize: '18px', lineHeight: 1.6, marginBottom: '32px' }}>
                  Nos conseillers sont disponibles pour auditer votre dossier ou vous aider à choisir la meilleure stratégie de déploiement.
               </p>
               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <Link to="/contact" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '16px 32px', borderRadius: '16px', fontWeight: '800', border: '1px solid rgba(255,255,255,0.1)' }}>Contacter le support</Link>
                  <a href="https://wa.me/33605731763" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', background: GREEN_ACCENT, color: '#000', padding: '16px 32px', borderRadius: '16px', fontWeight: '900' }}>Direct WhatsApp</a>
               </div>
            </div>
            <div style={{ background: cardGradient, padding: '40px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: GREEN_ACCENT }}>
                  <HelpCircle size={24} /> <span style={{ fontWeight: '900', fontSize: '12px', textTransform: 'uppercase' }}>FAQ Rapide</span>
               </div>
               <div style={{ spaceY: '15px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '800', marginBottom: '5px' }}>Combien de temps dure l'envoi ?</p>
                  <p style={{ fontSize: '12px', color: TEXT_MUTED, marginBottom: '15px' }}>Entre 3 et 7 jours ouvrés selon le volume du pack choisi.</p>
                  <p style={{ fontSize: '14px', fontWeight: '800', marginBottom: '5px' }}>Les entreprises sont-elles ciblées ?</p>
                  <p style={{ fontSize: '12px', color: TEXT_MUTED, marginBottom: '0px' }}>Oui, nous filtrons par secteur d'activité et zone géographique.</p>
               </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── CSS INTERNAL FOR ANIMATIONS ── */}
      <style>{`
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPOSANTS UTILITAIRES (STYLISÉS)
   ───────────────────────────────────────────────────────────────────────────── */
const FileUpload = ({ name, label, desc }) => (
  <div style={{ 
    border: `2px dashed ${DARK_GREEN}`, 
    borderRadius: '32px', 
    padding: '32px 20px', 
    textAlign: 'center', 
    background: 'rgba(5, 150, 105, 0.02)', 
    display: 'flex', flexDirection: 'column', 
    alignItems: 'center', justifyContent: 'center',
    transition: '0.3s'
  }}>
    <Upload size={32} color={GREEN_ACCENT} style={{ marginBottom: '16px' }} />
    <p style={{ fontSize: '16px', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>{label}</p>
    <p style={{ fontSize: '11px', color: TEXT_MUTED, lineHeight: 1.4, marginBottom: '20px' }}>{desc}</p>
    <input 
      name={name} 
      type="file" 
      required 
      style={{ 
        fontSize: '10px', 
        width: '100%', 
        color: TEXT_MUTED, 
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.05)',
        padding: '8px',
        borderRadius: '8px'
      }} 
    />
  </div>
)

const inputBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  background: BG_PURE,
  border: `1px solid ${DARK_GREEN}`,
  borderRadius: '16px',
  padding: '0 20px',
  marginBottom: '16px',
  transition: '0.3s focus-within'
}

const inputStyle = { 
  width: '100%', 
  padding: '18px 0', 
  background: 'transparent', 
  border: 'none', 
  color: '#fff', 
  outline: 'none', 
  fontSize: '15px',
  fontWeight: '500'
}