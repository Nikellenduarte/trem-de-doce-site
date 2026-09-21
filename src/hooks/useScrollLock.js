import { useEffect } from 'react';

/** Trava o scroll do body enquanto `locked` for true (menu mobile / modal). */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
