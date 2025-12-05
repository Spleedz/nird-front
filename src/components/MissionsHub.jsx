import React, { useState } from 'react';
import { roleSpecificMissions } from '../data/roleSpecificMissions';
import { indicatorsConfig } from '../data/missionsData';
import { useMissions } from '../contexts/MissionsContext';
import { useRole } from '../contexts/RoleContext';
import MissionCard from './MissionCard';
import IndicatorsPanel from './IndicatorsPanel';

const MissionsHub = ({ onBack, isFullPage = false }) => {
  const { completedMissions, indicators, calculateScore } = useMissions();
  const { role } = useRole();
  const [selectedMission, setSelectedMission] = useState(null);
  const [showIndicators, setShowIndicators] = useState(false);

  // Récupérer les missions spécifiques au rôle
  const missions = roleSpecificMissions[role] || [];

  return (
    <div className="w-full h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 overflow-y-auto">
      {/* Bouton de fermeture prominent en haut à gauche */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all transform hover:scale-110 shadow-lg flex items-center gap-2 text-lg"
          title="Retour au village"
        >
          <span>←</span>
          <span>Retour</span>
        </button>
      )}

      <div className="p-4 sm:p-8 pt-20">
        {/* En-tête centrée */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
              🎭 Missions NIRD
            </h1>
            <p className="text-slate-700 text-lg mb-3">
              Guidez votre établissement vers un numérique plus responsable
            </p>
            <div className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold">
              Rôle : {role.charAt(0).toUpperCase() + role.slice(1)}
            </div>
          </div>

          {/* Barre de score globale */}
          <div className="bg-yellow-200 border-4 border-yellow-600 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-slate-900">
              Score global : {calculateScore()}/100 🎯
            </div>
            <button
              onClick={() => setShowIndicators(!showIndicators)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-2 rounded-lg transition-all"
            >
              {showIndicators ? 'Masquer' : 'Afficher'} Indicateurs
            </button>
          </div>

          {/* Panneau des indicateurs */}
          {showIndicators && <IndicatorsPanel indicators={indicators} />}
        </div>

        {/* Grille de missions - CENTRÉE */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
            {missions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => setSelectedMission(mission)}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <MissionCard
                  mission={mission}
                  isCompleted={completedMissions.includes(mission.id)}
                  onClick={() => setSelectedMission(mission)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Modal de mission - CENTRÉE */}
        {selectedMission && (
          <MissionModal
            mission={selectedMission}
            onClose={() => setSelectedMission(null)}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Modal affichant les détails d'une mission
 */
const MissionModal = ({ mission, onClose }) => {
  const { applyChoice } = useMissions();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    setShowResult(true);
  };

  const handleConfirm = () => {
    if (selectedChoice) {
      applyChoice(mission.id, selectedChoice.id, selectedChoice.impacts);
      setTimeout(() => {
        onClose();
        setSelectedChoice(null);
        setShowResult(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 max-w-2xl w-full border-4 border-yellow-600 shadow-2xl animate-fade-in max-h-screen overflow-y-auto">
        {/* En-tête */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{mission.icon}</span>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{mission.title}</h2>
                <p className="text-slate-600 text-sm">{mission.subtitle}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-4xl text-slate-600 hover:text-slate-800 transition-colors flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Description et contexte */}
        <div className="mb-6">
          <p className="text-slate-800 text-lg mb-3 font-semibold">
            {mission.description}
          </p>
          <div className="bg-yellow-200 p-4 rounded-lg border-l-4 border-yellow-600">
            <p className="text-slate-700 text-sm italic">{mission.context}</p>
          </div>
        </div>

        {/* Affichage des choix */}
        {!showResult ? (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🔀 Choisissez votre stratégie</h3>
            <div className="space-y-4">
              {mission.choices.map((choice) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  onSelect={() => handleChoiceSelect(choice)}
                  isSelected={selectedChoice?.id === choice.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <ResultPanel choice={selectedChoice} mission={mission} />
        )}

        {/* Boutons d'action */}
        <div className="flex gap-4 mt-6">
          {showResult && (
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            >
              ✓ Confirmer ce choix
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-all"
          >
            {showResult ? 'Annuler' : 'Fermer'}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Bouton pour sélectionner un choix
 */
const ChoiceButton = ({ choice, onSelect, isSelected }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all transform hover:scale-102 ${
        isSelected
          ? 'border-yellow-600 bg-yellow-300 shadow-lg'
          : 'border-yellow-400 bg-white hover:bg-yellow-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{choice.emoji}</span>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-lg">{choice.label}</h4>
        </div>
        <div className={`text-2xl transition-transform ${isSelected ? 'scale-125' : ''}`}>
          {isSelected ? '✓' : '○'}
        </div>
      </div>
    </button>
  );
};

/**
 * Panneau affichant les détails et impacts d'un choix
 */
const ResultPanel = ({ choice, mission }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-bold text-slate-900 mb-2">✓ Avantages</h4>
        <ul className="space-y-1">
          {choice.advantages.map((adv, idx) => (
            <li key={idx} className="text-slate-700 flex items-center gap-2">
              <span className="text-green-600">+</span> {adv}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 mb-2">✖ Inconvénients</h4>
        <ul className="space-y-1">
          {choice.disadvantages.map((dis, idx) => (
            <li key={idx} className="text-slate-700 flex items-center gap-2">
              <span className="text-red-600">-</span> {dis}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-200 p-4 rounded-lg">
        <h4 className="font-bold text-slate-900 mb-3">📊 Impact sur les indicateurs</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(choice.impacts).map(([key, value]) => {
            const config = indicatorsConfig[key];
            if (!config) return null;
            return (
              <div key={key} className="text-sm">
                <span className="text-slate-700">
                  {config.icon} {config.label}
                </span>
                <div className={`font-bold ${value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-slate-600'}`}>
                  {value > 0 ? '+' : ''}{value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {choice.conclusion && (
        <div className="border-l-4 border-yellow-600 pl-4 italic text-slate-700">
          💭 "{choice.conclusion}"
        </div>
      )}
    </div>
  );
};

export default MissionsHub;
