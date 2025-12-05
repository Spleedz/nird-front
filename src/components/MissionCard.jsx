import React from 'react';

/**
 * Carte représentant une mission
 */
const MissionCard = ({ mission, isCompleted, onClick }) => {
  const difficulty = {
    easy: { color: 'green', label: 'Facile' },
    medium: { color: 'yellow', label: 'Moyen' },
    hard: { color: 'red', label: 'Difficile' }
  }[mission.difficulty];

  return (
    <div
      onClick={onClick}
      className={`relative p-6 rounded-xl border-4 transition-all transform hover:scale-105 cursor-pointer bg-gradient-to-br ${
        isCompleted
          ? 'from-green-100 to-green-200 border-green-600'
          : 'from-white to-yellow-50 border-yellow-600'
      } shadow-lg hover:shadow-xl`}
    >
      {/* Badge de complétion */}
      {isCompleted && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          ✓ Complétée
        </div>
      )}

      {/* Badge de difficulté */}
      <div className={`absolute top-4 left-4 bg-${difficulty.color}-600 text-white px-3 py-1 rounded-full text-xs font-bold`}>
        {difficulty.label}
      </div>

      {/* Contenu */}
      <div className="mt-8">
        <div className="flex items-start gap-4 mb-3">
          <span className="text-5xl">{mission.icon}</span>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900">{mission.title}</h3>
            <p className="text-slate-600 font-semibold text-sm">{mission.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-700 text-sm mb-4">{mission.description}</p>

        <div className="text-xs text-slate-600 flex items-center gap-1">
          <span>📍</span>
          <span>{mission.location}</span>
        </div>
      </div>

      {/* Indicator de progression */}
      <div className="mt-4 pt-4 border-t-2 border-yellow-300">
        <span className="text-sm font-semibold text-slate-700">
          {isCompleted ? '✓ Mission accomplie' : 'Cliquez pour commencer'}
        </span>
      </div>
    </div>
  );
};

export default MissionCard;
