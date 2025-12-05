import { useState } from 'react';
import MissionDrawer from './MissionDrawer';

/**
 * Bouton burger en haut à droite
 * Ouvre un drawer latéral avec la liste des missions
 * Accessible au clavier et avec aria-label
 */
const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton burger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le menu des missions"
        className="fixed top-4 right-4 z-40 bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg transition-all transform hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:ring-offset-2"
        title="Menu des missions"
      >
        {/* Icône burger (3 lignes) */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Drawer missions */}
      {isOpen && <MissionDrawer onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default BurgerMenu;
