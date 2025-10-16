import { useCallback, useRef } from "react"

export const useDebounce = (timeoutMs: number) => {
  const timeoutRef = useRef<number | undefined>(undefined);
  
  return useCallback((callbackFn: Function) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(callbackFn, timeoutMs);
  }, [timeoutMs]);
};