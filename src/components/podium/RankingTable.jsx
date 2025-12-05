/**
 * Tableau du classement complet
 * Affiche rang, nom équipe, score, lien vers équipe
 * Accessible au clavier et WCAG compliant
 */
const RankingTable = ({ teams }) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        📊 Classement complet
      </h3>

      <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-yellow-200">
        <table className="w-full bg-white">
          {/* En-tête */}
          <thead className="bg-yellow-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Rang</th>
              <th className="px-4 py-3 text-left font-bold">Équipe</th>
              <th className="px-4 py-3 text-left font-bold">Membres</th>
              <th className="px-4 py-3 text-right font-bold">Score</th>
              <th className="px-4 py-3 text-center font-bold">Lien</th>
            </tr>
          </thead>

          {/* Corps du tableau */}
          <tbody className="divide-y divide-yellow-100">
            {teams.map((team, index) => (
              <tr
                key={team.teamId}
                className={`transition-colors ${
                  index < 3
                    ? 'bg-yellow-50 hover:bg-yellow-100 font-semibold'
                    : 'hover:bg-yellow-50'
                }`}
              >
                {/* Rang */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {index === 0 && <span className="text-2xl">🥇</span>}
                    {index === 1 && <span className="text-2xl">🥈</span>}
                    {index === 2 && <span className="text-2xl">🥉</span>}
                    <span className="text-lg font-bold text-slate-900">
                      {team.rank}
                    </span>
                  </div>
                </td>

                {/* Nom équipe */}
                <td className="px-4 py-4">
                  <p className="text-slate-900 font-bold">{team.name}</p>
                </td>

                {/* Nombre de membres */}
                <td className="px-4 py-4">
                  <span className="inline-block bg-yellow-200 text-slate-800 px-3 py-1 rounded-full text-sm">
                    {team.members?.length || 0} membre{team.members?.length !== 1 ? 's' : ''}
                  </span>
                </td>

                {/* Score */}
                <td className="px-4 py-4 text-right">
                  <span
                    className={`text-2xl font-bold ${
                      index === 0
                        ? 'text-yellow-600'
                        : index === 1
                        ? 'text-slate-500'
                        : index === 2
                        ? 'text-orange-500'
                        : 'text-slate-700'
                    }`}
                  >
                    {team.score}
                  </span>
                </td>

                {/* Lien vers équipe */}
                <td className="px-4 py-4 text-center">
                  <a
                    href={team.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-800"
                    aria-label={`Voir la fiche de l'équipe ${team.name}`}
                  >
                    <span>Voir</span>
                    <span>→</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {teams.length === 0 && (
        <div className="text-center py-12 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <p className="text-slate-600 text-lg">Aucune équipe trouvée.</p>
        </div>
      )}
    </div>
  );
};

export default RankingTable;
