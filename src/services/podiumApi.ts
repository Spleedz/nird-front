/**
 * Service API pour le podium de concours
 * Gère toutes les requêtes vers /api/podium/*
 */

const API_BASE = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000';

export interface Team {
  teamId: number;
  name: string;
  url: string;
  members: string[];
  score?: number;
  rank?: number;
}

export interface Mission {
  id: number;
  title: string;
  url: string;
  teamCount: number;
}

export interface RankingTeam extends Team {
  rank: number;
}

export interface RankingResponse {
  missionId: number;
  missionTitle: string;
  timestamp: string;
  teams: RankingTeam[];
}

/**
 * Récupère la liste des missions disponibles
 * Utilisé pour le menu burger / drawer
 */
export const fetchMissions = async (): Promise<Mission[]> => {
  try {
    const response = await fetch(`${API_BASE}/api/podium/missions`);
    if (!response.ok) throw new Error('Erreur récupération missions');
    const data = await response.json();
    return data.missions || [];
  } catch (error) {
    console.error('❌ Erreur fetchMissions:', error);
    return [];
  }
};

/**
 * Récupère les équipes d'une mission donnée
 */
export const fetchTeamsByMission = async (missionId: number) => {
  try {
    const response = await fetch(`${API_BASE}/api/podium/mission/${missionId}/teams`);
    if (!response.ok) throw new Error(`Erreur récupération équipes mission ${missionId}`);
    return await response.json();
  } catch (error) {
    console.error(`❌ Erreur fetchTeamsByMission(${missionId}):`, error);
    return null;
  }
};

/**
 * Récupère le classement d'une mission (équipes + scores)
 * @param missionId - ID de la mission
 * @param limit - optionnel, limiter le nombre de résultats
 */
export const fetchRanking = async (
  missionId: number,
  limit?: number
): Promise<RankingResponse | null> => {
  try {
    const url = new URL(`${API_BASE}/api/podium/mission/${missionId}/ranking`);
    if (limit) url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Erreur récupération classement mission ${missionId}`);
    return await response.json();
  } catch (error) {
    console.error(`❌ Erreur fetchRanking(${missionId}):`, error);
    return null;
  }
};

/**
 * Met à jour le score d'une équipe (approche ABSOLUE)
 * @param missionId - ID de la mission
 * @param teamId - ID de l'équipe
 * @param newScore - nouvelle valeur du score
 */
export const updateTeamScore = async (
  missionId: number,
  teamId: number,
  newScore: number
): Promise<RankingResponse | null> => {
  try {
    const response = await fetch(
      `${API_BASE}/api/podium/mission/${missionId}/update-score`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, newScore })
      }
    );
    if (!response.ok) throw new Error('Erreur mise à jour score');
    const data = await response.json();
    return data.newRanking ? { teams: data.newRanking } : null;
  } catch (error) {
    console.error(`❌ Erreur updateTeamScore(${missionId}, ${teamId}):`, error);
    return null;
  }
};

/**
 * Ajoute des points à une équipe (approche DELTA)
 * @param missionId - ID de la mission
 * @param teamId - ID de l'équipe
 * @param deltaScore - points à ajouter
 */
export const addScoreToTeam = async (
  missionId: number,
  teamId: number,
  deltaScore: number
): Promise<RankingResponse | null> => {
  try {
    const response = await fetch(
      `${API_BASE}/api/podium/mission/${missionId}/add-score`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, deltaScore })
      }
    );
    if (!response.ok) throw new Error('Erreur ajout points');
    const data = await response.json();
    return data.newRanking ? { teams: data.newRanking } : null;
  } catch (error) {
    console.error(`❌ Erreur addScoreToTeam(${missionId}, ${teamId}):`, error);
    return null;
  }
};
