import { useNavigate } from 'react-router-dom';

/**
 * Drawer latéral affichant les missions disponibles
 */
const MissionDrawer = ({ onClose, onOpenPixelArt, onOpenRetroPage }) => {
  const navigate = useNavigate();

  const handleMissionClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay semi-transparent */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-30"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-80 bg-gradient-to-b from-yellow-50 to-yellow-100 shadow-2xl z-40 overflow-y-auto">
        {/* En-tête */}
        <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">📋 Missions</h2>
          <button
            onClick={onClose}
            className="text-3xl hover:bg-yellow-700 p-1 rounded transition-all"
            aria-label="Fermer le menu"
          >
            ×
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-4">
          {/* Mission: Missions & Équipes */}
          <button
            onClick={() => handleMissionClick('/missions')}
            className="w-full text-left bg-white hover:bg-yellow-50 border-2 border-yellow-400 hover:border-yellow-600 p-4 rounded-lg transition-all transform hover:scale-105 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">📊</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-yellow-700">
                  Missions & Équipes
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Liste des missions et équipes inscrites
                </p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </button>

          {/* Pixel Art Page */}
          <button
            onClick={onOpenPixelArt}
            className="w-full text-left bg-white hover:bg-yellow-50 border-2 border-yellow-400 hover:border-yellow-600 p-4 rounded-lg transition-all transform hover:scale-105 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">🎮</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-yellow-700">
                  Pixel Art RPG
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Mini-jeu RPG rétro
                </p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </button>

          {/* Page Rétro */}
          <button
            onClick={onOpenRetroPage}
            className="w-full text-left bg-white hover:bg-yellow-50 border-2 border-yellow-400 hover:border-yellow-600 p-4 rounded-lg transition-all transform hover:scale-105 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">🕰️</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-yellow-700">
                  Page Rétro
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Version HTML à l'ancienne
                </p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </button>

          {/* Section info */}
          <div className="mt-8 pt-6 border-t border-yellow-300">
            <p className="text-sm text-slate-700 mb-4">
              <strong>Nuit de l'Info 2025</strong>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accédez aux données des missions et équipes participantes pour consulter les statistiques.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionDrawer;
