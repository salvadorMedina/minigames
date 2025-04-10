import { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import TicTacToe from './components/games/TicTacToe';
import ClickSpeed from './components/games/ClickSpeed';
import RockPaperScissors from './components/games/RockPaperScissors';
import Blackjack from './components/games/Blackjack';
import Minesweeper from './components/games/Minesweeper';
import Wordle from './components/games/Wordle';

type Game = 'tic-tac-toe' | 'click-speed' | 'rock-paper-scissors' | 'blackjack' | 'minesweeper' | 'wordle';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game>('tic-tac-toe');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      <Navbar 
        currentGame={currentGame} 
        onGameChange={setCurrentGame}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {currentGame === 'tic-tac-toe' && <TicTacToe />}
      {currentGame === 'click-speed' && <ClickSpeed />}
      {currentGame === 'rock-paper-scissors' && <RockPaperScissors />}
      {currentGame === 'blackjack' && <Blackjack />}
      {currentGame === 'minesweeper' && <Minesweeper />}
      {currentGame === 'wordle' && <Wordle />}
    </div>
  );
}

export default App; 