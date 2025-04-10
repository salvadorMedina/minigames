import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Confetti from 'react-confetti';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw';

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState({ wins: 0, losses: 0 });
  const { t } = useLanguage();

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const getEmoji = (choice: Choice) => {
    switch (choice) {
      case 'rock': return '🪨';
      case 'paper': return '📄';
      case 'scissors': return '✂️';
    }
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handleChoice = (choice: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    const gameResult = determineWinner(choice, computer);
    
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);
    
    if (gameResult === 'win') {
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else if (gameResult === 'lose') {
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{t('rpsTitle')}</h2>
      
      <div className="text-center">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {t('score')}: {score.wins} - {score.losses}
        </p>
      </div>

      <div className="flex gap-4">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-4xl rounded-lg transition-colors"
            disabled={playerChoice !== null}
          >
            {getEmoji(choice)}
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="text-center">
          <div className="flex justify-center gap-8 mb-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300">{t('yourChoice')}</p>
              <p className="text-4xl">{getEmoji(playerChoice)}</p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300">{t('computerChoice')}</p>
              <p className="text-4xl">{getEmoji(computerChoice)}</p>
            </div>
          </div>
          
          {result === 'win' && (
            <>
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
                gravity={0.2}
              />
              <p className="text-2xl font-bold text-green-500">{t('youWin')}</p>
            </>
          )}
          {result === 'lose' && <p className="text-2xl font-bold text-red-500">{t('youLose')}</p>}
          {result === 'draw' && <p className="text-2xl font-bold text-yellow-500">{t('draw')}</p>}
        </div>
      )}

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
      >
        {t('playAgain')}
      </button>
    </div>
  );
}

export default RockPaperScissors; 