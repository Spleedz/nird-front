// src/App.jsx
import React, { useState, useEffect } from 'react';
import { RoleProvider } from './contexts/RoleContext';
import VillageMap from './components/VillageMap';
import RoleSelector from './components/RoleSelector';
import OnboardingOverlay from './components/OnboardingOverlay';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('nird-onboarding-done');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <RoleProvider>
      <div className="w-full h-screen bg-slate-950 overflow-hidden">
        {showOnboarding && (
          <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
        )}
        <RoleSelector />
        <VillageMap />
      </div>
    </RoleProvider>
  );
}

export default App;