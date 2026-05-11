import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Briefcase, ExternalLink, Loader2, 
  Sparkles, ChevronLeft, ChevronRight, Info, MessageCircle, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ──────────────────────────────────────────
   PALETTE & CONFIGURATION DES STYLES
────────────────────────────────────────── */
const GREEN_ACCENT = '#059669'; // Vert principal pour les accents
const GREEN_LIGHT = '#10b981'; // Vert plus clair pour le texte sur fond sombre
const DARK_GREEN = '#064e3b';  // Vert sombre pour les dégradés et bordures
const TEXT_MUTED = '#94a3b8';   // Couleur de texte secondaire (gris bleuté)

// Style de base pour les boutons de pagination
const paginationButtonStyle = {
  padding: '15px 30px',
  borderRadius: '15px',
  background: '#0a0a0a',
  color: '#fff',
  border: `1px solid ${DARK_GREEN}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontWeight: '700'
};

export default function Recherche() {
  // États pour gérer la recherche, les résultats, le chargement et la pagination
  const [query, setQuery] = useState('');          // La requête de recherche de l'utilisateur
  const [jobs, setJobs] = useState([]);            // La liste des offres affichées
  const [total, setTotal] = useState(0);            // Le nombre total d'offres trouvées (global)
  const [loading, setLoading] = useState(false);    // État de chargement
  const [page, setPage] = useState(1);              // Numéro de page actuel
  const [hasSearched, setHasSearched] = useState(false); // Pour savoir si une recherche a été effectuée

  // Effet pour déclencher la recherche quand la page change (si une requête existe)
  useEffect(() => {
    if (query && hasSearched) {
      fetchJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /**
   * Fonction principale pour récupérer les offres depuis le backend Python.
   */
  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Appel à l'API Flask (backend) sur le port 5001
      // On passe la requête (q) et le numéro de page (p)
      const response = await fetch(`http://localhost:5001/api/v1/elanpro/jobs?q=${encodeURIComponent(query)}&p=${page}`);
      const result = await response.json();
      
      // Mise à jour des états avec les données reçues
      setJobs(result.data || []);       // Offres pour la page actuelle
      setTotal(result.total || 0);      // Nombre total d'offres trouvées
      setHasSearched(true);             // Une recherche a été faite
      
      // Scroll fluide vers le haut de la page pour le confort
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Erreur de connexion avec le Backend :", err);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  /**
   * Gère la soumission du formulaire de recherche (nouvelle recherche).
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // On repart à la page 1 pour une nouvelle recherche
    fetchJobs();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* ── BANDEAU SINUSOÏDAL DE FOND ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', lineHeight: 0, zIndex: 0 }}>
        <svg viewBox="0 0 1440 320" fill="none" style={{ width: '100%', height: 'auto' }}>
          <path d="M0 160L48 144C96 128 192 96 288 106.7C384 117 480 171 576 165.3C672 160 768 96 864 90.7C960 85 1056 139 1152 160C1248 181 1344 171 1392 165.3L1440 160V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V160Z" fill={DARK_GREEN} fillOpacity="0.4"/>
        </svg>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '150px 20px 80px', position: 'relative', zIndex: 1 }}>
        {/* Titre Principal avec apparition par mot */}
<motion.h1 
  style={{ 
    fontSize: 'clamp(40px, 8vw, 72px)', 
    fontWeight: '950', 
    letterSpacing: '-0.04em', 
    lineHeight: 1, 
    marginBottom: '32px',
    textAlign: 'center', // 1. Centre le texte horizontalement
    width: '100%',       // 2. S'assure que le h1 prend toute la largeur
  }}
