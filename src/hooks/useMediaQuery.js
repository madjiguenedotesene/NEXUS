import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour détecter les changements de taille d'écran.
 * @param {string} query - La media query à tester (ex: '(max-width: 900px)')
 * @returns {boolean} - True si la condition est remplie, sinon False.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Mise à jour initiale de l'état
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Fonction de rappel pour les changements futurs
    const listener = () => setMatches(media.matches);

    // Écouter les redimensionnements de la fenêtre
    window.addEventListener('resize', listener);

    // Nettoyage de l'écouteur lors du démontage du composant
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}