export type Game = 'tic-tac-toe' | 'click-speed' | 'rock-paper-scissors' | 'blackjack' | 'minesweeper';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface BaseGameProps {
  difficulty: Difficulty;
  onGameEnd: (score: number) => void;
  className?: string;
}

export interface GameScore {
  player: string;
  score: number;
  timestamp: Date;
  gameId: Game;
}

export interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'finished';
  score: number;
  startTime?: Date;
  endTime?: Date;
}

export type GameTheme = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}; 