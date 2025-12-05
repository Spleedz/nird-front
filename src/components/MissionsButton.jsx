import React from 'react';
import MissionsHub from './MissionsHub';

/**
 * Bouton pour accéder au système de missions
 * À intégrer dans la VillageMap
 */
const MissionsButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-16 right-4 z-30 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
      title="Accéder aux missions"
    >
      <span className="text-2xl">🎭</span>
      <span>Missions</span>
    </button>
  );
};

export default MissionsButton;
