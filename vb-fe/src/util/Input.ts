import React, { useState, useEffect } from "react";

const DEBOUNCE_TIME = 200;

export const useDebounce = () => {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const debounce = (inputValue: any, callback: any): void => {
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

export const usePagination = (callback: any) => {
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
