<<<<<<< HEAD
<<<<<<< HEAD
// src/App.jsx
import React, { useState, useEffect } from 'react';
import { RoleProvider } from './contexts/RoleContext';
import { MissionsProvider } from './contexts/MissionsContext';
import RoleSelector from './components/RoleSelector';
import OnboardingOverlay from './components/OnboardingOverlay';
import AppRouter from './router';
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sesame from "./components/Sesame"
import './App.css'
>>>>>>> origin/feature/Sesame

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('nird-onboarding-done');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  return (
<<<<<<< HEAD
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
=======
// App.jsx
import React from 'react';
import "./App.css";
import PixelArtPage from "./PixelArtPage";

function App() {
  return <PixelArtPage />;
>>>>>>> origin/PixelART
=======
    <>
      <Sesame />
    </> 
  )
>>>>>>> origin/feature/Sesame
}

export default App;