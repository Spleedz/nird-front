import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MissionsStats = () => {
  const [view, setView] = useState('missions'); // 'missions' | 'teams'
  const [missions, setMissions] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [missionTeams, setMissionTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMissions();
    fetchAllTeams();
  }, []);

  const fetchMissions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/podium/missions');
      const data = await response.json();
      setMissions(data.missions || []);
      if (data.missions && data.missions.length > 0) {
        handleMissionSelect(data.missions[0].id);
      }
    } catch (err) {
      setError('Erreur chargement missions: ' + err.message);
    }
  };

  const fetchAllTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/podium/teams');
      const data = await response.json();
      setAllTeams(data.teams || []);
    } catch (err) {
      console.error('Erreur chargement équipes:', err);
    }
  };

  const handleMissionSelect = async (missionId) => {
    setLoading(true);
    setSelectedMission(missionId);
    setSelectedTeam(null);
    try {
      const response = await fetch(`http://localhost:3000/api/podium/mission/${missionId}/teams`);
      const data = await response.json();
      setMissionTeams(data.teams || []);
    } catch (err) {
      setError('Erreur chargement équipes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const filteredTeams = allTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMissionNames = (missionIds) => {
    return missionIds
      .map(id => missions.find(m => m.id === id)?.title || `Mission #${id}`)
      .join(', ');
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 shadow-lg flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span>📊</span> Missions & Équipes
        </h1>
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          ← Retour
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 border-b border-yellow-500 flex">
        <button
          onClick={() => setView('missions')}
          className={`px-6 py-3 font-semibold transition ${
            view === 'missions'
              ? 'bg-yellow-500 text-black'
              : 'text-yellow-200 hover:bg-slate-700'
          }`}
        >
          🎯 Missions ({missions.length})
        </button>
        <button
          onClick={() => setView('teams')}
          className={`px-6 py-3 font-semibold transition ${
            view === 'teams'
              ? 'bg-yellow-500 text-black'
              : 'text-yellow-200 hover:bg-slate-700'
          }`}
        >
          👥 Équipes ({allTeams.length})
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 m-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {view === 'missions' ? (
          <>
            {/* Missions Sidebar */}
            <div className="w-1/4 bg-slate-800 overflow-y-auto border-r border-yellow-500">
              <div className="p-4">
                <h2 className="text-lg font-bold text-yellow-300 mb-4">
                  Missions ({missions.length})
                </h2>
                <div className="space-y-2">
                  {missions.map((mission) => (
                    <button
                      key={mission.id}
                      onClick={() => handleMissionSelect(mission.id)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedMission === mission.id
                          ? 'bg-yellow-500 text-black font-bold'
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-sm">{mission.title}</div>
                      <div className="text-xs opacity-75 mt-1">
                        {mission.teamCount} équipes · ID: {mission.id}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission Teams */}
            <div className="flex-1 overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-white">Chargement...</p>
                  </div>
                </div>
              )}

              {!loading && missionTeams.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-white text-xl">Aucune équipe pour cette mission</p>
                  </div>
                </div>
              )}

              {!loading && missionTeams.length > 0 && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-yellow-300 mb-6">
                    Équipes inscrites ({missionTeams.length})
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {missionTeams.map((team) => (
                      <div
                        key={team.teamId}
                        className="bg-slate-700 rounded-lg p-4 border border-yellow-400/30 hover:border-yellow-400 transition hover:shadow-lg hover:shadow-yellow-500/20"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-yellow-300">
                              {team.name}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                              ID: {team.teamId}
                            </p>
                          </div>
                          <span className="text-2xl">👥</span>
                        </div>

                        <div className="space-y-3 text-sm">
                          {/* Membres */}
                          <div>
                            <p className="text-yellow-200 font-semibold mb-2">
                              Membres ({team.membersCount})
                            </p>
                            <ul className="bg-slate-800 rounded p-2 space-y-1 max-h-32 overflow-y-auto">
                              {team.members && team.members.slice(0, 10).map((member, idx) => (
                                <li key={idx} className="text-slate-300 text-xs truncate">
                                  • {member}
                                </li>
                              ))}
                              {team.members && team.members.length > 10 && (
                                <li className="text-slate-400 text-xs italic">
                                  +{team.members.length - 10} autres
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Lien */}
                          {team.url && (
                            <a
                              href={team.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block text-yellow-400 hover:text-yellow-300 text-xs underline"
                            >
                              🔗 Voir profil
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Teams Search */}
            <div className="w-1/3 bg-slate-800 overflow-y-auto border-r border-yellow-500">
              <div className="p-4">
                <h2 className="text-lg font-bold text-yellow-300 mb-4">
                  Recherche d'équipes
                </h2>
                <input
                  type="text"
                  placeholder="Nom de l'équipe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border-2 border-yellow-500 focus:outline-none focus:border-yellow-400 mb-4"
                />

                <p className="text-xs text-slate-400 mb-4">
                  {filteredTeams.length} équipe{filteredTeams.length > 1 ? 's' : ''} trouvée{filteredTeams.length > 1 ? 's' : ''}
                </p>

                <div className="space-y-2">
                  {filteredTeams.slice(0, 100).map((team) => (
                    <button
                      key={team.teamId}
                      onClick={() => handleTeamSelect(team)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedTeam?.teamId === team.teamId
                          ? 'bg-yellow-500 text-black font-bold'
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-sm">{team.name}</div>
                      <div className="text-xs opacity-75 mt-1">
                        {team.membersCount} membres · ID: {team.teamId}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Details */}
            <div className="flex-1 overflow-y-auto bg-slate-900">
              {!selectedTeam && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-white text-xl">Recherchez et sélectionnez une équipe</p>
                    <p className="text-slate-400 text-sm mt-2">
                      {allTeams.length} équipes disponibles
                    </p>
                  </div>
                </div>
              )}

              {selectedTeam && (
                <div className="p-8">
                  {/* Team Header */}
                  <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg p-6 mb-6 shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedTeam.name}
                    </h2>
                    <p className="text-yellow-100">
                      ID: {selectedTeam.teamId} · {selectedTeam.membersCount} membres
                    </p>
                    {selectedTeam.url && (
                      <a
                        href={selectedTeam.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-white hover:text-yellow-200 underline text-sm"
                      >
                        🔗 Voir sur Nuit de l'Info
                      </a>
                    )}
                  </div>

                  {/* Membres */}
                  <div className="bg-slate-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                      <span>👥</span> Membres ({selectedTeam.membersCount})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedTeam.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-700 px-4 py-2 rounded text-white text-sm"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missions */}
                  <div className="bg-slate-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                      <span>🎯</span> Missions ({selectedTeam.missionIds.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedTeam.missionIds.map((missionId) => {
                        const mission = missions.find(m => m.id === missionId);
                        return (
                          <div
                            key={missionId}
                            className="bg-slate-700 px-4 py-3 rounded hover:bg-slate-600 transition"
                          >
                            <div className="font-semibold text-white">
                              {mission ? mission.title : `Mission #${missionId}`}
                            </div>
                            {mission && (
                              <div className="text-xs text-slate-400 mt-1">
                                ID: {mission.id}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MissionsStats;
