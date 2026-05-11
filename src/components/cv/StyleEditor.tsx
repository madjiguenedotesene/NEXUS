"use client";
import { useResumeStore } from "../../stores/useResumeStore";

export default function StyleEditor() {
  const { data, updateField } = useResumeStore();

  // Mise à jour simplifiée des réglages (settings)
  const updateSettings = (newSettings: Partial<typeof data.settings>) => {
    updateField('settings', { ...data.settings, ...newSettings });
  };

  return (
    <div className="space-y-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
      
      {/* --- SECTION 1 : TYPOGRAPHIE --- */}
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-blue-400 uppercase block mb-2 tracking-widest">
            Style de Police
          </label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white outline-none focus:border-blue-500"
            value={data.settings.fontFamily}
            onChange={(e) => updateSettings({ fontFamily: e.target.value })}
          >
            <option value="serif">Classique</option>
            <option value="sans-serif">Moderne</option>
            <option value="monospace">Technique</option>
            <option value="'Inter', sans-serif">Professionnel</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Taille du texte ({data.settings.fontSize}pt)
            </label>
          </div>
          <input 
            type="range" 
            min="7" 
            max="12" 
            step="0.5"
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            value={data.settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      <hr className="border-slate-700" />

      {/* --- SECTION 2 : COULEURS --- */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Couleur \section</label>
          <input 
            type="color" 
            value={data.colorPrimary} 
            onChange={(e) => updateField('colorPrimary', e.target.value)} 
            className="w-full h-8 rounded bg-slate-900 border border-slate-700 cursor-pointer" 
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Couleur Accents</label>
          <input 
            type="color" 
            value={data.colorAccent} 
            onChange={(e) => updateField('colorAccent', e.target.value)} 
            className="w-full h-8 rounded bg-slate-900 border border-slate-700 cursor-pointer" 
          />
        </div>
      </div>

      <hr className="border-slate-700" />

      {/* --- SECTION 3 : ÉLÉMENTS GRAPHIQUES --- */}
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 tracking-widest">
            Style de Puce
          </label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white outline-none focus:border-blue-500"
            value={data.settings.bulletType}
            onChange={(e) => updateSettings({ bulletType: e.target.value })}
          >
            <option value="•">• Point</option>
            <option value="■">■ Carré</option>
            <option value="➤">➤ Flèche</option>
            <option value="◆">◆ Losange</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 tracking-widest">
            Design des Lignes
          </label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white outline-none focus:border-blue-500"
            value={data.settings.lineStyle}
            onChange={(e) => updateSettings({ lineStyle: e.target.value as any })}
          >
            <option value="solid">Ligne continue</option>
            <option value="thick">Ligne épaisse</option>
            <option value="double">Double ligne</option>
            <option value="gradient">Dégradé</option>
            <option value="none">Aucune</option>
          </select>
        </div>
      </div>

      <hr className="border-slate-700" />

      {/* --- SECTION 4 : BORDURE DE PAGE (LA PARTIE QUI CAUSAIT L'ERREUR) --- */}
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-blue-400 uppercase block mb-2 tracking-widest">
            Bordure de Page
          </label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white outline-none focus:border-blue-500"
            value={data.settings.pageBorder || "none"}
            onChange={(e) => updateSettings({ pageBorder: e.target.value })}
          >
            <option value="none">Aucune bordure</option>
            <option value="full-thin">Cadre Classique (Fin)</option>
            <option value="full-thick">Cadre Moderne (Épais)</option>
            <option value="double">Cadre Exécutif (Double)</option>
            <option value="minimal-sides">Côtés uniquement</option>
            <option value="accent-top">Haut & Bas uniquement</option>
          </select>
        </div>
      </div>

    </div> // Fin du conteneur principal
  );
}