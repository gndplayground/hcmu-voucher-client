import React, { useDeferredValue } from "react";
import { useState, useEffect, useRef, useCallback } from "react";

interface CountdownProps {
  targetDate?: string;
}

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountDown({ targetDate }: CountdownProps) {
  const requestIdRef = useRef<number | null>(null);

  const calculateTimeLeft = useCallback((): TimeLeft | undefined => {
    if (!targetDate) return;
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    const timeLeft: TimeLeft = {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | undefined>(
    calculateTimeLeft()
  );

  React.useEffect(() => {
    calculateTimeLeft();
  }, [calculateTimeLeft]);

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft());

    if (timeLeft && timeLeft.total > 0) {
      requestIdRef.current = requestAnimationFrame(tick);
    }
  }, [calculateTimeLeft, timeLeft]);

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (requestIdRef.current !== null) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [tick]);

  return useDeferredValue(timeLeft);
}
