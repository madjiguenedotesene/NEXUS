"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResumeStore } from "../stores/useResumeStore"; 
import { 
  Download, User, Briefcase, GraduationCap, 
  Wrench, Palette, Award, Brain, Eye, Settings2, ChevronDown, Sparkles
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoEditor from "../components/cv/InfoEditor";
import StyleEditor from "../components/cv/StyleEditor";
import ExperienceEditor from "../components/cv/ExperienceEditor";
import EducationEditor from "../components/cv/EducationEditor";
import ProjectCertEditor from "../components/cv/ProjectCertEditor";
import SkillsEditor from "../components/cv/SkillsEditor";
import SoftSkillsEditor from "../components/cv/softSkillsEditor"; 
import MainPreview from "../components/cv/MainPreview";

export default function CvAntiAts() {
  const { data, setLanguage } = useResumeStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); 
  const [isOverflown, setIsOverflown] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // Détection dynamique du dépassement avec tolérance de 5px pour éviter les faux positifs
  useEffect(() => {
    const checkOverflow = () => {
      if (componentRef.current) {
        // Hauteur standard A4 en pixels (96 DPI)
        const a4HeightPx = 1122; 
        const currentHeight = componentRef.current.scrollHeight;
        
        // On active l'alerte si la hauteur dépasse la limite A4 + tolérance
        setIsOverflown(currentHeight > (a4HeightPx + 5));
      }
    };

    checkOverflow();
    const timer = setTimeout(checkOverflow, 300); 
    return () => clearTimeout(timer);
  }, [data]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `CV_${data?.nom || 'Export'}`,
    pageStyle: `
      @page { size: 210mm 297mm; margin: 0 !important; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `,
  });

  const menuItems = [
    { id: 'style', label: 'Design & Style', icon: <Palette size={16} />, component: <StyleEditor /> },
    { id: 'info', label: 'Informations Personnelles', icon: <User size={16} />, component: <InfoEditor /> },
    { id: 'skills', label: 'Expertises Techniques', icon: <Wrench size={16} />, component: <SkillsEditor /> },
    { id: 'exp', label: 'Expériences Professionnelles', icon: <Briefcase size={16} />, component: <ExperienceEditor /> },
    { id: 'edu', label: 'Parcours Académique', icon: <GraduationCap size={16} />, component: <EducationEditor /> },
    { id: 'projects', label: 'Projets & Certifications', icon: <Award size={16} />, component: <ProjectCertEditor /> },
    { id: 'soft', label: 'Qualités (Soft Skills)', icon: <Brain size={16} />, component: <SoftSkillsEditor /> },
  ];

  if (!mounted) return <div style={{backgroundColor: 'black', height: '100vh'}} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: 'black', color: 'white', overflow: 'hidden' }}>
      
      <div style={{ flexShrink: 0 }}>
        <Navbar />
      </div>

     {/* --- TEXTE ANIMÉ D'EXPLICATION NEXUS CORE (ULTRA-VOLUMINEUX) --- */}
      <div style={{ 
        padding: '50px 20px', 
        textAlign: 'center', 
        background: 'radial-gradient(circle at center, #0a1a0f 0%, #000 80%)',
        borderBottom: '1px solid #054b2dff',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Lignes de scan en arrière-plan */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px)', 
          backgroundSize: '100% 4px', pointerEvents: 'none' 
        }} />

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          gap: '20px',
          animation: 'fadeIn 1s ease-out',
          position: 'relative',
          zIndex: 1
        }}>
          

          {/* SOUS-TITRE TECHNIQUE EN BLOC */}
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            padding: '8px 20px', 
            borderRadius: '4px',
            borderLeft: '4px solid #10b981',
            borderRight: '4px solid #10b981'
          }}>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '900', 
              color: '#fff', 
              letterSpacing: '5px', 
              textTransform: 'uppercase',
              margin: 0,
              animation: 'pulse 2s infinite'
            }}>
              Core Engine Architecture
            </h2>
          </div>

          {/* PETIT TEXTE DESCRIPTIF FILTRÉ */}
          <p style={{ 
            fontSize: '12px', 
            fontWeight: '600', 
            color: '#64748b', 
            maxWidth: '600px',
            lineHeight: 1.5,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Infiltration des algorithmes de tri par <span style={{ color: '#fff' }}>ingénierie sémantique</span>. 
            Générez des documents à <span style={{ color: '#10b981' }}>haute performance</span> validés par le protocole Nexus.
          </p>

        </div>

        {/* Style supplémentaire pour les animations spécifiques à ce bloc */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.4)); }
            50% { transform: translateY(-10px); filter: drop-shadow(0 0 50px rgba(16, 185, 129, 0.6)); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', overflow: 'hidden', width: '100%' }}>
        
        {/* --- COLONNE GAUCHE : SAISIE (35%) --- */}
        <aside style={{ width: '35%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #27272a', backgroundColor: '#09090b' }}>
          
          <div style={{ padding: '20px', borderBottom: '1px solid #27272a', backgroundColor: 'black' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.15em', color: '#064a34ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings2 size={14} /> ÉDITEUR DE CONTENU
              </h2>
              <div style={{ display: 'flex', gap: '4px', backgroundColor: '#18181b', padding: '3px', borderRadius: '6px' }}>
                <button onClick={() => setLanguage('fr')} style={{ padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px', border: 'none', backgroundColor: data.langueCV === 'fr' ? '#2563eb' : 'transparent', color: 'white', cursor: 'pointer' }}>FR</button>
                <button onClick={() => setLanguage('en')} style={{ padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px', border: 'none', backgroundColor: data.langueCV === 'en' ? '#2563eb' : 'transparent', color: 'white', cursor: 'pointer' }}>EN</button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <select 
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #3f3f46', color: 'white', padding: '12px 16px', borderRadius: '10px', cursor: 'pointer', outline: 'none', appearance: 'none', fontWeight: '700', fontSize: '13px' }}
              >
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
              <ChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#71717a' }} size={16} />
            </div>
          </div>

          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: 'black' }}>
            <div style={{ maxWidth: '550px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', color: '#095328ff', borderBottom: '1px solid #054b2dff', paddingBottom: '12px' }}>
                {menuItems.find(i => i.id === activeTab)?.icon}
                <h3 style={{ fontSize: '16px', fontWeight: '900', textTransform: 'uppercase' }}>
                  {menuItems.find(i => i.id === activeTab)?.label}
                </h3>
              </div>
              {menuItems.find(item => item.id === activeTab)?.component}
            </div>
          </div>

          <div style={{ padding: '20px', borderTop: '1px solid #27272a', backgroundColor: '#09090b' }}>
            <button onClick={handlePrint} style={{ width: '100%', padding: '16px', backgroundColor: '#233c27ff', color: 'white', fontWeight: '900', border: 'none', borderRadius: '12px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Download size={18} /> Télécharger mon CV en PDF
            </button>
          </div>
        </aside>

        {/* --- COLONNE DROITE : APERÇU (65%) --- */}
        <section style={{ width: '65%', backgroundColor: '#050505', overflowY: 'auto', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="custom-scrollbar">
          
          <div style={{ position: 'sticky', top: '0', zIndex: 10, marginBottom: '20px' }}>
            <span style={{ 
              backgroundColor: 'rgba(39, 39, 42, 0.95)', padding: '8px 24px', borderRadius: '99px', fontSize: '10px', fontWeight: '900', 
              border: `1px solid ${isOverflown ? '#ef4444' : '#10b981'}`, 
              color: isOverflown ? '#ef4444' : '#10b981', 
              display: 'flex', alignItems: 'center', gap: '10px', backdropFilter: 'blur(10px)',
              boxShadow: isOverflown ? '0 0 20px rgba(239, 68, 68, 0.2)' : '0 0 20px rgba(16, 185, 129, 0.1)'
            }}>
              <Eye size={14} /> {isOverflown ? "DÉPASSEMENT DÉTECTÉ" : "FORMAT A4 RESPECTÉ"}
            </span>
          </div>

          <div style={{ transformOrigin: 'top center', transform: 'scale(0.65)', boxShadow: '0 0 100px rgba(0,0,0,0.8)', marginBottom: '40px' }}>
            
            <div 
              ref={componentRef} 
              style={{ 
                width: '210mm', 
                height: '297mm', 
                backgroundColor: 'white', 
                color: 'black',
                position: 'relative',
                overflow: 'hidden',
                outline: isOverflown ? '2px solid red' : 'none'
              }}
            >
              <MainPreview />

              {isOverflown && (
                <div className="no-print" style={{ 
                  position: 'absolute', top: '297mm', left: 0, right: 0, 
                  backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444',
                  fontSize: '20px', fontWeight: '900', textAlign: 'center',
                  padding: '30px', borderTop: '3px dashed red', pointerEvents: 'none'
                }}>
                  Attention : Ce contenu dépasse sur la Page 2
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0e4d15ff; }
        
        input, textarea, select {
          width: 100% !important;
          background-color: #0a0a0a !important;
          border: 1px solid #27272a !important;
          color: white !important;
          padding: 14px !important;
          border-radius: 8px !important;
          margin-top: 6px !important;
        }
        label {
          display: block !important;
          font-size: 10px !important;
          font-weight: 800 !important;
          color: #0a602aff !important;
          text-transform: uppercase !important;
          margin-top: 18px !important;
        }
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}