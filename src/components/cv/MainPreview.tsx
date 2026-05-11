"use client";

import { useResumeStore } from "../../stores/useResumeStore";
import { useRef, useEffect, useState, CSSProperties } from "react";

export default function MainPreview() {
  const { data } = useResumeStore();
  const { settings, colorPrimary, colorAccent, langueCV } = data;

  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const A4_HEIGHT_PX = 1122; 

  useEffect(() => {
    const checkHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        setPercent(Math.round((height / A4_HEIGHT_PX) * 100));
      }
    };
    const observer = new ResizeObserver(checkHeight);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [data]);

  const t = {
    fr: {
      age: "Âge", years: "ans", tel: "Tel", email: "Email", ville: "Ville",
      profil: "Profil Professionnel", skills: "Compétences Techniques",
      exp: "Expériences Professionnelles", projets: "Réalisations & Projets",
      edu: "Diplômes et Formations", cert: "Certifications",
      atouts: "Atouts & Langues", langues: "Langues", soft: "Soft Skills",
      interests: "Centres d'Intérêt"
    },
    en: {
      age: "Age", years: "years", tel: "Phone", email: "Email", ville: "Location",
      profil: "Professional Summary", skills: "Technical Skills",
      exp: "Work Experience", projets: "Projects & Achievements",
      edu: "Education", cert: "Certifications",
      atouts: "Skills & Languages", langues: "Languages", soft: "Soft Skills",
      interests: "Interests"
    }
  }[langueCV || 'fr'];

  const baseSize = settings.fontSize || 9;
  const jobSize = baseSize + 13;
  const nameSize = baseSize + 6;
  const titleSize = baseSize + 1;
  const subSize = baseSize - 1;

  // --- LOGIQUE DES BORDURES DE PAGE ---
  const getPageBorderStyle = (): CSSProperties => {
    const borderType = settings.pageBorder;
    if (!borderType || borderType === 'none') return {};

    switch (borderType) {
      case 'full-thin':
        return { border: `1px solid ${colorAccent}` };
      case 'full-thick':
        return { border: `4px solid ${colorAccent}` };
      case 'double':
        return { border: `3px double ${colorAccent}` };
      case 'minimal-sides':
        return { borderLeft: `4px solid ${colorAccent}`, borderRight: `4px solid ${colorAccent}` };
      case 'accent-top':
        return { borderTop: `6px solid ${colorAccent}`, borderBottom: `6px solid ${colorAccent}` };
      default:
        return {};
    }
  };

  const getLineStyle = (): CSSProperties => {
    const styles: Record<string, CSSProperties> = {
      double: { borderBottom: `3px double ${colorPrimary}`, height: '0px' },
      thick: { borderBottom: `2.5pt solid ${colorPrimary}`, height: '0px' },
      gradient: { height: '2px', background: `linear-gradient(to right, ${colorPrimary}, transparent)` },
      modern: { height: '3px', background: `linear-gradient(to right, ${colorAccent} 15%, ${colorPrimary} 15%)` },
      none: { height: '0px', display: 'none' }
    };
    const currentStyle = settings.lineStyle;
    return styles[currentStyle] || { borderBottom: `1px ${currentStyle} ${colorPrimary}`, height: '0px' };
  };

  const renderSectionLine = () => {
    const style = getLineStyle();
    if (settings.lineStyle === 'none') return null;
    return (
      <div style={{ ...style, width: '100%', marginTop: '2px', marginBottom: '6px', WebkitPrintColorAdjust: 'exact' }} />
    );
  };

  return (
 <div className="relative flex justify-center bg-[#050505] py-10 min-h-screen">
      {/* ZONE A4 BLANCHE */}
      <div
        ref={containerRef}
        className="bg-white shadow-2xl relative overflow-hidden"
        style={{
          width: '21cm',
          minHeight: '29.7cm',
          padding: '1.2cm',
          fontFamily: settings.fontFamily,
          fontSize: `${baseSize}pt`,
          color: '#1e293b',
          WebkitPrintColorAdjust: 'exact',
          boxSizing: 'border-box',
          ...getPageBorderStyle() // APPLICATION DE LA BORDURE ICI
        }}
      >
 {/* --- TOUT LE CONTENU RESTE ICI --- */}
 <main className="space-y-4">

  
  {/* --- EN-TÊTE FIXE (PHOTO À GAUCHE, TEXTE À DROITE) --- */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'flex-start', // Aligné en haut pour contrôler le décalage
    marginBottom: '0.5cm', 
    width: '100%' 
  }}>
    
    {/* CONTENEUR IMAGE */}
    {data.photo && (
      <div style={{ 
        width: '3.2cm', 
        height: '3.2cm', 
        minWidth: '3.2cm', 
        borderRadius: '50%', 
        overflow: 'hidden', 
        border: `2px solid ${colorAccent}`,
        boxSizing: 'border-box',
        flexShrink: 0 
      }}>
        <img src={data.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )}

    {/* CONTENEUR TEXTE AVEC ESPACEMENT ET ALIGNEMENT HAUT */}
    <div 
      className="flex-1" 
      style={{ 
        paddingLeft: '0.8cm', // Crée l'espace entre l'image et le texte
        marginTop: '0.5cm',   // Aligne le texte à ~1cm du haut de l'image
        width: '100%' 
      }}
    > 
      <h1 
        className="font-black uppercase tracking-tighter" 
        style={{ 
          color: colorAccent, 
          fontSize: `${jobSize}pt`, 
          margin: 0, 
          lineHeight: '1', 
          textAlign: 'left'
        }}
      >
        {data.titreJob || "DATA ENGINEER"}
      </h1>
      
      <h2 
        className="font-bold" 
        style={{ 
          color: colorPrimary, 
          fontSize: `${nameSize}pt`, 
          marginTop: '2px', 
          lineHeight: '1.2'
        }}
      >
        {data.prenom} {data.nom?.toUpperCase()}
      </h2>

      {/* BLOC CONTACT INFO */}
      <div 
        className="flex flex-wrap items-center text-slate-700 mt-2 w-full" 
        style={{ 
          fontSize: `${subSize}pt`, 
          lineHeight: '1.6',
          textAlign: 'left'
        }}
      >
  {/* AGE */}
  {data.age && (
    <span style={{ marginRight: '20px', marginBottom: '4px' }} className="inline-flex items-center whitespace-nowrap">
      <span className="font-bold text-slate-900" style={{ color: colorAccent }}>■</span>
      &nbsp;<span className="font-bold text-slate-900">Age :</span>&nbsp;{data.age} {t.years}
    </span>
  )}

  {/* TELEPHONE */}
  {data.telephone && (
    <span style={{ marginRight: '20px', marginBottom: '4px' }} className="inline-flex items-center whitespace-nowrap">
      <span className="font-bold text-slate-900" style={{ color: colorAccent }}>■</span>
      &nbsp;<span className="font-bold text-slate-900">Tel :</span>&nbsp;{data.telephone}
    </span>
  )}

  {/* MAIL */}
  {data.email && (
    <span style={{ marginRight: '20px', marginBottom: '4px' }} className="inline-flex items-center whitespace-nowrap">
      <span className="font-bold text-slate-900" style={{ color: colorAccent }}>■</span>
      &nbsp;<span className="font-bold text-slate-900">Mail :</span>&nbsp;
      <a href={`mailto:${data.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{data.email}</a>
    </span>
  )}

  {/* VILLE */}
  {data.ville && (
    <span style={{ marginRight: '20px', marginBottom: '4px' }} className="inline-flex items-center whitespace-nowrap">
      <span className="font-bold text-slate-900" style={{ color: colorAccent }}>■</span>
      &nbsp;<span className="font-bold text-slate-900">Ville :</span>&nbsp;{data.ville}
    </span>
  )}

{/* RÉSEAUX SOCIAUX DYNAMIQUES */}
  {data.reseaux?.filter(res => res.url).map((res, i) => (
    <span key={i} style={{ display: 'inline-block', marginRight: '20px', marginBottom: '4px' }} className="whitespace-nowrap">
      <span className="font-bold text-slate-900" style={{ color: colorAccent }}>■</span>
      &nbsp;<span className="font-bold text-slate-900">{res.nom || 'Lien'} :</span>&nbsp;
      <a 
        href={res.url.startsWith('http') ? res.url : `https://${res.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 font-bold hover:underline"
        style={{ textDecoration: 'none' }}
      >
        {res.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
      </a>
    </span>
  ))}
</div>
</div>
 </div>      



{/* --- SECTION PROFIL / BIO --- */}
          {data.bio && (
            <section>
              <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.profil}</h3>
              {renderSectionLine()}
              <div 
                style={{ 
                  fontSize: `${baseSize}pt`, 
                  lineHeight: '1.4',
                  textAlign: 'justify', 
                  wordBreak: 'break-all', 
                  width: '100%',
                  marginTop: '4px'
                }}
              >
                <p style={{ margin: 0, whiteSpace: 'pre-line' }}>
                  {data.bio}
                </p>
              </div>
            </section>
          )}

{data.hardSkills?.length > 0 && (
  <section>
    <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>
      {t.skills}
    </h3>
    {renderSectionLine()}
    <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }} className="space-y-1 mt-1">
      {data.hardSkills.map((s, i) => (
        <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'start', width: '100%' }}>
          
          {/* 1. La puce - alignée en haut */}
          <span style={{ color: colorAccent, flexShrink: 0, marginTop: '4px', fontSize: '7pt' }}>
            {settings.bulletType}
          </span>
          
          {/* 2. Le texte monobloc fluide */}
          <div style={{ 
            fontSize: `${subSize}pt`, 
            lineHeight: '1.4', 
            textAlign: 'justify', 
            flex: 1,
            margin: 0,
            // break-all empêche le texte de descendre si c'est un mot trop long
            wordBreak: 'break-all', 
            display: 'block' 
          }}>
            {/* Titre de la compétence */}
            <span style={{ fontWeight: '900', color: '#000', textTransform: 'uppercase' }}>
              {s.categorie} :
            </span>
            
            {/* Détails qui suivent sur la même ligne */}
            <span style={{ color: '#1e293b' }}>
              &nbsp;{s.details}
            </span>
          </div>

        </li>
      ))}
    </ul>
  </section>
)}

