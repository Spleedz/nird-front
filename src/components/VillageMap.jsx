import { useState } from 'react';
import { placesData } from '../data/placesData';
import { useParallax } from '../hooks/useParallax';
import PlaceMarker from './PlaceMarker';
import PlaceModal from './PlaceModal';
import ResourceLibrary from './ResourceLibrary';
import NirdPillarsHUD from './NirdPillarsHUD';
import OnboardingOverlay from './OnboardingOverlay';
import villageImage from '../assets/village.jpg';

const VillageMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false); 
  const parallaxOffset = useParallax();

  const handlePlaceClick = (place) => {
    if (place.isResourceLibrary) {
      setShowLibrary(true);
    } else {
      setSelectedPlace(place);
    }
  };

  // NOUVEAU : Fonction pour réafficher l'intro
  const handleResetOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('nird-onboarding-done', 'true');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* NOUVEAU : Overlay d'onboarding */}
      {showOnboarding && (
        <OnboardingOverlay onComplete={handleOnboardingComplete} />
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

      {/* NOUVEAU : Bouton pour revoir l'intro */}
      <button
        onClick={handleResetOnboarding}
        className="fixed bottom-4 left-4 z-30 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
        title="Revoir l'introduction"
      >
        <span className="text-xl">ℹ️</span>
        <span className="font-bold">Intro</span>
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
        />
      )}

      {showLibrary && (
        <ResourceLibrary onClose={() => setShowLibrary(false)} />
      )}

      <NirdPillarsHUD />
    </div>
  );
};

export default VillageMap;