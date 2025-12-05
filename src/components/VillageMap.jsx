import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placesData } from '../data/placesData';
import { useParallax } from '../hooks/useParallax';
import { useRole } from '../contexts/RoleContext';
import { useMissions } from '../contexts/MissionsContext';
import PlaceMarker from './PlaceMarker';
import PlaceModal from './PlaceModal';
import ResourceLibrary from './ResourceLibrary';
import NirdPillarsHUD from './NirdPillarsHUD';
import OnboardingOverlay from './OnboardingOverlay';
import MissionsHub from './MissionsHub';
import BurgerMenu from './layout/BurgerMenu';
import villageImage from '../assets/village.jpg';

const VillageMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { role, setRole } = useRole();
  const { resetMissions } = useMissions();
  const parallaxOffset = useParallax();

  const roles = [
    { id: 'eleve', name: 'Élève', emoji: '🎓', description: 'Utilisateur quotidien des outils numériques' },
    { id: 'enseignant', name: 'Enseignant', emoji: '👨‍🏫', description: 'Créateur de contenus pédagogiques' },
    { id: 'direction', name: 'Direction', emoji: '👔', description: 'Décideur et gestionnaire' },
    { id: 'technicien', name: 'Technicien', emoji: '🔧', description: 'Mainteneur de l\'infrastructure' },
    { id: 'parent', name: 'Parent', emoji: '👨‍👩‍👧', description: 'Usager des services scolaires' },
    { id: 'collectivite', name: 'Collectivité', emoji: '🏛️', description: 'Financeur et décideur territorial' }
  ];

  const currentRoleName = roles.find(r => r.id === role)?.name || 'Rôle';

  const handlePlaceClick = (place) => {
    if (place.isResourceLibrary) {
      setShowLibrary(true);
    } else {
      setSelectedPlace(place);
    }
  };

  // Fonction pour réafficher l'intro
  const handleResetOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('nird-onboarding-done', 'true');
  };

  const handleConfirmReset = () => {
    resetMissions();
    setShowResetConfirm(false);
  };

  // Si les missions sont affichées, les montrer en plein écran
  if (showMissions) {
    return (
      <MissionsHub
        onBack={() => {
          setShowMissions(false);
          setSelectedPlace(null);
        }}
        isFullPage={true}
      />
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Overlay d'onboarding */}
      {showOnboarding && (
        <OnboardingOverlay onComplete={handleOnboardingComplete} />
      )}

      {/* Modal de sélection de rôle */}
      {showRoleSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 max-w-4xl w-full border-4 border-yellow-600 shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-yellow-800 mb-6">
              🎭 Choisissez votre rôle
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setShowRoleSelector(false);
                  }}
                  className={`p-6 rounded-xl transition-all transform hover:scale-105 border-2 ${
                    role === r.id
                      ? 'bg-yellow-600 text-white border-yellow-800 shadow-lg'
                      : 'bg-white hover:bg-yellow-50 border-yellow-400 text-slate-900'
                  }`}
                >
                  <div className="text-5xl mb-3">{r.emoji}</div>
                  <div className="text-lg font-bold mb-2">{r.name}</div>
                  <div className="text-sm">{r.description}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowRoleSelector(false)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-3 rounded-lg transition-all"
            >
              Confirmer
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmation de réinitialisation */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 max-w-md w-full border-4 border-red-600 shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-red-800 mb-4">
              ⚠️ Réinitialiser le jeu ?
            </h2>
            <p className="text-center text-slate-700 text-lg mb-8">
              Cela va réinitialiser <strong>toutes les missions</strong> et <strong>tous les indicateurs</strong>. Êtes-vous sûr ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmReset}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-3 rounded-lg transition-all transform hover:scale-105"
              >
                🔄 Réinitialiser
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-3 rounded-lg transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fond avec image du village */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${villageImage})`,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Bannière d'introduction */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-yellow-100 bg-opacity-90 px-6 py-2 rounded-2xl border-2 border-yellow-600 shadow-lg">
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-1">
            🏘️ Village Numérique Résistant
          </h1>
          <p className="text-center text-slate-700 text-sm">
            Cliquez sur les bâtiments pour découvrir comment résister aux Big Tech
          </p>
        </div>
      </div>

      {/* Bouton pour revoir l'intro */}
      <button
        onClick={handleResetOnboarding}
        className="fixed bottom-4 left-4 z-30 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
        title="Revoir l'introduction"
      >
        <span className="text-xl">ℹ️</span>
        <span className="font-bold">Intro</span>
      </button>

      {/* Bouton pour changer de rôle */}
      <button
        onClick={() => setShowRoleSelector(true)}
        className="fixed top-4 left-4 z-30 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
        title="Changer de rôle"
      >
        <span className="text-xl">🎭</span>
        <span className="font-bold">{currentRoleName}</span>
      </button>

      {/* Bouton pour réinitialiser */}
      <button
        onClick={() => setShowResetConfirm(true)}
        className="fixed top-20 left-4 z-30 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg transition-all transform hover:scale-110 shadow-lg text-lg"
        title="Réinitialiser toutes les missions"
      >
        🔄
      </button>

      {/* Lieux du village */}
      <div className="absolute inset-0">
        {placesData.map((place) => (
          <PlaceMarker
            key={place.id}
            place={place}
            onClick={() => handlePlaceClick(place)}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onLaunchMissions={() => setShowMissions(true)}
        />
      )}

      {showLibrary && (
        <ResourceLibrary onClose={() => setShowLibrary(false)} />
      )}

      <NirdPillarsHUD />

      {/* NOUVEAU: Burger menu pour accéder aux missions */}
      <BurgerMenu />
    </div>
  );
};

export default VillageMap;