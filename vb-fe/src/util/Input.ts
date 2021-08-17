import { useState, useEffect } from "react";

const DEBOUNCE_TIME = 200;

export const useDebounce = (): [(inputValue: number | string, callback: (value: any) => void) => void] => {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const debounce = (inputValue: number | string, callback: (value: any) => void): void => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }

    setDebounceTimer(
      setTimeout(() => {
        return callback(inputValue);
      }, DEBOUNCE_TIME),
    );
  };

  return [debounce];
};

export const usePagination = (callback: () => any): void => {
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

      if (bottom) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
};
