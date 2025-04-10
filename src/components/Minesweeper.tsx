import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { useLanguage } from '../context/LanguageContext';

const Minesweeper = () => {
  const { t } = useLanguage();
  const [mines, setMines] = useState(3);
  const [revealed, setRevealed] = useState(8);
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState<Array<{ hasMine: boolean; revealed: boolean }>>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startGame = () => {
    if (gameOver || showVictoryModal) {
      setGameStarted(false);
      setGameOver(false);
      setShowVictoryModal(false);
      setBoard([]);
      return;
    }

    const totalCells = 25;
    const newBoard = Array(totalCells).fill(null).map(() => ({ hasMine: false, revealed: false }));
    
    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randomIndex = Math.floor(Math.random() * totalCells);
      if (!newBoard[randomIndex].hasMine) {
        newBoard[randomIndex].hasMine = true;
        minesPlaced++;
      }
    }
    
    setBoard(newBoard);
    setGameStarted(true);
    setGameOver(false);
    setShowVictoryModal(false);
  };

  const handleCellClick = (index: number) => {
    if (gameOver || board[index].revealed) return;

    const newBoard = [...board];
    newBoard[index].revealed = true;

    if (newBoard[index].hasMine) {
      setGameOver(true);
      // Reveal all mines
      newBoard.forEach((cell, i) => {
        if (cell.hasMine) newBoard[i].revealed = true;
      });
    } else {
      // Check for victory
      const revealedSafeCells = newBoard.filter(cell => cell.revealed && !cell.hasMine).length;
      if (revealedSafeCells >= revealed) {
        setShowVictoryModal(true);
      }
    }

    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {showVictoryModal && <ReactConfetti width={windowSize.width} height={windowSize.height} />}
      
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {t('minesweeper.title')}
      </h2>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <label htmlFor="mines" className="text-sm font-medium text-gray-900 dark:text-white">
            {t('minesweeper.numberOfBombs')} (3-15)
          </label>
          <select
            id="mines"
            value={mines}
            onChange={(e) => setMines(Number(e.target.value))}
            className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={gameStarted && !gameOver && !showVictoryModal}
          >
            {Array.from({ length: 13 }, (_, i) => i + 3).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="revealed" className="text-sm font-medium text-gray-900 dark:text-white">
            {t('minesweeper.numberOfAttempts')} (8-{25 - mines})
          </label>
          <select
            id="revealed"
            value={revealed}
            onChange={(e) => setRevealed(Number(e.target.value))}
            className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={gameStarted && !gameOver && !showVictoryModal}
          >
            {Array.from({ length: 18 - mines }, (_, i) => i + 8).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={startGame}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={gameStarted && !gameOver && !showVictoryModal}
      >
        {gameOver || showVictoryModal ? t('minesweeper.restart') : (gameStarted ? t('minesweeper.gameInProgress') : t('minesweeper.start'))}
      </button>

      {gameStarted && (
        <div className="grid grid-cols-5 gap-2">
          {board.map((cell, index) => (
            <div
              key={index}
              onClick={() => handleCellClick(index)}
              className={`w-12 h-12 flex items-center justify-center rounded cursor-pointer ${
                cell.revealed
                  ? cell.hasMine
                    ? 'bg-red-500'
                    : 'bg-gray-300'
                  : 'bg-[#22cb95] hover:bg-[#1db07d]'
              }`}
            >
              {cell.revealed && cell.hasMine && '💣'}
            </div>
          ))}
        </div>
      )}

      {gameOver && (
        <div className="text-red-500 font-bold mt-4">
          {t('minesweeper.youLose')}
        </div>
      )}

      {showVictoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">{t('minesweeper.youWin')}</h2>
            <p className="mb-4 text-gray-900 dark:text-white">{t('minesweeper.congratulations')}</p>
            <button
              onClick={startGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {t('minesweeper.playAgain')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Minesweeper; 