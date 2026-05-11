"use client";
import React from 'react';
import { useResumeStore } from "../../stores/useResumeStore";



export default function InfoEditor() {
  const { data, updateField } = useResumeStore();

  // AJOUT DE LA FONCTION ICI
  // Remplace ta fonction par celle-ci
  const formatFirstName = (val: string) => {
    if (!val) return "";
  // On nettoie les espaces et on force le format : Xxxxx
      const clean = val.trim();
    return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateField('photo', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const updateReseau = (index: number, val: string) => {
    const next = [...data.reseaux];
    next[index].url = val;
    updateField('reseaux', next);
  };

  const addReseau = () => {
    updateField('reseaux', [...data.reseaux, { nom: "", url: "" }]);
  };

  return (
    <div className="space-y-4 bg-slate-800/30 p-4 rounded-xl border border-slate-700">
      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase block mb-2">Photo de profil</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handlePhotoUpload} 
          className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white cursor-pointer" 
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input 
          placeholder="Prénom" 
          className="bg-slate-900 border border-slate-700 p-2 rounded text-sm outline-none focus:border-blue-500" 
          value={data.prenom} 
          onChange={(e) => updateField('prenom', formatFirstName(e.target.value))} 
        />
        <input 
          placeholder="Nom" 
          className="bg-slate-900 border border-slate-700 p-2 rounded text-sm outline-none focus:border-blue-500" 
          value={data.nom} 
          onChange={(e) => updateField('nom', e.target.value.toUpperCase())} 
        />
      </div>

      <input 
        placeholder="Titre (ex: DATA ENGINEER)" 
        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm font-bold text-blue-400 outline-none focus:border-blue-500" 
        value={data.titreJob} 
        onChange={(e) => updateField('titreJob', e.target.value)} 
      />

      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Âge" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.age} onChange={(e) => updateField('age', e.target.value)} />
        <input placeholder="Ville" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.ville} onChange={(e) => updateField('ville', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Téléphone" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.telephone} onChange={(e) => updateField('telephone', e.target.value)} />
        <input placeholder="Email" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.email} onChange={(e) => updateField('email', e.target.value)} />
      </div>

      <div className="space-y-4">
  <label className="text-[10px] text-blue-400 font-black uppercase block">Liens & Réseaux Sociaux</label>
  
  {data.reseaux.map((res, i) => (
    <div key={i} className="flex gap-2 items-center bg-slate-900/50 p-2 rounded border border-slate-800">
      {/* INPUT POUR LE NOM (ex: GitHub) */}
      <input 
        placeholder="Nom (ex: GitHub)" 
        className="w-1/3 bg-slate-900 border border-slate-700 p-2 rounded text-[10px] font-bold text-blue-300 outline-none focus:border-blue-500" 
        value={res.nom || ""} 
        onChange={(e) => {
          const next = [...data.reseaux];
          next[i].nom = e.target.value;
          updateField('reseaux', next);
        }} 
      />

      {/* INPUT POUR L'URL */}
      <input 
        placeholder="URL (ex: github.com/user)" 
        className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded text-[10px] outline-none focus:border-blue-500 text-slate-300" 
        value={res.url} 
        onChange={(e) => {
          const next = [...data.reseaux];
          next[i].url = e.target.value;
          updateField('reseaux', next);
        }} 
      />

      {/* BOUTON SUPPRIMER */}
      <button 
        onClick={() => {
          const next = data.reseaux.filter((_, index) => index !== i);
          updateField('reseaux', next);
        }}
        className="p-2 text-slate-500 hover:text-red-500 transition-colors"
        title="Supprimer ce lien"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
    </div>
  ))}

  <button 
    onClick={() => updateField('reseaux', [...data.reseaux, { nom: "", url: "" }])} 
    className="w-full py-2 border border-dashed border-slate-700 text-[10px] text-slate-500 font-bold hover:text-blue-400 hover:border-blue-400 uppercase transition-all"
  >
    + Ajouter un lien (GitHub, LinkedIn...)
  </button>
</div>

      <textarea placeholder="Profil Professionnel" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm h-24 outline-none focus:border-blue-500" value={data.bio} onChange={(e) => updateField('bio', e.target.value)} />
    </div>
  );
}