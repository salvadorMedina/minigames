import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type Game = 'tic-tac-toe' | 'click-speed' | 'rock-paper-scissors' | 'blackjack' | 'minesweeper';

interface NavbarProps {
  currentGame: Game;
  onGameChange: (game: Game) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

function Navbar({ currentGame, onGameChange, isDarkMode, onToggleDarkMode }: NavbarProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGameChange = (game: Game) => {
    onGameChange(game);
    setIsMenuOpen(false);
  };

  return (
    <nav className="mb-4 px-4 w-screen">
      <div className="flex justify-between items-center w-full">
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => handleGameChange('tic-tac-toe')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentGame === 'tic-tac-toe'
                ? 'bg-primary hover:bg-primary/80 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('games.ticTacToe')}
          </button>
          <button
            onClick={() => handleGameChange('click-speed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentGame === 'click-speed'
                ? 'bg-primary hover:bg-primary/80 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('games.clickSpeed')}
          </button>
          <button
            onClick={() => handleGameChange('rock-paper-scissors')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentGame === 'rock-paper-scissors'
                ? 'bg-primary hover:bg-primary/80 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('games.rockPaperScissors')}
          </button>
          <button
            onClick={() => handleGameChange('blackjack')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentGame === 'blackjack'
                ? 'bg-primary hover:bg-primary/80 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('games.blackjack')}
          </button>
          <button
            onClick={() => handleGameChange('minesweeper')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentGame === 'minesweeper'
                ? 'bg-primary hover:bg-primary/80 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {t('games.minesweeper')}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors lg:hidden"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="es">Español 🇪🇸</option>
            <option value="en">English 🇺🇸</option>
          </select>
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute left-0 top-0 h-full w-64 bg-gray-100 dark:bg-gray-900 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('menu')}</h2>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleGameChange('tic-tac-toe')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentGame === 'tic-tac-toe'
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t('games.ticTacToe')}
              </button>
              <button
                onClick={() => handleGameChange('click-speed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentGame === 'click-speed'
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t('games.clickSpeed')}
              </button>
              <button
                onClick={() => handleGameChange('rock-paper-scissors')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentGame === 'rock-paper-scissors'
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t('games.rockPaperScissors')}
              </button>
              <button
                onClick={() => handleGameChange('blackjack')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentGame === 'blackjack'
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t('games.blackjack')}
              </button>
              <button
                onClick={() => handleGameChange('minesweeper')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentGame === 'minesweeper'
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t('games.minesweeper')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 