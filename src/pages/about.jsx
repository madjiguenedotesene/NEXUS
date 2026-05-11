import React from 'react'
import { motion } from 'framer-motion'
import cv from '../assets/cv.png';
import { 
  ShieldCheck, 
  Cpu, 
  Zap,
  CheckCircle2,
  GraduationCap,
  Search
} from 'lucide-react'

const GREEN_ACCENT = '#059669'
const GREEN_LIGHT = '#10b981'
const DARK_GREEN = '#064e3b'
const TEXT_MUTED = '#94a3b8'
const BG_PURE = '#000000'

// Variantes pour l'entrée dynamique du texte
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
  })
}

export default function About() {
  const isNarrow = window.innerWidth < 900

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', paddingTop: '100px', overflowX: 'hidden' }}>
      
      {/* --- HERO SECTION : VISION NEXUS --- */}
      <section style={{ padding: '60px 20px', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '300px', background: `radial-gradient(circle, ${GREEN_ACCENT}15 0%, transparent 70%)`,
          filter: 'blur(60px)', zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>


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
                    L'Ingénierie de Carrière
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
                    par Nexus.  
                  </motion.span>
              </motion.h1>
          <motion.p 
            custom={1} initial="hidden" animate="visible" variants={textVariant}
            style={{ fontSize: '20px', color: '#94a3b8', lineHeight: 1.6 }}
          >
            Nexus redéfinit les standards de la recherche d'emploi en fusionnant analyse de données complexes et force de frappe stratégique.
          </motion.p>
        </div>
      </section>

      {/* --- NOS SOLUTIONS (CARTES DYNAMIQUES) --- */}
      <section style={{ padding: '80px 20px', background: '#050505' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isNarrow ? '1fr' : 'repeat(3, 1fr)', 
            gap: '30px',
            alignItems: 'stretch'
          }}>
            {/* CARTE 1 : CV ANTI-ATS (NOIRE BORDURE VERTE) */}
            <motion.div 
              custom={2} initial="hidden" whileInView="visible" variants={textVariant} viewport={{ once: true }}
              whileHover={{ y: -10, borderColor: GREEN_ACCENT }}
              style={{ padding: '40px', background: '#000', border: `2px solid ${GREEN_ACCENT}80`, borderRadius: '32px', transition: 'border-color 0.3s' }}
            >
              <div style={{ color: GREEN_ACCENT, marginBottom: '20px' }}><Cpu size={32} /></div>
              <h3 style={{ fontSize: '22px', fontWeight: '850', marginBottom: '16px' }}>CV Anti-ATS</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                Conception de curriculums vitae optimisés pour franchir les algorithmes de sélection et captiver les recruteurs immédiatement.
              </p>
            </motion.div>

            {/* CARTE 2 : CANDIDATURES (DÉGRADÉ VERT DYNAMIQUE) */}
            <motion.div 
              custom={3} initial="hidden" whileInView="visible" variants={textVariant} viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              style={{ 
                padding: '40px', 
                background: `linear-gradient(145deg, ${DARK_GREEN} 0%, #061a12 100%)`, 
                border: `2px solid ${GREEN_ACCENT}`, 
                borderRadius: '32px',
                boxShadow: `0 20px 40px ${GREEN_ACCENT}20`,
                zIndex: 2
              }}
            >
              <div style={{ color: '#fff', marginBottom: '20px' }}><Zap size={32} /></div>
              <h3 style={{ fontSize: '22px', fontWeight: '850', marginBottom: '16px' }}>Candidatures Spontanées</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.7 }}>
                Déploiement stratégique de votre profil auprès de décideurs ciblés pour accéder aux opportunités du marché caché.
              </p>
            </motion.div>

            {/* CARTE 3 : CAMPUS FRANCE (NOIRE BORDURE VERTE) */}
            <motion.div 
              custom={4} initial="hidden" whileInView="visible" variants={textVariant} viewport={{ once: true }}
              whileHover={{ y: -10, borderColor: GREEN_ACCENT }}
              style={{ padding: '40px', background: '#000', border: `2px solid ${GREEN_ACCENT}80`, borderRadius: '32px', transition: 'border-color 0.3s' }}
            >
              <div style={{ color: GREEN_ACCENT, marginBottom: '20px' }}><GraduationCap size={32} /></div>
              <h3 style={{ fontSize: '22px', fontWeight: '850', marginBottom: '16px' }}>Campus France</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                Accompagnement complet pour sécuriser votre projet académique, de la sélection des cursus à la validation des motivations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- L'EXPERTISE DE L'ÉQUIPE (MADJI SENE) --- */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: isNarrow ? 'column' : 'row', gap: '60px', alignItems: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={{ flex: '1', minWidth: '320px' }}
          >
             <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-10px', background: GREEN_ACCENT, borderRadius: '40px', opacity: 0.2, filter: 'blur(20px)' }} />
                <img 
                  src={cv} 
                  alt="Madji SENE - Nexus" 
                  style={{ width: '100%', borderRadius: '32px', border: `2px solid ${GREEN_ACCENT}60`, position: 'relative' }} 
                />
             </div>
          </motion.div>

          <div style={{ flex: '1.5' }}>
            <motion.h2 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              style={{ fontSize: '14px', fontWeight: '900', color: GREEN_ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}
            >
              Fondatrice & Experte Data
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              style={{ fontSize: '42px', fontWeight: '900', marginBottom: '24px' }}
            >
              Madji SENE
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '32px' }}
            >
              Data Scientist spécialisée en MLOps et Cybersécurité, Madji pilote Nexus avec une approche rigoureuse axée sur l'automatisation de la réussite. Son expertise garantit des solutions fondées sur la précision mathématique et l'intelligence marché.
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { icon: <CheckCircle2 size={16} />, text: "Master Data Science (Paris 8)" },
                { icon: <CheckCircle2 size={16} />, text: "Expertise MLOps & Cloud" },
                { icon: <CheckCircle2 size={16} />, text: "Analyste Stratégie IA" },
                { icon: <Search size={16} />, text: "Monitoring Emploi" }
              ].map((item, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#94a3b8' }}
                >
                  <span style={{ color: GREEN_ACCENT }}>{item.icon}</span> {item.text}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* --- RECHERCHE D'EMPLOI --- */}
      <section style={{ padding: '100px 20px', background: '#050505', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <Search size={48} color={GREEN_ACCENT} style={{ marginBottom: '24px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
          <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px', marginTop: '20px' }}>Espace Recherche Dédié</h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '40px' }}>
            Nexus ne se contente pas de préparer votre profil. Nous mettons à disposition un espace de recherche d'emploi dynamique pour identifier les meilleures opportunités et piloter votre trajectoire professionnelle avec précision.
          </p>

          {/* BOUTON DE REDIRECTION */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/recherche'} // Ou utilise <Link to="/recherche"> si tu as React Router
            style={{
              background: GREEN_ACCENT,
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: `0 10px 20px ${GREEN_ACCENT}30`
            }}
          >
            Accéder à la recherche <Search size={20} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}