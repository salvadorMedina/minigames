import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Confetti from 'react-confetti';

type Player = 'X' | 'O' | null;
type Board = Player[];

function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { t } = useLanguage();

  const getPlayerIcon = (player: Player) => {
    if (player === 'X') return t('player1');
    if (player === 'O') return t('player2');
    return null;
  };

  const calculateWinner = (squares: Board): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setModalMessage(t('winner', { player: getPlayerIcon(winner) || '' }));
      setShowModal(true);
    } else if (newBoard.every((square) => square)) {
      setModalMessage(t('draw'));
      setShowModal(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} gravity={0.2} />
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-xl text-center mx-4">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-white whitespace-pre-line">
                {modalMessage}
              </h2>
              <button onClick={resetGame} className="mt-4 px-4 sm:px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors text-sm sm:text-base">
                {t('playAgain')}
              </button>
            </div>
          </div>
        </>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {t('gameTitle')}
      </h2>

      <div className="flex flex-col items-center gap-1 sm:gap-2 text-lg sm:text-xl mb-2 sm:mb-4 text-gray-700 dark:text-gray-300">
        {t('currentTurn')}
        <span className={`text-4xl sm:text-4xl font-bold ${isXNext ? 'text-blue-500' : 'text-red-500'} animate-pulse`}>
          {isXNext ? t('player1') : t('player2')}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 sm:gap-2 bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-lg shadow-lg">
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-2xl sm:text-3xl font-bold rounded-lg transition-colors text-gray-800 dark:text-white"
            disabled={square !== null}
          >
            {getPlayerIcon(square)}
          </button>
        ))}
      </div>

      <button onClick={resetGame} className="mt-4 sm:mt-6 px-3 sm:px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors text-sm sm:text-base">
        {t('resetGame')}
      </button>
    </>
  );
}

export default TicTacToe; 