{data.experiences?.length > 0 && (
  <section>
    <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.exp}</h3>
    {renderSectionLine()}
    {data.experiences.map((exp, i) => (
      <div key={i} className="mb-3 w-full">
        <div 
          className="flex flex-row items-baseline w-full" 
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '2px' }}
        >
          <div style={{ 
            color: colorPrimary, 
            flex: '1 1 auto', 
            marginRight: '15px',
            fontSize: `${subSize + 1}pt`, 
            fontWeight: '900'            
          }}>
            {exp.poste}{exp.entreprise ? ` | ${exp.entreprise}` : ''}
          </div>
          <div 
            className="italic whitespace-nowrap font-bold" 
            style={{ 
              fontSize: `${subSize}pt`, 
              color: '#1e293b', 
              textAlign: 'right',
              flexShrink: 0
            }}
          >
            {exp.date}
          </div>
        </div>
<ul className="mt-1 space-y-1 p-0 list-none" style={{ listStyle: 'none', paddingLeft: 0 }}>
  {exp.puces.filter(p => p.trim() !== "").map((p, pi) => (
    <li key={pi} className="flex items-start" style={{ display: 'flex', gap: '12px', width: '100%' }}> 
      <span style={{ color: colorAccent, flexShrink: 0, marginTop: '4px' }}>
        {settings.bulletType}
      </span>
      <span style={{ 
        fontSize: `${subSize}pt`, 
        lineHeight: '1.4', 
        flex: 1, 
        textAlign: 'justify',
        wordBreak: 'break-all', 
        display: 'block'
      }}>
        {p}
      </span>
    </li>
  ))}
</ul>
      </div>
    ))}
  </section>
)}

