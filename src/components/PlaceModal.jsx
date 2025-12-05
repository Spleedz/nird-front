import { useRole } from '../contexts/RoleContext';
import { nirdPillarsData } from '../data/nirdPillarsData';

const PlaceModal = ({ place, onClose, onLaunchMissions }) => {
  const { role } = useRole();

  const isRelevantForRole = !place.rolesCibles || place.rolesCibles.includes(role);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 max-w-2xl w-full border-4 border-yellow-600 shadow-2xl animate-fade-in max-h-screen overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{place.emoji}</span>
              <h2 className="text-3xl font-bold text-yellow-800">{place.name}</h2>
            </div>
            {isRelevantForRole && (
              <p className="text-green-600 text-sm font-semibold">✓ Pertinent pour votre rôle</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-4xl text-slate-600 hover:text-slate-800 transition-colors flex-shrink-0"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-600 mb-3">⚠️ Problème actuel</h3>
          <p className="text-slate-800 bg-yellow-200 p-4 rounded-lg">{place.descriptionProbleme}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-3">💡 Pistes NIRD</h3>
          <div className="space-y-3">
            {place.pistesNIRD.map((piste, idx) => {
              const pillar = nirdPillarsData.find(p => p.id === piste.pillar);
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-yellow-200 p-4 rounded-lg border-l-4"
                  style={{ borderColor: pillar?.id === 'inclusion' ? '#ca8a04' : pillar?.id === 'responsabilite' ? '#d97706' : '#ca8a04' }}
                >
                  <span className="text-2xl">{pillar?.icon}</span>
                  <div>
                    <div className="font-bold text-slate-800 text-sm mb-1">{pillar?.name}</div>
                    <p className="text-slate-700">{piste.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            onClick={onLaunchMissions}
          >
            🎯 Lancer une mission
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-slate-800 font-bold rounded-lg transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;