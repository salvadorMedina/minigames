import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const translations = {
  en: {
    title: 'MiniGames',
    gameTitle: 'Soccer Tic-Tac-Toe',
    currentTurn: 'Current turn:',
    playAgain: 'Play again',
    resetGame: 'Reset game',
    winner: '{{player}}\nhas won!',
    draw: 'Draw! 🤝',
    player1: '⚽',
    player2: '🥅',
    clickSpeedTitle: 'Click Speed Test',
    timeLeft: 'Time left',
    clicks: 'Clicks',
    cps: 'Clicks per second',
    click: 'Click!',
    start: 'Start',
    reset: 'Reset',
    rpsTitle: 'Rock Paper Scissors',
    score: 'Score',
    yourChoice: 'Your choice',
    computerChoice: 'Computer choice',
    youWin: 'You win! 🎉',
    youLose: 'You lose! 😢',
    menu: 'Menu',
    games: {
      ticTacToe: 'Tic Tac Toe',
      clickSpeed: 'Click Speed',
      rockPaperScissors: 'Rock Paper Scissors',
      blackjack: 'Blackjack',
      minesweeper: 'Minesweeper'
    },
    minesweeper: {
      title: 'Minesweeper',
      numberOfBombs: 'Number of bombs',
      numberOfAttempts: 'Number of attempts',
      youWin: 'You win! 🎉',
      congratulations: 'Congratulations! You have revealed all safe cells.',
      playAgain: 'Play again',
      youLose: 'You lose! Click "Restart" to play again.',
      start: 'Start',
      restart: 'Restart',
      gameInProgress: 'Game in progress'
    },
    blackjack: {
      title: 'Blackjack',
      dealerHand: 'Dealer\'s Hand',
      yourHand: 'Your Hand',
      hit: 'Hit',
      stand: 'Stand',
      newGame: 'New Game',
      youWin: 'You Win! 🎉',
      dealerWins: 'Dealer Wins! 😢',
      draw: 'It\'s a Draw! 🤝'
    }
  },
  es: {
    title: 'MiniGames',
    gameTitle: 'Hattrick en Raya',
    currentTurn: 'Turno actual:',
    playAgain: 'Jugar de nuevo',
    resetGame: 'Reiniciar juego',
    winner: '{{player}}\n¡ha ganado!',
    draw: '¡Empate! 🤝',
    player1: '⚽',
    player2: '🥅',
    clickSpeedTitle: 'Test de Velocidad de Clicks',
    timeLeft: 'Tiempo restante',
    clicks: 'Clicks',
    cps: 'Clicks por segundo',
    click: '¡Click!',
    start: 'Comenzar',
    reset: 'Reiniciar',
    rpsTitle: 'Piedra Papel Tijeras',
    score: 'Puntuación',
    yourChoice: 'Tu elección',
    computerChoice: 'Elección de la computadora',
    youWin: '¡Ganaste! 🎉',
    youLose: '¡Perdiste! 😢',
    menu: 'Menú',
    games: {
      ticTacToe: 'Hattrick en Raya',
      clickSpeed: 'Velocidad de Clicks',
      rockPaperScissors: 'Piedra Papel o Tijeras',
      blackjack: 'Blackjack',
      minesweeper: 'Buscaminas'
    },
    minesweeper: {
      title: 'Buscaminas',
      numberOfBombs: 'Número de bombas',
      numberOfAttempts: 'Número de intentos',
      youWin: '¡Ganaste! 🎉',
      congratulations: '¡Felicidades! Has revelado todas las casillas seguras.',
      playAgain: 'Jugar de nuevo',
      youLose: '¡Perdiste! Haz clic en "Reiniciar" para jugar de nuevo.',
      start: 'Empezar',
      restart: 'Reiniciar',
      gameInProgress: 'Juego en curso'
    },
    blackjack: {
      title: 'Blackjack',
      dealerHand: 'Mano del Crupier',
      yourHand: 'Tu Mano',
      hit: 'Pedir',
      stand: 'Plantarse',
      newGame: 'Nuevo Juego',
      youWin: '¡Ganaste! 🎉',
      dealerWins: '¡Ganó el Crupier! 😢',
      draw: '¡Empate! 🤝'
    }
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let translation: any = translations[language];
    
    for (const k of keys) {
      translation = translation[k];
      if (translation === undefined) return key;
    }

    if (typeof translation === 'string' && params) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation.replace(`{{${key}}}`, value);
      });
    }

    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 