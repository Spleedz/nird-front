// src/App.jsx
import React, { useState, useEffect } from 'react';
import { RoleProvider } from './contexts/RoleContext';
import { MissionsProvider } from './contexts/MissionsContext';
import RoleSelector from './components/RoleSelector';
import OnboardingOverlay from './components/OnboardingOverlay';
import AppRouter from './router';
import Sesame from './components/sesame';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSesame, setShowSesame] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('nird-onboarding-done');
    
    if (!hasSeenOnboarding && !showSesame) {
      setShowOnboarding(true);
    }
  }, [showSesame]);

  const handleSesameComplete = () => {
    setShowSesame(false);
  };

  if (showSesame) {
    return <Sesame onComplete={handleSesameComplete} />;
  }

  return (
    <RoleProvider>
      <MissionsProvider>
        <div className="w-full h-screen bg-slate-950 overflow-hidden">
          {showOnboarding && (
            <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
          )}
          <RoleSelector />
          <AppRouter />
        </div>
      </MissionsProvider>
    </RoleProvider>
  );
}

export default App;