{data.projets?.length > 0 && (
  <section>
    <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.projets}</h3>
    {renderSectionLine()}
    {data.projets.map((proj, i) => (
      <div key={i} className="mb-3 w-full">
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'baseline', 
            width: '100%',
            marginBottom: '2px'
          }}
        >
          <span style={{ 
            color: colorPrimary, 
            flex: '1 1 auto', 
            marginRight: '15px',
            fontSize: `${subSize + 1}pt`, 
            fontWeight: '900' 
          }}>
            {proj.titre}
          </span>
          <span 
            className="italic font-bold" 
            style={{ 
              fontSize: `${subSize}pt`, 
              color: '#1e293b',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {proj.date}
          </span>
        </div>
        <ul className="mt-1 space-y-1 p-0" style={{ listStyle: 'none', paddingLeft: 0 }}>
          {proj.puces.filter(p => p.trim() !== "").map((p, pi) => (
            <li key={pi} className="flex items-start" style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <span style={{ color: colorAccent, flexShrink: 0, marginTop: '4px' }}>
                {settings.bulletType}
              </span>
              <span style={{ 
                fontSize: `${subSize}pt`, 
                lineHeight: '1.4',
                flex: 1,
                textAlign: 'justify',
                wordBreak: 'break-all', 
                display: 'block'
              }}>
                {p}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
)}

{data.formations?.length > 0 && (
  <section>
    <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.edu}</h3>
    {renderSectionLine()}
    {data.formations.map((edu, i) => (
      <div key={i} className="mb-3 w-full">
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'baseline', 
            width: '100%',
            marginBottom: '2px'
          }}
        >
          <span style={{ 
            color: colorPrimary, 
            flex: '1 1 auto', 
            marginRight: '15px',
            fontSize: `${subSize + 1}pt`, 
            fontWeight: '900'            
          }}>
            {edu.titre}{edu.ecole ? ` | ${edu.ecole}` : ''}
          </span>
          <span 
            className="italic font-bold" 
            style={{ 
              fontSize: `${subSize}pt`, 
              color: '#1e293b',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {edu.date}
          </span>
        </div>
        <ul className="mt-1 space-y-1 p-0" style={{ listStyle: 'none', paddingLeft: 0 }}>
          {edu.puces?.filter(p => p.trim() !== "").map((p, pi) => (
            <li key={pi} className="flex items-start" style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <span style={{ color: colorAccent, flexShrink: 0, marginTop: '4px' }}>
                {settings.bulletType}
              </span>
              <span style={{ 
                fontSize: `${subSize}pt`, 
                lineHeight: '1.4',
                flex: 1,
                textAlign: 'justify',
                wordBreak: 'break-all', 
                display: 'block'
              }}>
                {p}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
)}

{data.certifications?.length > 0 && (
  <section>
    <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.cert}</h3>
    {renderSectionLine()}
    {data.certifications.map((cert, i) => (
      <div key={i} className="mb-3 w-full">
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'baseline', 
            width: '100%',
            marginBottom: '2px'
          }}
        >
          <span style={{ 
            color: colorPrimary, 
            flex: '1 1 auto', 
            marginRight: '15px',
            fontSize: `${subSize + 1}pt`, 
            fontWeight: '900',
            wordBreak: 'break-word', 
            display: 'block'
          }}>
            {cert.titre} {cert.organisme && `| ${cert.organisme}`}
          </span>
          {cert.date && (
            <span 
              className="italic font-bold" 
              style={{ 
                fontSize: `${subSize}pt`, 
                color: '#1e293b',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {cert.date}
            </span>
          )}
        </div>
        <ul className="mt-1 space-y-1 p-0" style={{ listStyle: 'none', paddingLeft: 0 }}>
          {cert.puces?.filter(p => p.trim() !== "").map((p, pi) => (
            <li key={pi} className="flex items-start" style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <span style={{ color: colorAccent, flexShrink: 0, marginTop: '4px' }}>
                {settings.bulletType}
              </span>
              <span style={{ 
                fontSize: `${subSize}pt`, 
                lineHeight: '1.4',
                flex: 1,
                textAlign: 'justify',
                wordBreak: 'break-all', 
                display: 'block'
              }}>
                {p}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
)} 

<section>
  <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>
    {t.atouts}
  </h3>
  {renderSectionLine()}
  
  <div 
    style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'flex-start', 
      width: '100%', 
      marginTop: '8px',
      gap: '20px' 
    }}
  >
    <div style={{ width: '22%' }}>
      <strong className="uppercase block" style={{ color: colorPrimary, fontSize: `${subSize - 1}pt`, marginBottom: '4px' }}>
        {t.langues}
      </strong>
      <div className="space-y-1">
        {data.langues?.slice(0, 4).map((l: any, i: number) => (
          <div key={i} className="flex items-center whitespace-nowrap" style={{ fontSize: `${subSize}pt` }}>
            <span style={{ color: colorAccent, marginRight: '6px', fontSize: '7pt' }}>{settings.bulletType}</span>
            <span className="font-bold">{l?.nom ? l.nom : l}</span>
            {l?.niveau && <span className="text-slate-500">&nbsp;({l.niveau})</span>}
          </div>
        ))}
      </div>
    </div>

    <div style={{ width: '28%' }}>
      <strong className="uppercase block" style={{ color: colorPrimary, fontSize: `${subSize - 1}pt`, marginBottom: '4px' }}>
        {t.interests}
      </strong>
      <div className="space-y-1">
        {data.interets?.slice(0, 4).map((item: any, i: number) => (
          <div key={i} className="flex items-center" style={{ fontSize: `${subSize}pt` }}>
            <span style={{ color: colorAccent, marginRight: '6px', fontSize: '7pt' }}>{settings.bulletType}</span>
            <span style={{ wordBreak: 'break-all' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ flex: 1 }}>
      <strong className="uppercase block" style={{ color: colorPrimary, fontSize: `${subSize - 1}pt`, marginBottom: '4px' }}>
        {t.soft}
      </strong>
      <div className="space-y-1">
        {data.softSkills?.slice(0, 4).map((s: any, i: number) => (
          <div key={i} className="flex items-start" style={{ fontSize: `${subSize}pt` }}>
            <span style={{ color: colorAccent, marginRight: '6px', fontSize: '7pt', marginTop: '4px' }}>{settings.bulletType}</span>
            <span style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
        </main>

        {percent > 100 && (
          <div className="absolute top-[29.7cm] left-0 w-full bg-red-500/10 border-t-4 border-red-500 p-4 text-red-600 font-black text-center no-print">
            CONTENU HORS PAGE
          </div>
        )}
      </div>
    </div>
  );
}