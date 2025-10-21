import { useEffect, useRef, useState } from 'react';

export const useThrottledValue = <T>(value: T, interval: number = 500): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const timeoutId = setTimeout(
        () => {
          lastUpdated.current = Date.now();
          setThrottledValue(value);
        },
        (lastUpdated.current ?? now) + interval - now
      );

      return () => clearTimeout(timeoutId);
    }
  }, [value, interval]);

  return throttledValue;
};
