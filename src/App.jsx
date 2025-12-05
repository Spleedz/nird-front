// src/App.jsx
import React, { useState, useEffect } from 'react';
import { RoleProvider } from './contexts/RoleContext';
import { MissionsProvider } from './contexts/MissionsContext';
import RoleSelector from './components/RoleSelector';
import OnboardingOverlay from './components/OnboardingOverlay';
import AppRouter from './router';

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