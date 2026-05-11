"use client";
import { useState, useEffect } from "react";
import { useResumeStore } from "../../stores/useResumeStore";

export default function SoftSkillsEditor() {
  const { data, updateField } = useResumeStore();

  // On transforme les objets [{nom, niveau}] en texte "Nom (Niveau)" pour l'affichage initial
  const getInitialLangString = () => {
    return data.langues
      .map((l: any) => (typeof l === "object" ? `${l.nom}${l.niveau ? ` (${l.niveau})` : ""}` : l))
      .join(", ");
  };

  const [langTxt, setLangTxt] = useState(getInitialLangString());
  const [softTxt, setSoftTxt] = useState(data.softSkills.join(", "));
  const [intTxt, setIntTxt] = useState(data.interets.join(", "));

  const handleChange = (field: "langues" | "softSkills" | "interets", value: string) => {
    if (field === "softSkills") {
      setSoftTxt(value);
      updateField(field, value.split(",").map((s) => s.trim()).filter(s => s !== ""));
    } else if (field === "interets") {
      setIntTxt(value);
      updateField(field, value.split(",").map((s) => s.trim()).filter(s => s !== ""));
    } else if (field === "langues") {
      setLangTxt(value);
      
      // LOGIQUE MAGIQUE : On transforme "Français (Courant)" en objet {nom: "Français", niveau: "Courant"}
      const langArray = value.split(",").map((item) => {
        const trimmed = item.trim();
        const match = trimmed.match(/^([^(]+)(?:\(([^)]+)\))?$/);
        
        if (match) {
          return {
            nom: match[1].trim(),
            niveau: match[2] ? match[2].trim() : ""
          };
        }
        return { nom: trimmed, niveau: "" };
      }).filter(l => l.nom !== "");

      updateField("langues", langArray);
    }
  };

  return (
    <div className="space-y-6 bg-slate-800/30 p-4 rounded-xl border border-slate-700">
      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase mb-1 block">Langues</label>
        <p className="text-[9px] text-slate-500 mb-2 italic">Format : Langue (Niveau), Langue (Niveau)...</p>
        <input 
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-white outline-none focus:border-blue-500"
          value={langTxt}
          placeholder="Français (Maternel), Anglais (B2)..."
          onChange={(e) => handleChange("langues", e.target.value)}
        />
      </div>

      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase mb-2 block">Soft Skills</label>
        <textarea 
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-white outline-none min-h-[80px] focus:border-blue-500"
          value={softTxt}
          onChange={(e) => handleChange("softSkills", e.target.value)}
        />
      </div>

      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase mb-2 block">Centres d'intérêt</label>
        <input 
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-white outline-none focus:border-blue-500"
          value={intTxt}
          onChange={(e) => handleChange("interets", e.target.value)}
        />
      </div>
    </div>
  );
}