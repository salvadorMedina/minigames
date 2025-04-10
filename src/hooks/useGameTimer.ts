import { useState, useEffect, useCallback } from 'react';

interface UseGameTimerProps {
  duration?: number;
  onTimeEnd?: () => void;
  autoStart?: boolean;
}

export const useGameTimer = ({
  duration,
  onTimeEnd,
  autoStart = false
}: UseGameTimerProps = {}) => {
  const [time, setTime] = useState(duration || 0);
  const [isRunning, setIsRunning] = useState(autoStart);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(duration || 0);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    let intervalId: number;

    if (isRunning && time > 0) {
      intervalId = window.setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setIsRunning(false);
            onTimeEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time, onTimeEnd]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset
  };
}; 