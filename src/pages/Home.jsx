import React from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import {
  ArrowRight, Zap, Users, FileText,
  Star, TrendingUp, CheckCircle2, Shield, ChevronRight, Search
} from 'lucide-react'
import { Link } from 'react-router-dom'
import heroUrl from '../assets/hero.png';
/* ──────────────────────────────────────────
   PALETTE (Vert Foncé / Noir / Blanc)
────────────────────────────────────────── */
const DARK_GREEN = '#064e3b' 
const GREEN_ACCENT = '#059669' 
const GREEN_HOVER = '#047857'

const features = [
  {
    icon: <FileText size={28} />,
    title: 'Ingénierie CV Anti-ATS',
    desc: 'Ne soyez plus invisible. Nous concevons des CV à haute performance sémantique, optimisés pour briser les barrières des algorithmes de tri (ATS) et captiver instantanément l’œil des recruteurs les plus exigeants.',
    link: '/cvAntiAts',
  },
  {
    icon: <Zap size={28} />,
    title: 'Candidatures Spontanées Massives',
    desc: 'Propulsez votre profil à l’échelle industrielle. NEXUS déploie votre candidature auprès de milliers d’entreprises ciblées par automatisation intelligente pour générer un flux constant d’entretiens hebdomadaires.',
    link: '/Spontanee',
  },
  {
    icon: <Users size={28} />,
    title: 'Protocole Campus France',
    desc: 'De la stratégie des 7 vœux à la simulation d’entretien consulaire, nous architecturons votre dossier académique pour garantir votre admission et sécuriser votre projet de mobilité internationale avec succès.',
    link: '/Dossier',
  },
  {
    icon: <Shield size={28} />,
    title: 'Nexus Job Board',
    desc: 'Accédez à l’exclusivité. Un espace dédié regroupant les meilleures offres du marché, sélectionnées par nos experts et disponibles instantanément pour une postulation directe via votre interface NEXUS.',
    link: '/Recherche',
  },
]

const steps = [
  {
    n: '01',
    title: 'Conception du profil',
    desc: 'Complétez vos parcours professionnels, vos acquis et vos cursus académiques au sein d’une interface intuitive. Modifiez le design, rédigez un résumé accrocheur et téléchargez un fichier PDF professionnel prêt pour vos envois et vos réseaux sociaux.',
  },
  {
    n: '02',
    title: 'Sélection de l’offre',
    desc: 'En fonction de votre domaine d’activité et de vos besoins, optez pour la formule de candidatures adaptée à vos ambitions : quantité, traitement prioritaire ou suivi intensif. Les modalités opérationnelles vous seront détaillées dès notre prise de contact.',
  },
  {
    n: '03',
    title: 'Progression encadrée',
    desc: 'Restez en relation permanente avec nos conseillers pour lever vos interrogations et ajuster votre stratégie. Notre mission est claire : optimiser votre temps et vous apporter une vision limpide durant chaque étape de votre quête d’emploi.',
  },
]

/* ──────────────────────────────────────────
   PAGE COMPLÈTE
────────────────────────────────────────── */
export default function Home() {
  const isNarrow = useMediaQuery('(max-width: 900px)')
  const padX = isNarrow ? 16 : 40
  const sectionPadY = isNarrow ? '48px' : '64px'

  return (
    <div style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden' }}>

    {/* ══════════════════════════════════════
    HERO — Modern Layered Design
    ══════════════════════════════════════ */}
    <section style={{ 
      position: 'relative', 
      minHeight: isNarrow ? 'auto' : '100vh', 
      paddingTop: '88px', 
      display: 'flex',
      overflow: 'hidden', 
      background: '#050a08'
    }}>

      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '60%', height: '80%',
        background: `radial-gradient(circle, ${GREEN_ACCENT}15 0%, transparent 70%)`,
        filter: 'blur(80px)', zIndex: 0,
      }} />

      {!isNarrow && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${DARK_GREEN} 0%, #020504 100%)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)', zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: '32px 32px', zIndex: 0,
          }} />
        </>
      )}

      {isNarrow && (
        <div style={{ position: 'absolute', inset: 0, background: DARK_GREEN, zIndex: 0 }} />
      )}

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', 
        padding: isNarrow ? `40px ${padX}px 80px` : '80px 40px',
        display: 'flex', alignItems: 'center', flexDirection: isNarrow ? 'column' : 'row',
        gap: isNarrow ? '48px' : '60px', width: '100%',
      }}>

        {/* Left Side */}
        <div style={{ flex: '1.2', minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              display: 'inline-block', padding: '6px 12px', borderRadius: '20px',
              background: `rgba(255,255,255,0.05)`, border: `1px solid ${GREEN_ACCENT}30`,
              color: GREEN_ACCENT, fontSize: '12px', fontWeight: '700',
              letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px'
            }}
          >
          </motion.div>

          
           <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#ffffff', marginBottom: '24px',
            }}
          >
            Propulsez votre CV <span style={{ color: GREEN_ACCENT, textShadow: `0 0 30px ${GREEN_ACCENT}40` }}>à un autre niveau.</span>
            <br />
            Décrochez <span style={{ position: 'relative' }}>
              l'entretien.
              <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%' }} viewBox="0 0 200 8" fill="none">
                 <path d="M1 5.5C40.5 2 120.5 1.5 199 6.5" stroke={GREEN_ACCENT} strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

           <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '520px' }}
          >
            L'alliance d'un design irréprochable et d'une force de frappe stratégique. 
            <strong> NEXUS</strong> répond aux exigences du marché moderne : maximiser votre visibilité, captiver les recruteurs et accélérer votre embauche.
          </motion.p>

           <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.38 }}
  style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
