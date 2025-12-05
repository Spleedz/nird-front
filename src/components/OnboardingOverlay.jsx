import { useState } from 'react';

const OnboardingOverlay = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '🏰 Bienvenue au Village Numérique Résistant',
      content: 'Un village scolaire qui refuse la domination des Big Tech. Ensemble, explorons des alternatives libres, durables et inclusives.'
    },
    {
      title: '🗺️ Explorez les bâtiments',
      content: 'Cliquez sur chaque lieu pour découvrir ses dépendances numériques et les solutions NIRD pour s\'en libérer.'
    },
    {
      title: '👤 Choisissez votre rôle',
      content: 'Élève, enseignant, direction... Chaque rôle a ses préoccupations et missions spécifiques.'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('nird-onboarding-done', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('nird-onboarding-done', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 max-w-2xl w-full border-4 border-yellow-600 shadow-2xl shadow-yellow-500/50 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-yellow-800 mb-4">{steps[step].title}</h2>
          <p className="text-xl text-slate-700 leading-relaxed">{steps[step].content}</p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full transition-colors ${
                i === step ? 'bg-yellow-600' : 'bg-yellow-300'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSkip}
            className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            Passer l'intro
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
          >
            {step < steps.length - 1 ? 'Suivant →' : 'C\'est parti ! 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingOverlay;