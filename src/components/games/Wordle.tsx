import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import spanishWords from '../../data/spanishWords.json';
import englishWords from '../../data/englishWords.json';
import { Modal } from '../common/Modal';
import Confetti from 'react-confetti';

interface TileProps {
  letter: string;
  state: 'correct' | 'present' | 'absent' | 'empty' | 'current';
}

const Tile: React.FC<TileProps> = ({ letter, state }) => {
  return (
    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-3xl font-bold transition-colors duration-200
      ${state === 'correct' ? 'bg-green-500 text-white' :
        state === 'present' ? 'bg-yellow-500 text-white' :
        state === 'absent' ? 'bg-gray-500 text-white' :
        state === 'current' ? 'bg-primary text-white animate-pulse' :
        'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'}`}>
      {letter}
    </div>
  );
};

const Wordle: React.FC = () => {
  const { t, language } = useLanguage();
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startNewGame = () => {
    const words = language === 'es' ? spanishWords.words : englishWords.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setShowModal(false);
    setModalMessage('');
    // Auto-focus after starting new game
    setTimeout(() => {
      if (gameContainerRef.current) {
        gameContainerRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    startNewGame();
    // Auto-focus when language changes
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, [language]);

  useEffect(() => {
    // Auto-focus on initial mount
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameOver) return;
    const value = e.target.value.toLowerCase();
    if (/^[a-zA-Z]*$/.test(value) && value.length <= 5) {
      setCurrentGuess(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameOver) return;

    if (e.key === 'Enter' && currentGuess.length === 5) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');

      if (currentGuess === targetWord) {
        setGameOver(true);
        setModalMessage(t('wordle.congratulations'));
        setShowModal(true);
      } else if (guesses.length === 5) {
        setGameOver(true);
        setModalMessage(t('wordle.gameOver', { word: targetWord }));
        setShowModal(true);
      }
    }
  };

  const getTileState = (letter: string, position: number, guess: string) => {
    if (letter === targetWord[position]) {
      return 'correct';
    }

    const remainingLetters = targetWord.split('').map((l, i) => {
      if (guess[i] === targetWord[i]) return null;
      return l;
    });

    if (remainingLetters.includes(letter)) {
      const index = remainingLetters.indexOf(letter);
      if (index !== -1) {
        remainingLetters[index] = null;
      }
      return 'present';
    }

    return 'absent';
  };

  return (
    <div 
      ref={gameContainerRef}
      className="flex flex-col items-center gap-4 p-4 w-full max-w-md mx-auto" 
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        value={currentGuess}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="absolute opacity-0 w-0 h-0"
        maxLength={5}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      {gameOver && modalMessage.includes('Ganaste') && (
        <Confetti 
          width={window.innerWidth} 
          height={window.innerHeight} 
          recycle={false} 
          numberOfPieces={500} 
          gravity={0.2} 
        />
      )}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('wordle.title')}</h1>
      <div className="flex flex-col gap-2 w-full">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {[...Array(5)].map((_, colIndex) => {
              const letter = guesses[rowIndex]?.[colIndex] || 
                           (rowIndex === guesses.length ? currentGuess[colIndex] : '');
              const state = guesses[rowIndex] 
                ? getTileState(letter, colIndex, guesses[rowIndex])
                : rowIndex === guesses.length && colIndex === currentGuess.length
                ? 'current'
                : letter ? 'empty' : 'empty';
              return <Tile key={colIndex} letter={letter} state={state} />;
            })}
          </div>
        ))}
      </div>
      {guesses.length > 0 && !gameOver && (
        <button
          onClick={() => {
            setGameOver(true);
            setModalMessage(t('wordle.gameOver', { word: targetWord }));
            setShowModal(true);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          {t('wordle.endGame')}
        </button>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t('wordle.gameOverTitle')}
      >
        <div className="flex flex-col items-center gap-4">
          <p className={`text-lg text-center text-gray-900 dark:text-white ${
            modalMessage.includes('Ganaste') || modalMessage.includes('Congratulations') 
              ? 'text-green-500 dark:text-green-400' 
              : 'text-red-500 dark:text-red-400'
          }`}>
            {modalMessage}
          </p>
          <button
            onClick={startNewGame}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            {t('wordle.playAgain')}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Wordle; 