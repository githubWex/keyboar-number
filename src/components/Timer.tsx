import  { useState, useEffect } from 'react';

interface TimerProps {
  isRunning: boolean;
}

export const Timer: React.FC<TimerProps> = ({ isRunning }) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map(val => val.toString().padStart(2, '0'))
      .join(':');
  };

  return (
    <div className="timer">
      {formatTime(time)}
    </div>
  );
};