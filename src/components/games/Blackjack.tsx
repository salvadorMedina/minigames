import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { useLanguage } from '../../context/LanguageContext';

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: string;
  points: number;
}

const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const value of values) {
      let points = 0;
      if (value === 'A') points = 11;
      else if (['K', 'Q', 'J'].includes(value)) points = 10;
      else points = parseInt(value);
      
      deck.push({ suit, value, points });
    }
  }
  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function calculateHandValue(hand: Card[]): number {
  let value = hand.reduce((sum, card) => sum + card.points, 0);
  let aces = hand.filter(card => card.value === 'A').length;
  
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  
  return value;
}

export default function Blackjack() {
  const { t } = useLanguage();
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'playerWon' | 'dealerWon' | 'draw'>('playing');
  const [isDealerTurn, setIsDealerTurn] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = shuffleDeck(createDeck());
    const playerCards = [newDeck.pop()!, newDeck.pop()!];
    const dealerCards = [newDeck.pop()!, newDeck.pop()!];
    
    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameStatus('playing');
    setIsDealerTurn(false);
  };

  const hit = () => {
    if (gameStatus !== 'playing' || isDealerTurn) return;
    
    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newPlayerHand = [...playerHand, newCard];
    
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    
    const playerValue = calculateHandValue(newPlayerHand);
    if (playerValue > 21) {
      setGameStatus('dealerWon');
    }
  };

  const stand = () => {
    if (gameStatus !== 'playing' || isDealerTurn) return;
    
    setIsDealerTurn(true);
    dealerPlay();
  };

  const dealerPlay = () => {
    let currentDealerHand = [...dealerHand];
    let dealerValue = calculateHandValue(currentDealerHand);
    
    while (dealerValue < 17) {
      const newCard = deck.pop()!;
      currentDealerHand = [...currentDealerHand, newCard];
      dealerValue = calculateHandValue(currentDealerHand);
    }
    
    setDealerHand(currentDealerHand);
    
    const playerValue = calculateHandValue(playerHand);
    if (dealerValue > 21) {
      setGameStatus('playerWon');
    } else if (dealerValue > playerValue) {
      setGameStatus('dealerWon');
    } else if (dealerValue < playerValue) {
      setGameStatus('playerWon');
    } else {
      setGameStatus('draw');
    }
  };

  const getCardSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  return (
    <div className="w-full max-w-2xl px-4 mx-auto">
      {gameStatus === 'playerWon' && <ReactConfetti />}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800 dark:text-white">{t('blackjack.title')}</h2>
        {gameStatus !== 'playing' && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="text-center">
                {gameStatus === 'playerWon' && <p className="text-green-500 dark:text-green-400 text-2xl font-bold mb-4">{t('blackjack.youWin')}</p>}
                {gameStatus === 'dealerWon' && <p className="text-red-500 dark:text-red-400 text-2xl font-bold mb-4">{t('blackjack.dealerWins')}</p>}
                {gameStatus === 'draw' && <p className="text-yellow-500 dark:text-yellow-400 text-2xl font-bold mb-4">{t('blackjack.draw')}</p>}
                <button
                  onClick={startNewGame}
                  className="mt-4 px-6 py-2 bg-[#22cb95] text-white rounded-lg hover:bg-[#1db884] transition-colors inline-block"
                >
                  {t('blackjack.newGame')}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            {t('blackjack.dealerHand')} 
            {!isDealerTurn && dealerHand.length > 0 && (
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                ({calculateHandValue([dealerHand[0]])})
              </span>
            )}
            {isDealerTurn && (
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                ({calculateHandValue(dealerHand)})
              </span>
            )}
          </h3>
          <div className="flex gap-1 sm:gap-2 min-h-[100px] sm:min-h-[120px] overflow-x-auto pb-2">
            {dealerHand.map((card, index) => (
              <div 
                key={index}
                className={`w-14 sm:w-16 h-20 sm:h-24 rounded-lg border-2 flex flex-col items-center justify-center text-base sm:text-lg font-bold flex-shrink-0
                  ${card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-500' : 'text-gray-800 dark:text-gray-100'}
                  ${isDealerTurn || index === 0 ? 'bg-white dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                {isDealerTurn || index === 0 ? (
                  <>
                    <span>{card.value}</span>
                    <span>{getCardSymbol(card.suit)}</span>
                  </>
                ) : (
                  <span className="text-gray-800 dark:text-gray-100">?</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            {t('blackjack.yourHand')} 
            <span className="ml-2 text-gray-600 dark:text-gray-300">({calculateHandValue(playerHand)})</span>
          </h3>
          <div className="flex gap-1 sm:gap-2 min-h-[100px] sm:min-h-[120px] overflow-x-auto pb-2">
            {playerHand.map((card, index) => (
              <div 
                key={index}
                className={`w-14 sm:w-16 h-20 sm:h-24 rounded-lg border-2 flex flex-col items-center justify-center text-base sm:text-lg font-bold flex-shrink-0
                  ${card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-500' : 'text-gray-800 dark:text-gray-100'}
                  bg-white dark:bg-gray-700`}
              >
                <span>{card.value}</span>
                <span>{getCardSymbol(card.suit)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          <button
            onClick={hit}
            disabled={gameStatus !== 'playing' || isDealerTurn}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {t('blackjack.hit')}
          </button>
          <button
            onClick={stand}
            disabled={gameStatus !== 'playing' || isDealerTurn}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {t('blackjack.stand')}
          </button>
          <button
            onClick={startNewGame}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {t('blackjack.newGame')}
          </button>
        </div>
      </div>
    </div>
  );
} 