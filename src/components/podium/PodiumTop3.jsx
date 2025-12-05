/**
 * Affiche le podium avec le TOP 3 des équipes
 * Design stylé avec positions 1, 2, 3
 * 1ère place au centre (plus grande)
 * 2e et 3e autour
 */
const PodiumTop3 = ({ teams }) => {
  const top3 = teams.slice(0, 3);

  // Assurer qu'on a toujours 3 places (même vides)
  const podium = [
    top3[0] || null, // 1ère place
    top3[1] || null, // 2e place
    top3[2] || null  // 3e place
  ];

  // Médailles
  const medals = ['🥇', '🥈', '🥉'];
  const positions = ['1ère place', '2e place', '3e place'];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
        🏆 Podium du Défi Entreprise
      </h2>

      <div className="flex items-end justify-center gap-8 px-4 mb-8">
        {/* 2e place (gauche) */}
        <div className="flex flex-col items-center">
          {podium[1] ? (
            <>
              <div className="w-24 h-32 bg-gradient-to-b from-slate-300 to-slate-400 rounded-lg border-4 border-slate-400 flex flex-col items-center justify-center p-2 shadow-lg">
                <span className="text-4xl mb-2">{medals[1]}</span>
                <div className="text-2xl font-bold text-white">2</div>
              </div>
              <div className="mt-4 text-center max-w-32">
                <p className="font-bold text-lg text-slate-900 truncate">
                  {podium[1].name}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {podium[1].score}
                </p>
                <p className="text-xs text-slate-600 mt-1">points</p>
              </div>
            </>
          ) : (
            <div className="w-24 h-32 bg-slate-100 border-4 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
              <span className="text-slate-400 text-center text-sm">À remplir</span>
            </div>
          )}
        </div>

        {/* 1ère place (centre, plus grande) */}
        <div className="flex flex-col items-center -mt-8">
          {podium[0] ? (
            <>
              <div className="w-32 h-48 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg border-4 border-yellow-500 flex flex-col items-center justify-center p-2 shadow-2xl">
                <span className="text-6xl mb-2">{medals[0]}</span>
                <div className="text-4xl font-bold text-white">1</div>
              </div>
              <div className="mt-6 text-center max-w-40">
                <p className="font-bold text-xl text-slate-900 truncate">
                  {podium[0].name}
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {podium[0].score}
                </p>
                <p className="text-sm text-slate-600 mt-1">points</p>
              </div>
            </>
          ) : (
            <div className="w-32 h-48 bg-yellow-100 border-4 border-dashed border-yellow-300 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-center text-sm font-semibold">
                En attente
              </span>
            </div>
          )}
        </div>

        {/* 3e place (droite) */}
        <div className="flex flex-col items-center">
          {podium[2] ? (
            <>
              <div className="w-24 h-28 bg-gradient-to-b from-orange-300 to-orange-400 rounded-lg border-4 border-orange-500 flex flex-col items-center justify-center p-2 shadow-lg">
                <span className="text-4xl mb-2">{medals[2]}</span>
                <div className="text-2xl font-bold text-white">3</div>
              </div>
              <div className="mt-4 text-center max-w-32">
                <p className="font-bold text-lg text-slate-900 truncate">
                  {podium[2].name}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {podium[2].score}
                </p>
                <p className="text-xs text-slate-600 mt-1">points</p>
              </div>
            </>
          ) : (
            <div className="w-24 h-28 bg-orange-50 border-4 border-dashed border-orange-300 rounded-lg flex items-center justify-center">
              <span className="text-orange-400 text-center text-sm">À remplir</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodiumTop3;
