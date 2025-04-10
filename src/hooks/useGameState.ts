import { useState, useCallback, useEffect } from 'react';
import type { GameState, Game } from '../types/games';
import { ScoreService } from '../services/scoreService';

interface UseGameStateProps {
  gameId: Game;
  onGameEnd?: (score: number) => void;
}

export const useGameState = ({ gameId, onGameEnd }: UseGameStateProps) => {
  const [state, setState] = useState<GameState>({
    status: 'idle',
    score: 0
  });

  const startGame = useCallback(() => {
    setState({
      status: 'playing',
      score: 0,
      startTime: new Date()
    });
  }, []);

  const pauseGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'paused'
    }));
  }, []);

  const resumeGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'playing'
    }));
  }, []);

  const endGame = useCallback((finalScore: number) => {
    setState(prev => ({
      ...prev,
      status: 'finished',
      score: finalScore,
      endTime: new Date()
    }));

    ScoreService.saveScore(gameId, {
      gameId,
      score: finalScore,
      player: 'Player', // TODO: Add player name support
      timestamp: new Date()
    });

    onGameEnd?.(finalScore);
  }, [gameId, onGameEnd]);

  const updateScore = useCallback((newScore: number) => {
    setState(prev => ({
      ...prev,
      score: newScore
    }));
  }, []);

  return {
    ...state,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    updateScore
  };
}; 