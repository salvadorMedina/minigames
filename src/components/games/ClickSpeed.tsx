import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function ClickSpeed() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cps, setCps] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setCps(clicks / 10);
      setTimeLeft(10); // Reset timer when game ends
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleClick = () => {
    if (!isPlaying && cps === 0) {
      setIsPlaying(true);
      setClicks(0);
      setTimeLeft(10);
    }
    if (isPlaying) {
      setClicks((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setIsPlaying(false);
    setClicks(0);
    setTimeLeft(10);
    setCps(0);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{t('clickSpeedTitle')}</h2>
      <div className="text-center">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {t('timeLeft')}: {timeLeft}s
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {t('clicks')}: {clicks}
        </p>
        {cps > 0 && (
          <p className="text-2xl font-bold text-primary mt-2">
            {t('cps')}: {cps.toFixed(1)}
          </p>
        )}
      </div>
      <button
        onClick={handleClick}
        className={`w-40 h-40 sm:w-48 sm:h-48 text-white rounded-full text-2xl font-bold transition-colors ${
          cps > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
        }`}
        disabled={cps > 0}
      >
        {isPlaying ? t('click') : t('start')}
      </button>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
      >
        {t('reset')}
      </button>
    </div>
  );
}

export default ClickSpeed; 