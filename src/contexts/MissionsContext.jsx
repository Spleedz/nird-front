import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialIndicators } from '../data/missionsData';
import { roleImpactMultipliers } from '../data/roleSpecificMissions';
import { useRole } from './RoleContext';

const MissionsContext = createContext();

export const MissionsProvider = ({ children }) => {
  const { role } = useRole();
  const [indicators, setIndicators] = useState(initialIndicators);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);
  const [history, setHistory] = useState([]); // Historique des choix

  // Charger les données depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nird-missions-data');
    if (saved) {
      const data = JSON.parse(saved);
      setIndicators(data.indicators);
      setCompletedMissions(data.completedMissions);
      setHistory(data.history);
    }
  }, []);

  // Sauvegarder les données
  const saveData = (newIndicators, newCompleted, newHistory) => {
    const data = {
      indicators: newIndicators,
      completedMissions: newCompleted,
      history: newHistory
    };
    localStorage.setItem('nird-missions-data', JSON.stringify(data));
  };

  // Appliquer les multiplicateurs selon le rôle
  const applyRoleMultipliers = (impacts) => {
    if (!role || !roleImpactMultipliers[role]) {
      return impacts;
    }

    const multipliers = roleImpactMultipliers[role];
    const multipliedImpacts = {};

    Object.keys(impacts).forEach(key => {
      const multiplier = multipliers[key] || 1;
      multipliedImpacts[key] = Math.round(impacts[key] * multiplier);
    });

    return multipliedImpacts;
  };

  // Appliquer les impacts d'un choix
  const applyChoice = (missionId, choiceId, impacts) => {
    // Appliquer les multiplicateurs du rôle
    const appliedImpacts = applyRoleMultipliers(impacts);
    
    const newIndicators = { ...indicators };
    
    // Appliquer les impacts
    Object.keys(appliedImpacts).forEach(key => {
      if (newIndicators.hasOwnProperty(key)) {
        // Clamper les valeurs entre 0 et 100
        newIndicators[key] = Math.max(0, Math.min(100, newIndicators[key] + appliedImpacts[key]));
      }
    });

    // Enregistrer la mission comme complétée
    const newCompleted = [...completedMissions];
    if (!newCompleted.includes(missionId)) {
      newCompleted.push(missionId);
    }

    // Ajouter à l'historique
    const newHistory = [...history, {
      missionId,
      choiceId,
      impacts: appliedImpacts,
      role,
      timestamp: new Date().toISOString()
    }];

    setIndicators(newIndicators);
    setCompletedMissions(newCompleted);
    setHistory(newHistory);
    saveData(newIndicators, newCompleted, newHistory);

    return newIndicators;
  };

  // Réinitialiser le jeu
  const resetMissions = () => {
    const reset = { ...initialIndicators };
    setIndicators(reset);
    setCompletedMissions([]);
    setHistory([]);
    localStorage.removeItem('nird-missions-data');
  };

  // Calculer le score global
  const calculateScore = () => {
    const total = Object.values(indicators).reduce((a, b) => a + b, 0);
    return Math.round(total / Object.keys(indicators).length);
  };

  return (
    <MissionsContext.Provider
      value={{
        indicators,
        completedMissions,
        currentMission,
        setCurrentMission,
        applyChoice,
        resetMissions,
        calculateScore,
        history,
        role
      }}
    >
      {children}
    </MissionsContext.Provider>
  );
};

export const useMissions = () => {
  const context = useContext(MissionsContext);
  if (!context) {
    throw new Error('useMissions must be used within MissionsProvider');
  }
  return context;
};
