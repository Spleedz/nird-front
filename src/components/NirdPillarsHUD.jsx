import { useState } from 'react';
import { useRole } from '../contexts/RoleContext';
import { nirdPillarsData } from '../data/nirdPillarsData';

const NirdPillarsHUD = () => {
  const { pillarsProgress } = useRole();
  const [hoveredPillar, setHoveredPillar] = useState(null);

  return (
    <div className="fixed top-4 right-4 z-30 space-y-3">
      {nirdPillarsData.map((pillar) => (
        <div
          key={pillar.id}
          className="relative"
          onMouseEnter={() => setHoveredPillar(pillar.id)}
          onMouseLeave={() => setHoveredPillar(null)}
        >
          <div className="bg-slate-900 bg-opacity-90 rounded-lg p-4 w-64 border-2 border-opacity-50 transition-all hover:scale-105"
               style={{ borderColor: pillar.id === 'inclusion' ? '#a855f7' : pillar.id === 'responsabilite' ? '#f97316' : '#14b8a6' }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{pillar.icon}</span>
              <span className="font-bold text-white">{pillar.name}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${pillar.color} transition-all duration-500`}
                style={{ width: `${pillarsProgress[pillar.id] || 0}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-400 mt-1">
              {pillarsProgress[pillar.id] || 0}%
            </div>
          </div>

          {hoveredPillar === pillar.id && (
            <div className="absolute right-full mr-2 top-0 w-72 bg-slate-800 text-white p-4 rounded-lg border-2 border-purple-500 shadow-xl z-40">
              <p className="text-sm leading-relaxed">{pillar.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NirdPillarsHUD;