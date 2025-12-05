import { useState } from 'react';
import { nirdPillarsData } from '../data/nirdPillarsData';
import { useMissions } from '../contexts/MissionsContext';

const NirdPillarsHUD = () => {
  const { indicators } = useMissions();
  const [hoveredPillar, setHoveredPillar] = useState(null);

  // Mapper les indicateurs du contexte missions aux piliers
  const indicatorMap = {
    'inclusion': indicators.inclusion || indicators.reemploi,
    'responsabilite': indicators.responsabilite || indicators.logicielsLibres,
    'durabilite': indicators.durabilite || indicators.sobriete
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-end gap-2 sm:gap-3">
      {nirdPillarsData.map((pillar) => {
        // Utiliser la valeur appropriée de l'indicateur
        const value = indicators[pillar.id === 'inclusion' ? 'reemploi' : 
                                  pillar.id === 'responsabilite' ? 'logicielsLibres' : 
                                  'sobriete'] || 0;
        
        return (
          <div
            key={pillar.id}
            className="relative flex-shrink-0"
            onMouseEnter={() => setHoveredPillar(pillar.id)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            {/* Pill réduit affichant seulement le nom */}
            <div
              className="bg-yellow-100 bg-opacity-90 text-slate-900 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full transition-all cursor-default border-2 whitespace-nowrap"
              style={{ borderColor: pillar.id === 'inclusion' ? '#ca8a04' : pillar.id === 'responsabilite' ? '#d97706' : '#ca8a04' }}
            >
              {pillar.name}
            </div>

            {/* Panneau développé au survol */}
            {hoveredPillar === pillar.id && (
              <div className="absolute -top-40 sm:-top-44 right-0 w-64 sm:w-72 bg-yellow-50 text-slate-900 p-3 sm:p-4 rounded-lg border-2 border-yellow-600 shadow-xl z-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-base sm:text-lg">{pillar.name}</div>
                  <div className="text-xs sm:text-sm text-slate-600">{value}%</div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mb-3">{pillar.description}</p>
                <div className="w-full bg-yellow-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${pillar.color} transition-all`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NirdPillarsHUD;