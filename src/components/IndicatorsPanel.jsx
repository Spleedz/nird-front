import React from 'react';
import { indicatorsConfig } from '../data/missionsData';

/**
 * Panneau affichant tous les indicateurs NIRD
 */
const IndicatorsPanel = ({ indicators }) => {
  return (
    <div className="bg-white border-4 border-yellow-600 rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">📊 État de votre Village Numérique</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(indicators).map(([key, value]) => {
          const config = indicatorsConfig[key];
          if (!config) return null;

          const percentage = (value / config.max) * 100;
          let barColor = 'bg-red-500';
          if (percentage >= 60) barColor = 'bg-yellow-500';
          if (percentage >= 80) barColor = 'bg-green-500';

          return (
            <div key={key} className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900">{config.icon} {config.label}</h4>
                  <p className="text-xs text-slate-600">{config.description}</p>
                </div>
                <span className="text-2xl font-bold text-slate-900">{value}%</span>
              </div>

              {/* Barre de progression */}
              <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Commentaire */}
              <p className="text-xs text-slate-600 mt-2">
                {getIndicatorComment(percentage)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Génère un commentaire basé sur la valeur de l'indicateur
 */
const getIndicatorComment = (percentage) => {
  if (percentage < 30) return '🚨 Critique - Action urgente requise';
  if (percentage < 50) return '⚠️ Faible - Améliorations nécessaires';
  if (percentage < 70) return '📈 Moyen - Bonne progression';
  if (percentage < 90) return '🌟 Très bon - Vous êtes sur la bonne voie';
  return '🏆 Excellent - Village exemplaire !';
};

export default IndicatorsPanel;
