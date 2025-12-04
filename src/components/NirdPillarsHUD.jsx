import { useState } from 'react';
import { useRole } from '../contexts/RoleContext';
import { nirdPillarsData } from '../data/nirdPillarsData';

const NirdPillarsHUD = () => {
  const { pillarsProgress } = useRole();
  const [hoveredPillar, setHoveredPillar] = useState(null);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3">
      {nirdPillarsData.map((pillar) => (
        <div
          key={pillar.id}
          className="relative"
          onMouseEnter={() => setHoveredPillar(pillar.id)}
          onMouseLeave={() => setHoveredPillar(null)}
        >
          {/* Pill réduit affichant seulement le nom */}
          <div
            className="bg-yellow-100 bg-opacity-90 text-slate-900 text-sm font-semibold px-3 py-1 rounded-full transition-all cursor-default border-2"
            style={{ borderColor: pillar.id === 'inclusion' ? '#ca8a04' : pillar.id === 'responsabilite' ? '#d97706' : '#ca8a04' }}
          >
            {pillar.name}
          </div>

          {/* Panneau développé au survol */}
          {hoveredPillar === pillar.id && (
            <div className="absolute -top-44 right-0 w-72 bg-yellow-50 text-slate-900 p-4 rounded-lg border-2 border-yellow-600 shadow-xl z-50">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-lg">{pillar.name}</div>
                <div className="text-sm text-slate-600">{pillarsProgress[pillar.id] || 0}%</div>
              </div>
              <p className="text-sm text-slate-700 mb-3">{pillar.description}</p>
              <div className="w-full bg-yellow-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${pillar.color} transition-all`}
                  style={{ width: `${pillarsProgress[pillar.id] || 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NirdPillarsHUD;