>
    <motion.span
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: 'inline-block' }} // Garder inline-block pour l'effet Y
    >
      Trouvez votre 
    </motion.span>
    
    <br/> 

    <motion.span 
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "auto" }}
      transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      style={{ 
        color: GREEN_ACCENT, 
        display: 'inline-table', // 3. Utiliser inline-table ou inline-block
        margin: '0 auto',        // 4. Centrage de sécurité
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
      Opportunité avec Nexus.
    </motion.span>
</motion.h1>
          
        {/* Texte d'accompagnement détaillé */}
<p 
  style={{ 
    fontSize: '18px', 
    color: TEXT_MUTED, 
    maxWidth: '800px', 
    margin: '0 auto 40px', // Centre le bloc (le rectangle du paragraphe)
    textAlign: 'center',    // Centre le texte à l'intérieur du bloc
    lineHeight: 1.6 
  }}
>
  Vous recherchez un <span style={{color: '#fff', fontWeight: '700'}}>CDI</span>, une <span style={{color: '#fff', fontWeight: '700'}}>alternance</span> ou un <span style={{color: '#fff', fontWeight: '700'}}>stage</span> ? <br/>
  Notre intelligence artificielle et nos experts sont là pour vous accompagner dans chaque étape de votre carrière en France.
</p>
          
          {/* Formulaire de recherche */}
          <form onSubmit={handleSearchSubmit} style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', gap: '15px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: GREEN_ACCENT }} size={20} />
              <input 
                type="text" 
                placeholder="Quel métier recherchez-vous ? (ex: Développeur React)" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '22px 30px 22px 60px',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `2px solid ${DARK_GREEN}`,
                  color: '#fff',
                  outline: 'none',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>
            <button 
              type="submit" 
              style={{
                padding: '0 40px',
                borderRadius: '24px',
                background: GREEN_ACCENT,
                color: '#000',
                fontWeight: '900',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Rechercher"}
            </button>
          </form>

          {/* Bannière affichant le NOMBRE TOTAL D'OFFRES TROUVÉES */}
          <AnimatePresence>
            {hasSearched && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 25px', borderRadius: '20px', background: `${GREEN_ACCENT}15`, border: `1px solid ${GREEN_ACCENT}40` }}
              >
                <Sparkles size={18} color={GREEN_ACCENT} />
                <span style={{ fontWeight: '800' }}>
                  {total.toLocaleString()} offres disponibles sur toute la France (au total)
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── GRILLE DE RÉSULTATS D'OFFRES ── */}
        <AnimatePresence mode="wait">
          {loading ? (
            // Spinner de chargement
            <div key="loader" style={{ textAlign: 'center', padding: '100px' }}>
              <Loader2 size={60} color={GREEN_ACCENT} className="animate-spin" style={{ margin: '0 auto' }} />
            </div>
          ) : (
            // Grille des offres
            <motion.div 
              key="results-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}
            >
              {jobs.map((job, index) => {
                // Logique pour déterminer si cette card est au milieu (index 1, 4...)
                const isMiddle = index === 1 || index === 4 || index === 7;
                
                return (
                  <motion.div 
                    key={job.id} 
                    whileHover={{ y: -10 }}
                    style={{ 
                        // Dégradé vert profond pour la card du milieu
                        background: isMiddle ? `linear-gradient(165deg, ${DARK_GREEN} 0%, #050505 100%)` : '#080808', 
                        padding: '40px', 
                        borderRadius: '35px', 
                        // Bordure verte pour le milieu, grise discrète pour les autres
                        border: isMiddle ? `2px solid ${GREEN_ACCENT}` : '1px solid rgba(255,255,255,0.05)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between', 
                        minHeight: '480px',
                        position: 'relative',
                        // Lueur douce pour la card du milieu
                        boxShadow: isMiddle ? `0 20px 40px ${GREEN_ACCENT}20` : 'none'
                    }}
                  >
                    <div>
                      {/* En-tête de la card : Type de contrat et icône */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span style={{ 
                          // Contraste inversé pour la card du milieu
                          background: isMiddle ? '#fff' : `${GREEN_ACCENT}20`, 
                          color: isMiddle ? '#000' : GREEN_ACCENT, 
                          padding: '6px 15px', 
                          borderRadius: '12px', 
                          fontSize: '11px', 
                          fontWeight: '950' 
                        }}>
                          {job.typeContrat}
                        </span>
                        <Briefcase size={20} color={GREEN_ACCENT} opacity={0.5} />
                      </div>
                      
                      {/* Titre, entreprise et localisation */}
                      <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>{job.titre}</h3>
                      <p style={{ color: isMiddle ? '#fff' : GREEN_ACCENT, fontWeight: '800', marginBottom: '20px' }}>{job.entreprise}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: TEXT_MUTED, fontSize: '14px', marginBottom: '25px' }}>
                        <MapPin size={14} color={GREEN_ACCENT} /> {job.localisation}
                      </div>
                      
                      {/* Description courte (tronquée) */}
                      <p style={{ fontSize: '14px', color: isMiddle ? 'rgba(255,255,255,0.7)' : TEXT_MUTED, lineHeight: '1.7' }}>
                        {job.description.length > 220 ? job.description.substring(0, 220) + "..." : job.description}
                      </p>
                    </div>
                    
                    {/* Bouton pour aller sur l'offre d'origine */}
                    <a href={job.url_postulation} target="_blank" rel="noreferrer" style={{ 
                      marginTop: '30px', 
                      padding: '18px', 
                      background: isMiddle ? '#fff' : 'rgba(255,255,255,0.05)', 
                      color: isMiddle ? '#000' : '#fff', 
                      borderRadius: '15px', 
                      textAlign: 'center', 
                      textDecoration: 'none', 
                      fontWeight: '900',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}>
                      Postuler sur France Travail <ExternalLink size={16} />
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PAGINATION (PRÉCÉDENT / SUIVANT) ── */}
        {!loading && jobs.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '80px' }}>
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1} 
              style={{...paginationButtonStyle, color: page === 1 ? '#333' : '#fff', opacity: page === 1 ? 0.5 : 1}}
            >
              <ChevronLeft size={20} style={{marginRight: '8px'}} /> Précédent
            </button>
            <span style={{ fontWeight: '900', color: GREEN_ACCENT, fontSize: '18px' }}>PAGE {page}</span>
            <button 
              onClick={() => setPage(p => p + 1)} 
              style={paginationButtonStyle}
            >
              Suivant <ChevronRight size={20} style={{marginLeft: '8px'}} />
            </button>
          </div>
        )}

        {/* ── SECTION D'APPEL À L'ACTION (CONTACT ÉQUIPE) ── */}
        <section style={{ 
          marginTop: '150px', 
          padding: '80px 40px', 
          background: 'linear-gradient(165deg, rgba(6, 78, 59, 0.3) 0%, #050505 100%)', 
          borderRadius: '50px', 
          border: '1px solid rgba(255,255,255,0.05)', 
          textAlign: 'center' 
        }}>
            <HelpCircle size={50} color={GREEN_ACCENT} style={{ marginBottom: '30px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '20px' }}>Besoin d'aide pour candidater ?</h2>
            <p style={{ color: TEXT_MUTED, fontSize: '18px', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                Nos consultants experts sont disponibles pour vous aider à décrypter les offres, optimiser vos CV et rédiger vos lettres de motivation pour ces postes.
            </p>
            <Link 
              to="/contact" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '12px', 
                textDecoration: 'none', 
                background: GREEN_ACCENT, 
                color: '#000', 
                padding: '20px 45px', 
                borderRadius: '18px', 
                fontWeight: '950',
                transition: 'background 0.3s ease',
                boxShadow: `0 10px 25px ${GREEN_ACCENT}40`
              }}
            >
                Parler à un consultant NEXUS <MessageCircle size={22} />
            </Link>
        </section>

      </div>

  )};
