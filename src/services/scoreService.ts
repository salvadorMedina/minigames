import type { GameScore, Game } from '../types/games';

const STORAGE_KEY = 'game_scores';

export const ScoreService = {
  saveScore: async (gameId: string, score: GameScore): Promise<void> => {
    try {
      const scores = await ScoreService.getScores(gameId);
      scores.push(score);
      localStorage.setItem(`${STORAGE_KEY}_${gameId}`, JSON.stringify(scores));
    } catch (error) {
      console.error('Error saving score:', error);
    }
  },

  getScores: async (gameId: string): Promise<GameScore[]> => {
    try {
      const scores = localStorage.getItem(`${STORAGE_KEY}_${gameId}`);
      return scores ? JSON.parse(scores) : [];
    } catch (error) {
      console.error('Error getting scores:', error);
      return [];
    }
  },

  getHighScores: async (gameId: string, limit: number = 10): Promise<GameScore[]> => {
    const scores = await ScoreService.getScores(gameId);
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  },

  clearScores: async (gameId: string): Promise<void> => {
    localStorage.removeItem(`${STORAGE_KEY}_${gameId}`);
  }
}; 