>
  {/* BOUTON VERT : Bordure subtile plus foncée pour le relief */}
  <Link to="/CvAntiAts" className="btn-primary" style={{ 
    textDecoration: 'none',
    backgroundColor: GREEN_ACCENT,
    color: '#fff',
    border: `1px solid ${GREEN_ACCENT}80`, 
    padding: '12px 24px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    Concevoir mon CV <ArrowRight size={16} />
  </Link>

  {/* BOUTON NOIR : Bordure blanche fine pour le détacher du fond noir */}
  <Link to="/Spontanee" className="btn-secondary" style={{ 
    textDecoration: 'none',
    backgroundColor: '#000000',
    color: '#053e2aff',
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    padding: '12px 24px',
    borderRadius: '8px'
  }}>
   Candidater
  </Link>

  {/* BOUTON BLANC : Bordure noire pour affirmer le contour */}
  <Link to="/Dossier" className="btn-secondary" style={{ 
    textDecoration: 'none',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '1px solid #000000', 
    padding: '12px 24px',
    borderRadius: '8px'
  }}>
    Campus France
  </Link>
</motion.div>

         
              
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{ flex: '1', position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ position: 'absolute', width: '100%', height: '100%', background: `radial-gradient(circle, ${GREEN_ACCENT}20, transparent)`, borderRadius: '50%', filter: 'blur(40px)', zIndex: -1 }} />
          <div style={{ position: 'relative', padding: '10px' }}>
            <img src={heroUrl} alt="Workspace Élan Pro" style={{ width: '100%', maxWidth: '540px', borderRadius: '32px', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7)', border: `1px solid rgba(255,255,255,0.1)`, zIndex: 2 }} />
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'rgba(17, 17, 17, 0.8)', backdropFilter: 'blur(12px)', padding: '16px 20px', borderRadius: '20px', border: `1px solid rgba(255,255,255,0.1)`, display: 'flex', alignItems: 'center', gap: '12px', zIndex: 3 }}
            >
              <div style={{ background: GREEN_ACCENT, color: '#000', borderRadius: '50%', padding: '8px', display: 'flex' }}><TrendingUp size={18} /></div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff', lineHeight: 1 }}>+40%</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Taux de réponse</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* FEATURE ICONS STRIP */}
    <section style={{ padding: `${sectionPadY} ${padX}px`, background: '#050505', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div 
  initial={{ opacity: 0, y: 20 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }} 
  transition={{ duration: 0.8, ease: "easeOut" }}
  style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}
>
  {/* Badge avec une petite animation de battement */}
  <motion.p 
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
    style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: GREEN_ACCENT, marginBottom: '10px' }}
  >
    L'avantage NEXUS
  </motion.p>
  
  {/* Titre avec apparition progressive des lettres */}
  <motion.h2 
    initial={{ clipPath: 'inset(0 100% 0 0)' }}
    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
    transition={{ duration: 1, delay: 0.3 }}
    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: '12px' }}
  >
    Un CV comme fondation, la performance comme moteur
  </motion.h2>
  
  {/* Paragraphe avec un léger effet de flottement */}
  <motion.p 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.8 }}
    style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.75, margin: 0 }}
  >
    Chaque pilier de notre écosystème cible un objectif précis : 
    <span style={{ color: '#fff', fontWeight: 'bold' }}> forger un support de présentation d'élite</span>, 
    démultiplier la portée de vos envois ou profiter d'une expertise humaine pour affiner votre vision stratégique. 
    Explorez la solution qui s'aligne sur vos ambitions actuelles.
  </motion.p>
</motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : 'repeat(4, 1fr)', gap: '20px' }}>
          {features.slice(0, 4).map((f, i) => (
            <motion.div key={i} whileHover={{ y: -10 }}>
              <Link to={f.link} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', padding: '40px 24px', height: '100%', background: i % 2 === 0 ? `linear-gradient(145deg, ${DARK_GREEN} 0%, #06150f 100%)` : '#0a0a0a', borderRadius: '24px', border: i % 2 === 0 ? `1px solid ${GREEN_ACCENT}40` : '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: i % 2 === 0 ? 'rgba(255,255,255,0.12)' : `${GREEN_ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i % 2 === 0 ? '#fff' : GREEN_ACCENT }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: '800', color: '#fff' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: i % 2 === 0 ? 'rgba(255,255,255,0.75)' : '#94a3b8', lineHeight: 1.6 }}>{f.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: i % 2 === 0 ? '#fff' : GREEN_ACCENT, fontWeight: '800', fontSize: '13px', marginTop: 'auto' }}>Explorer <ChevronRight size={14} /></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section style={{ padding: isNarrow ? '80px 20px' : '120px 40px', background: '#050505' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  style={{ textAlign: 'center', marginBottom: '80px' }}
>
  {/* Badge avec effet de lueur pulsante */}
  <motion.div 
    animate={{ boxShadow: [`0 0 0px ${GREEN_ACCENT}00`, `0 0 15px ${GREEN_ACCENT}40`, `0 0 0px ${GREEN_ACCENT}00`] }}
    transition={{ duration: 2, repeat: Infinity }}
    style={{ 
      display: 'inline-block', padding: '6px 14px', borderRadius: '20px', 
      background: `${GREEN_ACCENT}15`, color: GREEN_ACCENT, 
      fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', 
      marginBottom: '16px', border: `1px solid ${GREEN_ACCENT}30` 
    }}
  >
    L'Ingénierie NEXUS
  </motion.div>

  {/* Titre avec apparition par balayage (reveal) */}
  <motion.h2 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    style={{ 
      fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', 
      fontWeight: 900, color: '#fff', marginBottom: '20px', letterSpacing: '-0.02em' 
    }}
  >
    Intuitif. Fulgurant. <span style={{ 
      color: GREEN_ACCENT, 
      textShadow: `0 0 25px ${GREEN_ACCENT}30`,
      display: 'inline-block'
    }}>Décisif.</span>
  </motion.h2>

  {/* Paragraphe avec apparition progressive mot par mot (simulée) */}
  <motion.p 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}
  >
    Un déploiement en trois phases pour transformer vos incertitudes en une 
    <span style={{ color: '#fff', fontWeight: '600' }}> stratégie d'attaque millimétrée</span>. 
    Une approche radicale, sans compromis, conçue pour générer un impact immédiat sur votre carrière.
  </motion.p>
</motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
          {steps.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} style={{ background: i === 1 ? `linear-gradient(145deg, ${DARK_GREEN} 0%, #061a12 100%)` : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 1 ? GREEN_ACCENT + '40' : 'rgba(255,255,255,0.08)'}`, borderRadius: '32px', padding: '48px 36px' }}>
              <div style={{ fontSize: '64px', fontWeight: '900', color: i === 1 ? '#fff' : GREEN_ACCENT, opacity: i === 1 ? 1 : 0.4 }}>{item.n}</div>
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '800' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

   {/* TESTIMONIALS REFORMULÉS */}
<section style={{ padding: '100px 40px', background: '#050505' }}>
  <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
    <motion.h2 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: 'center', color: '#fff', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, marginBottom: '64px', letterSpacing: '-0.02em' }}
    >
      Ils ont brisé leur <span style={{ color: GREEN_ACCENT, textShadow: `0 0 20px ${GREEN_ACCENT}30` }}>plafond de verre.</span>
    </motion.h2>

    <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
      {[
        { 
          name: 'Marc-Antoine D.', 
          role: 'Data Scientist @Thales', 
          text: 'Signature en moins d’un mois. L’intelligence de NEXUS a transformé mon profil technique en une véritable machine à convaincre.', 
          initial: 'M',
          stars: 5 
        },
        { 
          name: 'Awa G.', 
          role: 'Manager @KFC', 
          text: 'Le combiné CV + stratégie d’envoi est redoutable. Je suis passée de l’ombre à une visibilité totale auprès des chasseurs de tête.', 
          initial: 'A',
          stars: 5 
        },
        { 
          name: 'Ousmane L.', 
          role: 'Data Analyst @Ubisoft', 
          text: 'Statistiques affolantes : mon taux de conversion en entretien a littéralement quadruplé. C’est l’investissement le plus rentable de ma carrière.', 
          initial: 'O',
          stars: 5 
        },
      ].map((t, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          style={{ 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 
            border: '1px solid rgba(255,255,255,0.08)', 
            borderRadius: '32px', 
            padding: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Étoiles de notation */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
            {[...Array(t.stars)].map((_, index) => (
              <span key={index} style={{ color: '#FFD700', fontSize: '14px' }}>★</span>
            ))}
          </div>

          <p style={{ color: '#94a3b8', marginBottom: '32px', fontSize: '16px', lineHeight: 1.6, fontStyle: 'italic' }}>
            « {t.text} »
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '14px', 
              background: `linear-gradient(135deg, ${GREEN_ACCENT} 0%, #10b981 100%)`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#000', 
              fontWeight: '950',
              fontSize: '18px',
              boxShadow: `0 4px 15px ${GREEN_ACCENT}30`
            }}>
              {t.initial}
            </div>
            <div>
              <div style={{ fontWeight: '800', color: '#fff', fontSize: '15px' }}>{t.name}</div>
              <div style={{ fontSize: '12px', color: GREEN_ACCENT, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.role}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* CTA FINAL DYNAMISÉ */}
<section style={{ padding: '100px 20px', background: '#050505' }}>
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      borderRadius: '50px', 
      padding: '100px 40px', 
      background: `linear-gradient(165deg, ${DARK_GREEN} 0%, #010503 100%)`, 
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Effet de lueur en arrière-plan */}
    <div style={{ 
      position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', 
      background: `radial-gradient(circle, ${GREEN_ACCENT}10 0%, transparent 70%)`,
      pointerEvents: 'none'
    }} />

    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      style={{ 
        fontSize: 'clamp(34px, 5.5vw, 68px)', 
        fontWeight: 950, 
        color: '#fff', 
        marginBottom: '28px', 
        lineHeight: 1.1,
        letterSpacing: '-0.04em'
      }}
    >
      Prenez le contrôle de<br />
      <span style={{ 
        color: GREEN_ACCENT, 
        textShadow: `0 0 40px ${GREEN_ACCENT}40` 
      }}>votre ascension.</span>
    </motion.h2>

    <motion.p 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      style={{ 
        color: 'rgba(255,255,255,0.7)', 
        fontSize: '20px', 
        marginBottom: '56px', 
        maxWidth: '700px', 
        margin: '0 auto 56px',
        lineHeight: 1.6 
      }}
    >
      Cessez de subir le marché du travail. Armez-vous d'une technologie d'élite pour 
      <span style={{ color: '#fff', fontWeight: 'bold' }}> imposer votre profil</span> et transformer chaque opportunité en réussite concrète.
    </motion.p>

    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}
    >
      <Link 
        to="/cv" 
        className="btn-primary" 
        style={{ 
          padding: '22px 54px', 
          fontSize: '18px', 
          textDecoration: 'none', 
          backgroundColor: GREEN_ACCENT, 
          color: '#000', 
          fontWeight: '900', 
          borderRadius: '16px',
          boxShadow: `0 10px 30px ${GREEN_ACCENT}30`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        Lancer mon CV <ArrowRight size={22} />
      </Link>

      <Link 
        to="/recherche" 
        className="btn-secondary" 
        style={{ 
          padding: '22px 54px', 
          fontSize: '18px', 
          textDecoration: 'none', 
          backgroundColor: 'transparent', 
          color: '#fff', 
          fontWeight: '800', 
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        Explorer les offres
      </Link>
    </motion.div>
  </motion.div>
</section>

    </div> // Fermeture du conteneur principal de la page
  ); // Fermeture du return
} // Fermeture de la fonction Home