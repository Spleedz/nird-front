import { useRole } from '../contexts/RoleContext';
import { nirdPillarsData } from '../data/nirdPillarsData';

const PlaceModal = ({ place, onClose }) => {
  const { role } = useRole();

  const isRelevantForRole = !place.rolesCibles || place.rolesCibles.includes(role);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-3xl w-full border-4 border-purple-500 shadow-2xl animate-fade-in">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{place.emoji}</span>
              <h2 className="text-3xl font-bold text-purple-300">{place.name}</h2>
            </div>
            {isRelevantForRole && (
              <p className="text-green-400 text-sm">✓ Pertinent pour votre rôle</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-4xl text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-400 mb-3">⚠️ Problème actuel</h3>
          <p className="text-gray-200 bg-slate-700 p-4 rounded-lg">{place.descriptionProbleme}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-teal-400 mb-3">💡 Pistes NIRD</h3>
          <div className="space-y-3">
            {place.pistesNIRD.map((piste, idx) => {
              const pillar = nirdPillarsData.find(p => p.id === piste.pillar);
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-slate-700 p-4 rounded-lg border-l-4"
                  style={{ borderColor: pillar?.id === 'inclusion' ? '#a855f7' : pillar?.id === 'responsabilite' ? '#f97316' : '#14b8a6' }}
                >
                  <span className="text-2xl">{pillar?.icon}</span>
                  <div>
                    <div className="font-bold text-purple-300 text-sm mb-1">{pillar?.name}</div>
                    <p className="text-gray-200">{piste.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            onClick={() => alert('Mission à venir ! 🚀')}
          >
            🎯 Lancer une mission
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;